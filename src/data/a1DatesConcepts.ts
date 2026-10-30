import type { A1DatesVisual } from "@/data/a1Dates";
import { a1DatesImageSrc } from "@/data/a1DatesImageFormats";

const base = "/projects/a1-dates/development";
function visual(brand: string, file: string, alt: string, width = 1122, height = 1402): A1DatesVisual {
  return { src: a1DatesImageSrc(`${base}/${brand}/${file}.webp`), alt, width, height };
}

export type A1DatesConcept = {
  name: string;
  positioning: string;
  question: string;
  audience: string;
  approach: string;
  evaluation: string;
  visuals: readonly A1DatesVisual[];
  earlyVisual?: A1DatesVisual;
  refinementBoard?: A1DatesVisual;
};

export const a1DatesPremiumConcepts: readonly A1DatesConcept[] = [
  {
    name: "Tamoura",
    positioning: "Premium Saudi heritage",
    question: "How could Saudi heritage support a refined premium brand?",
    audience: "Premium food shoppers, provenance-conscious customers, Ramadan and Eid gift buyers, and corporate gifting customers.",
    approach: "Warm ivory, forest green and restrained bronze-gold details combine with a serif wordmark, a seed-and-palm emblem and layered dune illustrations. The intention was a warm, refined expression of Saudi origin.",
    evaluation: "The direction made provenance and gifting central to the presentation. In our evaluation, it also implied higher packaging expectations and a narrower price position than an everyday grocery product.",
    visuals: [
      visual("tamoura", "tamoura-premium-gift-box-concept", "Tamoura heritage concept: an open ivory and forest-green gift box with an arranged selection of dates."),
      visual("tamoura", "tamoura-clear-container-concept", "Tamoura dates in a clear container with a cream and forest-green label and palm-inspired emblem.", 1121, 1403),
      visual("tamoura", "tamoura-metal-tin-concept", "Tamoura premium metal-tin concept with cream dune illustrations and a forest-green edge."),
    ],
  },
  {
    name: "Oasira",
    positioning: "Contemporary international premium",
    question: "Could a distinctive colour system give a premium product its own identity?",
    audience: "Design-conscious premium food shoppers and specialty retail customers seeking a contemporary presentation.",
    approach: "Deep blue offered an alternative to the greens and warm neutrals explored elsewhere in the project. Controlled decoration and a consistent label system carried the identity across carton, plastic and metal formats.",
    evaluation: "The blue system gave the packaging family a distinct visual character. Applying it to different structures helped us assess identity consistency across the product family.",
    visuals: [
      visual("oasira", "oasira-blue-carton-concept", "Oasira premium carton concept with a cream upper panel, deep-blue base and a date-shaped product window."),
      visual("oasira", "oasira-blue-clear-container-concept", "Oasira clear dates container with a deep-blue lid and cream label carrying the premium identity."),
      visual("oasira", "oasira-blue-metal-tin-concept", "Oasira deep-blue metal tin with a restrained gold emblem and border."),
    ],
  },
  {
    name: "Aseela",
    positioning: "Authenticity and refined tradition",
    question: "How could authenticity and a timeless presentation communicate trust?",
    audience: "Households buying Saudi dates, premium retail customers and gift buyers who value origin and traditional quality.",
    approach: "A cream and burgundy palette, elegant typography and heritage-aware illustration explored a more established character. The same identity was carried across carton boxes, clear containers and tins.",
    evaluation: "Aseela centred credibility and continuity rather than trend-led expression. Alongside Tamoura and Oasira, it clarified the relationship between premium positioning, origin and the packaging experience.",
    visuals: [
      visual("aseela", "aseela-heritage-carton-concept", "Aseela heritage carton concept with a cream surface, burgundy base, elegant wordmark and date-shaped window."),
      visual("aseela", "aseela-clear-container-concept", "Aseela clear container with burgundy lid and cream label, exploring the heritage identity on plastic packaging.", 1086, 1448),
      visual("aseela", "aseela-metal-tin-concept", "Aseela cream and burgundy metal-tin packaging concept with restrained palm illustration.", 1086, 1448),
    ],
  },
];

