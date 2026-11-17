/**
 * Formato e validação do documento do PDI salvo no banco.
 * Usado no navegador (antes de enviar) e no servidor (antes de gravar),
 * por isso não importa nada com alias "@/".
 */
import type { PdiAction, PdiGoal, PdiHorizon } from "../types/portfolio.js";

export interface PdiDocument {
  version: 1;
  /** "AAAA-MM-DD" */
  lastUpdated: string;
  goals: PdiGoal[];
}

export const PDI_LIMITS = {
  maxGoals: 60,
  maxActions: 20,
  competency: 120,
  objective: 600,
  justification: 1200,
  action: 400,
  maxBodyBytes: 200_000,
} as const;

const HORIZONS: PdiHorizon[] = ["curto", "medio", "longo"];
const DATE_RE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const ID_RE = /^[a-z0-9-]{1,80}$/;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

function str(v: unknown, max: number, { required = false } = {}): string | null {
  if (typeof v !== "string") return required ? null : "";
  const t = v.trim();
  if (required && !t) return null;
  if (t.length > max) return null;
  return t;
}

function parseAction(v: unknown): PdiAction | null {
  if (!isObj(v)) return null;
  const description = str(v.description, PDI_LIMITS.action, { required: true });
  if (description === null || typeof v.done !== "boolean") return null;
  return { description, done: v.done };
}

export function parseGoal(v: unknown): PdiGoal | null {
  if (!isObj(v)) return null;
  const id = typeof v.id === "string" && ID_RE.test(v.id) ? v.id : null;
  const areaId = typeof v.areaId === "string" && ID_RE.test(v.areaId) ? v.areaId : null;
  const competency = str(v.competency, PDI_LIMITS.competency, { required: true });
  const objective = str(v.objective, PDI_LIMITS.objective, { required: true });
  const justification = str(v.justification, PDI_LIMITS.justification);
  const horizon = HORIZONS.includes(v.horizon as PdiHorizon) ? (v.horizon as PdiHorizon) : null;
  const updatedAt = typeof v.updatedAt === "string" && DATE_RE.test(v.updatedAt) ? v.updatedAt : null;
  if (!id || !areaId || competency === null || objective === null || justification === null || !horizon || !updatedAt) {
    return null;
  }
  if (!Array.isArray(v.actionPlan) || v.actionPlan.length > PDI_LIMITS.maxActions) return null;
  const actionPlan: PdiAction[] = [];
  for (const a of v.actionPlan) {
    const parsed = parseAction(a);
    if (!parsed) return null;
    actionPlan.push(parsed);
  }
  // Campos que o painel não edita: mantidos quando válidos, senão vazios.
  const strings = (arr: unknown) =>
    Array.isArray(arr) ? arr.filter((s): s is string => typeof s === "string").slice(0, 20).map((s) => s.slice(0, 400)) : [];
  const activities = Array.isArray(v.activities)
    ? v.activities
        .filter((a): a is { date: string; description: string } =>
          isObj(a) && typeof a.date === "string" && DATE_RE.test(a.date) && typeof a.description === "string",
        )
        .slice(0, 50)
        .map((a) => ({ date: a.date, description: a.description.slice(0, 400) }))
    : [];
  return {
    id,
    areaId,
    competency,
    objective,
    justification,
    horizon,
    actionPlan,
    activities,
    evidences: [],
    nextSteps: strings(v.nextSteps),
    updatedAt,
  };
}

/** Valida um documento completo. Retorna null se qualquer parte for inválida. */
export function parsePdiDocument(v: unknown): PdiDocument | null {
  if (!isObj(v) || v.version !== 1) return null;
  if (typeof v.lastUpdated !== "string" || !DATE_RE.test(v.lastUpdated)) return null;
  if (!Array.isArray(v.goals) || v.goals.length > PDI_LIMITS.maxGoals) return null;
  const goals: PdiGoal[] = [];
  const ids = new Set<string>();
  for (const g of v.goals) {
    const parsed = parseGoal(g);
    if (!parsed || ids.has(parsed.id)) return null;
    ids.add(parsed.id);
    goals.push(parsed);
  }
  return { version: 1, lastUpdated: v.lastUpdated, goals };
}

/** Data local de hoje no formato "AAAA-MM-DD". */
export function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
