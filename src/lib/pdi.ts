import type { PdiGoal, PdiHorizon, PdiStatus } from "@/types/portfolio";

export const STATUS_LABEL: Record<PdiStatus, string> = {
  "nao-iniciado": "Não iniciado",
  "em-andamento": "Em andamento",
  concluido: "Concluído",
};

export const HORIZON_LABEL: Record<PdiHorizon, string> = {
  curto: "Curto prazo",
  medio: "Médio prazo",
  longo: "Longo prazo",
};

export const STATUS_ORDER: PdiStatus[] = ["em-andamento", "nao-iniciado", "concluido"];

/** Progresso real de um objetivo: ações concluídas / ações planejadas. */
export function goalProgress(goal: PdiGoal) {
  const total = goal.actionPlan.length;
  const done = goal.actionPlan.filter((a) => a.done).length;
  return { done, total, ratio: total === 0 ? 0 : done / total };
}

/** Status derivado das ações: nenhuma feita = não iniciado, todas = concluído, senão em andamento. */
export function goalStatus(goal: PdiGoal): PdiStatus {
  const { done, total } = goalProgress(goal);
  if (done === 0) return "nao-iniciado";
  if (done === total) return "concluido";
  return "em-andamento";
}

/** Contagem de objetivos por status para um conjunto de objetivos. */
export function countByStatus(goals: PdiGoal[]): Record<PdiStatus, number> {
  return goals.reduce(
    (acc, g) => {
      acc[goalStatus(g)] += 1;
      return acc;
    },
    { "nao-iniciado": 0, "em-andamento": 0, concluido: 0 } as Record<PdiStatus, number>,
  );
}

/** Todas as atividades de todos os objetivos, mais recentes primeiro. */
export function collectActivities(goals: PdiGoal[]) {
  return goals
    .flatMap((g) => g.activities.map((a) => ({ ...a, goalId: g.id, competency: g.competency })))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function filterGoals(
  goals: PdiGoal[],
  filters: { areaId?: string | "all"; horizon?: PdiHorizon | "all"; status?: PdiStatus | "all" },
) {
  return goals.filter(
    (g) =>
      (!filters.areaId || filters.areaId === "all" || g.areaId === filters.areaId) &&
      (!filters.horizon || filters.horizon === "all" || g.horizon === filters.horizon) &&
      (!filters.status || filters.status === "all" || goalStatus(g) === filters.status),
  );
}
