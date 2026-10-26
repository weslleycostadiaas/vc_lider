import { useEffect, useRef, useState } from "react";
const video = { url: "/imagens/mentor-loop-v2.mp4" };
import { X } from "lucide-react";
const poster = { url: "/imagens/mentor-poster-v2.jpg" };
import type HlsType from "hls.js";

/**
 * Same Bunny-hosted demo (library 750581, GUID c1e99ce6-…) via its public HLS playlist.
 * A stable native <video> is prepared near the viewport so the tap can call play() synchronously,
 * keeping Safari's transient user activation (a cross-origin iframe + async postMessage loses it).
 */
export const mentorDemoHlsUrl =
  "https://vz-ebceff4e-b8a.b-cdn.net/c1e99ce6-e00e-464f-9717-a7282633e56a/playlist.m3u8";
export const mentorDemoPoster =
  "https://vz-ebceff4e-b8a.b-cdn.net/c1e99ce6-e00e-464f-9717-a7282633e56a/thumbnail_612c26b7.jpg";

export function MentorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const hlsRef = useRef<HlsType | null>(null);
  const preparedRef = useRef(false);
  const resumeDemoRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);

  /** Attaches the stream without playing: native HLS (Safari/iOS) or official hls.js (MSE browsers). */
  const prepareDemo = () => {
    const el = demoRef.current;
    if (!el || preparedRef.current) return;
    preparedRef.current = true;
    if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = mentorDemoHlsUrl;
      return;
    }
    void import("hls.js")
      .then(({ default: Hls }) => {
        if (!demoRef.current) return;
        if (!Hls.isSupported()) {
          demoRef.current.src = mentorDemoHlsUrl;
          return;
        }
        const hls = new Hls({ autoStartLoad: false, capLevelToPlayerSize: true });
        hls.loadSource(mentorDemoHlsUrl);
        hls.attachMedia(demoRef.current);
        hlsRef.current = hls;
        if (openRef.current) {
          hls.startLoad();
          void demoRef.current.play().catch(() => {});
        }
      })
      .catch(() => {
        preparedRef.current = false;
      });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const el = videoRef.current;
    if (!section || !el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      pausedRef.current = true;
      setPaused(true);
    }
    const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-mentor-reveal]"));
    const sync = () => {
      if (visibleRef.current && !pausedRef.current && !openRef.current && !document.hidden)
        el.play().catch(() => {});
      else el.pause();
      const demo = demoRef.current;
      if (demo && openRef.current) {
        if (document.hidden) {
          resumeDemoRef.current = !demo.paused;
          demo.pause();
        } else if (resumeDemoRef.current) {
          resumeDemoRef.current = false;
          void demo.play().catch(() => {});
        }
      }
    };
    if (!("IntersectionObserver" in window)) {
      setLoaded(true);
      prepareDemo();
      return;
    }
    blocks.forEach((b) => {
      if (b.getBoundingClientRect().top > window.innerHeight) b.dataset["mentorState"] = "pending";
    });
    const reveal = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && e.target instanceof HTMLElement) {
            e.target.dataset["mentorState"] = "visible";
            reveal.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -24px 0px" },
    );
    blocks.forEach((b) => b.dataset["mentorState"] === "pending" && reveal.observe(b));
    const near = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setLoaded(true);
          prepareDemo();
          near.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    const view = new IntersectionObserver(
      (es) => {
        visibleRef.current = es[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.2 },
    );
    near.observe(el);
    view.observe(el);
    const onMotion = () => {
      pausedRef.current = motion.matches;
      setPaused(motion.matches);
      sync();
    };
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", onMotion);
    el.addEventListener("loadeddata", sync);
    return () => {
      reveal.disconnect();
      near.disconnect();
      view.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", onMotion);
      el.removeEventListener("loadeddata", sync);
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (
      loaded &&
      el &&
      visibleRef.current &&
      !pausedRef.current &&
      !openRef.current &&
      !document.hidden
    )
      el.play().catch(() => {});
  }, [loaded]);

  // Scroll lock exists only while open; nothing is applied to body when closed.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = [html.style.overflow, document.body.style.overflow];
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prev[0] ?? "";
      document.body.style.overflow = prev[1] ?? "";
    };
  }, [open]);

  /** Runs entirely inside the tap: DOM made visible, audio requested and play() called synchronously. */
  const openDemo = () => {
    const demo = demoRef.current;
    openRef.current = true;
    for (const node of [overlayRef.current, modalRef.current]) {
      if (!node) continue;
      node.dataset["state"] = "open";
      node.removeAttribute("inert");
      node.removeAttribute("aria-hidden");
    }
    videoRef.current?.pause();
    setOpen(true);
    if (!demo) return;
    if (!preparedRef.current) prepareDemo();
    demo.muted = false;
    demo.volume = 1;
    hlsRef.current?.startLoad();
    const attempt = demo.play();
    demo.dataset["playResult"] = "pending";
    attempt
      ?.then(() => {
        demo.dataset["playResult"] = "fulfilled";
      })
      .catch((err: DOMException) => {
        demo.dataset["playResult"] = `rejected:${err?.name ?? "Error"}`;
        // Audible start refused by policy: start muted; native controls let the user enable sound.
        if (err?.name === "NotAllowedError" && openRef.current) {
          demo.muted = true;
          void demo.play().catch(() => {});
        }
      });
  };

  const closeDemo = () => {
    if (!openRef.current) return;
    openRef.current = false;
    resumeDemoRef.current = false;
    const demo = demoRef.current;
    if (demo) {
      demo.pause();
      try {
        demo.currentTime = 0;
      } catch {
        /* not seekable yet */
      }
    }
    setOpen(false);
    openerRef.current?.focus({ preventScroll: true });
    const el = videoRef.current;
    if (el && visibleRef.current && !pausedRef.current && !document.hidden)
      el.play().catch(() => {});
  };

  const onModalKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDemo();
      return;
    }
    if (e.key !== "Tab") return;
    const items = [closeRef.current, demoRef.current].filter(Boolean) as HTMLElement[];
    const i = items.indexOf(document.activeElement as HTMLElement);
    e.preventDefault();
    items[(i + (e.shiftKey ? -1 + items.length : 1)) % items.length]?.focus();
  };

  const toggle = () => {
    const el = videoRef.current;
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    if (!el) return;
    if (pausedRef.current) el.pause();
    else if (!openRef.current) {
      if (!loaded) setLoaded(true);
      el.play().catch(() => {});
    }
  };

  const state = open ? "open" : "closed";
  return (
    <section className="mentor-section" aria-labelledby="mentor-title" ref={sectionRef}>
      <div className="mentor-inner">
        <h2 id="mentor-title" data-mentor-reveal>
          <span>Você não precisa ter todas as respostas.</span>
          <span>Mas pode se preparar melhor para cada decisão.</span>
        </h2>
        <p className="mentor-sub" data-mentor-reveal>
          Conheça o <strong className="mentor-sub-accent">MENTOR DIGITAL</strong> do VC_Líder: apoio
          para os desafios reais de quem lidera, na hora em que você precisa.
        </p>
        <div className="mentor-video" data-mentor-reveal>
          <video
            ref={videoRef}
            src={loaded ? video.url : undefined}
            poster={poster.url}
            muted
            loop
            playsInline
            autoPlay={false}
            preload="none"
            width={960}
            height={540}
            aria-hidden="true"
          />
          <button
            ref={openerRef}
            type="button"
            className="mentor-open"
            onPointerEnter={prepareDemo}
            onFocus={prepareDemo}
            onClick={openDemo}
            aria-haspopup="dialog"
            aria-label="Assistir à demonstração do Mentor Digital"
          />
          <button type="button" className="mentor-toggle" onClick={toggle} aria-pressed={paused}>
            {paused ? "Reproduzir animação" : "Pausar animação"}
          </button>
        </div>
        <p className="mentor-body" data-mentor-reveal>
          Inteligência artificial conversacional treinada no Método M.A.P.A. e na experiência de
          mais de 20 anos de Juliene Salvan em Liderança e Gestão de Pessoas.
        </p>
        <p className="mentor-meta" data-mentor-reveal>
          <span>Disponível 24h por dia</span>
          <span aria-hidden="true">•</span>
          <span>Acesso por 6 meses</span>
        </p>
      </div>
      {/* Stable, CSS-hidden structure: no portal/dialog library side effects while closed. */}
      <div
        ref={overlayRef}
        className="mentor-modal-overlay"
        data-state={state}
        aria-hidden={!open || undefined}
        onClick={closeDemo}
      />
      <div
        ref={modalRef}
        className="mentor-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Demonstração do Mentor Digital do VC_Líder"
        data-state={state}
        aria-hidden={!open || undefined}
        inert={!open || undefined}
        onKeyDown={onModalKey}
      >
        <div className="mentor-modal-frame">
          <video
            ref={demoRef}
            className="mentor-demo-video"
            data-testid="mentor-demo"
            playsInline
            controls
            preload="metadata"
            poster={loaded ? mentorDemoPoster : undefined}
            title="Demonstração do Mentor Digital do VC_Líder"
          />
        </div>
        <button
          ref={closeRef}
          type="button"
          className="mentor-modal-close"
          aria-label="Fechar vídeo"
          onClick={closeDemo}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
