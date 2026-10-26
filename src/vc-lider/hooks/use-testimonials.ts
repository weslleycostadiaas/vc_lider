import { useEffect, useRef } from "react";

/** Reveal on scroll for the testimonials section; content stays readable without JS. */
export function useTestimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-testimonial-reveal]"));
    let observer: IntersectionObserver | undefined;
    const show = (block: HTMLElement) => {
      block.dataset["testimonialState"] = "visible";
      observer?.unobserve(block);
    };
    const setup = () => {
      observer?.disconnect();
      if (preference.matches || !("IntersectionObserver" in window)) {
        blocks.forEach(show);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) show(entry.target);
          });
        },
        { threshold: 0.2 },
      );
      blocks.forEach((block) => {
        if (block.dataset["testimonialState"] === "visible") return;
        block.dataset["testimonialState"] = "pending";
        observer?.observe(block);
      });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      blocks.forEach((block) => block.removeAttribute("data-testimonial-state"));
    };
  }, []);

  return { ref };
}
