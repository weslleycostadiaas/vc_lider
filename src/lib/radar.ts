export type Pilar = "Mentalidade" | "Pessoas" | "Ação" | "Aprendizado Contínuo";

export type Pergunta = {
  numero: number;
  pilar: Pilar;
  texto: string;
};

export const PERGUNTAS: Pergunta[] = [
  {
    numero: 1,
    pilar: "Mentalidade",
    texto:
      "Diante de uma situação difícil no trabalho, identifico a emoção que estou sentindo antes de reagir.",
  },
  {
    numero: 2,
    pilar: "Mentalidade",
    texto:
      "Quando algo não vai bem no time, começo a análise pelo que eu, como líder, posso mudar, não pelo que o time deveria fazer diferente.",
  },
  {
    numero: 3,
    pilar: "Mentalidade",
    texto:
      "Antes de tomar decisões sobre pessoas — promover, delegar ou avaliar — questiono se algum viés ou escolha inconsciente pode estar distorcendo minha percepção.",
  },
  {
    numero: 4,
    pilar: "Ação",
    texto:
      "Quando preciso ter uma conversa difícil com alguém do time, não adio: procuro conduzi-la ainda na mesma semana.",
  },
  {
    numero: 5,
    pilar: "Ação",
    texto:
      "Quando delego, deixo claro o escopo, o nível de autonomia e como será o acompanhamento, não apenas o que precisa ser feito.",
  },
  {
    numero: 6,
    pilar: "Ação",
    texto:
      "Mantenho meus rituais de gestão — reuniões individuais e alinhamentos — com regularidade, mesmo nas semanas mais corridas.",
  },
  {
    numero: 7,
    pilar: "Pessoas",
    texto:
      "Além das entregas, sei identificar o nível de confiança, comprometimento e competência de cada pessoa do meu time.",
  },
  {
    numero: 8,
    pilar: "Pessoas",
    texto:
      "As pessoas do meu time se sentem à vontade para discordar de mim e trazer erros sem medo de punição ou julgamento.",
  },
  {
    numero: 9,
    pilar: "Pessoas",
    texto:
      "Dedico tempo regular ao desenvolvimento de cada pessoa do meu time. Isso está na minha agenda, não no tempo que sobra.",
  },
  {
    numero: 10,
    pilar: "Aprendizado Contínuo",
    texto:
      "Quando recebo um feedback difícil, consigo ouvir sem me defender e extrair dele o que pode me ajudar a melhorar.",
  },
  {
    numero: 11,
    pilar: "Aprendizado Contínuo",
    texto:
      "Tenho um momento reservado na semana para refletir sobre como atuei como líder: o que funcionou e o que eu faria diferente.",
  },
  {
    numero: 12,
    pilar: "Aprendizado Contínuo",
    texto:
      "Consigo identificar padrões que se repetem na minha forma de liderar, e não apenas erros pontuais.",
  },
];

export const OPCOES = [
  { valor: 1, rotulo: "Nunca" },
  { valor: 2, rotulo: "Raramente" },
  { valor: 3, rotulo: "Às vezes" },
  { valor: 4, rotulo: "Frequentemente" },
  { valor: 5, rotulo: "Sempre" },
] as const;

/** Ordem de prioridade para desempates. */
const PRIORIDADE: Pilar[] = ["Mentalidade", "Pessoas", "Ação", "Aprendizado Contínuo"];

export type ResultadoPilar = {
  pilar: Pilar;
  soma: number;
  nota: number;
  faixa: "Zona de atenção" | "Em desenvolvimento" | "Pilar sólido";
};

export type Resultado = {
  notaGeral: number;
  nivel: { titulo: string; descricao: string };
  pilares: ResultadoPilar[];
  pilarCritico: Pilar;
  pontoForte: Pilar;
};

function faixaDaSoma(soma: number): ResultadoPilar["faixa"] {
  if (soma <= 7) return "Zona de atenção";
  if (soma <= 11) return "Em desenvolvimento";
  return "Pilar sólido";
}

function nivelDaNota(nota: number) {
  if (nota <= 40) {
    return {
      titulo: "Líder em Formação",
      descricao:
        "Está construindo as bases da liderança e ainda reage muito no automático.",
    };
  }
  if (nota <= 79) {
    return {
      titulo: "Líder em Construção",
      descricao:
        "Você já tem consciência e método, mas ainda precisa transformar intenção em consistência.",
    };
  }
  return {
    titulo: "Líder Estratégico",
    descricao:
      "Lidera com consciência, método e consistência, ampliando o impacto sobre pessoas e resultados.",
  };
}

export function calcularResultado(respostas: number[]): Resultado {
  const pilares: ResultadoPilar[] = PRIORIDADE.map((pilar) => {
    const soma = PERGUNTAS.reduce(
      (acc, p, i) => (p.pilar === pilar ? acc + (respostas[i] ?? 0) : acc),
      0,
    );
    return {
      pilar,
      soma,
      nota: Math.round(((soma - 3) / 12) * 100),
      faixa: faixaDaSoma(soma),
    };
  });

  const media = pilares.reduce((acc, p) => acc + p.nota, 0) / pilares.length;
  const notaGeral = Math.min(92, Math.round(media));

  let critico = pilares[0]!;
  let forte = pilares[0]!;
  for (const p of pilares) {
    if (p.soma < critico.soma) critico = p;
    if (p.soma > forte.soma) forte = p;
  }

  // Todas as notas iguais: pilar crítico = Ação, ponto forte = Mentalidade.
  const todasIguais = pilares.every((p) => p.soma === pilares[0]!.soma);
  if (todasIguais) {
    critico = pilares.find((p) => p.pilar === "Ação")!;
    forte = pilares.find((p) => p.pilar === "Mentalidade")!;
  }


  return {
    notaGeral,
    nivel: nivelDaNota(notaGeral),
    pilares,
    pilarCritico: critico.pilar,
    pontoForte: forte.pilar,
  };
}
