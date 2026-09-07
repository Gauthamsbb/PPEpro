export const INDUSTRIES = [
  {
    slug: "tattoo-body-art",
    name: "Tattoo & Body Art",
    shortName: "Tattoo & Body Art",
    tagline: "Black nitrile that holds grip and doesn't split mid-session.",
    description:
      "Tattoo and piercing work runs on tactile feel, wet hands, and long sessions. This selection leans on true black tones that don't wash out ink under studio light, textured palms that grip through vaseline and ink, and thickness options from thin detail work up to heavier boxes for four-hour sittings.",
    heroImage: "https://images.unsplash.com/photo-1783973190266-c5dfecc99d74?crop=entropy&cs=srgb&fm=jpg&q=85",
    filterMaterial: null,
    quotePrimary: false,
    faqs: [
      { q: "Will black nitrile hide ink transfer on my station?", a: "Yes — true black tone reads clean under studio lighting and doesn't tint or discolor next to fresh ink." },
      { q: "What thickness for long sessions?", a: "5-6 mil holds up best through four-hour sittings without tearing. 4 mil is better for fine detail linework where feel matters more." },
    ],
  },
  {
    slug: "beauty-personal-care",
    name: "Beauty & Personal Care",
    shortName: "Beauty & Personal Care",
    tagline: "Lighter-weight gloves for color, wax, and skincare work.",
    description:
      "Nail techs, estheticians, and colorists need gloves that don't feel heavy during repetitive close work, and that resist the chemicals found in dyes, acetone, and peels. Latex and nitrile options here are chosen for feel first, with sizing that fits smaller hands well.",
    heroImage: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?crop=entropy&cs=srgb&fm=jpg&q=85",
    filterMaterial: null,
    quotePrimary: false,
    faqs: [
      { q: "Will nitrile hold up to acetone and nail chemicals?", a: "Nitrile resists most solvents used in nail services better than latex, though frequent acetone exposure will still degrade any glove over time — change often." },
      { q: "Do you carry true extra-small sizes?", a: "Yes — several lines here run true XS and S rather than sizing up from Medium." },
    ],
  },
  {
    slug: "medical-healthcare",
    name: "Medical & Healthcare",
    shortName: "Medical & Healthcare",
    tagline: "Exam-grade nitrile, latex, and chloroprene with full spec documentation.",
    description:
      "Dental, medical, and EMS accounts need documented specs for compliance files, real sizing options across a multi-provider office, and dependable stock when a usual order runs late. Every box on this page lists its ASTM standard, mil thickness, and powder status for your records.",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=srgb&fm=jpg&q=85",
    filterMaterial: null,
    quotePrimary: false,
    faqs: [
      { q: "Can I get a spec sheet for compliance files?", a: "Every product page lists material, mil thickness, ASTM standard, and powder status — printable for your documentation." },
      { q: "Do you support purchase orders or invoicing?", a: "Yes — call or request a quote and we'll set up invoicing for your practice." },
    ],
  },
  {
    slug: "food-service-processing",
    name: "Food Service & Processing",
    shortName: "Food Service",
    tagline: "FDA-compliant, high-visibility gloves for prep and processing lines.",
    description:
      "Food-contact work calls for gloves that meet FDA material standards and show up visually if one tears near product. Stock in this category is still growing as we build out food-service supply — request a quote and we'll source volume ahead of your need date.",
    heroImage: "https://images.unsplash.com/photo-1617448570768-09ae7a069496?crop=entropy&cs=srgb&fm=jpg&q=85",
    filterMaterial: null,
    quotePrimary: true,
    faqs: [
      { q: "Are these approved for food contact?", a: "Yes — food-service listings meet FDA 21 CFR food-contact material standards." },
      { q: "Stock looks limited here — what should I do?", a: "Request a quote. This is one of the categories we actively source for as accounts grow, and we'll confirm lead time before you commit." },
    ],
  },
  {
    slug: "laboratory-cleanroom",
    name: "Laboratory & Cleanroom",
    shortName: "Laboratory & Cleanroom",
    tagline: "Chemo-tested and chemical-resistant nitrile and chloroprene, sourced on request.",
    description:
      "Lab and cleanroom work often needs gloves rated for specific chemical exposure — chemo-tested nitrile, low-extractable chloroprene, precision-fit options. Current stock is limited in this category; a quote request lets us confirm availability or source the right spec for your protocol.",
    heroImage: "https://images.unsplash.com/photo-1669101283561-642d16d924ba?crop=entropy&cs=srgb&fm=jpg&q=85",
    filterMaterial: null,
    quotePrimary: true,
    faqs: [
      { q: "Do you carry certified cleanroom gloves in stock?", a: "Certified cleanroom and chemical-resistant gloves can be sourced by request but are not currently held in standing stock — request a quote and we'll confirm timing." },
      { q: "What does chemo-tested mean?", a: "It means the glove is rated to ASTM D6978 for resistance to chemotherapy drug permeation, relevant for oncology and hazardous-drug handling." },
    ],
  },
  {
    slug: "industrial-automotive",
    name: "Industrial & Automotive",
    shortName: "Industrial & Automotive",
    tagline: "Heavy-duty 6-8 mil nitrile and chloroprene for oil, solvent, and rough handling.",
    description:
      "Shop floors and maintenance bays need thicker walls and stronger grip than exam-grade gloves offer. This category runs heavier — 6 to 8 mil, diamond-textured, built for degreasers, fuels, and repeated abrasion. Stock is still expanding here — request a quote for larger volume.",
    heroImage: "https://images.unsplash.com/photo-1676018366904-c083ed678e60?crop=entropy&cs=srgb&fm=jpg&q=85",
    filterMaterial: null,
    quotePrimary: true,
    faqs: [
      { q: "Will these hold up to oil and solvents?", a: "Nitrile and chloroprene both resist common oils, fuels, and solvents better than latex. The 8-mil AMMEX line is our heaviest chemical barrier." },
      { q: "What sizes are stocked for industrial use?", a: "Mid to large sizing (M-XXL) is the typical stock range for this category, matching common industrial hand sizing." },
    ],
  },
];

export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);
