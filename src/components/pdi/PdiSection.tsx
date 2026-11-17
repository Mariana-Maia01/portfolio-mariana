import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import type { PdiHorizon, PdiStatus } from "@/types/portfolio";
import type { PdiGoal } from "@/types/portfolio";
import { pdiMeta } from "@/data/pdi";
import { usePdi } from "@/context/PdiProvider";
import { AdminToolbar } from "./admin/AdminToolbar";
import { GoalEditorDialog } from "./admin/GoalEditorDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { STATUS_LABEL, countByStatus, filterGoals } from "@/lib/pdi";
import { formatDate } from "@/lib/date";
import { Reveal, Section } from "@/components/shared/Section";
import { PdiGoalCard } from "./PdiGoalCard";
import { cn } from "@/lib/utils";

const HORIZONS: PdiHorizon[] = ["curto", "medio", "longo"];
const STATUSES: PdiStatus[] = ["em-andamento", "nao-iniciado", "concluido"];

const SEGMENT_COLORS: Record<PdiStatus, string> = {
  concluido: "bg-emerald-400",
  "em-andamento": "bg-primary",
  "nao-iniciado": "bg-border",
};

const PdiSection = () => {
  const [horizon, setHorizon] = useState<PdiHorizon | "all">("all");
  const [status, setStatus] = useState<PdiStatus | "all">("all");
  const { doc, admin, toggleAction, deleteGoal } = usePdi();
  const pdiGoals = doc.goals;
  const [editing, setEditing] = useState<PdiGoal | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deleting, setDeleting] = useState<PdiGoal | null>(null);
  const openEditor = (goal: PdiGoal | null) => {
    setEditing(goal);
    setEditorOpen(true);
  };

  const filtered = useMemo(
    () => filterGoals(pdiGoals, { horizon, status }),
    [pdiGoals, horizon, status],
  );
  const totals = countByStatus(pdiGoals);

  const groups = HORIZONS.map((h) => ({
    horizon: h,
    goals: filtered.filter((g) => g.horizon === h),
  })).filter((g) => g.goals.length > 0);

  const resetFilters = () => {
    setHorizon("all");
    setStatus("all");
  };

  return (
    <Section
      headingLevel="h1"
      id="pdi"
      title={
        <>
          Meu <span className="gradient-pink">PDI</span>
        </>
      }
      description="Meus objetivos de desenvolvimento e o plano de ação de cada um. O progresso é calculado pelas ações do plano que já foram concluídas."
      aside={
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm tabular-nums text-muted-foreground shrink-0">
          <CalendarClock size={14} className="text-primary" aria-hidden />
          atualizado em {formatDate(doc.lastUpdated)}
        </p>
      }
    >
      {admin && <AdminToolbar onNew={() => openEditor(null)} />}

      {/* ---------- Visão geral ---------- */}
      <Reveal className="grid gap-4 sm:grid-cols-3 mb-12">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(status === s ? "all" : s)}
            aria-pressed={status === s}
            className={cn(
              "pdi-stat text-left",
              status === s && "border-primary/60 bg-primary/5",
            )}
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className={cn("h-2.5 w-2.5 rounded-full", SEGMENT_COLORS[s])}
                aria-hidden
              />
              {STATUS_LABEL[s]}
            </span>
            <span className="mt-2 block text-4xl font-display font-bold tabular-nums leading-none">
              {totals[s]}
            </span>
            <span className="mt-2 block text-sm text-muted-foreground">
              de {pdiGoals.length} objetivos
            </span>
          </button>
        ))}
      </Reveal>

      {/* ---------- Filtros de prazo ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div
          role="group"
          aria-label="Filtrar por prazo"
          className="inline-flex flex-wrap rounded-full border border-border bg-card p-1"
        >
          {(["all", ...HORIZONS] as const).map((h) => (
            <button
              key={h}
              type="button"
              aria-pressed={horizon === h}
              onClick={() => setHorizon(h)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                horizon === h
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {h === "all"
                ? "Todos os prazos"
                : pdiMeta.horizons[h].split(" · ")[0]}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "objetivo" : "objetivos"}
          {(horizon !== "all" || status !== "all") && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-3 text-primary hover:underline"
            >
              limpar filtros
            </button>
          )}
        </p>
      </div>

      {/* ---------- Objetivos agrupados por prazo ---------- */}
      <div className="space-y-12">
        {groups.length === 0 && (
          <p className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-2xl">
            Nenhum objetivo com esses filtros.
          </p>
        )}
        <AnimatePresence mode="popLayout">
          {groups.map(({ horizon: h, goals }) => (
            <motion.div
              key={h}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
                <span className="font-display font-bold text-xl md:text-2xl">
                  {pdiMeta.horizons[h].split(" · ")[0]}
                </span>
                <span className="text-sm text-muted-foreground">
                  {pdiMeta.horizons[h].split(" · ")[1]}
                </span>
              </h3>
              {/* Cada card usa 2 linhas via subgrid (resumo + plano); o espaço vertical vem do mb-4 do card */}
              <div className="grid gap-x-4 gap-y-0 md:grid-cols-2 xl:grid-cols-3">
                {goals.map((g) => (
                  <PdiGoalCard
                    key={g.id}
                    goal={g}
                    admin={admin}
                    onEdit={() => openEditor(g)}
                    onDelete={() => setDeleting(g)}
                    onToggleAction={(i) => toggleAction(g.id, i)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {admin && (
        <>
          <GoalEditorDialog goal={editing} open={editorOpen} onOpenChange={setEditorOpen} />
          <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir objetivo?</AlertDialogTitle>
                <AlertDialogDescription>
                  "{deleting?.competency}" será removido do PDI. Essa ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-rose-600 text-white hover:bg-rose-700"
                  onClick={() => deleting && deleteGoal(deleting.id)}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </Section>
  );
};

export default PdiSection;
