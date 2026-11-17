import { describe, expect, it } from "vitest";
import { pdiAreas, pdiGoals, pdiHistory, pdiMeta } from "@/data/pdi";
import { projects } from "@/data/projects";
import { courses } from "@/data/education";
import { collectActivities, countByStatus, filterGoals, goalProgress, goalStatus } from "@/lib/pdi";
import { formatDate, formatPeriod } from "@/lib/date";

const DATE_RE = /^\d{4}(-\d{2}(-\d{2})?)?$/;

describe("dados do PDI", () => {
  it("todo objetivo pertence a uma área existente e tem id único", () => {
    const areaIds = new Set(pdiAreas.map((a) => a.id));
    const ids = pdiGoals.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    pdiGoals.forEach((g) => expect(areaIds.has(g.areaId)).toBe(true));
  });

  it("toda área tem ao menos um objetivo", () => {
    pdiAreas.forEach((a) => expect(pdiGoals.some((g) => g.areaId === a.id)).toBe(true));
  });

  it("evidências que apontam para projetos referenciam projetos existentes", () => {
    const projectIds = new Set(projects.map((p) => p.id));
    pdiGoals.flatMap((g) => g.evidences).forEach((e) => {
      if (e.projectId) expect(projectIds.has(e.projectId)).toBe(true);
    });
  });

  it("todo objetivo tem ao menos uma ação no plano", () => {
    pdiGoals.forEach((g) => expect(g.actionPlan.length).toBeGreaterThan(0));
  });

  it("objetivos concluídos possuem evidência", () => {
    pdiGoals
      .filter((g) => goalStatus(g) === "concluido")
      .forEach((g) => expect(g.evidences.length).toBeGreaterThan(0));
  });

  it("datas seguem o formato AAAA, AAAA-MM ou AAAA-MM-DD", () => {
    expect(pdiMeta.lastUpdated).toMatch(DATE_RE);
    pdiHistory.forEach((h) => expect(h.date).toMatch(DATE_RE));
    pdiGoals.forEach((g) => {
      expect(g.updatedAt).toMatch(DATE_RE);
      g.activities.forEach((a) => expect(a.date).toMatch(DATE_RE));
    });
  });

  it("certificação só aparece como concluída se marcada explicitamente", () => {
    courses
      .filter((c) => c.kind === "certificacao")
      .forEach((c) => expect(["concluido", "em-andamento", "planejado"]).toContain(c.status));
  });
});

describe("helpers", () => {
  it("goalProgress calcula a proporção de ações concluídas", () => {
    const g = { ...pdiGoals[0], actionPlan: [{ description: "a", done: true }, { description: "b", done: false }] };
    expect(goalProgress(g)).toEqual({ done: 1, total: 2, ratio: 0.5 });
  });

  it("goalStatus deriva o status das ações", () => {
    const base = pdiGoals[0];
    const plan = (...done: boolean[]) => ({ ...base, actionPlan: done.map((d, i) => ({ description: `${i}`, done: d })) });
    expect(goalStatus(plan(false, false))).toBe("nao-iniciado");
    expect(goalStatus(plan(true, false))).toBe("em-andamento");
    expect(goalStatus(plan(true, true))).toBe("concluido");
  });

  it("countByStatus soma o total de objetivos", () => {
    const c = countByStatus(pdiGoals);
    expect(c.concluido + c["em-andamento"] + c["nao-iniciado"]).toBe(pdiGoals.length);
  });

  it("filterGoals combina filtros", () => {
    const r = filterGoals(pdiGoals, { areaId: "qa", horizon: "curto", status: "all" });
    expect(r.every((g) => g.areaId === "qa" && g.horizon === "curto")).toBe(true);
  });

  it("collectActivities ordena da mais recente para a mais antiga", () => {
    const dates = collectActivities(pdiGoals).map((a) => a.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("formatDate e formatPeriod", () => {
    expect(formatDate("2026-05")).toBe("mai 2026");
    expect(formatDate("2026-11-16")).toBe("16 nov 2026");
    expect(formatPeriod("2026-05")).toBe("mai 2026 — atual");
    expect(formatPeriod("2025-01", "2025-12", "2025")).toBe("2025");
  });
});
