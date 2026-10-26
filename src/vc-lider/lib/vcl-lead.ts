// Lead identification + Hotmart checkout decoration. Browser-only: call from effects/handlers.
const LEAD_COOKIE = "vc_lead_id";
const CHECKOUT_COOKIE = "vc_checkout";
const SESSION_KEY = "vc_clique_vendas_sent";
const WEBHOOK_VENDAS = "https://n8n.julienesalvan.com.br/webhook/clique-vendas";
const WEBHOOK_CHECKOUT = "https://n8n.julienesalvan.com.br/webhook/clique-checkout";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function cookieDomain(): string {
  const h = window.location.hostname;
  return h === "julienesalvan.com.br" || h.endsWith(".julienesalvan.com.br")
    ? "; domain=.julienesalvan.com.br"
    : "";
}

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/${cookieDomain()}; SameSite=Lax; Secure`;
}

export function getCookie(name: string): string | null {
  const m = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
  if (!m) return null;
  try {
    return decodeURIComponent(m.slice(name.length + 1));
  } catch {
    return null;
  }
}

export function getLeadId(): string | null {
  const v = getCookie(LEAD_COOKIE);
  return v && UUID_RE.test(v) ? v : null;
}

function post(url: string, leadId: string) {
  try {
    const body = JSON.stringify({ lead_id: leadId });
    if (navigator.sendBeacon) {
      if (navigator.sendBeacon(url, new Blob([body], { type: "text/plain" }))) return;
    }
    void fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "text/plain" },
      keepalive: true,
      mode: "no-cors",
    }).catch(() => {});
  } catch {
    /* silent */
  }
}

export function initLead() {
  try {
    const lid = new URLSearchParams(window.location.search).get("lid");
    if (lid && UUID_RE.test(lid)) setCookie(LEAD_COOKIE, lid, 180);
    const leadId = getLeadId();
    if (!leadId) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable: still send once per load */
    }
    post(WEBHOOK_VENDAS, leadId);
  } catch {
    /* silent */
  }
}

type CheckoutData = { name?: string; email?: string; phone?: string };

function getCheckoutData(): CheckoutData | null {
  const raw = getCookie(CHECKOUT_COOKIE);
  if (!raw) return null;
  try {
    const d = JSON.parse(raw);
    return d && typeof d === "object" ? d : null;
  } catch {
    return null;
  }
}

function addIfMissing(p: URLSearchParams, key: string, value: string | undefined) {
  if (value && !p.has(key)) p.set(key, value);
}

/** Appends xcod/name/email/phone without removing or overwriting existing params. */
export function decorateCheckoutUrl(href: string): string {
  try {
    const url = new URL(href);
    if (!url.hostname.endsWith("pay.hotmart.com")) return href;
    const p = url.searchParams;
    const leadId = getLeadId();
    if (leadId) addIfMissing(p, "xcod", leadId);
    const d = getCheckoutData();
    if (d) {
      addIfMissing(p, "name", typeof d.name === "string" ? d.name : undefined);
      addIfMissing(p, "email", typeof d.email === "string" ? d.email : undefined);
      const digits = typeof d.phone === "string" ? d.phone.replace(/\D/g, "") : "";
      if (digits.length === 10 || digits.length === 11) {
        addIfMissing(p, "phoneac", digits.slice(0, 2));
        addIfMissing(p, "phonenumber", digits.slice(2));
      }
    }
    return url.toString();
  } catch {
    return href;
  }
}

export function trackCheckoutClick() {
  const leadId = getLeadId();
  if (leadId) post(WEBHOOK_CHECKOUT, leadId);
}
