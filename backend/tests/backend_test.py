"""Backend API tests for PPE Pro Solutions"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://pro-exam-gloves.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Products ----
class TestProducts:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200

    def test_list_products(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 20, f"Expected 20 products, got {len(data)}"
        # verify required fields on first
        p = data[0]
        for f in ["slug", "sku", "name", "brand", "material", "price_per_box",
                  "price_tiers", "sizes", "industries", "images"]:
            assert f in p, f"Missing field {f}"

    def test_products_meta(self, client):
        r = client.get(f"{API}/products/meta")
        assert r.status_code == 200
        d = r.json()
        for key in ["brands", "materials", "colors", "grades", "textures"]:
            assert key in d
            assert isinstance(d[key], list)
        assert "nitrile" in d["materials"]
        assert "latex" in d["materials"]
        assert "chloroprene" in d["materials"]

    def test_get_product_by_slug(self, client):
        r = client.get(f"{API}/products/skintx-black-nitrile-5mil")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "skintx-black-nitrile-5mil"
        assert d["brand"] == "SkinTx"

    def test_get_product_404(self, client):
        r = client.get(f"{API}/products/does-not-exist")
        assert r.status_code == 404

    def test_filter_by_material(self, client):
        r = client.get(f"{API}/products", params={"material": "chloroprene"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(p["material"] == "chloroprene" for p in data)

    def test_filter_by_industry(self, client):
        r = client.get(f"{API}/products", params={"industry": "food-service-processing"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all("food-service-processing" in p["industries"] for p in data)

    def test_filter_by_brand(self, client):
        r = client.get(f"{API}/products", params={"brand": "Adenna"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(p["brand"] == "Adenna" for p in data)

    def test_sort_price_asc(self, client):
        r = client.get(f"{API}/products", params={"sort": "price_asc"})
        data = r.json()
        prices = [p["price_per_box"] for p in data]
        assert prices == sorted(prices)

    def test_sort_price_desc(self, client):
        r = client.get(f"{API}/products", params={"sort": "price_desc"})
        data = r.json()
        prices = [p["price_per_box"] for p in data]
        assert prices == sorted(prices, reverse=True)

    def test_search(self, client):
        r = client.get(f"{API}/products", params={"search": "Adenna"})
        data = r.json()
        assert len(data) > 0

    def test_filter_by_size(self, client):
        r = client.get(f"{API}/products", params={"size": "XXL"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0


# ---- Quotes ----
class TestQuotes:
    def test_create_quote(self, client):
        payload = {
            "name": "TEST User",
            "business_name": "TEST Studio",
            "email": "test@example.com",
            "phone": "5555555555",
            "industry": "tattoo-body-art",
            "products_of_interest": "Black nitrile",
            "monthly_volume": "5-10 cases",
            "notes": "test",
        }
        r = client.post(f"{API}/quotes", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["email"] == "test@example.com"
        assert "id" in d

    def test_create_quote_invalid_email(self, client):
        payload = {
            "name": "TEST", "business_name": "x", "email": "not-an-email",
            "phone": "1", "industry": "x", "products_of_interest": "x",
            "monthly_volume": "x",
        }
        r = client.post(f"{API}/quotes", json=payload)
        assert r.status_code == 422


# ---- Contact ----
class TestContact:
    def test_create_contact(self, client):
        payload = {
            "name": "TEST",
            "email": "test@example.com",
            "phone": "5555555555",
            "subject": "Question",
            "message": "Testing contact form",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["email"] == "test@example.com"


# ---- Orders (mock checkout) ----
class TestOrders:
    def test_create_order_and_get(self, client):
        payload = {
            "items": [
                {"slug": "skintx-black-nitrile-5mil", "size": "M", "pack_type": "box", "quantity": 2}
            ],
            "shipping": {
                "full_name": "TEST User",
                "business_name": "TEST",
                "email": "test@example.com",
                "phone": "5555555555",
                "address": "123 Main",
                "city": "NYC",
                "state": "NY",
                "zip_code": "10001",
            },
            "shipping_method": "standard",
        }
        r = client.post(f"{API}/orders", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["order_number"].startswith("PPE-")
        assert d["subtotal"] > 0
        assert len(d["items"]) == 1
        assert d["items"][0]["unit_price"] == 8.49
        # standard shipping under $150 → $12
        assert d["shipping_cost"] == 12.00

        # GET verify persistence
        order_num = d["order_number"]
        r2 = client.get(f"{API}/orders/{order_num}")
        assert r2.status_code == 200
        assert r2.json()["order_number"] == order_num

    def test_order_case_pricing(self, client):
        payload = {
            "items": [
                {"slug": "skintx-black-nitrile-5mil", "size": "M", "pack_type": "case", "quantity": 1}
            ],
            "shipping": {
                "full_name": "TEST", "email": "test@example.com", "phone": "5",
                "address": "1", "city": "NYC", "state": "NY", "zip_code": "10001"
            },
            "shipping_method": "standard",
        }
        r = client.post(f"{API}/orders", json=payload)
        assert r.status_code == 200
        d = r.json()
        # case unit price = box price * boxes_per_case (10) = 84.90
        assert d["items"][0]["unit_price"] == 84.90
        # subtotal 84.90 < 150 → $12 standard shipping
        assert d["shipping_cost"] == 12.0

    def test_order_expedited_shipping(self, client):
        payload = {
            "items": [
                {"slug": "proworks-blue-nitrile-exam", "size": "M", "pack_type": "box", "quantity": 1}
            ],
            "shipping": {
                "full_name": "TEST", "email": "test@example.com", "phone": "5",
                "address": "1", "city": "NYC", "state": "NY", "zip_code": "10001"
            },
            "shipping_method": "expedited",
        }
        r = client.post(f"{API}/orders", json=payload)
        assert r.status_code == 200
        d = r.json()
        # $12 standard + $35 expedited
        assert d["shipping_cost"] == 47.00

    def test_order_pickup_free(self, client):
        payload = {
            "items": [
                {"slug": "proworks-blue-nitrile-exam", "size": "M", "pack_type": "box", "quantity": 1}
            ],
            "shipping": {
                "full_name": "TEST", "email": "test@example.com", "phone": "5",
                "address": "1", "city": "NYC", "state": "NY", "zip_code": "10001"
            },
            "shipping_method": "pickup",
        }
        r = client.post(f"{API}/orders", json=payload)
        assert r.status_code == 200
        assert r.json()["shipping_cost"] == 0.0

    def test_order_out_of_stock_size(self, client):
        # adenna-bronze-latex-exam has all sizes out_of stock
        payload = {
            "items": [
                {"slug": "adenna-bronze-latex-exam", "size": "M", "pack_type": "box", "quantity": 1}
            ],
            "shipping": {
                "full_name": "TEST", "email": "test@example.com", "phone": "5",
                "address": "1", "city": "NYC", "state": "NY", "zip_code": "10001"
            },
            "shipping_method": "standard",
        }
        r = client.post(f"{API}/orders", json=payload)
        assert r.status_code == 400

    def test_order_unknown_product(self, client):
        payload = {
            "items": [
                {"slug": "does-not-exist", "size": "M", "pack_type": "box", "quantity": 1}
            ],
            "shipping": {
                "full_name": "TEST", "email": "test@example.com", "phone": "5",
                "address": "1", "city": "NYC", "state": "NY", "zip_code": "10001"
            },
        }
        r = client.post(f"{API}/orders", json=payload)
        assert r.status_code == 404

    def test_get_order_404(self, client):
        r = client.get(f"{API}/orders/PPE-000000")
        assert r.status_code == 404
