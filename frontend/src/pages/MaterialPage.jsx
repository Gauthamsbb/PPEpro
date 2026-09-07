import { useParams, Navigate } from "react-router-dom";
import { getMaterial } from "@/data/materials";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGridSection } from "@/components/ProductGridSection";

export const MaterialPage = () => {
  const { slug } = useParams();
  const material = getMaterial(slug);
  if (!material) return <Navigate to="/products" replace />;

  return (
    <div data-testid={`material-page-${slug}`}>
      <section className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-14">
          <Breadcrumbs items={[{ to: "/products", label: "Materials" }, { label: material.name }]} />
          <h1 className="font-head text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{material.name} Gloves</h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mb-6">{material.tagline}</p>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl">{material.description}</p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="font-head text-xl sm:text-2xl font-semibold text-ink mb-6">{material.name} at a Glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {material.characteristics.map((c, idx) => (
              <div key={idx} className="bg-cream rounded-xl p-4" data-testid={`material-characteristic-${idx}`}>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5">{c.label}</p>
                <p className="text-sm font-semibold text-ink">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductGridSection lockedMaterial={slug} />
    </div>
  );
};
