import { useCallback, useEffect, useRef, useState } from "react";
const depo1 = { url: "/imagens/depoimento-1.webp" };
const depo2 = { url: "/imagens/depoimento-2.webp" };
const depo3 = { url: "/imagens/depoimento-3.webp" };
const depo4 = { url: "/imagens/depoimento-4.webp" };
import { useTestimonials } from "@/vc-lider/hooks/use-testimonials";

const prints = [
  {
    asset: depo1,
    alt: "Print de mensagem de aluna: já conhecia a Juliene como líder; o curso esclareceu sua atuação ao liderar um time de 15 pessoas.",
  },
  {
    asset: depo2,
    alt: "Print de mensagem de aluna: aplicou o conteúdo das primeiras aulas e usou o mentor digital para se preparar para uma reunião.",
  },
  {
    asset: depo3,
    alt: "Print de mensagem de aluna: aplicou técnicas, organizou rituais de gestão e conduziu conversas com a ajuda do Mentor.",
  },
  {
    asset: depo4,
    alt: "Print de mensagem de aluna promovida a coordenadora: o radar e o mentor a convenceram; usa o mentor todos os dias.",
  },
];

/** Minimal accessible lightbox: mounted only while open, scroll lock only while open. */
function TestimonialLightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const print = prints[index]!;

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button, [href], img[tabindex]"),
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="testimonial-lightbox" role="presentation" onClick={onClose}>
      <div
        className="testimonial-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Depoimento ${index + 1} ampliado`}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="testimonial-lightbox-close"
          aria-label="Fechar depoimento ampliado"
          ref={closeRef}
          onClick={onClose}
        >
          ×
        </button>
        <div className="testimonial-lightbox-scroll">
          <img src={print.asset.url} alt={print.alt} width="1696" height="2528" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { ref } = useTestimonials();
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title" ref={ref}>
      <div className="testimonials-inner">
        <h2 id="testimonials-title" className="testimonials-title" data-testimonial-reveal>
          <span>Aprenda hoje.</span> <span>Aplique na próxima conversa,</span>{" "}
          <span>decisão ou desafio.</span>
        </h2>
        <p className="testimonials-sub" data-testimonial-reveal>
          Mais clareza sobre o que fazer e como agir nas situações que você enfrenta todos os dias.
        </p>
        <p className="testimonials-support" data-testimonial-reveal>
          Veja o que mudou na prática para quem já começou.
        </p>
        <ol className="testimonials-cards" aria-label="Depoimentos de alunos do VC_Líder">
          {prints.map((print, index) => (
            <li className="testimonial-card" key={print.asset.url}>
              <button
                type="button"
                className="testimonial-card-button"
                aria-label={`Ampliar depoimento ${index + 1}`}
                onClick={() => setOpen(index)}
              >
                <img
                  data-testimonial-reveal
                  src={print.asset.url}
                  alt={print.alt}
                  width="1696"
                  height="2528"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </li>
          ))}
        </ol>
      </div>
      {open !== null && <TestimonialLightbox index={open} onClose={close} />}
    </section>
  );
}
