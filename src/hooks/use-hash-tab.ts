import { useCallback, useEffect, useState } from "react";
import { tabAliases, tabs, type TabId } from "@/data/navigation";

const TAB_IDS = tabs.map((t) => t.id) as string[];

/** Converte um hash da URL em { aba, âncora opcional }. Retorna null para âncoras que não trocam de aba (ex.: #contato). */
export function resolveHash(hash: string): { tab: TabId; anchor?: string } | null {
  const h = decodeURIComponent(hash.replace(/^#/, ""));
  if (!h) return { tab: "sobre" };
  if (TAB_IDS.includes(h)) return { tab: h as TabId };
  if (tabAliases[h]) return { tab: tabAliases[h], anchor: h === "inicio" ? undefined : h };
  if (h.startsWith("projeto-")) return { tab: "projetos", anchor: h };
  return null;
}

export function useHashTab() {
  const [state, setState] = useState(() => {
    const r = typeof window !== "undefined" ? resolveHash(window.location.hash) : null;
    return { tab: r?.tab ?? ("sobre" as TabId), anchor: r?.anchor, nonce: 0 };
  });

  useEffect(() => {
    const onHash = () => {
      const r = resolveHash(window.location.hash);
      if (r) setState((s) => ({ tab: r.tab, anchor: r.anchor, nonce: s.nonce + 1 }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Depois de trocar de aba: rola até a âncora pedida (esperando a aba nova montar) ou para o topo.
  useEffect(() => {
    if (state.nonce === 0) return;
    if (!state.anchor) {
      window.scrollTo({ top: 0 });
      return;
    }
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(state.anchor!);
      if (el || ++tries > 30) {
        window.clearInterval(timer);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [state]);

  const goTo = useCallback((tab: TabId) => {
    if (window.location.hash === `#${tab}`) window.scrollTo({ top: 0, behavior: "smooth" });
    else window.location.hash = tab;
  }, []);

  return { tab: state.tab, goTo };
}
