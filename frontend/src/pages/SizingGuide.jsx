import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SIZE_CHART = [
  { size: "XS", hand: "6.5\" - 7\"", palm: "2.75\" - 3\"" },
  { size: "S", hand: "7\" - 7.5\"", palm: "3\" - 3.25\"" },
  { size: "M", hand: "7.5\" - 8\"", palm: "3.25\" - 3.5\"" },
  { size: "L", hand: "8\" - 8.5\"", palm: "3.5\" - 3.75\"" },
  { size: "XL", hand: "8.5\" - 9\"", palm: "3.75\" - 4\"" },
  { size: "XXL", hand: "9\" - 9.5\"", palm: "4\" - 4.25\"" },
];

export const SizingGuide = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16" data-testid="sizing-guide-page">
      <Breadcrumbs items={[{ label: "Sizing Guide" }]} />
      <h1 className="font-head text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4">Glove Sizing Guide</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Since there are no returns on opened boxes, getting the size right up front matters. Measure your hand, match it to the chart below, and buy a single box to confirm fit before committing to a case.
      </p>

      <div className="bg-cream rounded-2xl p-6 mb-10">
        <h2 className="font-head font-semibold text-lg text-ink mb-3">How to measure</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Wrap a soft tape measure around your dominant hand at its widest point (across the knuckles, excluding the thumb) for palm width.</li>
          <li>Measure from your wrist crease to the tip of your middle finger for hand length.</li>
          <li>Match both numbers to the closest size below — if you're between two sizes, size up for comfort or down for tactile precision work.</li>
        </ol>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm" data-testid="sizing-guide-table">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-3 pr-4 font-head font-semibold text-ink">Size</th>
              <th className="py-3 pr-4 font-head font-semibold text-ink">Hand Length</th>
              <th className="py-3 font-head font-semibold text-ink">Palm Width</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.map((row) => (
              <tr key={row.size} className="border-b border-border last:border-0" data-testid={`sizing-row-${row.size.toLowerCase()}`}>
                <td className="py-3 pr-4 font-semibold text-ink">{row.size}</td>
                <td className="py-3 pr-4 font-mono tabular text-muted-foreground">{row.hand}</td>
                <td className="py-3 font-mono tabular text-muted-foreground">{row.palm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-ink text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">Not sure yet? Buy a single box first and confirm fit before ordering a case.</p>
        <Button asChild className="bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold shrink-0">
          <Link to="/products">Shop by the Box</Link>
        </Button>
      </div>
    </div>
  );
};
