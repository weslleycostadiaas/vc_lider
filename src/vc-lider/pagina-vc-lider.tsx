// Página de vendas do VC_Líder (copiada do projeto vclider1, rota "/").
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/vc-lider/components/button";
const logo = { url: "/imagens/logotipo-vc-lider-sem-circulo.png" };
const portrait = { url: "/imagens/juliene-abertura-luz-v2.webp" };
const thumbnail = { url: "/imagens/thumb-aprovada-lossless.webp" };
import { useOpeningReveal } from "@/vc-lider/hooks/use-opening-reveal";
import { AuthoritySection } from "@/vc-lider/components/authority-section";
import { ScrollCheckoutHeader } from "@/vc-lider/components/scroll-checkout-header";
import {
  BunnyPlayer,
  preloadBunnyApi,
  type BunnyController,
} from "@/vc-lider/components/bunny-player";
import { MentorSection } from "@/vc-lider/components/mentor-section";
import { MethodSection } from "@/vc-lider/components/method-section";
import { TestimonialsSection } from "@/vc-lider/components/testimonials-section";
import { AudienceSection } from "@/vc-lider/components/audience-section";
import { FinalSections } from "@/vc-lider/components/final-sections";
import { initLead, decorateCheckoutUrl, trackCheckoutClick } from "@/vc-lider/lib/vcl-lead";

const checkoutUrl = "https://pay.hotmart.com/T105324426S?checkoutMode=10";
const mutedVideoUrl =
  "https://player.mediadelivery.net/embed/750581/156c7e91-bde4-4ba7-b91c-3830a4f39268?autoplay=true&loop=false&muted=true&preload=true&responsive=true&playsinline=true";
const videoUrl =
  "https://player.mediadelivery.net/embed/750581/156c7e91-bde4-4ba7-b91c-3830a4f39268?autoplay=true&loop=false&muted=false&volume=100&preload=true&responsive=true&playsinline=true";

/** Muted viewport autoplay; the controller owns manual-pause intent separately. */
function VslStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<BunnyController | null>(null);
  const visibleRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [clickOnly, setClickOnly] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    const manual = reduce || saveData;
    setClickOnly(manual);
    if (!("IntersectionObserver" in window)) {
      setClickOnly(true);
      return;
    }
    const sync = () => setActive(visibleRef.current && !document.hidden);
    const near = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          void preloadBunnyApi();
          near.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    const view = new IntersectionObserver(
      (es) => {
        visibleRef.current = (es[0]?.intersectionRatio ?? 0) >= 0.45;
        if (visibleRef.current && !manual) setMounted(true);
        sync();
      },
      { threshold: 0.45 },
    );
    near.observe(el);
    view.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      near.disconnect();
      view.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const start = () => {
    setPlaying(true);
    setMounted(true);
    controllerRef.current?.unmute();
    controllerRef.current?.play();
  };

  return (
    <div className="video-stage" data-reveal ref={stageRef}>
      {mounted && (playing || !clickOnly) ? (
        <BunnyPlayer
          src={clickOnly ? videoUrl : mutedVideoUrl}
          mutedAutoplay={!clickOnly}
          title="Liderança é técnica — Aula com Juliene Salvan"
          cover={thumbnail.url}
          retryCover
          active={active}
          onController={(c) => {
            controllerRef.current = c;
          }}
        />
      ) : (
        <Button
          variant="video"
          size="natural"
          aria-label="Assista à Aula — reproduzir vídeo de Juliene Salvan"
          onPointerEnter={() => void preloadBunnyApi()}
          onFocus={() => void preloadBunnyApi()}
          onClick={start}
        >
          <img
            src={thumbnail.url}
            alt="Juliene Salvan — Liderança é técnica. Assista à Aula."
            width="1365"
            height="768"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </Button>
      )}
    </div>
  );
}

/** `topo` é renderizado acima da abertura, no mesmo fluxo de rolagem da página. */
export function PaginaVcLider({ topo }: { topo?: ReactNode }) {
  const openingRef = useOpeningReveal();
  const compositionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initLead();
    document.querySelectorAll<HTMLAnchorElement>('a[href*="pay.hotmart.com"]').forEach((a) => {
      a.href = decorateCheckoutUrl(a.href);
    });
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href*="pay.hotmart.com"]');
      if (!anchor) return;
      (anchor as HTMLAnchorElement).href = decorateCheckoutUrl((anchor as HTMLAnchorElement).href);
      trackCheckoutClick();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {topo}
      <ScrollCheckoutHeader compositionRef={compositionRef} checkoutUrl={checkoutUrl} />
      <div className="opening-preserved-surface">
        <main className="sales-opening">
          <section aria-labelledby="opening-title" ref={openingRef}>
            <header className="opening-brand">
              <img className="brand-logo" src={logo.url} alt="VC Líder" width="1827" height="384" />
            </header>
            <div className="opening-composition" ref={compositionRef}>
              <div className="opening-copy">
                <h1 id="opening-title" className="opening-title">
                  <span className="opening-sentence" data-entry="initial">
                    <span className="opening-emphasis">Você</span> tem o{" "}
                  </span>
                  <span className="opening-sentence" data-entry="initial">
                    cargo de{" "}
                  </span>
                  <span className="opening-sentence opening-emphasis" data-entry="initial">
                    líder.{" "}
                  </span>
                  <span className="opening-sentence" data-entry="initial">
                    O manual da{" "}
                  </span>
                  <span className="opening-sentence" data-entry="initial">
                    liderança{" "}
                  </span>
                  <span className="opening-sentence opening-emphasis" data-entry="initial">
                    ainda não.
                  </span>
                </h1>
              </div>
              <div className="opening-portrait">
                <figure className="opening-figure">
                  <img
                    src={portrait.url}
                    alt="Juliene Salvan, olhando em direção ao texto da abertura."
                    width="900"
                    height="1599"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <figcaption className="opening-caption">Juliene Salvan</figcaption>
                </figure>
              </div>
            </div>
            <div className="opening-ground" aria-hidden="true" />
            <p className="opening-support" data-reveal data-entry="initial">
              O método que transforma o cargo em <strong>Liderança de Verdade</strong>:<br />
              Uma metodologia construída na prática, acompanhando mais de 200 líderes.
            </p>
            <div className="lesson-band">
              <h2 className="lesson-intro" data-reveal data-entry="initial">
                Nesta aula, você vai entender como:
              </h2>
              <ol className="lesson-benefits">
                <li data-reveal data-entry="initial">
                  Delegar sem assumir o trabalho da equipe.
                </li>
                <li data-reveal data-entry="initial">
                  Dar feedbacks difíceis com clareza e firmeza.
                </li>
                <li data-reveal data-entry="initial">
                  Estabelecer limites sem perder respeito e confiança.
                </li>
              </ol>
            </div>
            <VslStage />
            <div className="checkout-block" data-reveal>
              <Button variant="checkout" size="natural" asChild>
                <a href={checkoutUrl}>Conheça o VC_Líder</a>
              </Button>
            </div>
          </section>
        </main>
      </div>
      <MentorSection />
      <AuthoritySection />
      <MethodSection />
      <TestimonialsSection />
      <AudienceSection />
      <FinalSections />
    </>
  );
}
