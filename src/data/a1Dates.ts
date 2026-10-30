import { a1DatesImageSrc } from "@/data/a1DatesImageFormats";

export type A1DatesVisual = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const base = "/projects/a1-dates";
const visual = (filename: string, alt: string): A1DatesVisual => ({
  src: a1DatesImageSrc(`${base}/${filename}.webp`), alt, width: 1448, height: 1086,
});

// A1 artwork; the earlier names in the same development story live in a1DatesConcepts.
export const a1DatesDirections = {
  natural: {
    name: "Refined A1 Dates direction",
    introduction: "Cream surfaces, olive typography and landscape illustration give the supplied packaging a natural, grounded character.",
    identity: [
      ["Wordmark & typography", "The A1 wordmark combines serif letterforms with a palm detail. Spaced lettering and simpler product information establish a clear reading order."],
      ["Colour & material", "Olive green and warm cream sit against a textured, paper-like surface. The product window keeps the dates visible within the composition."],
      ["Illustration & detail", "Palm trees and a landscape illustration connect the box and pouch. Small icons and weight panels form a consistent supporting layer."],
    ],
    hero: visual("a1-dates-natural-800g-box-packaging-mockup", "A1 Dates cream and olive 800g carton with a product window, palm landscape illustration and serif wordmark."),
    applications: [
      visual("a1-dates-natural-carton-packaging-mockup", "A1 Dates windowed carton in cream and olive, presented with dates and palm leaves."),
      visual("a1-dates-natural-200g-pouch-packaging-mockup", "A1 Dates cream 200g stand-up pouch carrying the olive wordmark, landscape illustration and a clear product window."),
    ],
  },
  colourful: {
    name: "Early expressive A1 Dates exploration",
    introduction: "An outlined A1 wordmark, oversized product lettering and orange, pink and turquoise shapes create a more expressive packaging treatment.",
    identity: [
      ["Wordmark & typography", "An outlined turquoise A1 mark sits above bold black product lettering. Supporting copy uses a smaller, condensed treatment."],
      ["Colour & contrast", "Orange, pink and turquoise shapes sit against a cream background. Black outlines and small marks connect the different pack sizes."],
      ["Graphic elements", "Irregular shapes, scattered marks and a clear product window create a recognisable set of elements across cartons and the pouch."],
    ],
    hero: visual("a1-dates-colourful-1kg-box-packaging-mockup", "A1 Dates 1kg box with turquoise outlined lettering, orange and pink graphics, and a window showing the dates."),
    applications: [
      visual("a1-dates-colourful-medium-box-packaging-mockup", "A1 Dates medium windowed carton using orange, pink and turquoise packaging graphics."),
      visual("a1-dates-colourful-small-box-packaging-mockup", "A1 Dates small retail carton with bold product lettering and a clear rectangular product window."),
      visual("a1-dates-colourful-pouch-packaging-mockup", "A1 Dates stand-up pouch with turquoise lettering, orange and pink shapes, and a transparent product window."),
    ],
  },
} as const;

// The complete project story supersedes the initial two-exploration framing:
// expressive A1 was an early study; natural A1 is the developed design direction.
// This selection does not imply production, market testing or commercial launch.
export const a1DatesPublicationReady = true;
export const a1DatesCover = a1DatesDirections.natural.hero;

// Future supplied artwork can be added without inventing logos, fonts or dielines.
export const a1DatesIdentityVisuals: readonly A1DatesVisual[] = [];
export const a1DatesPackagingDetails: readonly A1DatesVisual[] = [];
