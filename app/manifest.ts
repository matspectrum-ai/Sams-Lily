import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "O Lírio Mágico",
    short_name: "Lírio Mágico",
    description: "Um pedido celestial de namoro e jardim interativo inspirado em Rapunzel.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0312",
    theme_color: "#0b0312",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      }
    ],
  };
}
