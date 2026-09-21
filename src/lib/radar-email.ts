import type { Pilar, Resultado } from "./radar";
import { VIDEO_COVERS } from "./video-covers";

const DESCRICOES: Record<Pilar, string> = {
  Mentalidade: "Sua forma de pensar e reagir no dia a dia.",
  "Ação": "Sua capacidade de transformar intenção em prática.",
  Pessoas: "Sua forma de relacionar, desenvolver e liderar pessoas.",
  "Aprendizado Contínuo": "Sua atitude de refletir, receber feedback e evoluir.",
};

const ORDEM: Pilar[] = ["Mentalidade", "Ação", "Pessoas", "Aprendizado Contínuo"];

export const TEXTOS_PILAR_CRITICO: Record<Pilar, string[]> = {
  Mentalidade: [
    "Seu principal ponto de atenção hoje é Mentalidade. Esse resultado é um convite para olhar com mais atenção para a forma como você interpreta situações, toma decisões e reage diante de pressão, críticas, conflitos ou incertezas.",
    'Mentalidade não significa simplesmente "pensar positivo". Na liderança, ela está relacionada à capacidade de perceber o que acontece dentro e fora de você antes de escolher como responder.',
    "Quando estamos sob pressão, é natural que alguns padrões apareçam: agir mais rapidamente do que gostaríamos, interpretar uma situação de determinada maneira ou reagir antes de compreender completamente o que está acontecendo.",
    "O desenvolvimento começa quando conseguimos criar um espaço entre o que acontece e a nossa resposta.",
    'Uma boa pergunta para você levar para a sua rotina é: "Estou reagindo ao que aconteceu ou escolhendo como quero responder?".',
    "Esse pequeno exercício de consciência pode mudar a qualidade das suas decisões e das suas relações.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como começar a desenvolver essa dimensão da sua liderança.",
  ],
  "Ação": [
    "Seu principal ponto de atenção hoje é Ação. Esse resultado merece uma reflexão sobre a distância entre aquilo que você sabe que precisa fazer e aquilo que efetivamente consegue colocar em prática na rotina de liderança.",
    "Ação não significa estar sempre ocupado ou fazer mais. Significa transformar intenção em comportamento, especialmente nas situações que exigem posicionamento, decisão, delegação, acompanhamento e conversas importantes.",
    "Na rotina, é comum que as urgências ocupem o espaço do que é realmente importante. Uma conversa pode ser adiada, uma decisão pode ficar esperando, ou uma tarefa pode voltar para o líder porque parece mais rápido fazê-la sozinho.",
    "O ponto de atenção é perceber quando isso começa a limitar não apenas você, mas também a autonomia e o desenvolvimento do seu time.",
    'Uma pergunta pode ajudar: "O que eu sei que preciso fazer como líder, mas continuo adiando?".',
    "Escolha uma situação concreta e dê um primeiro passo.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como transformar essa consciência em uma ação prática de liderança.",
  ],
  Pessoas: [
    "Seu principal ponto de atenção hoje é Pessoas. Esse resultado é um convite para olhar para a qualidade das relações que você constrói como líder e para o quanto sua liderança contribui para o desenvolvimento e a autonomia das pessoas ao seu redor.",
    "Liderar pessoas não significa evitar conflitos, agradar todo mundo ou colocar as necessidades da equipe sempre à frente dos resultados. Significa criar condições para que as pessoas tenham clareza, confiança, responsabilidade e espaço para se desenvolver.",
    "Isso passa por comportamentos muito concretos: ouvir de verdade, dar feedback, reconhecer, alinhar expectativas, delegar e ter as conversas que precisam acontecer, inclusive aquelas que nem sempre são confortáveis.",
    'Uma boa pergunta para você levar para a sua rotina é: "As pessoas do meu time sabem o que espero delas e sabem como podem crescer comigo?".',
    "Talvez uma conversa individual, uma pergunta diferente ou um feedback mais claro já seja um primeiro passo.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como fortalecer a dimensão Pessoas na sua liderança.",
  ],
  "Aprendizado Contínuo": [
    "Seu principal ponto de atenção hoje é Aprendizado Contínuo. Esse resultado é um convite para olhar para a forma como você transforma experiência em aprendizado e aprendizado em mudança de comportamento.",
    "Ter muitos anos de experiência não significa necessariamente continuar evoluindo. A evolução acontece quando conseguimos parar, refletir, reconhecer padrões e transformar aquilo que vivemos em novos repertórios para agir melhor da próxima vez.",
    "Na rotina de liderança, o ritmo pode ser tão intenso que sobra pouco espaço para essa reflexão. E, sem perceber, podemos repetir decisões, comportamentos ou formas de conduzir situações simplesmente porque já estamos acostumados a elas.",
    'Por isso, experimente escolher uma situação recente que não saiu como você gostaria e pergunte: "O que essa experiência pode me ensinar sobre a minha própria liderança?".',
    "Não se trata de procurar culpados ou ficar preso ao que deu errado. Trata-se de transformar experiência em evolução.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como criar esse movimento de aprendizado de forma simples e possível dentro da sua rotina.",
  ],
};

