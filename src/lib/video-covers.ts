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
    url: "/images/capa-video-mentalidade.jpeg",
    slug: "mentalidade",
    alt: "Pilar crítico Mentalidade — da reação à escolha",
    videoEmbedUrl: embedUrl(VIDEO_IDS.mentalidade),
    videoUrl: playUrl(VIDEO_IDS.mentalidade),
  },
  "Ação": {
    url: "/images/capa-video-acao.jpeg",
    slug: "acao",
    alt: "Pilar crítico Ação — da intenção ao resultado",
    videoEmbedUrl: embedUrl(VIDEO_IDS.acao),
    videoUrl: playUrl(VIDEO_IDS.acao),
  },
  Pessoas: {
    url: "/images/capa-video-pessoas.jpeg",
    slug: "pessoas",
    alt: "Pilar crítico Pessoas — relações que desenvolvem",
    videoEmbedUrl: embedUrl(VIDEO_IDS.pessoas),
    videoUrl: playUrl(VIDEO_IDS.pessoas),
  },
  "Aprendizado Contínuo": {
    url: "/images/capa-video-aprendizado-continuo.jpeg",
    slug: "aprendizado-continuo",
    alt: "Pilar crítico Aprendizado Contínuo — da experiência à evolução",
    videoEmbedUrl: embedUrl(VIDEO_IDS["aprendizado-continuo"]),
    videoUrl: playUrl(VIDEO_IDS["aprendizado-continuo"]),
  },
};

export const DEFAULT_VIDEO_COVER: CapaVideo = {
  url: "/images/capa-video-mentalidade.jpeg",
  slug: "mentalidade",
  alt: "Análise em vídeo do Radar do Líder",
  videoEmbedUrl: embedUrl(VIDEO_IDS.mentalidade),
  videoUrl: playUrl(VIDEO_IDS.mentalidade),
};

export function encontrarCapaPorSlug(slug?: string): CapaVideo {
  if (!slug) return DEFAULT_VIDEO_COVER;
  return Object.values(VIDEO_COVERS).find((capa) => capa.slug === slug) ?? DEFAULT_VIDEO_COVER;
}
