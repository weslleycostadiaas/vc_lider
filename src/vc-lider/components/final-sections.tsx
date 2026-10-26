import type React from "react";
import { Button } from "@/vc-lider/components/button";
const ecosystem = { url: "/imagens/ecossistema-vc-lider.webp" };
const logo = { url: "/imagens/logotipo-vc-lider-sem-circulo.png" };
import { useFinalReveal } from "@/vc-lider/hooks/use-final-reveal";
import { finalOffer } from "@/vc-lider/lib/final-offer";
import { FinalFaq } from "@/vc-lider/components/final-faq";

const [cashInt, cashCents] = finalOffer.cashPrice.toFixed(2).replace(".", ",").split(",");
const installmentPrice = finalOffer.installmentPrice.toFixed(2).replace(".", ",");

const titleRegions = [
  { x: 104, y: 82, width: 226, height: 50 },
  { x: 536, y: 26, width: 228, height: 56 },
];

/** Base <img> always renders; label overlays are mask-only tints limited to the two title boxes. */
function EcosystemImage() {
  const pct = (n: number, d: number) => `${(n / d) * 100}%`;
  return (
    <div className="final-ecosystem-image" data-final-reveal>
      <img
        src={ecosystem.url}
        width="960"
        height="480"
        loading="lazy"
        decoding="async"
        alt="Ecossistema VC_Líder: tablet com o Radar do Líder, celular com o grupo de WhatsApp e laptop com o Mentor Digital."
      />
      {titleRegions.map((r) => (
        <span
          key={r.x}
          className="final-ecosystem-label"
          aria-hidden="true"
          style={{
            left: pct(r.x, 960),
            top: pct(r.y, 480),
            width: pct(r.width, 960),
            height: pct(r.height, 480),
          }}
        >
          <span
            style={{
              left: pct(-r.x, r.width),
              top: pct(-r.y, r.height),
              width: pct(960, r.width),
              height: pct(480, r.height),
              WebkitMaskImage: `url(${ecosystem.url})`,
              maskImage: `url(${ecosystem.url})`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

function Numbered({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="final-numbered">
      {items.map((item, i) => (
        <div className="final-numbered-item" key={i}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

const benefits = [
  [
    `${finalOffer.lessons} videoaulas em ${finalOffer.modules} módulos + aulas bônus`,
    "Aprenda o Método M.A.P.A. no seu ritmo.",
  ],
  [
    "Ferramentas e materiais práticos",
    "Roteiros para conversas difíceis, desenvolvimento da equipe e para aplicação do método.",
  ],
  [
    `Mentor Digital por ${finalOffer.mentorAccessMonths} meses`,
    "Apoio com inteligência artificial, disponível 24h para enfrentar os desafios da sua rotina.",
  ],
  [
    `Radar do Líder por ${finalOffer.radarAccessMonths} meses`,
    "Identifique pontos de desenvolvimento e acompanhe sua evolução.",
  ],
  [
    `${finalOffer.lessonAccessMonths} meses de acesso às aulas e aos materiais`,
    "Com atualizações incluídas.",
  ],
  [
    "Certificado de Conclusão + Grupo de WhatsApp",
    `Certificado ao concluir os ${finalOffer.modules} módulos + Novidades, conteúdos e avisos ao se cadastrar no Grupo de WhatsApp do curso.`,
  ],
];

function FinalCta() {
  return (
    <Button variant="checkout" size="natural" asChild>
      <a href={finalOffer.checkoutUrl}>Quero fazer parte do VC_Líder</a>
    </Button>
  );
}

export function FinalSections() {
  const ref = useFinalReveal();
  return (
    <div className="final-sections" ref={ref}>
      <section className="final-band final-ecosystem" aria-labelledby="final-ecosystem-title">
        <div className="final-inner">
          <h2 className="final-title" id="final-ecosystem-title" data-final-reveal>
            <span>Um ecossistema de</span> <span>desenvolvimento que vai</span>{" "}
            <span>além das videoaulas</span>
          </h2>
          <EcosystemImage />
          <div className="final-copy final-cycle" data-final-reveal>
            <p>Você está entrando em um ecossistema completo de desenvolvimento de liderança.</p>
            <div className="final-cycle-steps">
              <Numbered
                items={[
                  "O Radar do Líder mostra onde você está.",
                  "O Método M.A.P.A., apresentado nas videoaulas, te dá a estrutura para desenvolver suas competências.",
                  "O Mentor Digital te acompanha nas decisões reais.",
                  "E o Radar volta a mostrar o quanto você evoluiu.",
                ]}
              />
            </div>
            <p className="final-cycle-summary">
              É um ciclo: Diagnóstico. Desenvolvimento. Aplicação. Evolução.
            </p>
            <p>
              Porque o objetivo nunca foi colocar mais informação na sua cabeça. É transformar
              informação em comportamento.
            </p>
          </div>
          <h3 className="final-subtitle" data-final-reveal>
            Tudo o que você recebe ao entrar no VC_Líder
          </h3>
          <ul className="final-benefits">
            {benefits.map(([title, description]) => (
              <li className="final-benefit" key={title} data-final-reveal>
                <h4>{title}</h4>
                <p>{description}</p>
              </li>
            ))}
          </ul>
          <div className="final-offer" data-final-reveal>
            <p>
              <strong>
                Comece por R$ <span className="final-price-accent">{cashInt}</span>
                <span className="final-price-accent final-price-cents">{`,${cashCents}`}</span> à
                vista
                <br />
                <span>
                  ou {finalOffer.installments}x de R${" "}
                  <span className="final-price-accent">{installmentPrice}</span> no cartão.
                </span>
              </strong>
            </p>
            <FinalCta />
          </div>
        </div>
      </section>
      <section className="final-band final-support" aria-labelledby="final-support-title">
        <div className="final-inner">
          <h2 className="final-title" id="final-support-title" data-final-reveal>
            <span>Você não fica sozinho</span> <span>na hora em que a decisão aperta</span>
          </h2>
          <div className="final-copy" data-final-reveal>
            <Numbered
              items={[
                <>
                  O suporte central do método é o Mentor Digital M.A.P.A., disponível 24 horas por
                  dia durante os 6 primeiros meses. Ele existe justamente para o momento em que a
                  dúvida aparece longe de qualquer atendimento humano: a noite anterior à conversa
                  difícil, os 10 minutos antes da reunião com a diretoria, o domingo em que a cabeça
                  não desliga pensando em como conduzir um conflito na segunda-feira.
                </>,
                <>
                  Você entra também no Grupo de WhatsApp do curso, sem prazo para sair, o canal onde
                  chegam as atualizações, os novos conteúdos e os avisos importantes do Método
                  M.A.P.A. em primeira mão, para você não perder nada do que é liberado ao longo da
                  sua jornada.
                </>,
                <>
                  E para dúvidas sobre acesso à plataforma, pagamento ou qualquer questão do curso,
                  o atendimento é por e-mail, com resposta em até 24 horas úteis, no:{" "}
                  <a href="mailto:suporte@julienesalvan.com.br">suporte@julienesalvan.com.br</a>
                </>,
              ]}
            />
          </div>
        </div>
      </section>
      <section className="final-band final-guarantee" aria-labelledby="final-guarantee-title">
        <div className="final-inner">
          <h2 className="final-title" id="final-guarantee-title" data-final-reveal>
            <span>Experimente por {finalOffer.guaranteeDays} dias.</span>{" "}
            <span>Se não for para você,</span> <span>solicite o reembolso integral.</span>
          </h2>
          <div className="final-copy" data-final-reveal>
            <p>
              Você tem 7 dias corridos, a partir da data da compra, para acessar os primeiros
              módulos, conversar com o Mentor Digital e aplicar pelo menos um protocolo do método na
              sua equipe. Tempo suficiente para sentir na prática se a técnica corresponde à
              realidade da sua liderança.
            </p>
            <p>
              Se, dentro desse prazo, você concluir que o método não é para o seu momento, basta
              pedir o reembolso. Você recebe de volta o valor integral, sem formulário longo, sem
              justificativa detalhada e sem constrangimento. O risco fica com quem criou o método,
              não com você.
            </p>
          </div>
        </div>
      </section>
      <section className="final-band final-faq" aria-labelledby="final-faq-title">
        <div className="final-inner">
          <h2 className="final-title" id="final-faq-title" data-final-reveal>
            As perguntas que passam pela sua cabeça antes de decidir
          </h2>
          <FinalFaq />
        </div>
      </section>
      <section className="final-band final-closing" aria-labelledby="final-closing-title">
        <div className="final-inner">
          <h2 className="final-title" id="final-closing-title" data-final-reveal>
            <span>A conta que ninguém faz:</span>{" "}
            <span>
              <span className="final-accent">Quanto custa</span> continuar
            </span>{" "}
            <span>
              liderando no <span className="final-accent">improviso</span>?
            </span>
          </h2>
          <div className="final-copy" data-final-reveal>
            <p>
              O cargo você já tem. O que ainda não veio junto com ele é a técnica de liderar, e é
              ela que separa quem carrega o crachá de quem a equipe segue de verdade.
            </p>
            <p>
              Enquanto essa técnica não chega, a fatura corre por fora, na reunião que termina sem
              decisão, no talento que pede demissão, na vaga de diretoria que vai para outra pessoa
              com o mesmo tempo de casa que você, mas que já tem método e aplica para liderar o
              time.
            </p>
          </div>
          <p className="final-editorial" data-final-reveal>
            Liderança não é dom. É técnica.
            <br />E técnica, a partir de hoje, você pode aprender
          </p>
          <div className="final-closing-cta" data-final-reveal>
            <FinalCta />
          </div>
        </div>
      </section>
      <footer className="final-footer">
        <div className="final-inner">
          <img src={logo.url} alt="VC Líder" width="1827" height="384" loading="lazy" />
          <div className="final-legal">
            <p>© 2026 VC_Líder. Todos os direitos reservados.</p>
            <p>
              SDA Educação e Desenvolvimento LTDA | CNPJ: 27.008.329/0001-55 | São Paulo/SP |{" "}
              <a href="mailto:suporte@julienesalvan.com.br">suporte@julienesalvan.com.br</a> |
            </p>
            <p className="final-legal-notices">
              Este produto não garante a obtenção de resultados. Qualquer estratégia mencionada
              neste site ou no produto não deve ser interpretada como uma promessa ou garantia de
              resultados. O seu nível de sucesso em atingir os resultados divulgados depende do seu
              tempo dedicado, dedicação, conhecimento e competência técnica. Este site não faz parte
              do site do Facebook ou do Facebook Inc. Além disso, este site NÃO é endossado pelo
              Facebook de nenhuma maneira. FACEBOOK é uma marca comercial da FACEBOOK, Inc. A
              Hotmart é a plataforma que processa os pagamentos e distribui o produto digital. Ela
              não realiza o controle editorial prévio dos produtos comercializados, tampouco avalia
              a tecnicidade e experiência daqueles que os produzem.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
