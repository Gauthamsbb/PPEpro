import { Link } from "react-router-dom";

const StockBadge = ({ inStock }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full ${
      inStock ? "bg-stock-in/10 text-stock-in" : "bg-stock-out/10 text-stock-out"
    }`}
    data-testid={inStock ? "product-card-stock-in" : "product-card-stock-out"}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-stock-in animate-pulse" : "bg-stock-out"}`} />
    {inStock ? "In Stock" : "Out of Stock"}
  </span>
);

export const ProductCard = ({ product }) => {
  return (
    <div className="transition-transform duration-150 hover:-translate-y-1">
      <Link
        to={`/products/${product.slug}`}
        className="group block bg-white rounded-2xl border border-border overflow-hidden h-full"
        data-testid={`product-card-${product.slug}`}
      >
        <div className="aspect-square bg-cream overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <StockBadge inStock={product.in_stock} />
          </div>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-head font-semibold text-sm sm:text-base text-ink leading-snug mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 flex-wrap">
            <span className="font-mono tabular">{product.thickness_mil} mil</span>
            <span>·</span>
            <span className="capitalize">{product.material}</span>
            <span>·</span>
            <span>{product.color}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-mono tabular text-lg font-bold text-ink">${product.price_per_box.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground ml-1">/box</span>
            </div>
            <span className="text-xs text-safety-orange font-semibold">{product.gloves_per_box}/box</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
