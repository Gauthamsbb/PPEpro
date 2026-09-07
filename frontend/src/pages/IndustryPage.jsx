import { useParams, Navigate } from "react-router-dom";
import { getIndustry } from "@/data/industries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGridSection } from "@/components/ProductGridSection";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const IndustryPage = () => {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <Navigate to="/products" replace />;

  return (
    <div data-testid={`industry-page-${slug}`}>
      <section className="bg-ink text-white relative">
        <div className="absolute inset-0">
          <img src={industry.heroImage} alt={industry.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16 sm:pb-24">
          <Breadcrumbs items={[{ to: "/products", label: "Industries" }, { label: industry.shortName }]} />
          <h1 className="font-head text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 max-w-2xl">{industry.name}</h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mb-8">{industry.tagline}</p>
          {industry.quotePrimary ? (
            <Button asChild size="lg" className="bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-12 px-7" data-testid="industry-primary-quote-cta">
              <Link to="/quote">Request Sourcing Quote</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-12 px-7" data-testid="industry-primary-shop-cta">
              <a href="#products">Shop {industry.shortName} Gloves</a>
            </Button>
          )}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{industry.description}</p>
          {industry.quotePrimary && (
            <div className="bg-cream border border-border rounded-2xl p-5">
              <p className="text-sm font-semibold text-ink mb-1">Stock is still expanding in this category</p>
              <p className="text-sm text-muted-foreground">Request a quote below and we'll confirm availability or source the right spec ahead of your need date.</p>
            </div>
          )}
        </div>
      </section>

      <div id="products">
        <ProductGridSection lockedIndustry={slug} />
      </div>

      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-head text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-6">Common questions</h2>
            <Accordion type="single" collapsible>
              {industry.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`industry-faq-${idx}`}>
                  <AccordionTrigger className="text-left font-semibold text-ink">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <QuoteForm variant="full" source={`industry_${slug}`} defaultIndustry={slug} />
        </div>
      </section>
    </div>
  );
};
