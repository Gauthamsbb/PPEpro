import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, Clock, Ban } from "lucide-react";

const REASONS = [
  { icon: ShieldCheck, title: "No account, no minimum", text: "See real volume pricing without logging in or committing to a minimum order." },
  { icon: Clock, title: "We follow up directly", text: "A real person calls or emails with your pricing — no automated sequence, no ticket queue." },
  { icon: Ban, title: "No sales pitch", text: "You'll get numbers for the gloves you asked about, not an upsell script." },
];

export const QuoteRequest = () => {
  return (
    <div className="bg-cream" data-testid="quote-request-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
        <Breadcrumbs items={[{ label: "Bulk Pricing & Quote Request" }]} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div>
            <h1 className="font-head text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4">Get case pricing for your business</h1>
            <p className="text-muted-foreground text-base mb-8 max-w-md">
              See exactly what you'd pay in volume for the gloves your business actually uses, without a sales pitch or a minimum order. This also works as a sourcing request for products not currently in stock.
            </p>
            <div className="space-y-5">
              {REASONS.map((r, idx) => (
                <div key={idx} className="flex gap-3">
                  <r.icon className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink text-sm">{r.title}</p>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              Prefer to talk it through? Call <a href="tel:5618607711" className="text-safety-orange font-semibold">561-860-7711</a>.
            </p>
          </div>
          <QuoteForm variant="full" source="quote_page" />
        </div>
      </div>
    </div>
  );
};
