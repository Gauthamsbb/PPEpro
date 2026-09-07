import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { IndustryStrip } from "@/components/IndustryStrip";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Truck, Phone, ArrowRight } from "lucide-react";

const HERO_IMAGE = "https://static.prod-images.emergentagent.com/jobs/a8df6e5f-1344-4913-b2d1-d8b4f18b5a89/images/d62b56a508392b78bd69ec9678bab8c3a375fdae70b3853c9ce9e22fa8b3e3b6.jpeg";

const TRUST_POINTS = [
  { icon: ShieldCheck, title: "Genuine brand-name product", text: "Adenna, GloveWorks, SkinTx, AMMEX, Medline and more — not unbranded imports." },
  { icon: FileText, title: "Full specs on every box", text: "Material, mil thickness, ASTM standard, and powder status published, not hidden." },
  { icon: Truck, title: "3-5 day nationwide shipping", text: "UPS shipping with expedited handling available on request." },
  { icon: Phone, title: "A real person on the phone", text: "Call 561-860-7711 for large orders — no ticket queue." },
];

export const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchProducts({}).then((data) => setFeatured(data.slice(0, 8)));
  }, []);

  return (
    <div data-testid="home-page">
      <section className="bg-ink text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-mono uppercase tracking-widest text-safety-yellow mb-4">Since 2020 · Florida Warehousing · Nationwide Shipping</p>
            <h1 className="font-head text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-5">
              Brand-name gloves.<br />Real specs. Real pricing.
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-lg mb-8">
              For tattoo studios, clinics, salons, and shop floors that buy by the box or the case. See full specs and case pricing on every product — no account, no call required.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-safety-orange hover:bg-safety-hover text-white rounded-full font-semibold h-12 px-7" data-testid="hero-shop-gloves-button">
                <Link to="/products">Shop All Gloves <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full font-semibold h-12 px-7" data-testid="hero-quote-button">
                <Link to="/quote">Get Case Pricing</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-charcoal">
              <img src={HERO_IMAGE} alt="Black nitrile glove box and glove" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <IndustryStrip />

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_POINTS.map((point, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                <point.icon className="w-7 h-7 text-safety-orange mb-3" />
                <h3 className="font-head font-semibold text-ink mb-1.5">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8 sm:mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-safety-orange mb-2">Popular right now</p>
              <h2 className="font-head text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">Reorder favorites</h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-ink hover:text-safety-orange transition-colors flex items-center gap-1" data-testid="home-view-all-link">
              View all gloves <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div className="text-white">
            <p className="text-xs font-mono uppercase tracking-widest text-safety-yellow mb-3">Buying more than a few cases?</p>
            <h2 className="font-head text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">Get case pricing for your business</h2>
            <p className="text-white/70 text-base max-w-md mb-4">
              See exactly what you'd pay in volume for the gloves your business actually uses — without a sales pitch or a minimum order. We'll follow up directly by phone or email.
            </p>
            <p className="text-white/50 text-sm">Prefer to talk it through? Call <a href="tel:5618607711" className="text-safety-yellow font-semibold">561-860-7711</a>.</p>
          </div>
          <QuoteForm variant="full" source="home_midpage" />
        </div>
      </section>
    </div>
  );
};
