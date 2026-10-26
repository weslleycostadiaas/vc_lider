import { useState } from "react";
import { Button } from "@/vc-lider/components/button";
import { finalFaq } from "@/vc-lider/lib/final-offer";

export function FinalFaq() {
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]));
  const toggle = (index: number) =>
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  return (
    <div className="final-faq-list">
      {finalFaq.map(([question, answer], index) => {
        const open = expanded.has(index);
        return (
          <div className="final-faq-item" key={question} data-final-reveal>
            <h3>
              <Button
                variant="ghost"
                size="natural"
                className="final-faq-trigger"
                id={`final-faq-q-${index}`}
                aria-expanded={open}
                aria-controls={`final-faq-a-${index}`}
                onClick={() => toggle(index)}
              >
                <span>{question}</span>
                <span className="final-faq-icon" aria-hidden="true">
                  {open ? "−" : "+"}
                </span>
              </Button>
            </h3>
            <div
              className="final-faq-answer"
              data-open={open}
              id={`final-faq-a-${index}`}
              role="region"
              aria-labelledby={`final-faq-q-${index}`}
              aria-hidden={!open}
            >
              <div>
                <div className="final-faq-answer-copy">
                  {answer.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
