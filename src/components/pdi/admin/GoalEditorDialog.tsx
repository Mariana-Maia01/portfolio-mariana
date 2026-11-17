import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { PdiAction, PdiGoal, PdiHorizon } from "@/types/portfolio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HORIZON_LABEL } from "@/lib/pdi";
import { PDI_LIMITS, today } from "@/lib/pdi-schema";
import { pdiAreas } from "@/data/pdi";
import { usePdi } from "@/context/PdiProvider";
import { cn } from "@/lib/utils";

interface Props {
  /** Objetivo a editar; null = criar novo. */
  goal: PdiGoal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HORIZONS: PdiHorizon[] = ["curto", "medio", "longo"];

const slug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "objetivo";

const field =
  "w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";

export const GoalEditorDialog = ({ goal, open, onOpenChange }: Props) => {
  const { doc, saveGoal, saving, error, clearError } = usePdi();
  const [competency, setCompetency] = useState("");
  const [objective, setObjective] = useState("");
  const [horizon, setHorizon] = useState<PdiHorizon>("curto");
  const [actions, setActions] = useState<PdiAction[]>([]);

  useEffect(() => {
    if (!open) return;
    clearError();
    setCompetency(goal?.competency ?? "");
    setObjective(goal?.objective ?? "");
    setHorizon(goal?.horizon ?? "curto");
    setActions(goal?.actionPlan.length ? goal.actionPlan : [{ description: "", done: false }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, goal]);

  const updateAction = (i: number, patch: Partial<PdiAction>) =>
    setActions((list) => list.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const actionPlan = actions
      .map((a) => ({ ...a, description: a.description.trim() }))
      .filter((a) => a.description);

    let id = goal?.id ?? slug(competency);
    if (!goal) {
      const taken = new Set(doc.goals.map((g) => g.id));
      let n = 2;
      const base = id;
      while (taken.has(id)) id = `${base}-${n++}`;
    }

    const next: PdiGoal = {
      id,
      areaId: goal?.areaId ?? pdiAreas[0]?.id ?? "geral",
      competency: competency.trim(),
      objective: objective.trim(),
      justification: goal?.justification ?? "",
      horizon,
      actionPlan,
      activities: goal?.activities ?? [],
      evidences: goal?.evidences ?? [],
      nextSteps: goal?.nextSteps ?? [],
      updatedAt: today(),
    };
    if (await saveGoal(next)) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-3xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{goal ? "Editar objetivo" : "Novo objetivo"}</DialogTitle>
          <DialogDescription>O status e o progresso são calculados pelas ações marcadas como concluídas.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="goal-competency" className="text-sm font-medium">
              Título
            </label>
            <input
              id="goal-competency"
              required
              maxLength={PDI_LIMITS.competency}
              value={competency}
              onChange={(e) => setCompetency(e.target.value)}
              className={field}
              placeholder="Ex.: Certificação AWS AI Practitioner"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="goal-objective" className="text-sm font-medium">
              Objetivo
            </label>
            <textarea
              id="goal-objective"
              required
              rows={3}
              maxLength={PDI_LIMITS.objective}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className={cn(field, "resize-y")}
            />
          </div>

          <fieldset className="space-y-1.5">
            <legend className="text-sm font-medium">Prazo</legend>
            <div className="inline-flex rounded-full border border-border bg-background/60 p-1">
              {HORIZONS.map((h) => (
                <button
                  key={h}
                  type="button"
                  aria-pressed={horizon === h}
                  onClick={() => setHorizon(h)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    horizon === h ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {HORIZON_LABEL[h]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Plano de ação</legend>
            {actions.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={a.done}
                  onChange={(e) => updateAction(i, { done: e.target.checked })}
                  aria-label={`Ação ${i + 1} concluída`}
                  className="h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                />
                <input
                  value={a.description}
                  maxLength={PDI_LIMITS.action}
                  onChange={(e) => updateAction(i, { description: e.target.value })}
                  aria-label={`Descrição da ação ${i + 1}`}
                  placeholder="Descreva a ação"
                  className={field}
                />
                <button
                  type="button"
                  onClick={() => setActions((list) => list.filter((_, idx) => idx !== i))}
                  aria-label={`Remover ação ${i + 1}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                >
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
            ))}
            {actions.length < PDI_LIMITS.maxActions && (
              <button
                type="button"
                onClick={() => setActions((list) => [...list, { description: "", done: false }])}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Plus size={14} aria-hidden /> Adicionar ação
              </button>
            )}
          </fieldset>

          {error && (
            <p role="alert" className="text-sm text-rose-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary/50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !competency.trim() || !objective.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving && <Loader2 size={15} className="animate-spin" aria-hidden />}
              Salvar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
