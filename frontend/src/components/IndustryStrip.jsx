import { Link } from "react-router-dom";
import { INDUSTRIES } from "@/data/industries";
import { motion } from "framer-motion";

export const IndustryStrip = () => {
  return (
    <section className="bg-cream py-14 sm:py-20" data-testid="industry-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-safety-orange mb-2">Start here</p>
          <h2 className="font-head text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">What's your industry?</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INDUSTRIES.map((ind, idx) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <Link
                to={`/industries/${ind.slug}`}
                className="group block bg-white border border-border rounded-2xl p-4 sm:p-5 h-full hover:border-safety-orange transition-colors"
                data-testid={`industry-strip-card-${ind.slug}`}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-charcoal">
                  <img src={ind.heroImage} alt={ind.shortName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <p className="font-head font-semibold text-sm text-ink leading-tight">{ind.shortName}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
