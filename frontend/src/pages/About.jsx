import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuoteForm } from "@/components/QuoteForm";
import { ShieldCheck, FileText, Phone, Boxes } from "lucide-react";

const WAREHOUSE_IMAGE = "https://images.unsplash.com/photo-1672552226380-486fe900b322?crop=entropy&cs=srgb&fm=jpg&q=85";

const POINTS = [
  { icon: Boxes, title: "Wholesale import & distribution background", text: "PPE Pro Solutions grew out of an existing wholesale import and distribution operation, giving us sourcing relationships most single-brand sellers don't have." },
  { icon: FileText, title: "Full specs, every product", text: "Material, mil thickness, ASTM standard, and powder status published on every listing — not hidden behind a name and a price." },
  { icon: ShieldCheck, title: "Genuine brand-name product", text: "We stock recognized brands — Adenna, GloveWorks, SkinTx, AMMEX, Medline, and more — rather than unbranded imports." },
  { icon: Phone, title: "A real person on the phone", text: "Large orders and sourcing questions get a person, not a ticket queue. Call 561-860-7711." },
];

export const About = () => {
  return (
    <div data-testid="about-page">
      <section className="bg-ink text-white relative">
        <div className="absolute inset-0">
          <img src={WAREHOUSE_IMAGE} alt="Warehouse distribution" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16 sm:pb-24">
          <Breadcrumbs items={[{ label: "About" }]} />
          <h1 className="font-head text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Gloves are the whole business, not item 4,382</h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl">
            PPE Pro Solutions has supplied disposable gloves to professionals since 2020, working out of Florida warehousing built on a wholesale import and distribution background.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="font-head text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-5">Where we started</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We started in 2020 out of an existing wholesale import and distribution operation, supplying professionals who needed reliable access to quality disposable gloves. That background is why we can source on request through established import relationships rather than starting from zero when a customer needs something we don't currently stock.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our customer base started with tattoo and piercing studios, built largely through direct outreach — because we understood the product needs of that market early. We're now expanding to serve medical, dental, veterinary, beauty, food service, laboratory, and industrial buyers who share the same core need: a supplier that actually knows this product, not a general catalog where gloves are item number 4,382.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The market has real reasons to pay attention to glove sourcing right now — tariffs on imported medical gloves rose sharply through early 2026, pushing buyers to reconsider where their supply comes from. We built this site to make that decision easier: real specs, real pricing, real stock.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="font-head text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-8">Why buyers trust us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POINTS.map((p, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5" data-testid={`about-point-${idx}`}>
                <p.icon className="w-6 h-6 text-safety-orange mb-2.5" />
                <p className="font-semibold text-ink text-sm mb-1.5">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <QuoteForm variant="full" source="about_page" />
        </div>
      </section>
    </div>
  );
};
