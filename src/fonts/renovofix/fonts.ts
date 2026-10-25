import localFont from "next/font/local";

export const renovofixPoppins = localFont({
  preload: false,
  src: [
    { path: "./Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "./Poppins-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const renovofixGeSs = localFont({
  preload: false,
  src: [
    { path: "./ArbFONTS-GE_SS_TEXT_LIGHT.otf", weight: "300", style: "normal" },
    { path: "./ArbFONTS-GE-SS-Text-Medium_26.otf", weight: "500", style: "normal" },
    { path: "./ArbFONTS-GE-SS-Text-Bold_26.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});
