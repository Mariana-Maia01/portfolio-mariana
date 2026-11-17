import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PdiGoal } from "@/types/portfolio";
import { pdiGoals, pdiMeta } from "@/data/pdi";
import { today, type PdiDocument } from "@/lib/pdi-schema";
import * as api from "@/lib/pdi-api";

/** Dados de src/data/pdi.ts: usados até existir uma versão salva pelo painel. */
export const staticPdi: PdiDocument = { version: 1, lastUpdated: pdiMeta.lastUpdated, goals: pdiGoals };

interface PdiContextValue {
  doc: PdiDocument;
  admin: boolean;
  /** API e variáveis de ambiente prontas (false em `npm run dev`). */
  configured: boolean;
  saving: boolean;
  error: string | null;
  clearError: () => void;
  saveGoal: (goal: PdiGoal) => Promise<boolean>;
  deleteGoal: (id: string) => Promise<boolean>;
  toggleAction: (goalId: string, index: number) => Promise<boolean>;
  /** Substitui o que está no banco pelos dados de src/data/pdi.ts. */
  resetToFile: () => Promise<boolean>;
  signIn: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const noop = async () => false;
const PdiContext = createContext<PdiContextValue>({
  doc: staticPdi,
  admin: false,
  configured: false,
  saving: false,
  error: null,
  clearError: () => {},
  saveGoal: noop,
  deleteGoal: noop,
  toggleAction: noop,
  resetToFile: noop,
  signIn: async () => {},
  signOut: async () => {},
});

export const usePdi = () => useContext(PdiContext);

export const PdiProvider = ({ children }: { children: ReactNode }) => {
  const [doc, setDoc] = useState<PdiDocument>(staticPdi);
  const [admin, setAdmin] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const docRef = useRef(doc);
  docRef.current = doc;

  useEffect(() => {
    let alive = true;
    api.fetchPdi().then((remote) => alive && remote && setDoc(remote));
    api.fetchSession().then((s) => {
      if (!alive) return;
      setAdmin(s.admin);
      setConfigured(s.configured);
    });
    return () => {
      alive = false;
    };
  }, []);

  /** Atualização otimista: mostra na hora e desfaz se o servidor recusar. */
  const commit = useCallback(async (mutate: (goals: PdiGoal[]) => PdiGoal[]) => {
    const previous = docRef.current;
    const next: PdiDocument = { ...previous, lastUpdated: today(), goals: mutate(previous.goals) };
    setDoc(next);
    setSaving(true);
    setError(null);
    try {
      setDoc(await api.savePdi(next));
      return true;
    } catch (e) {
      setDoc(previous);
      const message = e instanceof Error ? e.message : "Não foi possível salvar.";
      setError(message);
      if (/autorizado/i.test(message)) setAdmin(false);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const value = useMemo<PdiContextValue>(
    () => ({
      doc,
      admin,
      configured,
      saving,
      error,
      clearError: () => setError(null),
      saveGoal: (goal) =>
        commit((goals) => {
          const stamped = { ...goal, updatedAt: today() };
          return goals.some((g) => g.id === goal.id)
            ? goals.map((g) => (g.id === goal.id ? stamped : g))
            : [...goals, stamped];
        }),
      deleteGoal: (id) => commit((goals) => goals.filter((g) => g.id !== id)),
      toggleAction: (goalId, index) =>
        commit((goals) =>
          goals.map((g) =>
            g.id !== goalId
              ? g
              : {
                  ...g,
                  updatedAt: today(),
                  actionPlan: g.actionPlan.map((a, i) => (i === index ? { ...a, done: !a.done } : a)),
                },
          ),
        ),
      resetToFile: () => commit(() => staticPdi.goals),
      signIn: async (password) => {
        await api.login(password);
        setAdmin(true);
      },
      signOut: async () => {
        await api.logout().catch(() => {});
        setAdmin(false);
      },
    }),
    [doc, admin, configured, saving, error, commit],
  );

  return <PdiContext.Provider value={value}>{children}</PdiContext.Provider>;
};
