import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { fetchProduct } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { SpecTable } from "@/components/SpecTable";
import { PriceBreakTable } from "@/components/PriceBreakTable";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyMobileAddToCart } from "@/components/StickyMobileAddToCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Phone, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [size, setSize] = useState("");
  const [packType, setPackType] = useState("box");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct(slug)
      .then((data) => {
        setProduct(data);
        const firstInStock = data.sizes.find((s) => s.in_stock);
        setSize(firstInStock ? firstInStock.size : data.sizes[0]?.size);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) return <Navigate to="/products" replace />;
  if (!product) return <div className="min-h-[60vh]" />;

  const sizeInfo = product.sizes.find((s) => s.size === size);
  const sizeAvailable = sizeInfo?.in_stock;

  const currentTier = packType === "case"
    ? [...product.price_tiers].reverse().find((t) => quantity >= t.min_cases) || product.price_tiers[0]
    : null;

  const unitPrice = packType === "case"
    ? Math.round(currentTier.price_per_box * product.boxes_per_case * 100) / 100
    : product.price_per_box;

  const handleAdd = () => {
    if (!sizeAvailable) {
      toast.error("That size is currently out of stock.");
      return;
    }
    addToCart({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      size,
      packType,
      quantity,
      unitPrice,
    });
    toast.success(`Added ${quantity} ${packType === "case" ? "case" : "box"}(s) to cart`);
  };

  return (
    <div data-testid={`product-detail-${slug}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8">
        <Breadcrumbs items={[{ to: "/products", label: "All Gloves" }, { label: product.name }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-6">
          <div className="aspect-square bg-cream rounded-2xl overflow-hidden sticky top-24">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2" data-testid="pdp-brand">{product.brand}</p>
          <h1 className="font-head text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-3" data-testid="pdp-name">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                product.in_stock ? "bg-stock-in/10 text-stock-in" : "bg-stock-out/10 text-stock-out"
              }`}
              data-testid="pdp-stock-badge"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${product.in_stock ? "bg-stock-in animate-pulse" : "bg-stock-out"}`} />
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <p className="text-muted-foreground mb-6">{product.short_description}</p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-mono tabular text-3xl font-bold text-ink" data-testid="pdp-unit-price">${unitPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">/ {packType === "case" ? "case" : "box"} · {product.gloves_per_box} gloves</span>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSize(s.size)}
                  disabled={!s.in_stock}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    size === s.size ? "bg-ink text-white border-ink" : "bg-white text-ink border-border hover:border-ink"
                  } ${!s.in_stock ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                  data-testid={`pdp-size-selector-${s.size.toLowerCase()}`}
                >
                  {s.size}
                </button>
              ))}
            </div>
            {sizeInfo && sizeInfo.in_stock && sizeInfo.stock_count < 30 && (
              <p className="text-xs text-stock-low font-medium mt-2" data-testid="pdp-low-stock-notice">Only {sizeInfo.stock_count} boxes left in this size</p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink mb-2">Pack Size</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setPackType("box"); setQuantity(1); }}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold border text-left transition-colors ${
                  packType === "box" ? "bg-ink text-white border-ink" : "bg-white text-ink border-border hover:border-ink"
                }`}
                data-testid="pdp-pack-type-box"
              >
                Box of {product.gloves_per_box}
                <span className="block text-xs font-normal opacity-70">${product.price_per_box.toFixed(2)}/box</span>
              </button>
              <button
                onClick={() => { setPackType("case"); setQuantity(1); }}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold border text-left transition-colors ${
                  packType === "case" ? "bg-ink text-white border-ink" : "bg-white text-ink border-border hover:border-ink"
                }`}
                data-testid="pdp-pack-type-case"
              >
                Case of {product.boxes_per_case} boxes
                <span className="block text-xs font-normal opacity-70">From ${product.price_tiers[product.price_tiers.length - 1].price_per_box.toFixed(2)}/box</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3" aria-label="Decrease quantity" data-testid="pdp-quantity-decrease">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-mono tabular text-base" data-testid="pdp-quantity-value">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="p-3" aria-label="Increase quantity" data-testid="pdp-quantity-increase">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              onClick={handleAdd}
              disabled={!sizeAvailable}
              className="flex-1 bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-12 hidden lg:flex"
              data-testid="pdp-add-to-cart-button"
            >
              Add to Cart · ${(unitPrice * quantity).toFixed(2)}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-safety-orange" /> Ships in 3-5 business days</p>
            <p className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-safety-orange" /> Genuine {product.brand} product</p>
          </div>

          <div className="bg-cream border border-border rounded-2xl p-4 flex items-center justify-between mb-8">
            <p className="text-sm text-ink">Ordering more than a few cases?</p>
            <Button asChild variant="outline" size="sm" className="rounded-full shrink-0" data-testid="pdp-quote-link">
              <Link to="/quote">Request a Quote</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8" data-testid="pdp-description">{product.description}</p>

          <PriceBreakTable product={product} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">
        <SpecTable product={product} />
      </div>

      <StickyMobileAddToCart
        price={unitPrice * quantity}
        quantity={quantity}
        onIncrement={() => setQuantity((q) => q + 1)}
        onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        onAdd={handleAdd}
        disabled={!sizeAvailable}
      />
    </div>
  );
};
