import capaAcao from "@/assets/capa-video-acao.jpeg.asset.json";
import capaAprendizado from "@/assets/capa-video-aprendizado-continuo.jpeg.asset.json";
import capaMentalidade from "@/assets/capa-video-mentalidade.jpeg.asset.json";
import capaPessoas from "@/assets/capa-video-pessoas.jpeg.asset.json";
import capaPadrao from "@/assets/radar-video-cover.jpg.asset.json";
import type { Pilar } from "@/lib/radar";

const BIBLIOTECA = "750581";

const VIDEO_IDS = {
  mentalidade: "794cd071-4c2a-401f-9a21-584249bce12c",
  acao: "ad9a4953-08c2-47ef-9a7e-863526ad4455",
  pessoas: "bb0ca0e6-6009-46d8-beb8-cda38b65f53d",
  "aprendizado-continuo": "188ee968-fc57-4c47-935e-7a87132ba387",
} as const;

function embedUrl(id: string) {
  return `https://iframe.mediadelivery.net/embed/${BIBLIOTECA}/${id}?autoplay=true&preload=true&responsive=true`;
}

function playUrl(id: string) {
  return `https://player.mediadelivery.net/play/${BIBLIOTECA}/${id}`;
}

export type CapaVideo = {
  url: string;
  slug: string;
  alt: string;
  videoEmbedUrl: string;
  videoUrl: string;
};

export const VIDEO_COVERS: Record<Pilar, CapaVideo> = {
  Mentalidade: {
    url: capaMentalidade.url,
    slug: "mentalidade",
    alt: "Pilar crítico Mentalidade — da reação à escolha",
    videoEmbedUrl: embedUrl(VIDEO_IDS.mentalidade),
    videoUrl: playUrl(VIDEO_IDS.mentalidade),
  },
  "Ação": {
    url: capaAcao.url,
    slug: "acao",
    alt: "Pilar crítico Ação — da intenção ao resultado",
    videoEmbedUrl: embedUrl(VIDEO_IDS.acao),
    videoUrl: playUrl(VIDEO_IDS.acao),
  },
  Pessoas: {
    url: capaPessoas.url,
    slug: "pessoas",
    alt: "Pilar crítico Pessoas — relações que desenvolvem",
    videoEmbedUrl: embedUrl(VIDEO_IDS.pessoas),
    videoUrl: playUrl(VIDEO_IDS.pessoas),
  },
  "Aprendizado Contínuo": {
    url: capaAprendizado.url,
    slug: "aprendizado-continuo",
    alt: "Pilar crítico Aprendizado Contínuo — da experiência à evolução",
    videoEmbedUrl: embedUrl(VIDEO_IDS["aprendizado-continuo"]),
    videoUrl: playUrl(VIDEO_IDS["aprendizado-continuo"]),
  },
};

export const DEFAULT_VIDEO_COVER: CapaVideo = {
  url: capaPadrao.url,
  slug: "mentalidade",
  alt: "Análise em vídeo do Radar do Líder",
  videoEmbedUrl: embedUrl(VIDEO_IDS.mentalidade),
  videoUrl: playUrl(VIDEO_IDS.mentalidade),
};

export function encontrarCapaPorSlug(slug?: string): CapaVideo {
  if (!slug) return DEFAULT_VIDEO_COVER;
  return Object.values(VIDEO_COVERS).find((capa) => capa.slug === slug) ?? DEFAULT_VIDEO_COVER;
}
