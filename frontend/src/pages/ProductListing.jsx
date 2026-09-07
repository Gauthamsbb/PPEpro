import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGridSection } from "@/components/ProductGridSection";

export const ProductListing = () => {
  return (
    <div data-testid="product-listing-page">
      <div className="bg-cream border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8">
          <Breadcrumbs items={[{ label: "All Gloves" }]} />
          <h1 className="font-head text-3xl sm:text-4xl font-bold tracking-tight text-ink pb-8">All Gloves</h1>
        </div>
      </div>
      <ProductGridSection />
    </div>
  );
};
