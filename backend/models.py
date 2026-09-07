from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field, EmailStr
from database import BaseDocument


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class SizeStock(BaseModel):
    size: str
    in_stock: bool
    stock_count: int


class PriceTier(BaseModel):
    label: str
    min_cases: int
    price_per_box: float


class Product(BaseDocument):
    slug: str
    sku: str
    name: str
    brand: str
    material: str
    color: str
    thickness_mil: float
    texture: str
    powder_free: bool
    grade: str
    astm_standard: str
    gloves_per_box: int
    boxes_per_case: int
    price_per_box: float
    price_tiers: List[PriceTier]
    industries: List[str]
    sizes: List[SizeStock]
    images: List[str]
    short_description: str
    description: str
    in_stock: bool = True


class QuoteRequestIn(BaseModel):
    name: str
    business_name: str
    email: EmailStr
    phone: str
    industry: str
    products_of_interest: str
    monthly_volume: str
    notes: Optional[str] = ""
    source: str = "quote_page"


class QuoteRequest(BaseDocument, QuoteRequestIn):
    created_at: str = Field(default_factory=now_iso)


class ContactMessageIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str


class ContactMessage(BaseDocument, ContactMessageIn):
    created_at: str = Field(default_factory=now_iso)


class CartItemIn(BaseModel):
    slug: str
    size: str
    pack_type: str
    quantity: int


class ShippingInfo(BaseModel):
    full_name: str
    business_name: Optional[str] = ""
    email: EmailStr
    phone: str
    address: str
    city: str
    state: str
    zip_code: str


class OrderIn(BaseModel):
    items: List[CartItemIn]
    shipping: ShippingInfo
    shipping_method: str = "standard"


class OrderLineItem(BaseModel):
    slug: str
    name: str
    brand: str
    image: str
    size: str
    pack_type: str
    quantity: int
    unit_price: float
    line_total: float


class Order(BaseDocument):
    order_number: str
    items: List[OrderLineItem]
    shipping: ShippingInfo
    shipping_method: str
    subtotal: float
    shipping_cost: float
    total: float
    status: str = "confirmed"
    created_at: str = Field(default_factory=now_iso)
