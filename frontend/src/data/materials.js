export const MATERIALS = [
  {
    slug: "nitrile",
    name: "Nitrile",
    tagline: "Latex-free, puncture resistant, the modern default for most industries.",
    description:
      "Nitrile is synthetic rubber built for chemical resistance and durability without the latex allergy risk. It's the most common material across every industry we serve — tattoo studios, medical offices, labs, and shop floors — because it holds a consistent barrier across a wide range of thicknesses, from thin exam-grade to 8-mil industrial builds.",
    characteristics: [
      { label: "Allergy risk", value: "None — latex-free" },
      { label: "Chemical resistance", value: "Strong against oils, solvents, and most chemicals" },
      { label: "Puncture resistance", value: "Higher than latex at equal thickness" },
      { label: "Fit", value: "Firmer than latex, less second-skin stretch" },
      { label: "Best for", value: "Tattoo work, medical exams, lab handling, industrial maintenance" },
    ],
    heroImage: "https://images.unsplash.com/photo-1783973190266-c5dfecc99d74?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    slug: "latex",
    name: "Latex",
    tagline: "Maximum elasticity and second-skin comfort, for clients without allergies.",
    description:
      "Natural rubber latex remains the most elastic option available, hugging the hand closer than nitrile or chloroprene and giving the highest tactile sensitivity of the three materials. The tradeoff is allergy risk — latex sensitivity is common enough that most professional settings keep a nitrile or chloroprene alternative on hand.",
    characteristics: [
      { label: "Allergy risk", value: "Present — natural rubber protein allergy" },
      { label: "Chemical resistance", value: "Moderate — degrades faster with solvent exposure" },
      { label: "Puncture resistance", value: "Good, softer failure mode than nitrile" },
      { label: "Fit", value: "Highest stretch and second-skin feel of the three materials" },
      { label: "Best for", value: "Beauty and personal care, general exam use, budget-conscious reordering" },
    ],
    heroImage: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    slug: "chloroprene",
    name: "Chloroprene",
    tagline: "Latex-like stretch with a nitrile-grade chemical barrier — the allergy-safe middle ground.",
    description:
      "Chloroprene (sometimes labeled neoprene) is a synthetic alternative that gets closer to latex's stretch and comfort while keeping nitrile's chemical resistance and latex-free safety profile. It costs more per box than standard nitrile or latex, which is why it shows up most in clinical, lab, and premium tattoo use where the tradeoff pays for itself.",
    characteristics: [
      { label: "Allergy risk", value: "None — latex-free" },
      { label: "Chemical resistance", value: "Strong, comparable to nitrile" },
      { label: "Puncture resistance", value: "Good, softer feel than nitrile" },
      { label: "Fit", value: "Closer to latex stretch than nitrile" },
      { label: "Best for", value: "Latex-sensitive clients who want stretch, clinical and lab settings, premium tattoo stations" },
    ],
    heroImage: "https://images.unsplash.com/photo-1669101283561-642d16d924ba?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export const getMaterial = (slug) => MATERIALS.find((m) => m.slug === slug);