export const TEXTOS_PONTO_FORTE: Record<Pilar, string[]> = {
  Mentalidade: [
    "Seu ponto forte hoje é Mentalidade.",
    "Entre os quatro pilares avaliados, essa foi a dimensão em que você apresentou a maior pontuação. Isso sugere que você já tem uma base de consciência sobre a forma como pensa, sente e reage diante das situações de liderança.",
    "Em muitos momentos, essa consciência pode ajudar você a criar um espaço entre o que acontece e a forma como escolhe responder, em vez de agir sempre no automático.",
    "Essa é uma base importante para tomar decisões com mais clareza, especialmente quando existe pressão, conflito ou incerteza.",
    "O convite aqui é continuar desenvolvendo essa consciência e, principalmente, transformá-la em uma ferramenta para as outras dimensões da sua liderança.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como usar essa força a favor da área que hoje mais precisa da sua atenção.",
  ],
  "Ação": [
    "Seu ponto forte hoje é Ação.",
    "Entre os quatro pilares avaliados, essa foi a dimensão em que você apresentou a maior pontuação. Isso sugere que você tem facilidade para transformar intenção em movimento, tomar decisões e colocar as coisas em prática.",
    "Essa capacidade pode ser muito importante na liderança, especialmente quando é preciso sair do planejamento e fazer acontecer.",
    "Mas existe um ponto de atenção para quem tem Ação como força: velocidade e efetividade não são necessariamente a mesma coisa.",
    "Agir rápido é importante, mas agir com clareza, método e acompanhamento aumenta a chance de que aquela ação realmente produza o resultado esperado, sem gerar retrabalho ou depender novamente de você.",
    "O convite aqui é usar essa capacidade de agir como uma alavanca para desenvolver as outras dimensões da sua liderança.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como colocar essa força a favor da área que hoje mais precisa da sua atenção.",
  ],
  Pessoas: [
    "Seu ponto forte hoje é Pessoas.",
    "Entre os quatro pilares avaliados, essa foi a dimensão em que você apresentou a maior pontuação. Isso sugere que você já tem uma atenção importante para a qualidade das relações, para o desenvolvimento das pessoas e para a forma como o time vivencia a liderança.",
    "Essa base pode ajudar você a construir relações de confiança, compreender melhor as necessidades da equipe e criar condições para que as pessoas assumam mais responsabilidade.",
    "Mas existe uma diferença importante entre cuidar das pessoas e desenvolver pessoas de forma deliberada.",
    "O convite aqui é transformar essa atenção em prática: reservar espaço na agenda para conversas, feedbacks, desenvolvimento e construção de autonomia, e não apenas para resolver as demandas que aparecem.",
    "No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como usar essa força a favor da área que hoje mais precisa da sua atenção.",
  ],
  "Aprendizado Contínuo": [
    "Seu ponto forte hoje é Aprendizado Contínuo.",
    "Entre os quatro pilares avaliados, essa foi a dimensão em que você apresentou a maior pontuação. Isso sugere uma disposição maior para refletir sobre as experiências, buscar novos aprendizados e transformar aquilo que você vive em repertório para situações futuras.",
    "Essa postura pode ser uma importante fonte de evolução, principalmente em um contexto em que os desafios da liderança mudam constantemente.",
    "Mas aprendizado só se transforma em desenvolvimento quando chega ao comportamento.",
    "Por isso, o convite aqui é escolher aquilo que você já percebeu sobre sua própria liderança e transformar esse aprendizado em uma mudança concreta na rotina.",
  ],
};


