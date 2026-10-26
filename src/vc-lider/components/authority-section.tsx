const rhs = { url: "/imagens/autoridade-v2-1.webp" };
const podcast = { url: "/imagens/autoridade-v2-2.webp" };
const bett = { url: "/imagens/autoridade-v2-3.webp" };
const bora = { url: "/imagens/autoridade-v2-4.webp" };
import { authorityTotals, useAuthority } from "@/vc-lider/hooks/use-authority";

const cards = [
  {
    asset: rhs,
    alt: "Juliene Salvan, finalista na premiação RHs Mais Admirados 2024/25/26, do Grupo Gestão RH.",
    width: 941,
    height: 1671,
  },
  {
    asset: podcast,
    alt: "Juliene Salvan, apresentadora do Podcast Passa Lá no RH, Band, sobre os desafios reais de gestão e liderança.",
    width: 941,
    height: 1671,
  },
  {
    asset: bett,
    alt: "Juliene Salvan, painelista no Bett Brasil, Maior Evento de Educação da América Latina — British Educational Training and Technology.",
    width: 941,
    height: 1671,
  },
  {
    asset: bora,
    alt: "Juliene Salvan, colunista de carreira e liderança no Programa Bora SP, Band.",
    width: 941,
    height: 1671,
  },
];
const labels = [
  "anos em gestão de pessoas",
  "líderes mentorados",
  "episódios de podcast sobre gestão",
];

export function AuthoritySection() {
  const { ref, values } = useAuthority();
  return (
    <section className="authority-section" aria-labelledby="authority-title" ref={ref}>
      <div className="authority-header">
        <div className="authority-inner">
          <div className="authority-copy">
            <h2 id="authority-title" data-authority-reveal>
              Eu também vivo os desafios de liderar.
              <br /> Todos os dias.
            </h2>
            <div className="authority-description" data-authority-reveal>
              <p>
                Sou Juliene Salvan, diretora de RH do Grupo Bandeirantes, com mais de 20 anos de
                experiência em gestão de pessoas.
              </p>
              <p>
                Conduzir conversas difíceis, desenvolver líderes e tomar decisões sob pressão fazem
                parte da minha rotina. Foi dessa experiência que nasceu o VC_Líder.
              </p>
              <p className="authority-quote">
                Liderança é técnica. E técnica se aprende, se treina e se aplica.
              </p>
            </div>
          </div>
          <dl className="authority-stats">
            {labels.map((label, index) => (
              <div className="authority-stat" key={label}>
                <dt>{label}</dt>
                <dd>
                  <span className="sr-only">{authorityTotals[index]}+</span>
                  <span className="authority-number" aria-hidden="true">
                    <span className="authority-digits">{values[index]}</span>
                    <span>+</span>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="authority-gallery">
        <ol className="authority-cards" aria-label="Reconhecimentos e atuação de Juliene Salvan">
          {cards.map(({ asset, alt, width, height }) => (
            <li className="authority-card" key={asset.url}>
              <img
                data-authority-reveal
                src={asset.url}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
