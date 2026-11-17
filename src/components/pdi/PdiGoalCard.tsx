import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { spring } from "@/lib/motion";
import * as Collapsible from "@radix-ui/react-collapsible";
import type { PdiGoal } from "@/types/portfolio";
import { goalProgress, goalStatus } from "@/lib/pdi";
import { StatusBadge } from "@/components/shared/Badges";
import { cn } from "@/lib/utils";

interface Props {
  goal: PdiGoal;
  /** Modo administradora: mostra editar/excluir e permite marcar ações. */
  admin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleAction?: (index: number) => void;
}

/** Anel de progresso (estilo anéis de atividade): mostra a fração do plano já concluída. */
const ProgressRing = ({
  ratio,
  complete,
}: {
  ratio: number;
  complete: boolean;
}) => {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <span
      className="relative grid h-10 w-10 shrink-0 place-items-center"
      aria-hidden
    >
      {/* Anel fechado ganha o ✓ verde no centro: conclusão se lê sem precisar do número */}
      {complete && (
        <Check
          size={18}
          strokeWidth={3}
          className="absolute text-emerald-500"
        />
      )}
      <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          className="stroke-foreground/10"
        />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          className={cn(
            "transition-[stroke-dashoffset] duration-700 ease-out",
            complete ? "stroke-emerald-500" : "stroke-primary",
            ratio === 0 && "opacity-0",
          )}
        />
      </svg>
    </span>
  );
};

export const PdiGoalCard = ({ goal, admin = false, onEdit, onDelete, onToggleAction }: Props) => {
  const [open, setOpen] = useState(false);
  // Mantém o resumo "colado" ao plano até o plano terminar de fechar (sem costura visível)
  const [planMounted, setPlanMounted] = useState(false);
  const joined = open || planMounted;
  const handleOpenChange = (next: boolean) => {
    if (next) setPlanMounted(true);
    setOpen(next);
  };
  const progress = goalProgress(goal);
  const contentId = `pdi-goal-${goal.id}`;
  const complete = progress.total > 0 && progress.done === progress.total;

  return (
    <Collapsible.Root open={open} onOpenChange={handleOpenChange} asChild>
      {/*
        Subgrid: o card ocupa 2 linhas da grade do PDI.
        Linha 1 = resumo (mesma altura para todos os cards da linha);
        linha 2 = plano de ação (só o card aberto tem conteúdo, então os vizinhos não esticam).
      */}
      <article
        data-testid="pdi-goal"
        className="row-span-2 grid grid-rows-subgrid gap-0"
      >
        <div
          className={cn(
            "flex flex-col border bg-card transition-[border-color,box-shadow,border-radius] duration-300",
            joined
              ? "rounded-t-3xl border-b-0 border-primary/30"
              : "pressable-soft rounded-3xl border-border hover:border-foreground/15 shadow-[0_1px_2px_hsl(var(--foreground)/0.04),0_12px_32px_-20px_hsl(var(--foreground)/0.25)]",
          )}
        >
        <Collapsible.Trigger
          className={cn(
            "group flex w-full flex-1 flex-col p-6 text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            joined ? "rounded-t-3xl" : "rounded-3xl",
          )}
          aria-controls={contentId}
        >
          {/* Progresso e status na mesma linha: o estado do objetivo se lê num relance */}
          <div className="flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-3"
              role="progressbar"
              aria-label="Ações do plano concluídas"
              aria-valuemin={0}
              aria-valuemax={progress.total}
              aria-valuenow={progress.done}
            >
              <ProgressRing ratio={progress.ratio} complete={complete} />
              <span className="text-sm leading-tight text-muted-foreground">
                <span className="block font-semibold tabular-nums text-foreground">
                  {Math.round(progress.ratio * 100)}%
                </span>
                {progress.done} de {progress.total} ações
              </span>
            </div>
            <StatusBadge status={goalStatus(goal)} />
          </div>

          <h4
            title={goal.competency}
            className="mt-5 font-display text-xl font-bold leading-[1.2] tracking-[-0.01em]"
          >
            {goal.competency}
          </h4>
          {/* Texto sempre completo: nada "pula" de tamanho ao abrir o card */}
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">
            {goal.objective}
          </p>

          {/* Espaçador: com alturas iguais na linha, o rodapé fica sempre na base */}
          <span className="min-h-5 flex-1" aria-hidden />
          <div className="flex w-full items-center justify-between border-t border-border/70 pt-4">
            <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
              {open ? "Recolher plano" : "Ver plano de ação"}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-foreground/70 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-300 ease-out",
                  open && "rotate-180",
                )}
                aria-hidden
              />
            </span>
          </div>
        </Collapsible.Trigger>
        {admin && (
          <div className="-mt-2 flex gap-2 px-6 pb-5">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/50 hover:text-primary"
            >
              <Pencil size={12} aria-hidden /> Editar
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-rose-500/50 hover:text-rose-500"
            >
              <Trash2 size={12} aria-hidden /> Excluir
            </button>
          </div>
        )}
        </div>

        {/* Mola na altura (sem overshoot), em vez de keyframe CSS: começa do valor atual,
            então fechar no meio da abertura inverte o movimento sem salto */}
        {/* Célula da linha 2 (sempre presente): o mb-4 é o espaço entre as linhas da grade */}
        <div className="mb-4">
          <AnimatePresence
            initial={false}
            onExitComplete={() => setPlanMounted(false)}
          >
            {open && (
              <motion.div
                id={contentId}
                key="plan"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: spring.snappy,
                    opacity: { duration: 0.25, delay: 0.05 },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: spring.snappy,
                    opacity: { duration: 0.12 },
                  },
                }}
                className="overflow-hidden rounded-b-3xl border border-t-0 border-primary/30 bg-card"
              >
                <section className="px-6 pb-6">
                  <h5 className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Plano de ação
                  </h5>
                  <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-muted/40">
                    {goal.actionPlan.map((a, i) => {
                      const Row = admin && onToggleAction ? "button" : "div";
                      return (
                      <li key={`${i}-${a.description}`}>
                      <Row
                        {...(Row === "button"
                          ? {
                              type: "button" as const,
                              onClick: () => onToggleAction?.(i),
                              "aria-pressed": a.done,
                              title: a.done ? "Marcar como pendente" : "Marcar como concluída",
                            }
                          : {})}
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3 text-left text-sm leading-relaxed",
                          Row === "button" && "transition-colors hover:bg-primary/5",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                            a.done
                              ? "bg-primary text-primary-foreground"
                              : "border-[1.5px] border-muted-foreground/40",
                          )}
                          role="img"
                          aria-label={a.done ? "Concluída" : "Pendente"}
                        >
                          {a.done && (
                            <Check size={12} strokeWidth={3} aria-hidden />
                          )}
                        </span>
                        <span
                          className={
                            a.done
                              ? "text-foreground/90"
                              : "text-muted-foreground"
                          }
                        >
                          {a.description}
                        </span>
                      </Row>
                      </li>
                      );
                    })}
                  </ul>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </Collapsible.Root>
  );
};
