import { useAudience } from "@/vc-lider/hooks/use-audience";

const forYou = [
  "Assumiu uma equipe e quer liderar com mais segurança.",
  "Já lidera, mas ainda trava ao delegar, dar feedback ou enfrentar conflitos.",
  "Resolve o trabalho de todos e fica sem tempo para o seu.",
  "Conhece a teoria, mas sente dificuldade para aplicá-la sob pressão.",
  "Está se preparando para sua primeira liderança ou para assumir responsabilidades maiores.",
];

const notForYou = [
  "Busca apenas um certificado, sem intenção de mudar sua prática.",
  "Procura fórmulas prontas, sem disposição para aprender e praticar.",
  "Quer mentoria individual ou encontros ao vivo com Juliene — esta formação não inclui esses atendimentos.",
  "Busca acompanhamento terapêutico para questões fora do contexto profissional.",
];

export function AudienceSection() {
  const { ref } = useAudience();
  return (
    <section className="audience-section" aria-labelledby="audience-title" ref={ref}>
      <div className="audience-inner">
        <h2 id="audience-title" className="sr-only">
          É para você ou não é para você
        </h2>
        <div className="audience-grid">
          <div className="audience-card audience-card-positive" data-audience-reveal>
            <h3 className="audience-card-title">É para você se…</h3>
            <ul className="audience-list">
              {forYou.map((item) => (
                <li key={item} className="audience-item audience-item-positive">
                  <span className="audience-mark" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="audience-card audience-card-negative" data-audience-reveal>
            <h3 className="audience-card-title">Não é para você se…</h3>
            <ul className="audience-list">
              {notForYou.map((item) => (
                <li key={item} className="audience-item audience-item-negative">
                  <span className="audience-mark" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
