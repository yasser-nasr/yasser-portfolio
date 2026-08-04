import localFont from "next/font/local";

export const renovofixPoppins = localFont({
  src: [
    { path: "./Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const renovofixGeSs = localFont({
  src: [
    { path: "./ArbFONTS-GE_SS_TEXT_LIGHT.otf", weight: "300", style: "normal" },
    { path: "./ArbFONTS-GE-SS-Text-Medium_26.otf", weight: "500", style: "normal" },
    { path: "./ArbFONTS-GE-SS-Text-Bold_26.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});
