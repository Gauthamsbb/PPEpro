const Row = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0" data-testid={`spec-row-${label.toLowerCase().replace(/\s+/g, "-")}`}>
    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-ink tabular text-right">{value}</span>
  </div>
);

export const SpecTable = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6" data-testid="product-spec-table">
      <h3 className="font-head font-semibold text-lg text-ink mb-2">Full Specifications</h3>
      <Row label="Material" value={product.material.charAt(0).toUpperCase() + product.material.slice(1)} />
      <Row label="Color" value={product.color} />
      <Row label="Mil Thickness" value={`${product.thickness_mil} mil`} />
      <Row label="Texture" value={product.texture} />
      <Row label="Powder Status" value={product.powder_free ? "Powder-Free" : "Powdered"} />
      <Row label="Grade" value={product.grade} />
      <Row label="ASTM Standard" value={product.astm_standard} />
      <Row label="Gloves per Box" value={product.gloves_per_box} />
      <Row label="Boxes per Case" value={product.boxes_per_case} />
      <Row label="SKU" value={product.sku} />
    </div>
  );
};
