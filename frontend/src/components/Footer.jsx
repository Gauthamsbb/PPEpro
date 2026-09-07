import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { INDUSTRIES } from "@/data/industries";
import { MATERIALS } from "@/data/materials";
import { QuoteForm } from "@/components/QuoteForm";

export const Footer = () => {
  return (
    <footer className="bg-ink text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 pb-14 border-b border-white/10">
          <div>
            <h3 className="font-head text-2xl sm:text-3xl font-bold tracking-tight mb-3">Get case pricing for your business</h3>
            <p className="text-white/60 text-sm sm:text-base max-w-md mb-6">
              See exactly what you'd pay in volume for the gloves your business actually uses. No sales pitch, no minimum order.
            </p>
          </div>
          <QuoteForm variant="compact" source="footer" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-14">
          <div>
            <p className="font-head font-semibold text-sm uppercase tracking-widest text-safety-yellow mb-4">By Industry</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              {INDUSTRIES.map((i) => (
                <li key={i.slug}>
                  <Link to={`/industries/${i.slug}`} className="hover:text-white transition-colors" data-testid={`footer-industry-link-${i.slug}`}>
                    {i.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-head font-semibold text-sm uppercase tracking-widest text-safety-yellow mb-4">By Material</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              {MATERIALS.map((m) => (
                <li key={m.slug}>
                  <Link to={`/materials/${m.slug}`} className="hover:text-white transition-colors">{m.name}</Link>
                </li>
              ))}
              <li><Link to="/products" className="hover:text-white transition-colors">All Gloves</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-head font-semibold text-sm uppercase tracking-widest text-safety-yellow mb-4">Company</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/quote" className="hover:text-white transition-colors">Bulk Quote Request</Link></li>
              <li><Link to="/sizing-guide" className="hover:text-white transition-colors">Sizing Guide</Link></li>
              <li><Link to="/glove-guide" className="hover:text-white transition-colors">Glove Selection Guide</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-head font-semibold text-sm uppercase tracking-widest text-safety-yellow mb-4">Policies</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/policies/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/policies/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/policies/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/policies/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/policies/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-10">
          <div>
            <p className="font-head font-bold text-lg mb-2">PPE PRO SOLUTIONS</p>
            <p className="text-white/50 text-xs max-w-sm">
              Supplying professionals with brand-name disposable gloves since 2020. Florida warehousing, nationwide UPS shipping.
            </p>
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <a href="tel:5618607711" className="flex items-center gap-2 hover:text-white transition-colors" data-testid="footer-phone-link">
              <Phone className="w-4 h-4 text-safety-yellow" /> 561-860-7711
            </a>
            <a href="mailto:orders@ppeprosolutions.com" className="flex items-center gap-2 hover:text-white transition-colors" data-testid="footer-email-link">
              <Mail className="w-4 h-4 text-safety-yellow" /> orders@ppeprosolutions.com
            </a>
            <p className="flex items-center gap-2 text-white/50">
              <MapPin className="w-4 h-4 text-safety-yellow" /> Florida, USA — Nationwide Shipping
            </p>
          </div>
        </div>
        <p className="text-white/30 text-xs mt-10">© {new Date().getFullYear()} PPE Pro Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};
