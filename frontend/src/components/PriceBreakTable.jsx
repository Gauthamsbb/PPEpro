export const PriceBreakTable = ({ product }) => {
  return (
    <div className="bg-cream rounded-2xl border border-border p-5 sm:p-6" data-testid="price-break-table">
      <h3 className="font-head font-semibold text-lg text-ink mb-1">Case Volume Pricing</h3>
      <p className="text-xs text-muted-foreground mb-4">Per box, when purchased by the case ({product.boxes_per_case} boxes/case)</p>
      <div className="space-y-2">
        {product.price_tiers.map((tier, idx) => (
          <div
            key={tier.label}
            className={`flex items-center justify-between rounded-xl px-4 py-3 ${
              idx === product.price_tiers.length - 1 ? "bg-safety-orange text-white" : "bg-white border border-border"
            }`}
            data-testid={`price-tier-${idx}`}
          >
            <span className={`text-sm font-medium ${idx === product.price_tiers.length - 1 ? "text-white" : "text-ink"}`}>{tier.label}</span>
            <span className="font-mono tabular font-bold text-base">${tier.price_per_box.toFixed(2)}/box</span>
          </div>
        ))}
      </div>
    </div>
  );
};
