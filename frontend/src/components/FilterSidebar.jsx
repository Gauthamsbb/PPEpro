import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const MATERIALS = ["nitrile", "latex", "chloroprene"];

const Chip = ({ active, onClick, children, testId }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
      active ? "bg-safety-orange text-white border-safety-orange" : "bg-white text-ink border-border hover:border-safety-orange"
    }`}
    data-testid={testId}
  >
    {children}
  </button>
);

export const FilterSidebar = ({ filters, setFilters, meta, mobile = false }) => {
  const toggle = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  };

  const clearAll = () => setFilters({});
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={mobile ? "" : "bg-white rounded-2xl border border-border p-5"} data-testid="filter-sidebar">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-head font-semibold text-ink">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-safety-orange font-medium flex items-center gap-1" data-testid="filter-clear-all">
            <X className="w-3 h-3" /> Clear ({activeCount})
          </button>
        )}
      </div>
      <Accordion type="multiple" defaultValue={["material", "size", "color"]} className="space-y-1">
        <AccordionItem value="material">
          <AccordionTrigger className="text-sm font-semibold text-ink" data-testid="filter-section-material">Material</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {MATERIALS.map((m) => (
                <Chip key={m} active={filters.material === m} onClick={() => toggle("material", m)} testId={`filter-material-${m}`}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Chip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-semibold text-ink" data-testid="filter-section-size">Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {SIZES.map((s) => (
                <Chip key={s} active={filters.size === s} onClick={() => toggle("size", s)} testId={`filter-size-${s}`}>
                  {s}
                </Chip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-semibold text-ink" data-testid="filter-section-color">Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {(meta.colors || []).map((c) => (
                <Chip key={c} active={filters.color === c} onClick={() => toggle("color", c)} testId={`filter-color-${c.toLowerCase().replace(/\s+/g, "-")}`}>
                  {c}
                </Chip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-semibold text-ink" data-testid="filter-section-brand">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {(meta.brands || []).map((b) => (
                <Chip key={b} active={filters.brand === b} onClick={() => toggle("brand", b)} testId={`filter-brand-${b.toLowerCase().replace(/\s+/g, "-")}`}>
                  {b}
                </Chip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="grade">
          <AccordionTrigger className="text-sm font-semibold text-ink" data-testid="filter-section-grade">Grade</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {(meta.grades || []).map((g) => (
                <Chip key={g} active={filters.grade === g} onClick={() => toggle("grade", g)} testId={`filter-grade-${g.toLowerCase().replace(/\s+/g, "-")}`}>
                  {g}
                </Chip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="texture">
          <AccordionTrigger className="text-sm font-semibold text-ink" data-testid="filter-section-texture">Texture</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1">
              {(meta.textures || []).map((t) => (
                <Chip key={t} active={filters.texture === t} onClick={() => toggle("texture", t)} testId={`filter-texture-${t.toLowerCase().replace(/\s+/g, "-")}`}>
                  {t}
                </Chip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
