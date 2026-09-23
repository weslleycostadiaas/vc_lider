import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Lightbulb,
  Loader2,
  LockKeyhole,
  Target,
  Users,
} from "lucide-react";

import { OPCOES, PERGUNTAS, calcularResultado, type Resultado } from "@/lib/radar";
import {
  coletarRastreio,
  dispararLeadPixel,
  gerarEventoId,
  salvarRastreioDaUrl,
} from "@/lib/rastreio";
import {
  TEXTOS_PILAR_CRITICO,
  TEXTOS_PONTO_FORTE,
  montarBlocoVideoHtml,
  montarHtmlResultado,
  montarRadarImagemUrl,
  montarRadarMapaHtml,
  montarRadarSvg,
  montarVideoPageUrl,
} from "@/lib/radar-email";

const WEBHOOK_URL = "https://n8n.julienesalvan.com.br/webhook/captura";

export const Route = createFileRoute("/diagnostico")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Diagnóstico Radar do Líder · 12 perguntas rápidas" },
      {
        name: "description",
        content:
          "Responda 12 perguntas sobre o seu dia a dia como gestor e descubra a sua nota de liderança nos quatro pilares do método.",
      },
      { property: "og:title", content: "Diagnóstico Radar do Líder" },
      {
        property: "og:description",
        content:
          "12 perguntas rápidas para descobrir a sua nota de liderança e receber a análise completa por e-mail.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://radar.julienesalvan.com.br/diagnostico" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://radar.julienesalvan.com.br/diagnostico" }],
  }),
  component: Diagnostico,
});

type Etapa = "perguntas" | "analisando" | "captura";

