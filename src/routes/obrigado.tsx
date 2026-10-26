import { createFileRoute } from "@tanstack/react-router";

import vcLiderCss from "@/vc-lider/vc-lider.css?url";
import { PaginaVcLider } from "@/vc-lider/pagina-vc-lider";

export const Route = createFileRoute("/obrigado")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "stylesheet", href: vcLiderCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Inter:wght@500;600;700&family=Bodoni+Moda:ital,wght@1,700&display=swap",
      },
      { rel: "preconnect", href: "https://iframe.mediadelivery.net" },
    ],
    meta: [
      { title: "Diagnóstico enviado · VC_Líder" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Obrigado,
});

function Obrigado() {
  return (
    <PaginaVcLider
      topo={
        <section className="bg-quiz-bg px-4 py-10 text-center sm:px-8 md:py-14">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="font-display text-2xl uppercase leading-tight text-quiz-ink md:text-3xl">
              Pronto. O seu diagnóstico completo está a caminho
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-quiz-ink-muted">
              Acabei de enviar pro seu e-mail a sua análise personalizada e o vídeo em que eu
              explico o seu resultado e o próximo passo.
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-quiz-ink-muted">
              Abra agora. Se não achar em alguns minutos, olhe em promoções ou spam e marque como
              “não é spam”.
            </p>

            <h3 className="mt-10 font-display text-xl uppercase leading-tight text-quiz-ink md:text-2xl">
              Enquanto seu email não chega, conheça o VC_Líder:
            </h3>
          </div>
        </section>
      }
    />
  );
}