export const a1DatesSnackConcepts: readonly A1DatesConcept[] = [
  {
    name: "D8",
    positioning: "Digital energy and active lifestyles",
    question: "Could dates feel like an energetic, convenient snack for younger consumers?",
    audience: "Gen Z consumers, students, gamers, young professionals and active snack buyers.",
    approach: "The short name interprets ‘date’ through the number 8. Oversized geometric lettering, electric lime, black and sport-inspired graphics explored three high-contrast treatments across flexible packs, clear containers and cartons.",
    evaluation: "The graphic-first identity was designed for visibility and a direct, energetic personality. We considered that its sporty, digital character might narrow the audience compared with a broad household food brand.",
    visuals: [
      visual("d8", "d8-three-flexible-packaging-directions", "D8 concept comparison showing three flexible-pack directions: black and lime energy, orange sport graphics, and purple playful graphics.", 1536, 1024),
      visual("d8", "d8-lime-clear-container-concept", "D8 clear dates container with a black and electric-lime label and oversized geometric logo."),
      visual("d8", "d8-lime-carton-concept", "D8 black and electric-lime retail carton with bold lettering and a product window."),
    ],
  },
  {
    name: "Date Me",
    positioning: "Social, playful and contemporary",
    question: "Could humour and a memorable name make dates more relatable?",
    audience: "Young adults, lifestyle-oriented shoppers and consumers drawn to approachable food brands with a social personality.",
    approach: "The name explored the double meaning of ‘date’. Early romantic details were followed by more mature, gender-inclusive treatments using bold typography, editorial layouts, controlled colour blocking and conversational copy.",
    evaluation: "Our creative review found that literal romantic graphics could constrain the intended personality. Refinement reduced those devices and balanced expression with a more mature, inclusive character.",
    earlyVisual: visual("date-me", "date-me-early-playful-pouch-concept", "Early Date Me pouch exploration using pink and cream, playful lettering and romantic graphic details.", 1086, 1448),
    refinementBoard: visual("date-me", "date-me-refined-packaging-directions", "Date Me refinement board showing editorial, bold-social and playful-chic flexible packaging directions.", 1448, 1086),
    visuals: [
      visual("date-me", "date-me-refined-clear-container-concept", "Refined Date Me clear-container concept with cream editorial typography and controlled pink accents."),
      visual("date-me", "date-me-refined-carton-concept", "Refined Date Me cream carton with bold typographic hierarchy, restrained pink accents and a clear product window.", 1086, 1448),
    ],
  },
  {
    name: "YUMR",
    positioning: "Flavour, appetite and indulgence",
    question: "Could appetite-focused design compete visually with conventional sweet snacks?",
    audience: "Younger mainstream snack shoppers and consumers drawn to flavour-led, expressive food packaging.",
    approach: "Heavy lettering, saturated yellow, orange and purple, playful shapes and visible product explored a flavour-first identity. Three treatments were applied across flexible packaging, clear containers and cartons.",
    evaluation: "The direction prioritised appetite and visual impact. We considered it a stronger fit for an expressive snack proposition than for the universal, everyday positioning that later shaped A1 Dates.",
    visuals: [
      visual("yumr", "yumr-yellow-flexible-packaging-concept", "YUMR yellow flexible-pack concept with heavy brown lettering, pink accents and a product window."),
      visual("yumr", "yumr-orange-clear-container-concept", "YUMR orange and chocolate-brown label on a clear dates container, exploring the energetic snack direction."),
      visual("yumr", "yumr-purple-carton-concept", "YUMR purple and pink retail carton with expressive lettering and playful flavour-led graphics."),
    ],
  },
];
