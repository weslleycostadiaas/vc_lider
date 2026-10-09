const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DOMINIO_RAIZ = "julienesalvan.com.br";
export const VCLIDER_ORIGIN = "https://vclider1.julienesalvan.com.br";
const WEBHOOK_VISITA = "https://n8n.julienesalvan.com.br/webhook/visita-video";
const SESSAO_VISITA = "vc_visita_video_enviada";

export function isUuid(valor: unknown): valor is string {
  return typeof valor === "string" && UUID_RE.test(valor);
}

export function setCookie(nome: string, valor: string, dias: number) {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const usaDominio = host === DOMINIO_RAIZ || host.endsWith(`.${DOMINIO_RAIZ}`);
  const expira = new Date(Date.now() + dias * 864e5).toUTCString();
  let cookie = `${nome}=${valor}; expires=${expira}; path=/; SameSite=Lax`;
  if (window.location.protocol === "https:") cookie += "; Secure";
  if (usaDominio) cookie += `; domain=.${DOMINIO_RAIZ}`;
  document.cookie = cookie;
}

export function getCookie(nome: string): string | null {
  if (typeof document === "undefined") return null;
  for (const parte of document.cookie.split(";")) {
    const [k, ...v] = parte.trim().split("=");
    if (k === nome) return v.join("=");
  }
  return null;
}

export function getLeadId(): string | null {
  const v = getCookie("vc_lead_id");
  return isUuid(v) ? v : null;
}

/** Lê ?lid= da URL e grava vc_lead_id (prioridade sobre o salvo). */
export function salvarLeadIdDaUrl() {
  if (typeof window === "undefined") return;
  const lid = new URLSearchParams(window.location.search).get("lid");
  if (isUuid(lid)) setCookie("vc_lead_id", lid, 180);
}

export function salvarLeadAposCaptura(
  respostaJson: unknown,
  dados: { nome: string; email: string; telefone: string },
) {
  try {
    const leadId = (respostaJson as { lead_id?: unknown } | null)?.lead_id;
    if (isUuid(leadId)) setCookie("vc_lead_id", leadId, 180);
    let phone = dados.telefone.replace(/\D/g, "");
    if (phone.length > 11 && phone.startsWith("55")) phone = phone.slice(2);
    setCookie(
      "vc_checkout",
      encodeURIComponent(
        JSON.stringify({ name: dados.nome.trim(), email: dados.email.trim().toLowerCase(), phone }),
      ),
      30,
    );
  } catch {
    /* silencioso */
  }
}

export function enviarSemEsperar(url: string, corpo: unknown) {
  try {
    const texto = JSON.stringify(corpo);
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      if (navigator.sendBeacon(url, new Blob([texto], { type: "text/plain" }))) return;
    }
    void fetch(url, {
      method: "POST",
      body: texto,
      headers: { "Content-Type": "text/plain" },
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* silencioso */
  }
}

export function registrarVisitaVideo(leadId: string) {
  try {
    if (window.sessionStorage.getItem(SESSAO_VISITA)) return;
    window.sessionStorage.setItem(SESSAO_VISITA, "1");
  } catch {
    /* storage indisponível — envia mesmo assim */
  }
  enviarSemEsperar(WEBHOOK_VISITA, { lead_id: leadId });
}

/** Acrescenta lid= a links do vclider1, preservando parâmetros existentes. */
export function comLeadId(href: string, leadId: string | null): string {
  if (!leadId) return href;
  try {
    const url = new URL(href);
    if (url.origin !== VCLIDER_ORIGIN) return href;
    url.searchParams.set("lid", leadId);
    return url.toString();
  } catch {
    return href;
  }
}