function Diagnostico() {
  const [etapa, setEtapa] = useState<Etapa>("perguntas");
  const inicioEnviado = useRef(false);

  useEffect(() => {
    salvarRastreioDaUrl();
  }, []);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (inicioEnviado.current || typeof window === "undefined") return;
    inicioEnviado.current = true;
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "inicioQuiz",
      etapa_total: PERGUNTAS.length,
    });
  }, []);

  useEffect(() => {
    if (etapa !== "perguntas" || typeof window === "undefined") return;
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    const pergunta = PERGUNTAS[indice];
    w.dataLayer.push({
      event: "etapaQuiz",
      etapa_numero: indice + 1,
      etapa_total: PERGUNTAS.length,
      etapa_nome: `pergunta_${indice + 1}`,
      pilar: pergunta?.pilar,
    });
  }, [etapa, indice]);

  useEffect(() => {
    if (typeof window === "undefined" || etapa === "perguntas") return;
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "etapaQuiz", etapa_nome: etapa });
  }, [etapa]);

  function responder(valor: number) {
    if (selecionada !== null) return;
    setSelecionada(valor);
    const proximas = [...respostas];
    proximas[indice] = valor;
    setRespostas(proximas);

    timer.current = setTimeout(() => {
      setSelecionada(null);
      if (indice + 1 < PERGUNTAS.length) {
        setIndice(indice + 1);
      } else {
        const resultadoFinal = calcularResultado(proximas);
        if (typeof window !== "undefined") {
          const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({
            event: "fimQuiz",
            etapa_total: PERGUNTAS.length,
            nota_geral: resultadoFinal.notaGeral,
            nivel: resultadoFinal.nivel.titulo,
            pilar_critico: resultadoFinal.pilarCritico,
            ponto_forte: resultadoFinal.pontoForte,
          });
        }
        setResultado(resultadoFinal);
        setEtapa("analisando");
      }
    }, 320);
  }

  function voltar() {
    if (indice === 0) return;
    setSelecionada(null);
    setIndice(indice - 1);
  }

  return (
    <div className="radar-light px-5 py-10 md:py-16">
      <div
        className={`mx-auto w-full ${etapa === "captura" ? "max-w-[52rem]" : "max-w-2xl"}`}
      >
        {etapa === "perguntas" && (
          <Perguntas
            indice={indice}
            selecionada={selecionada}
            onResponder={responder}
            onVoltar={voltar}
          />
        )}

        {etapa === "analisando" && <Analisando onFim={() => setEtapa("captura")} />}

        {etapa === "captura" && resultado && (
          <Captura resultado={resultado} respostas={respostas} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Perguntas ---------------- */

function Perguntas({
  indice,
  selecionada,
  onResponder,
  onVoltar,
}: {
  indice: number;
  selecionada: number | null;
  onResponder: (valor: number) => void;
  onVoltar: () => void;
}) {
  const pergunta = PERGUNTAS[indice];
  if (!pergunta) return null;
  const progresso = ((indice + 1) / PERGUNTAS.length) * 100;

  return (
    <div className="rounded-3xl border border-quiz-border bg-quiz-card p-6 shadow-[0_18px_44px_-28px_rgba(59,42,32,0.35)] md:p-9">
      <p className="font-mono text-xs font-bold uppercase tracking-wider text-quiz-terracotta">
        {pergunta.pilar}
      </p>
      <p className="mt-1 text-sm text-quiz-ink-muted">
        Pergunta {indice + 1} de {PERGUNTAS.length}
      </p>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-quiz-bg-soft">
        <div
          className="h-full rounded-full bg-quiz-terracotta transition-all duration-300"
          style={{ width: `${progresso}%` }}
        />
      </div>

      <div key={pergunta.numero} className="radar-fade-up">
        <h1 className="mt-7 text-xl font-medium leading-relaxed text-quiz-ink md:text-2xl">
          <span className="mr-2 text-quiz-terracotta">{pergunta.numero}.</span>
          {pergunta.texto}
        </h1>

        <div className="mt-6 grid gap-3">
          {OPCOES.map((opcao) => {
            const ativa = selecionada === opcao.valor;
            return (
              <button
                key={opcao.valor}
                type="button"
                onClick={() => onResponder(opcao.valor)}
                className={`w-full rounded-2xl border px-5 py-4 text-left text-base transition-colors duration-200 ${
                  ativa
                    ? "border-quiz-terracotta bg-quiz-terracotta text-quiz-card"
                    : "border-quiz-border bg-quiz-bg/60 text-quiz-ink hover:border-quiz-terracotta hover:bg-quiz-terracotta-soft"
                }`}
              >
                {opcao.rotulo}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-2 border-t border-quiz-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        {indice > 0 ? (
          <button
            type="button"
            onClick={onVoltar}
            className="text-sm text-quiz-ink-muted transition-colors hover:text-quiz-terracotta"
          >
            ← Voltar
          </button>
        ) : (
          <Link
            to="/"
            className="text-sm text-quiz-ink-muted transition-colors hover:text-quiz-terracotta"
          >
            ← Voltar
          </Link>
        )}
        <p className="font-mono text-xs uppercase tracking-wider text-quiz-ink-muted">
          Ao escolher, avança sozinho
        </p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-quiz-ink-muted">
        Responda pensando em como as coisas acontecem de fato no seu dia a dia, não como você
        gostaria que fossem.
      </p>
    </div>
  );
}

/* ---------------- Animação de análise ---------------- */

function Analisando({ onFim }: { onFim: () => void }) {
  useEffect(() => {
    const t = setTimeout(onFim, 2400);
    return () => clearTimeout(t);
  }, [onFim]);

  const pilares = ["Mentalidade", "Pessoas", "Ação", "Aprendizado Contínuo"];

  return (
    <div className="radar-fade-up rounded-3xl border border-quiz-border bg-quiz-card p-8 text-center shadow-[0_18px_44px_-28px_rgba(59,42,32,0.35)] md:p-12">
      <Loader2 className="mx-auto h-12 w-12 animate-spin text-quiz-terracotta" />
      <h1 className="mt-6 text-2xl font-medium text-quiz-ink">
        Analisando o seu perfil de liderança
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-quiz-ink-muted">
        Estamos cruzando as suas respostas nos quatro pilares do método.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {pilares.map((p, i) => (
          <span
            key={p}
            className="radar-fade-up rounded-full border border-quiz-border bg-quiz-terracotta-soft px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-quiz-terracotta"
            style={{ animationDelay: `${i * 0.45}s` }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Captura do lead ---------------- */

function mascararTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length <= 2) return digitos.length ? `(${digitos}` : "";
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10)
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

function Captura({
  resultado,
  respostas,
}: {
  resultado: Resultado;
  respostas: number[];
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [erros, setErros] = useState<{
    nome?: string;
    email?: string;
    telefone?: string;
    consentimento?: string;
  }>({});
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "enviando" | "sucesso" | "erro" | "concluido">("idle");
  const [segundos, setSegundos] = useState(10);


  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const novos: {
      nome?: string;
      email?: string;
      telefone?: string;
      consentimento?: string;
    } = {};
    if (!nome.trim()) novos.nome = "Informe o seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      novos.email = "Informe um e-mail válido.";
    if (telefone.replace(/\D/g, "").length < 10)
      novos.telefone = "Informe o WhatsApp com DDD.";
    if (!consentimento) novos.consentimento = "Autorize o envio para continuar.";
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    setErroEnvio(null);
    setStatus("enviando");

    const eventoId = gerarEventoId();
    dispararLeadPixel(eventoId);

    try {
      const videoPageUrl = montarVideoPageUrl(resultado.pilarCritico);
      const html = montarHtmlResultado({
        nome: nome.trim(),
        email: email.trim(),
        telefone,
        resultado,
      });
      const resposta = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone,
          assunto: `Seu Radar do Líder: ${resultado.notaGeral}/100 — ${resultado.nivel.titulo}`,
          html_resultado: html,
          html_radar_mapa: montarRadarMapaHtml(resultado),
          svg_radar: montarRadarSvg(resultado),
          imagem_radar_url: montarRadarImagemUrl(resultado),
          nota_geral: resultado.notaGeral,
          nivel: resultado.nivel.titulo,
          pilar_critico: resultado.pilarCritico,
          texto_pilar_critico: TEXTOS_PILAR_CRITICO[resultado.pilarCritico].join("\n\n"),
          ponto_forte: resultado.pontoForte,
          classificacao: resultado.nivel.titulo
            .replace(/^Líder /i, "")
            .replace(/^./, (c) => c.toUpperCase()),
          consentimento,
          evento_id: eventoId,
          rastreio: coletarRastreio(),
          texto_ponto_forte: TEXTOS_PONTO_FORTE[resultado.pontoForte].join("\n\n"),
          html_video: montarBlocoVideoHtml(resultado),
          video_url: videoPageUrl,
          link_video: videoPageUrl,
          link_analise_completa: videoPageUrl,
          dominio_site: "https://radar.julienesalvan.com.br",
          pilares: resultado.pilares,
          respostas,
          data: new Date().toISOString(),
        }),
      });
      if (!resposta.ok) throw new Error("Falha no envio");
      setStatus("sucesso");
      setSegundos(10);
    } catch {
      setErroEnvio(
        "Não conseguimos enviar o seu diagnóstico agora. Confira a sua conexão e tente novamente.",
      );
      setStatus("erro");
    }
  }

  const envioFinalizado = status === "sucesso";
  const bloqueado = status !== "idle";

  useEffect(() => {
    if (!envioFinalizado || segundos <= 0) return;
    const t = setInterval(() => setSegundos((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [envioFinalizado, segundos]);

  const pilaresOrdenados = ["Mentalidade", "Ação", "Pessoas", "Aprendizado Contínuo"]
    .map((nome) => resultado.pilares.find((pilar) => pilar.pilar === nome))
    .filter((pilar): pilar is Resultado["pilares"][number] => Boolean(pilar));

  return (
    <div className="radar-fade-up rounded-2xl bg-quiz-bg/90 px-4 py-10 shadow-[0_22px_54px_-34px_color-mix(in_oklab,var(--quiz-ink)_35%,transparent)] sm:px-8 md:px-9 md:py-12">
      <header className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-quiz-terracotta">
          Resultado
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none text-quiz-ink md:text-6xl">
          Seu diagnóstico
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-quiz-ink-muted md:text-xl">
          Descubra como está a sua liderança hoje e onde focar o seu próximo passo.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-quiz-border bg-quiz-card px-5 py-7 md:mt-9 md:flex md:items-center md:px-7 md:py-7">
        <div className="flex shrink-0 items-end justify-center gap-2 border-b border-quiz-border pb-6 md:w-28 md:block md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <p className="font-display text-7xl leading-[0.78] text-quiz-ink md:text-8xl">
            {resultado.notaGeral}
          </p>
          <p className="font-mono text-[11px] font-bold uppercase leading-none text-quiz-ink-muted md:mt-4 md:text-xs">
            De 100<br className="hidden md:block" /> pontos
          </p>
        </div>

        <div className="pt-6 text-center md:flex-1 md:pl-6 md:pt-0 md:text-left">
          <p className="inline-flex rounded-full bg-quiz-terracotta px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-quiz-card">
            {resultado.nivel.titulo}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-quiz-ink-muted md:text-xl">
            {resultado.nivel.descricao}
          </p>
        </div>
      </section>

      <ResultadoSecao titulo="Seu Radar M.A.P.A.">
        <div className="grid items-center gap-8 rounded-2xl border border-quiz-border bg-quiz-card px-4 py-8 sm:px-7 md:grid-cols-[1.1fr_0.9fr] md:py-10">
          <RadarMapa pilares={pilaresOrdenados} />
          <blockquote className="border-l-4 border-quiz-terracotta px-6 py-1 text-center font-serif text-xl italic leading-relaxed text-quiz-ink md:text-right md:text-2xl">
            O equilíbrio entre os pilares é o que sustenta uma liderança mais consciente,
            consistente e de maior impacto.
          </blockquote>
        </div>
      </ResultadoSecao>

      <ResultadoSecao titulo="Detalhes dos seus pilares">
        <div className="grid gap-4 md:grid-cols-2">
          {pilaresOrdenados.map((pilar) => (
            <PilarCard key={pilar.pilar} resultado={pilar} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <DestaquePilar
            tipo="crítico"
            rotulo="Pilar crítico"
            pilar={resultado.pilarCritico}
            descricao="Seu principal ponto de desenvolvimento agora."
          />
          <DestaquePilar
            tipo="forte"
            rotulo="Ponto forte"
            pilar={resultado.pontoForte}
            descricao="Uma competência que já aparece com força na sua liderança."
          />
        </div>
      </ResultadoSecao>

      <ResultadoSecao titulo="Sua classificação">
        <Classificacao atual={resultado.nivel.titulo} />
      </ResultadoSecao>

      <ResultadoSecao titulo="Sua análise e o seu próximo passo">
        <div className="relative overflow-hidden rounded-2xl border border-quiz-border bg-quiz-card p-5 sm:p-7">
          <div aria-hidden="true" className="select-none blur-[7px]">
            <div className="mx-auto h-3 w-11/12 rounded-full bg-quiz-border" />
            <div className="mx-auto mt-3 h-3 w-4/5 rounded-full bg-quiz-border" />
            <div className="mt-7 aspect-[16/8] rounded-xl bg-quiz-analysis" />
            <div className="mt-4 h-12 rounded-full bg-quiz-terracotta/45" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-quiz-wine px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-quiz-card shadow-lg sm:text-xs">
              <LockKeyhole className="h-4 w-4" />
              Sua análise e o vídeo estão no seu e-mail
            </div>
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-md text-center text-base leading-relaxed text-quiz-ink-muted">
          A sua nota você já viu. <strong className="text-quiz-ink">A análise completa e o vídeo em
          que eu explico o seu resultado</strong> eu envio agora pro seu e-mail. Preencha com o seu
          melhor e-mail: é lá que a parte mais importante te espera.
        </p>
      </ResultadoSecao>

      <form
        onSubmit={enviar}
        className="mx-auto mt-5 max-w-md rounded-2xl border border-quiz-border bg-quiz-card p-5 shadow-[0_20px_40px_-28px_color-mix(in_oklab,var(--quiz-ink)_32%,transparent)] sm:p-7"
      >
        <Campo
          label="Nome"
          value={nome}
          onChange={setNome}
          erro={erros.nome}
          placeholder="Seu nome"
          disabled={bloqueado}
        />
        <Campo
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          erro={erros.email}
          placeholder="voce@email.com"
          ajuda="Use o e-mail que você abre todo dia. É pra lá que vai o seu diagnóstico completo e o vídeo."
          disabled={bloqueado}
        />
        <Campo
          label="WhatsApp"
          type="tel"
          inputMode="numeric"
          value={telefone}
          onChange={(v) => setTelefone(mascararTelefone(v))}
          erro={erros.telefone}
          placeholder="(11) 90000-0000"
          disabled={bloqueado}
        />

        <label className={`mt-4 flex items-start gap-3 text-sm leading-relaxed text-quiz-ink-muted ${bloqueado ? "cursor-default opacity-60" : "cursor-pointer"}`}>
          <input
            type="checkbox"
            checked={consentimento}
            disabled={bloqueado}
            onChange={(event) => setConsentimento(event.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 appearance-none rounded border border-quiz-terracotta bg-quiz-card checked:bg-quiz-terracotta focus:outline-none focus:ring-2 focus:ring-quiz-terracotta/30 disabled:cursor-not-allowed"
          />
          <span>
            Autorizo a Juliene Salvan a me enviar o meu diagnóstico e conteúdos por e-mail e
            WhatsApp.
          </span>
        </label>
        {erros.consentimento && (
          <p className="mt-1.5 text-sm text-quiz-terracotta">{erros.consentimento}</p>
        )}

        {erroEnvio && (
          <p className="mt-4 rounded-2xl border border-quiz-terracotta/40 bg-quiz-terracotta-soft px-4 py-3 text-sm text-quiz-terracotta">
            {erroEnvio}
          </p>
        )}

        {status === "enviando" ? (
          <div className="mt-5 flex w-full items-center justify-center rounded-full bg-quiz-terracotta/80 px-6 py-4 text-base font-semibold text-quiz-card sm:text-lg">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando seu diagnóstico
          </div>
        ) : status === "sucesso" || status === "concluido" ? (
          <div className="mt-5 rounded-2xl border border-quiz-success-border bg-quiz-success-soft px-5 py-4 text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-quiz-success">
              Enviado com sucesso
            </p>
            <p className="mt-1 text-sm text-quiz-ink-muted">
              Fique atento ao seu e-mail
            </p>
          </div>
        ) : (
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-quiz-terracotta px-6 py-4 text-base font-semibold text-quiz-card shadow-[0_14px_32px_-16px_rgba(196,71,42,0.6)] transition-colors duration-200 hover:bg-quiz-terracotta-hover sm:text-lg"
          >
            Receber meu diagnóstico completo
          </button>
        )}
        <p className="mt-4 text-center text-xs text-quiz-ink-muted/70">
          Seus dados ficam protegidos.
        </p>
      </form>

      {status === "sucesso" && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-quiz-ink/60 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="radar-fade-up relative m-auto w-full max-w-lg rounded-3xl border border-quiz-border bg-quiz-card p-8 text-center shadow-[0_24px_64px_-28px_rgba(59,42,32,0.45)] sm:p-10">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-quiz-ink-muted">
              {"\n"}
            </p>
            <h2 className="mt-4 font-display text-2xl uppercase leading-tight text-quiz-ink md:text-3xl">
              Pronto. O seu diagnóstico completo está a caminho.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-quiz-ink-muted">
              Acabei de enviar pro seu e-mail a sua análise personalizada e o vídeo em que eu
              explico o seu resultado e o próximo passo. Abra agora. Se não achar em alguns minutos,
              olhe em promoções ou spam e marque como “não é spam”.
            </p>

            {segundos > 0 ? (
              <div className="mt-7">
                <div className="mx-auto h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-quiz-bg-soft">
                  <div
                    className="h-full rounded-full bg-quiz-terracotta transition-all duration-1000 ease-linear"
                    style={{ width: `${((10 - segundos) / 10) * 100}%` }}
                  />
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-quiz-ink-muted">
                  Fique atento ao seu e-mail · {segundos}s
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setStatus("concluido")}
                className="mt-7 w-full rounded-full bg-quiz-terracotta px-6 py-4 text-base font-semibold text-quiz-card shadow-[0_14px_32px_-16px_rgba(196,71,42,0.6)] transition-colors duration-200 hover:bg-quiz-terracotta-hover sm:text-lg"
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultadoSecao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-quiz-wine">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

const PILAR_INFO = {
  Mentalidade: {
    descricao: "Sua forma de pensar e reagir no dia a dia.",
    Icone: Lightbulb,
  },
  Ação: {
    descricao: "Sua capacidade de transformar intenção em prática.",
    Icone: Target,
  },
  Pessoas: {
    descricao: "Sua forma de relacionar, desenvolver e liderar pessoas.",
    Icone: Users,
  },
  "Aprendizado Contínuo": {
    descricao: "Sua atitude de refletir, receber feedback e evoluir.",
    Icone: BarChart3,
  },
} as const;

function PilarCard({ resultado }: { resultado: Resultado["pilares"][number] }) {
  const info = PILAR_INFO[resultado.pilar];
  const solido = resultado.faixa === "Pilar sólido";
  const faixa = solido ? "Sólido" : resultado.faixa;

  return (
    <article className="rounded-2xl border border-quiz-border bg-quiz-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-base font-semibold text-quiz-ink">
          <info.Icone className="h-4 w-4 text-quiz-wine" />
          {resultado.pilar}
        </h3>
        <span
          className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wide ${
            solido ? "bg-quiz-success-soft text-quiz-success" : "bg-quiz-warning-soft text-quiz-warning"
          }`}
        >
          {faixa}
        </span>
      </div>
      <p className="mt-2 font-display text-4xl leading-none text-quiz-ink">
        {resultado.nota}<span className="font-sans text-sm text-quiz-ink-muted">/100</span>
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-quiz-bg-soft">
        <div
          className="h-full rounded-full bg-quiz-terracotta"
          style={{ width: `${Math.max(0, Math.min(100, resultado.nota))}%` }}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-quiz-ink-muted">{info.descricao}</p>
    </article>
  );
}

function DestaquePilar({
  tipo,
  rotulo,
  pilar,
  descricao,
}: {
  tipo: "crítico" | "forte";
  rotulo: string;
  pilar: string;
  descricao: string;
}) {
  return (
    <article
      className={`rounded-2xl border p-5 ${
        tipo === "crítico"
          ? "border-quiz-critical-border bg-quiz-critical-soft"
          : "border-quiz-success-border bg-quiz-success-soft"
      }`}
    >
      <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${tipo === "crítico" ? "text-quiz-terracotta" : "text-quiz-success"}`}>
        {rotulo}
      </p>
      <h3 className="mt-2 font-display text-3xl uppercase leading-none text-quiz-ink">{pilar}</h3>
      <p className="mt-2 text-sm leading-relaxed text-quiz-ink-muted">{descricao}</p>
    </article>
  );
}

function Classificacao({ atual }: { atual: string }) {
  const faixas = [
    { intervalo: "0 – 40", nome: "Em formação", chave: "Líder em Formação" },
    { intervalo: "41 – 79", nome: "Em construção", chave: "Líder em Construção" },
    { intervalo: "80 – 100", nome: "Estratégico", chave: "Líder Estratégico" },
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {faixas.map((faixa) => {
        const ativa = faixa.chave === atual;
        return (
          <div
            key={faixa.nome}
            className={`rounded-xl border px-3 py-4 text-center ${
              ativa
                ? "border-quiz-wine bg-quiz-wine text-quiz-card"
                : "border-quiz-border bg-quiz-card text-quiz-ink"
            }`}
          >
            <p className={`font-mono text-[9px] uppercase ${ativa ? "text-quiz-card/70" : "text-quiz-ink-muted"}`}>
              {faixa.intervalo}
            </p>
            <p className="mt-1 font-display text-xl uppercase leading-none">{faixa.nome}</p>
          </div>
        );
      })}
    </div>
  );
}

function RadarMapa({ pilares }: { pilares: Resultado["pilares"] }) {
  const nota = (nome: string) => pilares.find((pilar) => pilar.pilar === nome)?.nota ?? 0;
  const valores = [
    nota("Mentalidade"),
    nota("Ação"),
    nota("Pessoas"),
    nota("Aprendizado Contínuo"),
  ];
  const centro = 150;
  const raio = 84;
  const ponto = (indice: number, valor: number) => {
    const angulo = -Math.PI / 2 + indice * (Math.PI / 2);
    const distancia = raio * (valor / 100);
    return `${centro + Math.cos(angulo) * distancia},${centro + Math.sin(angulo) * distancia}`;
  };
  const pontos = valores.map((valor, indice) => ponto(indice, valor)).join(" ");
  const grades = [0.33, 0.66, 1].map((escala) =>
    [0, 1, 2, 3].map((indice) => ponto(indice, escala * 100)).join(" "),
  );

  return (
    <div className="mx-auto w-full max-w-[24rem]" role="img" aria-label="Gráfico radar com as notas dos quatro pilares de liderança">
      <svg viewBox="0 0 300 300" className="h-auto w-full overflow-visible">
        {grades.map((grade) => (
          <polygon key={grade} points={grade} fill="none" className="stroke-quiz-grid" strokeWidth="1.2" />
        ))}
        <line x1="150" y1="66" x2="150" y2="234" className="stroke-quiz-grid" />
        <line x1="66" y1="150" x2="234" y2="150" className="stroke-quiz-grid" />
        <polygon points={pontos} className="fill-quiz-terracotta/20 stroke-quiz-terracotta" strokeWidth="2.5" />
        {valores.map((valor, indice) => {
          const [x, y] = ponto(indice, valor).split(",").map(Number);
          if (x === undefined || y === undefined) return null;
          return <circle key={`${valor}-${indice}`} cx={x} cy={y} r="4" className="fill-quiz-terracotta" />;
        })}
        <text x="150" y="28" textAnchor="middle" className="fill-quiz-ink font-mono text-[9px] font-bold uppercase">Mentalidade · {valores[0]}</text>
        <text x="292" y="154" textAnchor="end" className="fill-quiz-ink font-mono text-[9px] font-bold uppercase">Ação · {valores[1]}</text>
        <text x="150" y="282" textAnchor="middle" className="fill-quiz-ink font-mono text-[9px] font-bold uppercase">Pessoas · {valores[2]}</text>
        <text x="8" y="154" className="fill-quiz-ink font-mono text-[8px] font-bold uppercase">Aprendizado · {valores[3]}</text>
      </svg>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  erro,
  type = "text",
  inputMode,
  placeholder,
  ajuda,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (valor: string) => void;
  erro?: string | undefined;
  type?: string | undefined;
  inputMode?: "numeric" | "text" | "email" | "tel" | undefined;
  placeholder?: string | undefined;
  ajuda?: string | undefined;
  disabled?: boolean;
}) {
  return (
    <label className={`mt-4 block first:mt-0 ${disabled ? "opacity-60" : ""}`}>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-quiz-ink-muted">
        {label}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-quiz-border bg-quiz-bg/60 px-4 py-3.5 text-base text-quiz-ink outline-none transition-colors placeholder:text-quiz-ink-muted/60 focus:border-quiz-terracotta disabled:cursor-not-allowed"
      />
      {ajuda && !erro && (
        <span className="mt-1.5 block text-xs leading-relaxed text-quiz-terracotta">{ajuda}</span>
      )}
      {erro && <span className="mt-1.5 block text-sm text-quiz-terracotta">{erro}</span>}
    </label>
  );
}

