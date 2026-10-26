import { useEffect, useState, type RefObject } from "react";
import { Button } from "@/vc-lider/components/button";
const logo = { url: "/imagens/logotipo-vc-lider-sem-circulo.png" };

type ScrollCheckoutHeaderProps = {
  compositionRef: RefObject<HTMLDivElement | null>;
  checkoutUrl: string;
};

export function ScrollCheckoutHeader({ compositionRef, checkoutUrl }: ScrollCheckoutHeaderProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const composition = compositionRef.current;
      setVisible(Boolean(composition && composition.getBoundingClientRect().bottom <= 0));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [compositionRef]);

  if (!visible) return null;

  return (
    <header className="scroll-checkout-header" aria-label="VC_Líder — inscrição">
      <div className="scroll-checkout-inner">
        <img src={logo.url} alt="VC Líder" width="1827" height="384" />
        <Button variant="checkout" size="natural" asChild>
          <a href={checkoutUrl}>Conheça o VC_Líder</a>
        </Button>
      </div>
    </header>
  );
}
