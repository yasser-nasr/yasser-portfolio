import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yasser Nasr",
    short_name: "Yasser Nasr",
    description: "Graphic & Multimedia Designer | Brand & Digital Designer",
    start_url: "/",
    display: "standalone",
    background_color: "#1D1D1B",
    theme_color: "#1D1D1B",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
