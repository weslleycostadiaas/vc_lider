import { useEffect, useRef } from "react";

/** CSS owns first-paint entry; the observer owns only below-fold reveals. */
export function useOpeningReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal], [data-entry]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const show = (element: HTMLElement) => {
      element.dataset["revealState"] = "visible";
      observer?.unobserve(element);
    };
    let classified = false;
    const setup = () => {
      observer?.disconnect();
      blocks.forEach((element) => element.removeAttribute("data-reveal-state"));
      if (!classified) {
        blocks.forEach((element) => {
          if (!element.hasAttribute("data-entry")) return;
          const bounds = element.getBoundingClientRect();
          if (bounds.top >= window.innerHeight || bounds.bottom <= 0)
            element.dataset["entry"] = "scroll";
        });
        classified = true;
      }
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) show(entry.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -24px 0px" },
      );
      blocks.forEach((element) => {
        // Never complete an initial animation from a hydration-time measurement.
        if (element.dataset["entry"] === "initial") return;
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) show(element);
        else {
          element.dataset["revealState"] = "pending";
          observer?.observe(element);
        }
      });
    };
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const block = event.target.closest<HTMLElement>("[data-reveal], [data-entry]");
      if (block) {
        if (block.dataset["entry"] === "initial") block.dataset["entry"] = "scroll";
        show(block);
      }
    };
    setup();
    preference.addEventListener("change", setup);
    section.addEventListener("focusin", revealFocused);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      section.removeEventListener("focusin", revealFocused);
      blocks.forEach((element) => element.removeAttribute("data-reveal-state"));
    };
  }, []);

  return ref;
}
