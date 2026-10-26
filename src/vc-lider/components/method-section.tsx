import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    title: "M | Mentalidade",
    description: "Reconheça suas emoções e crenças para agir com mais consciência.",
  },
  {
    title: "A | Ação",
    description: "Use ferramentas para delegar, dar feedback e transformar decisões em entregas.",
  },
  {
    title: "P | Pessoas",
    description: "Alinhe expectativas, enfrente conflitos e desenvolva sua equipe.",
  },
  {
    title: "A | Aprendizado Contínuo",
    description: "Aprenda com cada experiência e ajuste sua forma de liderar.",
  },
];

/** Sticky base offset (fixed checkout header + breathing room), per breakpoint. */
const stackBase = () => (window.innerWidth < 768 ? 80 : 88);

export function MethodSection() {
  const flywheelRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [tops, setTops] = useState<number[] | null>(null);

  // Flywheel: arm the entrance sequence only when JS + motion are available; play once on arrival.
  useEffect(() => {
    const el = flywheelRef.current;
    if (!el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    el.dataset["flywheel"] = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset["flywheel"] = "playing";
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    const onMotion = () => {
      if (motion.matches) {
        delete el.dataset["flywheel"];
        observer.disconnect();
      }
    };
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  // Sticky tabs: each panel parks right below the previous titles, measured from real header heights.
  useEffect(() => {
    const measure = () => {
      const heights = headerRefs.current.map(
        (header) => header?.getBoundingClientRect().height ?? 0,
      );
      const cumulative: number[] = [];
      heights.reduce((sum, height, index) => {
        cumulative[index] = sum;
        return sum + height;
      }, 0);
      setTops(cumulative);
    };
    measure();
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    headerRefs.current.forEach((header) => header && resize?.observe(header));
    window.addEventListener("resize", measure);
    return () => {
      resize?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="method-section" aria-labelledby="method-title">
      <div className="method-inner">
        <h2 id="method-title" className="method-title">
          <span>PARA OS DESAFIOS</span> <span>DA LIDERANÇA,</span>{" "}
          <span>
            UM <span className="method-title-accent">M.A.P.A.</span>
          </span>
        </h2>
        <div className="method-flywheel" ref={flywheelRef}>
          <svg
            viewBox="3 0 1000 1000"
            role="img"
            aria-label="Diagrama circular do Método M.A.P.A.: Mentalidade, Ação, Pessoas e Aprendizado Contínuo, conectados por setas laranja."
          >
            <defs>
              <marker
                id="method-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5.25"
                markerHeight="5.25"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className="method-flywheel-arrowhead" />
              </marker>
            </defs>
            <g className="mw-arc mw-arc-1">
              <path d="M 664.8 202.6 A 340 340 0 0 1 788.3 319.8" markerEnd="url(#method-arrow)" />
            </g>
            <g className="mw-arc mw-arc-2">
              <path d="M 797.4 664.8 A 340 340 0 0 1 680.2 788.3" markerEnd="url(#method-arrow)" />
            </g>
            <g className="mw-arc mw-arc-3">
              <path d="M 335.2 797.4 A 340 340 0 0 1 211.7 680.2" markerEnd="url(#method-arrow)" />
            </g>
            <g className="mw-arc mw-arc-4">
              <path d="M 221.5 304.9 A 340 340 0 0 1 319.8 211.7" markerEnd="url(#method-arrow)" />
            </g>
            <g className="mw-pillar mw-m">
              <text className="mw-letter" x="500" y="150" textAnchor="middle">
                M
              </text>
              <text className="mw-label" x="500" y="205" textAnchor="middle">
                Mentalidade
              </text>
              <rect className="mw-bar" x="472" y="220" width="56" height="7" />
              <text className="mw-question" x="500" y="262" textAnchor="middle">
                Como pensar e
              </text>
              <text className="mw-question" x="500" y="296" textAnchor="middle">
                me posicionar?
              </text>
            </g>
            <g className="mw-pillar mw-acao">
              <text className="mw-letter" x="830" y="450" textAnchor="middle">
                A
              </text>
              <text className="mw-label" x="830" y="502" textAnchor="middle">
                Ação
              </text>
              <rect className="mw-bar" x="802" y="518" width="56" height="7" />
              <text className="mw-question" x="830" y="560" textAnchor="middle">
                Que técnica usar?
              </text>
            </g>
            <g className="mw-pillar mw-pessoas">
              <text className="mw-letter" x="500" y="790" textAnchor="middle">
                P
              </text>
              <text className="mw-label" x="500" y="842" textAnchor="middle">
                Pessoas
              </text>
              <rect className="mw-bar" x="472" y="858" width="56" height="7" />
              <text className="mw-question" x="500" y="900" textAnchor="middle">
                Como conduzir e
              </text>
              <text className="mw-question" x="500" y="934" textAnchor="middle">
                desenvolver o time?
              </text>
            </g>
            <g className="mw-pillar mw-aprendizado">
              <text className="mw-letter" x="170" y="420" textAnchor="middle">
                A
              </text>
              <text className="mw-label" x="170" y="472" textAnchor="middle">
                Aprendizado
              </text>
              <text className="mw-label" x="170" y="514" textAnchor="middle">
                Contínuo
              </text>
              <rect className="mw-bar" x="142" y="530" width="56" height="7" />
              <text className="mw-question" x="170" y="572" textAnchor="middle">
                O que aprender
              </text>
              <text className="mw-question" x="170" y="606" textAnchor="middle">
                e ajustar?
              </text>
            </g>
            <g className="mw-center">
              <text className="mw-center-small" x="500" y="468" textAnchor="middle">
                MÉTODO
              </text>
              <text className="mw-center-big" x="500" y="560" textAnchor="middle">
                M.A.P.A.
              </text>
            </g>
          </svg>
        </div>
        <p className="method-intro">Quatro pilares para orientar sua atuação no dia a dia:</p>
        <div className="method-stack">
          {pillars.map((pillar, index) => (
            <article
              className="method-panel"
              key={pillar.title}
              style={
                tops
                  ? {
                      top: `calc(${stackBase() + (tops[index] ?? 0)}px + env(safe-area-inset-top, 0px))`,
                    }
                  : undefined
              }
            >
              <h3
                className="method-panel-title"
                ref={(element) => {
                  headerRefs.current[index] = element;
                }}
              >
                <span className="method-panel-letter">{pillar.title.charAt(0)}</span>
                <span className="method-panel-text">{pillar.title.slice(1)}</span>
              </h3>
              <div className="method-body">
                <p>{pillar.description}</p>
              </div>
            </article>
          ))}
          <div className="method-runway" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
