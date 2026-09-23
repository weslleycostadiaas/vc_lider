const CHAVE_STORAGE = "radar_rastreio";

const CHAVES_RASTREIO = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
] as const;

function lerParametrosDaUrl(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const parametros = new URLSearchParams(window.location.search);
  const encontrados: Record<string, string> = {};
  parametros.forEach((valor, chave) => {
    if ((CHAVES_RASTREIO as readonly string[]).includes(chave)) {
      encontrados[chave] = valor;
    }
  });
  return encontrados;
}

function lerDoStorage(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const bruto = window.sessionStorage.getItem(CHAVE_STORAGE);
    if (!bruto) return {};
    const parsed = JSON.parse(bruto) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Guarda os parâmetros de rastreio da URL atual (chame na primeira página da visita). */
export function salvarRastreioDaUrl() {
  const encontrados = lerParametrosDaUrl();
  if (Object.keys(encontrados).length === 0) return;
  try {
    const anteriores = lerDoStorage();
    window.sessionStorage.setItem(
      CHAVE_STORAGE,
      JSON.stringify({ ...anteriores, ...encontrados }),
    );
  } catch {
    // storage indisponível — segue sem persistir
  }
}

/** ID único do evento, compartilhado entre o evento Lead do pixel e o webhook. */
export function gerarEventoId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Dispara o evento Lead no pixel do Meta (se instalado) e empurra o evento para o dataLayer do GTM, com o mesmo ID de evento. */
export function dispararLeadPixel(eventoId: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.fbq === "function") {
    w.fbq(
      "track",
      "Lead",
      { content_name: "Radar do Líder" },
      { eventID: eventoId },
    );
  }
  // Evento para o GTM: use "gerarLead" como gatilho de evento personalizado.
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: "gerarLead", evento_id: eventoId });
  }
}

/** Monta o objeto de rastreio: URL atual tem prioridade; o resto vem do que foi salvo na entrada. */
export function coletarRastreio(): Record<string, string> {
  const rastreio: Record<string, string> = {
    ...lerDoStorage(),
    ...lerParametrosDaUrl(),
  };
  rastreio["url"] = window.location.href;
  rastreio["pagina"] = window.location.pathname;
  rastreio["referrer"] = document.referrer || "";
  return rastreio;
}