const SITE_URL = "https://radar.julienesalvan.com.br";

export function montarVideoPageUrl(pilar: Pilar): string {
  return `${SITE_URL}/video?pilar=${encodeURIComponent(VIDEO_COVERS[pilar].slug)}`;
}

const CORES = {
  bg: "#f6ede1",
  card: "#fffaf2",
  ink: "#3b2a20",
  inkMuted: "#6b564a",
  border: "#e3d4c2",
  terracotta: "#c4472a",
  wine: "#8f2433",
  criticoBg: "#f5e1d9",
  criticoBorda: "#efb9aa",
  forteBg: "#e3f0e7",
  forteBorda: "#bfdbca",
};

function escapar(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function barra(nota: number) {
  const largura = Math.max(0, Math.min(100, nota));
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-radius:999px;background:${CORES.border};"><tr><td style="height:8px;line-height:8px;font-size:0;">
    <table role="presentation" width="${largura}%" cellpadding="0" cellspacing="0"><tr><td style="height:8px;line-height:8px;font-size:0;border-radius:999px;background:${CORES.terracotta};">&nbsp;</td></tr></table>
  </td></tr></table>`;
}

function cartaoPilar(pilar: Resultado["pilares"][number]) {
  return `<td width="50%" valign="top" style="padding:6px;">
    <div style="border:1px solid ${CORES.border};border-radius:14px;background:${CORES.card};padding:18px;">
      <div style="font-family:'Space Mono',Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${CORES.terracotta};">${escapar(pilar.pilar)}</div>
      <div style="margin-top:6px;font-size:30px;font-weight:700;color:${CORES.ink};">${pilar.nota}<span style="font-size:14px;font-weight:400;color:${CORES.inkMuted};">/100</span></div>
      <div style="margin-top:4px;font-size:13px;color:${CORES.inkMuted};">${escapar(pilar.faixa)}</div>
      ${barra(pilar.nota)}
      <p style="margin:12px 0 0;font-size:13px;line-height:1.6;color:${CORES.inkMuted};">${escapar(DESCRICOES[pilar.pilar])}</p>
    </div>
  </td>`;
}

function formatarParagrafos(paragrafos: string[]) {
  return paragrafos
    .map(
      (p) =>
        `<p style="margin:10px 0 0;font-size:13px;line-height:1.7;color:${CORES.inkMuted};">${escapar(p)}</p>`,
    )
    .join("");
}

function destaque(rotulo: string, pilar: string, paragrafos: string[], fundo: string, borda: string) {
  return `<div style="margin-top:12px;border:1px solid ${borda};border-radius:14px;background:${fundo};padding:18px;">
    <div style="font-family:'Space Mono',Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${CORES.wine};">${escapar(rotulo)}</div>
    <div style="margin-top:6px;font-size:20px;font-weight:700;color:${CORES.ink};">${escapar(pilar)}</div>
    ${formatarParagrafos(paragrafos)}
  </div>`;
}

function faixaClassificacao(notaGeral: number) {
  const faixas = [
    { intervalo: "0–40", titulo: "Em formação", ativo: notaGeral <= 40 },
    { intervalo: "41–79", titulo: "Em construção", ativo: notaGeral > 40 && notaGeral <= 79 },
    { intervalo: "80–100", titulo: "Estratégico", ativo: notaGeral >= 80 },
  ];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${faixas
    .map(
      (f) => `<td width="33.33%" style="padding:6px;">
        <div style="border:1px solid ${f.ativo ? CORES.terracotta : CORES.border};border-radius:12px;background:${f.ativo ? "#f9e4dc" : CORES.card};padding:14px;text-align:center;">
          <div style="font-family:'Space Mono',Consolas,monospace;font-size:12px;font-weight:700;color:${f.ativo ? CORES.terracotta : CORES.inkMuted};">${f.intervalo}</div>
          <div style="margin-top:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${CORES.ink};">${f.titulo}</div>
        </div>
      </td>`,
    )
    .join("")}</tr></table>`;
}

/** SVG do gráfico radar "Seu Radar M.A.P.A." com as notas dos quatro pilares. */
export function montarRadarSvg(resultado: Resultado): string {
  const nota = (pilar: Pilar) => resultado.pilares.find((p) => p.pilar === pilar)?.nota ?? 0;
  const valores = ORDEM.map(nota);
  const centro = 150;
  const raio = 84;
  const ponto = (indice: number, valor: number) => {
    const angulo = -Math.PI / 2 + indice * (Math.PI / 2);
    const distancia = raio * (valor / 100);
    return `${(centro + Math.cos(angulo) * distancia).toFixed(1)},${(centro + Math.sin(angulo) * distancia).toFixed(1)}`;
  };
  const pontos = valores.map((valor, indice) => ponto(indice, valor)).join(" ");
  const grades = [0.33, 0.66, 1]
    .map((escala) => [0, 1, 2, 3].map((indice) => ponto(indice, escala * 100)).join(" "))
    .map(
      (grade) =>
        `<polygon points="${grade}" fill="none" stroke="${CORES.border}" stroke-width="1.2"/>`,
    )
    .join("");
  const marcadores = valores
    .map((valor, indice) => {
      const [x, y] = ponto(indice, valor).split(",");
      return `<circle cx="${x}" cy="${y}" r="4" fill="${CORES.terracotta}"/>`;
    })
    .join("");
  const rotulo =
    `font-family="'Space Mono',Consolas,monospace" font-size="10" font-weight="700" fill="${CORES.ink}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="360" height="360" role="img" aria-label="Gráfico radar com as notas dos quatro pilares de liderança">
    ${grades}
    <line x1="150" y1="66" x2="150" y2="234" stroke="${CORES.border}" stroke-width="1.2"/>
    <line x1="66" y1="150" x2="234" y2="150" stroke="${CORES.border}" stroke-width="1.2"/>
    <polygon points="${pontos}" fill="${CORES.terracotta}" fill-opacity="0.2" stroke="${CORES.terracotta}" stroke-width="2.5"/>
    ${marcadores}
    <text x="150" y="26" text-anchor="middle" ${rotulo}>MENTALIDADE &#183; ${valores[0]}</text>
    <text x="296" y="154" text-anchor="end" ${rotulo}>A&#199;&#195;O &#183; ${valores[1]}</text>
    <text x="150" y="284" text-anchor="middle" ${rotulo}>PESSOAS &#183; ${valores[2]}</text>
    <text x="4" y="154" ${rotulo}>APRENDIZADO &#183; ${valores[3]}</text>
  </svg>`;
}

/** URL pública de uma imagem PNG do radar, compatível com clientes de e-mail. */
export function montarRadarImagemUrl(resultado: Resultado): string {
  const nota = (pilar: Pilar) => resultado.pilares.find((p) => p.pilar === pilar)?.nota ?? 0;
  const valores = ORDEM.map(nota);
  const configuracao = {
    type: "radar",
    data: {
      labels: [
        `MENTALIDADE · ${valores[0]}`,
        `AÇÃO · ${valores[1]}`,
        `PESSOAS · ${valores[2]}`,
        `APRENDIZADO · ${valores[3]}`,
      ],
      datasets: [
        {
          data: valores,
          backgroundColor: "rgba(196,71,42,0.20)",
          borderColor: CORES.terracotta,
          borderWidth: 3,
          pointBackgroundColor: CORES.terracotta,
          pointBorderColor: CORES.terracotta,
          pointRadius: 4,
        },
      ],
    },
    options: {
      legend: { display: false },
      layout: { padding: 28 },
      scale: {
        ticks: { display: false, beginAtZero: true, min: 0, max: 100, stepSize: 33.33 },
        angleLines: { color: CORES.border },
        gridLines: { color: CORES.border },
        pointLabels: {
          fontColor: CORES.ink,
          fontFamily: "Arial",
          fontSize: 11,
          fontStyle: "bold",
        },
      },
    },
  };

  return `https://quickchart.io/chart?width=520&height=390&devicePixelRatio=2&format=png&backgroundColor=${encodeURIComponent(CORES.card)}&c=${encodeURIComponent(JSON.stringify(configuracao))}`;
}

/** Bloco HTML completo do Radar M.A.P.A., incluindo o desenho e o texto editorial. */
export function montarRadarMapaHtml(resultado: Resultado): string {
  const imagemUrl = montarRadarImagemUrl(resultado);
  return `<div style="font-family:'IBM Plex Sans',Arial,Helvetica,sans-serif;color:${CORES.ink};">
    <div style="margin:0 0 14px;font-family:'Space Mono',Consolas,monospace;font-size:12px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${CORES.wine};">Seu Radar M.A.P.A.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${CORES.border};border-radius:16px;background:${CORES.card};">
      <tr>
        <td width="55%" valign="middle" align="center" style="padding:20px 14px;"><img src="${imagemUrl}" width="286" alt="Gráfico Radar M.A.P.A. com as notas dos quatro pilares" style="display:block;width:100%;max-width:286px;height:auto;border:0;outline:none;text-decoration:none;"></td>
        <td width="45%" valign="middle" style="border-left:4px solid ${CORES.terracotta};padding:20px 24px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:23px;font-style:italic;line-height:1.55;text-align:center;color:${CORES.ink};">O equilíbrio entre os pilares é o que sustenta uma liderança mais consciente, consistente e de maior impacto.</div>
        </td>
      </tr>
    </table>
  </div>`;
}

/** Bloco com o convite ao vídeo da Juliene, exibido abaixo da classificação. */
export function montarBlocoVideoHtml(resultado: Resultado): string {
  const pilar = resultado.pilarCritico;
  const videoPageUrl = montarVideoPageUrl(pilar);
  const videoCoverUrl = `${SITE_URL}${VIDEO_COVERS[pilar].url}`;
  return `<div style="border:1px solid ${CORES.border};border-radius:16px;background:${CORES.card};padding:22px;">
    <h2 style="margin:0 0 10px;font-size:19px;line-height:1.3;color:${CORES.ink};">Seu diagnóstico completo (e o que eu vi na sua ${escapar(pilar)})</h2>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:${CORES.inkMuted};">Você fez o Radar e ficou como <strong style="color:${CORES.ink};">${escapar(resultado.nivel.titulo)}</strong>, com ${resultado.notaGeral} de 100. O seu pilar mais frágil hoje é <strong style="color:${CORES.ink};">${escapar(pilar)}</strong>, e é sobre ele que eu quero falar com você.</p>
    <a href="${videoPageUrl}" target="_blank" style="display:block;text-decoration:none;">
      <img src="${videoCoverUrl}" width="556" alt="Abrir a análise em vídeo do pilar ${escapar(pilar)}" style="display:block;width:100%;max-width:556px;height:auto;border:0;border-radius:14px;outline:none;text-decoration:none;">
    </a>
    <p style="margin:14px 0 16px;font-size:14px;line-height:1.7;color:${CORES.inkMuted};">No vídeo de análise, eu vou aprofundar o seu resultado e mostrar como transformar consciência em uma ação prática de liderança.</p>
    <div style="text-align:center;">
      <a href="${videoPageUrl}" target="_blank" style="display:inline-block;border-radius:999px;background:${CORES.terracotta};color:#fffaf2;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;">Assistir minha An&#225;lise completa</a>
    </div>
  </div>`;
}

/** HTML completo e autocontido do resultado, pronto para envio por e-mail. */
export function montarHtmlResultado({
  nome,
  email,
  telefone,
  resultado,
}: {
  nome: string;
  email: string;
  telefone: string;
  resultado: Resultado;
}): string {
  const pilares = ORDEM.map((p) => resultado.pilares.find((x) => x.pilar === p)).filter(
    (p): p is Resultado["pilares"][number] => Boolean(p),
  );

  const linhas: string[] = [];
  for (let i = 0; i < pilares.length; i += 2) {
    const par = pilares.slice(i, i + 2).map(cartaoPilar).join("");
    linhas.push(`<tr>${par}</tr>`);
  }

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Radar do Líder — diagnóstico de ${escapar(nome)}</title></head>
<body style="margin:0;padding:0;background:${CORES.bg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CORES.bg};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;font-family:'IBM Plex Sans',Arial,Helvetica,sans-serif;color:${CORES.ink};">

  <tr><td style="padding-bottom:24px;">
    ${montarBlocoVideoHtml(resultado)}
  </td></tr>

  <tr><td style="text-align:center;padding-bottom:18px;">
    <div style="font-family:'Space Mono',Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${CORES.terracotta};">Radar do Líder · Resultado</div>
    <h1 style="margin:10px 0 0;font-size:30px;line-height:1.2;text-transform:uppercase;letter-spacing:1px;color:${CORES.ink};">Seu diagnóstico</h1>
    <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:${CORES.inkMuted};">Como está a sua liderança hoje e onde focar o seu próximo passo.</p>
  </td></tr>

  <tr><td style="border:1px solid ${CORES.border};border-radius:16px;background:${CORES.card};padding:24px;text-align:center;">
    <div style="font-size:56px;font-weight:700;line-height:1;color:${CORES.terracotta};">${resultado.notaGeral}</div>
    <div style="margin-top:4px;font-family:'Space Mono',Consolas,monospace;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${CORES.inkMuted};">De 100 pontos</div>
    <div style="margin-top:14px;font-size:20px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:${CORES.ink};">${escapar(resultado.nivel.titulo)}</div>
    <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:${CORES.inkMuted};">${escapar(resultado.nivel.descricao)}</p>
  </td></tr>

  <tr><td style="padding-top:24px;text-align:center;">
    ${montarRadarMapaHtml(resultado)}
  </td></tr>

  <tr><td style="padding-top:24px;">
    <h2 style="margin:0 0 6px;font-size:18px;text-transform:uppercase;letter-spacing:1.4px;color:${CORES.ink};">Detalhes dos seus pilares</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${linhas.join("")}</table>
  </td></tr>

  <tr><td style="padding-top:18px;">
    ${destaque("Pilar crítico", resultado.pilarCritico, TEXTOS_PILAR_CRITICO[resultado.pilarCritico], CORES.criticoBg, CORES.criticoBorda)}
    ${destaque("Ponto forte", resultado.pontoForte, TEXTOS_PONTO_FORTE[resultado.pontoForte], CORES.forteBg, CORES.forteBorda)}
  </td></tr>

  <tr><td style="padding-top:24px;">
    <h2 style="margin:0 0 10px;font-size:18px;text-transform:uppercase;letter-spacing:1.4px;color:${CORES.terracotta};">Sua classificação</h2>
    ${faixaClassificacao(resultado.notaGeral)}
  </td></tr>

  <tr><td style="padding:26px 0 0;text-align:center;">
    <a href="${montarVideoPageUrl(resultado.pilarCritico)}" target="_blank" style="display:inline-block;border-radius:999px;background:${CORES.terracotta};color:#fffaf2;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;">Quero aprimorar minha Lideran&#231;a</a>
  </td></tr>

  <tr><td style="padding:22px 0 0;text-align:center;font-size:12px;line-height:1.7;color:${CORES.inkMuted};">
    Juliene Salvan · VC_Líder<br>Este diagnóstico é um ponto de partida, não uma promessa de resultado.
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}
