import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchProductsMeta } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SlidersHorizontal, PackageOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const ProductGridSection = ({ lockedIndustry, lockedMaterial }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    material: lockedMaterial || "",
    size: "",
    color: "",
    brand: "",
    grade: "",
    texture: "",
  });

  useEffect(() => {
    fetchProductsMeta().then(setMeta).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { ...filters, sort };
    if (lockedIndustry) params.industry = lockedIndustry;
    if (lockedMaterial) params.material = lockedMaterial;
    const searchQuery = searchParams.get("search");
    if (searchQuery) params.search = searchQuery;
    Object.keys(params).forEach((k) => !params[k] && delete params[k]);
    fetchProducts(params)
      .then(setProducts)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, lockedIndustry, lockedMaterial, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 gap-4">
        <p className="text-sm text-muted-foreground" data-testid="product-grid-count">{loading ? "Loading..." : `${products.length} products`}</p>
        <div className="flex items-center gap-2">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden rounded-full" data-testid="mobile-filter-trigger">
                <SlidersHorizontal className="w-4 h-4 mr-1.5" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-4">
                <FilterSidebar filters={filters} setFilters={setFilters} meta={meta} mobile />
              </div>
            </SheetContent>
          </Sheet>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44 rounded-full" data-testid="product-sort-select">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="thickness_asc">Thickness: Low to High</SelectItem>
              <SelectItem value="thickness_desc">Thickness: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} meta={meta} />
        </div>
        <div>
          {!loading && products.length === 0 ? (
            <div className="text-center py-20" data-testid="product-grid-empty">
              <PackageOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No products match those filters. Try clearing a few, or request a quote and we'll source it.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6" data-testid="product-grid">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
