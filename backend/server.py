import os
import logging
import random
import string
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Query
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import db
from models import (
    Product,
    QuoteRequest,
    QuoteRequestIn,
    ContactMessage,
    ContactMessageIn,
    Order,
    OrderIn,
    OrderLineItem,
)
from seed_data import PRODUCTS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_on_startup():
    count = await db.products.count_documents({})
    if count == 0:
        await db.products.insert_many(PRODUCTS)
        logger.info(f"Seeded {len(PRODUCTS)} products")


@api_router.get("/")
async def root():
    return {"message": "PPE Pro Solutions API"}


@api_router.get("/products", response_model=List[Product])
async def list_products(
    industry: Optional[str] = None,
    material: Optional[str] = None,
    brand: Optional[str] = None,
    size: Optional[str] = None,
    color: Optional[str] = None,
    grade: Optional[str] = None,
    texture: Optional[str] = None,
    search: Optional[str] = None,
    min_thickness: Optional[float] = None,
    max_thickness: Optional[float] = None,
    sort: Optional[str] = None,
):
    query = {}
    if industry:
        query["industries"] = industry
    if material:
        query["material"] = material
    if brand:
        query["brand"] = brand
    if color:
        query["color"] = color
    if grade:
        query["grade"] = grade
    if texture:
        query["texture"] = texture
    if size:
        query["sizes.size"] = size
    if min_thickness is not None or max_thickness is not None:
        thickness_query = {}
        if min_thickness is not None:
            thickness_query["$gte"] = min_thickness
        if max_thickness is not None:
            thickness_query["$lte"] = max_thickness
        query["thickness_mil"] = thickness_query
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"brand": {"$regex": search, "$options": "i"}},
            {"material": {"$regex": search, "$options": "i"}},
        ]

    cursor = db.products.find(query)
    docs = await cursor.to_list(2000)

    if sort == "price_asc":
        docs.sort(key=lambda d: d["price_per_box"])
    elif sort == "price_desc":
        docs.sort(key=lambda d: -d["price_per_box"])
    elif sort == "thickness_asc":
        docs.sort(key=lambda d: d["thickness_mil"])
    elif sort == "thickness_desc":
        docs.sort(key=lambda d: -d["thickness_mil"])

    return [Product.from_mongo(d) for d in docs]


@api_router.get("/products/meta")
async def products_meta():
    docs = await db.products.find({}).to_list(2000)
    return {
        "brands": sorted({d["brand"] for d in docs}),
        "materials": sorted({d["material"] for d in docs}),
        "colors": sorted({d["color"] for d in docs}),
        "grades": sorted({d["grade"] for d in docs}),
        "textures": sorted({d["texture"] for d in docs}),
    }


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product.from_mongo(doc)


@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote(payload: QuoteRequestIn):
    quote = QuoteRequest(**payload.model_dump())
    result = await db.quotes.insert_one(quote.to_mongo())
    doc = await db.quotes.find_one({"_id": result.inserted_id})
    return QuoteRequest.from_mongo(doc)


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageIn):
    message = ContactMessage(**payload.model_dump())
    result = await db.contact_messages.insert_one(message.to_mongo())
    doc = await db.contact_messages.find_one({"_id": result.inserted_id})
    return ContactMessage.from_mongo(doc)


def generate_order_number() -> str:
    suffix = ''.join(random.choices(string.digits, k=6))
    return f"PPE-{suffix}"


@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderIn):
    line_items: List[OrderLineItem] = []
    subtotal = 0.0

    for item in payload.items:
        product_doc = await db.products.find_one({"slug": item.slug})
        if not product_doc:
            raise HTTPException(status_code=404, detail=f"Product {item.slug} not found")

        size_match = next((s for s in product_doc["sizes"] if s["size"] == item.size), None)
        if not size_match or not size_match["in_stock"]:
            raise HTTPException(status_code=400, detail=f"Size {item.size} unavailable for {product_doc['name']}")

        if item.pack_type == "case":
            cases = item.quantity
            tier = product_doc["price_tiers"][0]
            for t in product_doc["price_tiers"]:
                if cases >= t["min_cases"]:
                    tier = t
            unit_price = round(tier["price_per_box"] * product_doc["boxes_per_case"], 2)
        else:
            unit_price = product_doc["price_per_box"]

        line_total = round(unit_price * item.quantity, 2)
        subtotal += line_total

        line_items.append(OrderLineItem(
            slug=product_doc["slug"],
            name=product_doc["name"],
            brand=product_doc["brand"],
            image=product_doc["images"][0],
            size=item.size,
            pack_type=item.pack_type,
            quantity=item.quantity,
            unit_price=unit_price,
            line_total=line_total,
        ))

    subtotal = round(subtotal, 2)
    shipping_cost = 0.0 if subtotal >= 150 or payload.shipping_method == "pickup" else 12.00
    if payload.shipping_method == "expedited":
        shipping_cost += 35.00
    total = round(subtotal + shipping_cost, 2)

    order = Order(
        order_number=generate_order_number(),
        items=line_items,
        shipping=payload.shipping,
        shipping_method=payload.shipping_method,
        subtotal=subtotal,
        shipping_cost=shipping_cost,
        total=total,
    )
    result = await db.orders.insert_one(order.to_mongo())
    doc = await db.orders.find_one({"_id": result.inserted_id})
    return Order.from_mongo(doc)


@api_router.get("/orders/{order_number}", response_model=Order)
async def get_order(order_number: str):
    doc = await db.orders.find_one({"order_number": order_number})
    if not doc:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order.from_mongo(doc)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
