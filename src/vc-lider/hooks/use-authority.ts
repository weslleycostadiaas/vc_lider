import { useEffect, useRef, useState } from "react";

export const authorityTotals = [20, 200, 100];

/** SSR keeps final values readable; animation is a progressive enhancement. */
export function useAuthority() {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState(authorityTotals);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stats = section.querySelector(".authority-stats");
    const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-authority-reveal]"));
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let started = false;
    const show = (block: HTMLElement) => {
      block.dataset["authorityState"] = "visible";
      observer?.unobserve(block);
    };
    const count = () => {
      if (started) return;
      started = true;
      if (stats) observer?.unobserve(stats);
      let start: number | undefined;
      const tick = (time: number) => {
        if (start === undefined) start = time;
        const progress = Math.min((time - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValues(authorityTotals.map((total) => Math.round(total * eased)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const setup = () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      if (preference.matches || !("IntersectionObserver" in window)) {
        blocks.forEach(show);
        setValues(authorityTotals);
        started = true;
        return;
      }
      if (!started) setValues(authorityTotals.map(() => 0));
      else setValues(authorityTotals);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (entry.target === stats) count();
            else if (entry.target instanceof HTMLElement) show(entry.target);
          });
        },
        { threshold: 0.2 },
      );
      blocks.forEach((block) => {
        if (block.dataset["authorityState"] === "visible") return;
        block.dataset["authorityState"] = "pending";
        observer?.observe(block);
      });
      if (stats && !started) observer.observe(stats);
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", setup);
      blocks.forEach((block) => block.removeAttribute("data-authority-state"));
    };
  }, []);

  return { ref, values };
}
