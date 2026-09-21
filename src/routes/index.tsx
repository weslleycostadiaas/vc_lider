import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ShieldCheck, Target } from "lucide-react";
import { useEffect } from "react";

import julieneAsset from "../assets/juliene-salvan.webp.asset.json";
import { salvarRastreioDaUrl } from "../lib/rastreio";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Radar do Líder · Diagnóstico gratuito de liderança" },
      {
        name: "description",
        content:
          "Em 3 minutos, o Radar do Líder mostra onde a sua liderança está travando e qual é o primeiro passo para evoluir.",
      },
      { property: "og:title", content: "Radar do Líder · Diagnóstico gratuito de liderança" },
      {
        property: "og:description",
        content:
          "Em 3 minutos, descubra onde a sua liderança trava e o primeiro passo pra evoluir.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://funil-leader-landing.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://funil-leader-landing.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    salvarRastreioDaUrl();
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center px-6 py-16 text-center md:py-24">
      <div className="mx-auto w-full max-w-[42rem]">
        {/* Rótulo */}
        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-lead-border px-4 py-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-lead-terracotta">
            Radar do Líder · Diagnóstico gratuito de liderança
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.75rem,9vw,5rem)] leading-[0.95] tracking-tight text-lead-cream">
          A sua equipe já sabe onde a sua liderança trava. Chegou a hora de você saber também.
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-6 max-w-[34rem] font-sans text-lg leading-relaxed text-lead-cream-muted md:text-xl">
          Em 3 minutos, o Radar do Líder mostra onde a sua liderança está travando e qual é o
          primeiro passo para evoluir.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center rounded-full bg-lead-terracotta px-8 py-4 font-sans text-lg font-semibold text-lead-cream shadow-[0_12px_32px_-12px_rgba(196,71,42,0.45)] transition-all duration-200 hover:bg-lead-terracotta-hover hover:shadow-[0_16px_40px_-12px_rgba(219,90,34,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lead-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-[#280b09]"
          >
            Começar meu diagnóstico
          </Link>
        </div>

        {/* Microcopy */}
        <p className="mt-4 font-sans text-sm text-lead-cream-muted">
          Gratuito e rápido. Em menos de 3 minutos você tem um retrato claro da sua liderança.
        </p>

        {/* Selos */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Badge icon={<Clock className="h-3.5 w-3.5" />}>Sua nota na hora</Badge>
          <Badge icon={<Target className="h-3.5 w-3.5" />}>Sobre situações reais, não teoria</Badge>
          <Badge icon={<ShieldCheck className="h-3.5 w-3.5" />}>Seus dados ficam protegidos</Badge>
        </div>

        {/* Faixa de autoridade */}
        <div className="mt-14 flex flex-col items-center gap-5 md:flex-row md:justify-center md:text-left">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-lead-border bg-lead-card">
            <img
              src={julieneAsset.url}
              alt="Foto profissional de Juliene Salvan"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="max-w-[24rem] font-sans text-base leading-relaxed text-lead-cream-muted">
            Criado por <strong className="text-lead-cream">Juliene Salvan</strong>, Diretora de RH,
            com mais de 200 líderes mentorados.
          </p>
        </div>

        {/* Como funciona */}
        <section className="mt-20">
          <h2 className="font-display text-4xl tracking-tight text-lead-cream md:text-5xl">
            Como funciona
          </h2>

          <div className="mt-10 grid gap-5 text-left">
            <StepCard number="01" title="Responda 12 perguntas sobre o seu dia a dia como gestor." />
            <StepCard
              number="02"
              title="Receba a sua nota na hora e a classificação da sua liderança hoje."
            />
            <StepCard
              number="03"
              title="Descubra o que está te travando e o primeiro passo pra evoluir."
            />
          </div>

          <div className="mt-10">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center rounded-full bg-lead-terracotta px-8 py-4 font-sans text-lg font-semibold text-lead-cream shadow-[0_12px_32px_-12px_rgba(196,71,42,0.45)] transition-all duration-200 hover:bg-lead-terracotta-hover hover:shadow-[0_16px_40px_-12px_rgba(219,90,34,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lead-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-[#280b09]"
            >
              Começar meu diagnóstico
            </Link>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="mt-24 border-t border-lead-border pt-10">
          <p className="font-mono text-sm font-bold uppercase tracking-wider text-lead-cream">
            Juliene Salvan_
          </p>
          <p className="mt-3 font-serif text-lg italic text-lead-cream-muted">
            Eu desenvolvo líderes para agir com clareza, maturidade e direção estratégica.
          </p>
        </footer>

        {/* Rodapé legal */}
        <div className="mx-auto mt-16 max-w-2xl border-t border-lead-border px-6 py-10 text-center md:mt-20 md:py-14">
          <p className="font-sans text-xs leading-relaxed text-lead-cream/50">
            © 2026 VC_Líder. Todos os direitos reservados. SDA Educação e Desenvolvimento LTDA | CNPJ:
            27.008.329/0001-55 | São Paulo/SP | suporte@julienesalvan.com.br
          </p>
          <p className="mt-4 font-sans text-xs leading-relaxed text-lead-cream/50">
            Este produto não garante a obtenção de resultados. Qualquer estratégia mencionada neste
            site ou no produto não deve ser interpretada como uma promessa ou garantia de resultados.
            O seu nível de sucesso em atingir os resultados divulgados depende do seu tempo dedicado,
            dedicação, conhecimento e competência técnica. Este site não faz parte do site do Facebook
            ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook de nenhuma
            maneira. FACEBOOK é uma marca comercial da FACEBOOK, Inc.
          </p>
        </div>
      </div>
    </main>
  );
}

function Badge({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-lead-border bg-lead-card/60 px-3.5 py-2">
      <span className="text-lead-terracotta">{icon}</span>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-lead-cream">
        {children}
      </span>
    </div>
  );
}

function StepCard({ number, title }: { number: string; title: string }) {
  return (
    <div className="rounded-2xl border border-lead-border bg-lead-card p-6">
      <span className="font-display text-3xl text-lead-terracotta">{number}</span>
      <p className="mt-2 font-sans text-lg leading-relaxed text-lead-cream">{title}</p>
    </div>
  );
}
