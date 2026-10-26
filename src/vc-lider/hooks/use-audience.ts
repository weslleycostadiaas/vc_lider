import { useEffect, useRef } from "react";

/** Reveal on scroll for the audience section; content stays readable without JS. */
export function useAudience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-audience-reveal]"));
    let observer: IntersectionObserver | undefined;
    const show = (block: HTMLElement) => {
      block.dataset["audienceState"] = "visible";
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
        if (block.dataset["audienceState"] === "visible") return;
        block.dataset["audienceState"] = "pending";
        observer?.observe(block);
      });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      blocks.forEach((block) => block.removeAttribute("data-audience-state"));
    };
  }, []);

  return { ref };
}
