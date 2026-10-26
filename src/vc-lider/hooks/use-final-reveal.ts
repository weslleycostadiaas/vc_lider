import { useEffect, useRef } from "react";

export function useFinalReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-final-reveal]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const show = (block: HTMLElement) => {
      block.dataset["finalState"] = "visible";
      observer?.unobserve(block);
    };
    const setup = () => {
      observer?.disconnect();
      if (preference.matches || !("IntersectionObserver" in window)) {
        blocks.forEach(show);
        return;
      }
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) show(entry.target);
          }),
        { threshold: 0, rootMargin: "0px 0px -32px 0px" },
      );
      blocks.forEach((block) => {
        if (block.dataset["finalState"] === "visible") return;
        block.dataset["finalState"] = "pending";
        observer?.observe(block);
      });
    };
    const focus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        const block = event.target.closest<HTMLElement>("[data-final-reveal]");
        if (block) show(block);
      }
    };
    setup();
    root.addEventListener("focusin", focus);
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      root.removeEventListener("focusin", focus);
      preference.removeEventListener("change", setup);
      blocks.forEach((block) => block.removeAttribute("data-final-state"));
    };
  }, []);
  return ref;
}
