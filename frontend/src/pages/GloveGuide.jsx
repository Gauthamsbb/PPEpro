import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { MATERIALS } from "@/data/materials";
import { INDUSTRIES } from "@/data/industries";

export const GloveGuide = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16" data-testid="glove-guide-page">
      <Breadcrumbs items={[{ label: "Glove Selection Guide" }]} />
      <h1 className="font-head text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4">Glove Selection Guide</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Choosing the right glove comes down to three questions: what material fits your allergy and chemical needs, what thickness matches your task, and what texture keeps your grip where you need it. Here's how to think through each one.

      </p>

      <h2 className="font-head text-2xl font-semibold text-ink mb-4">1. Pick a material</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {MATERIALS.map((m) => (
          <Link key={m.slug} to={`/materials/${m.slug}`} className="block bg-cream rounded-2xl p-5 hover:bg-cream/70 transition-colors" data-testid={`glove-guide-material-${m.slug}`}>
            <p className="font-head font-semibold text-ink mb-1.5">{m.name}</p>
            <p className="text-sm text-muted-foreground">{m.tagline}</p>
          </Link>
        ))}
      </div>

      <h2 className="font-head text-2xl font-semibold text-ink mb-4">2. Match thickness to your task</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-3 pr-4 font-head font-semibold text-ink">Thickness</th>
              <th className="py-3 pr-4 font-head font-semibold text-ink">Best for</th>
              <th className="py-3 font-head font-semibold text-ink">Tradeoff</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 pr-4 font-mono tabular">3-4 mil</td>
              <td className="py-3 pr-4">Fine detail work, tattoo linework, exam procedures</td>
              <td className="py-3">Less puncture resistance, needs more frequent changes</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 pr-4 font-mono tabular">5-6 mil</td>
              <td className="py-3 pr-4">Everyday exam and tattoo use, general clinical work</td>
              <td className="py-3">Balanced — the most common thickness stocked</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono tabular">6-8 mil</td>
              <td className="py-3 pr-4">Industrial maintenance, chemical handling, heavy cleanup</td>
              <td className="py-3">Less tactile sensitivity, higher cost per box</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-head text-2xl font-semibold text-ink mb-4">3. Choose your texture</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-cream rounded-2xl p-5">
          <p className="font-semibold text-ink mb-1.5 text-sm">Smooth</p>
          <p className="text-sm text-muted-foreground">Best tactile feel, lower grip when wet — good for dry precision work.</p>
        </div>
        <div className="bg-cream rounded-2xl p-5">
          <p className="font-semibold text-ink mb-1.5 text-sm">Fingertip Textured</p>
          <p className="text-sm text-muted-foreground">Grip where you need it most without sacrificing feel across the palm.</p>
        </div>
        <div className="bg-cream rounded-2xl p-5">
          <p className="font-semibold text-ink mb-1.5 text-sm">Diamond-Grip Textured</p>
          <p className="text-sm text-muted-foreground">Maximum grip in wet or oily conditions — the standard for industrial use.</p>
        </div>
      </div>

      <h2 className="font-head text-2xl font-semibold text-ink mb-4">Shop by your industry</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INDUSTRIES.map((i) => (
          <Link key={i.slug} to={`/industries/${i.slug}`} className="block border border-border rounded-xl px-4 py-3 text-sm font-medium text-ink hover:border-safety-orange transition-colors">
            {i.shortName}
          </Link>
        ))}
      </div>
    </div>
  );
};
