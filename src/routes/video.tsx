import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MessageCircle, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { encontrarCapaPorSlug } from "@/lib/video-covers";

const CTA_LINKS = {
  lideranca: "#",
  equipe:
    "https://api.whatsapp.com/send?phone=5511911777958&text=Quero%20Atendimento%20com%20especialista",
};

const COVER_URL = "https://radar.julienesalvan.com.br/images/capa-video-mentalidade.jpeg";


export const Route = createFileRoute("/video")({
  validateSearch: (search: Record<string, unknown>) => ({
    pilar: typeof search["pilar"] === "string" ? search["pilar"] : undefined,
  }),
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://iframe.mediadelivery.net" },
      { rel: "preconnect", href: "https://video.bunnycdn.com" },
      { rel: "dns-prefetch", href: "https://iframe.mediadelivery.net" },
    ],
    meta: [
      { title: "Análise em vídeo · Radar do Líder" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content:
          "Assista à análise da Juliene Salvan e descubra o próximo passo para evoluir a sua liderança.",
      },
      { property: "og:title", content: "Análise em vídeo · Radar do Líder" },
      {
        property: "og:description",
        content: "Veja a análise do seu resultado e o próximo passo para evoluir como líder.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: COVER_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: COVER_URL },
    ],
  }),
  component: VideoPage,
});

function VideoPage() {
  const { pilar } = Route.useSearch();
  const videoCover = encontrarCapaPorSlug(pilar);
  // O player é carregado já no fundo (sem autoplay) para que o primeiro clique
  // apenas dê play, sem esperar o carregamento.
  const preloadUrl = videoCover.videoEmbedUrl.replace("autoplay=true", "autoplay=false");
  const [reproduzindo, setReproduzindo] = useState(false);
  const [playerPronto, setPlayerPronto] = useState(false);
  const [demorando, setDemorando] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function ouvir(evento: MessageEvent) {
      if (typeof evento.data !== "string" || !evento.data.includes("player.js")) return;
      try {
        const dados = JSON.parse(evento.data) as { event?: string };
        if (dados.event === "play" || dados.event === "timeupdate") setPlayerPronto(true);
      } catch {
        /* mensagem fora do formato esperado */
      }
    }
    window.addEventListener("message", ouvir);
    return () => window.removeEventListener("message", ouvir);
  }, []);

  useEffect(() => {
    if (!reproduzindo) return;
    const aviso = window.setTimeout(() => setDemorando(true), 6000);
    return () => window.clearTimeout(aviso);
  }, [reproduzindo]);

  function darPlay() {
    const alvo = iframeRef.current?.contentWindow;
    if (!alvo) return;
    alvo.postMessage(
      JSON.stringify({ context: "player.js", version: "1.0", method: "play" }),
      "*",
    );
    alvo.postMessage(
      JSON.stringify({ context: "player.js", version: "1.0", method: "addEventListener", value: "play" }),
      "*",
    );
  }

  function reproduzir() {
    setReproduzindo(true);
    darPlay();
    // Reforça o play caso o player ainda esteja terminando de inicializar.
    [150, 400, 900, 1600].forEach((ms) => window.setTimeout(darPlay, ms));
    window.requestAnimationFrame(() => {
      videoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }


  return (
    <main className="min-h-screen px-5 py-8 text-center md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-lead-terracotta">
          Radar do Líder · Análise em vídeo
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-none text-lead-cream md:text-7xl">
          O próximo passo da sua liderança começa aqui
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-lead-cream-muted md:text-lg">
          Assista à análise da Juliene e veja onde concentrar a sua atenção para transformar
          consciência em evolução prática.
        </p>

        <div
          ref={videoRef}
          className="relative mx-auto mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-lg border border-lead-border bg-lead-bordo-bottom shadow-2xl"
        >
          <iframe
            ref={iframeRef}
            id="radar-video"
            title="Análise do Radar do Líder por Juliene Salvan"
            src={preloadUrl}
            onLoad={() => setPlayerPronto(true)}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          {!reproduzindo && (
            <Button
              type="button"
              onClick={reproduzir}
              aria-label="Reproduzir vídeo"
              className="group absolute inset-0 h-full w-full rounded-none bg-transparent p-0 shadow-none hover:bg-transparent"
            >
              <img
                src={videoCover.url}
                alt={videoCover.alt}
                width={1280}
                height={720}
                fetchPriority="high"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-lead-bordo-bottom/20 transition-colors group-hover:bg-lead-bordo-bottom/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 animate-[pulse_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-lead-terracotta text-lead-cream shadow-xl transition-all group-hover:scale-110 group-hover:bg-lead-terracotta-hover group-hover:animate-none md:h-24 md:w-24">
                  <Play className="ml-1 h-9 w-9 fill-current md:h-11 md:w-11" aria-hidden="true" />
                </span>
              </span>
            </Button>
          )}

          {reproduzindo && demorando && !playerPronto && (
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-lead-bordo-bottom/80 p-3">
              <Button
                asChild
                className="rounded-full bg-lead-terracotta px-6 text-lead-cream hover:bg-lead-terracotta-hover"
              >
                <a href={videoCover.videoUrl} target="_blank" rel="noreferrer">
                  Abrir o vídeo em nova aba
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            </div>
          )}

        </div>

        <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3 mx-auto">
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-full bg-lead-terracotta px-8 text-base font-semibold text-lead-cream shadow-lg hover:bg-lead-terracotta-hover"
          >
            <a href={CTA_LINKS.lideranca} target="_blank" rel="noreferrer">
              Quero aprimorar minha Liderança
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 w-full rounded-full border-quiz-success bg-transparent px-8 text-base font-semibold text-quiz-success shadow-none hover:bg-quiz-success hover:text-white"
          >
            <a href={CTA_LINKS.equipe} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              Fale com a nossa Equipe
            </a>
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-xl border-t border-lead-border pt-8 font-serif text-lg italic leading-relaxed text-lead-cream-muted">
          Clareza sobre o que precisa mudar é o começo. O próximo passo é transformar essa clareza
          em comportamento.
        </p>

        <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-lead-cream/50">
          Juliene Salvan · VC_Líder. Este diagnóstico é um ponto de partida, não uma promessa de
          resultado.
        </p>
      </div>
    </main>
  );
}
