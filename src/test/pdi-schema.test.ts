import { describe, expect, it } from "vitest";
import { parsePdiDocument } from "@/lib/pdi-schema";
import { pdiGoals, pdiMeta } from "@/data/pdi";

const valid = { version: 1, lastUpdated: pdiMeta.lastUpdated, goals: pdiGoals };

describe("validação do documento do PDI (painel admin)", () => {
  it("aceita os dados atuais do pdi.ts", () => {
    expect(parsePdiDocument(JSON.parse(JSON.stringify(valid)))?.goals).toHaveLength(pdiGoals.length);
  });

  it("recusa versão, datas, prazos e ids inválidos", () => {
    expect(parsePdiDocument({ ...valid, version: 2 })).toBeNull();
    expect(parsePdiDocument({ ...valid, lastUpdated: "ontem" })).toBeNull();
    expect(parsePdiDocument({ ...valid, goals: [{ ...pdiGoals[0], horizon: "agora" }] })).toBeNull();
    expect(parsePdiDocument({ ...valid, goals: [{ ...pdiGoals[0], id: "<script>" }] })).toBeNull();
    expect(parsePdiDocument({ ...valid, goals: [pdiGoals[0], pdiGoals[0]] })).toBeNull();
  });

  it("recusa títulos vazios e textos grandes demais", () => {
    expect(parsePdiDocument({ ...valid, goals: [{ ...pdiGoals[0], competency: "   " }] })).toBeNull();
    expect(parsePdiDocument({ ...valid, goals: [{ ...pdiGoals[0], objective: "x".repeat(5000) }] })).toBeNull();
  });

  it("recusa ações sem booleano", () => {
    const g = { ...pdiGoals[0], actionPlan: [{ description: "a", done: "sim" }] };
    expect(parsePdiDocument({ ...valid, goals: [g] })).toBeNull();
  });
});
