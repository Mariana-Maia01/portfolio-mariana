import { CheckCircle2, CircleDashed, Loader } from "lucide-react";
import type { PdiStatus, SkillLevel } from "@/types/portfolio";
import { STATUS_LABEL } from "@/lib/pdi";
import { SKILL_LEVELS } from "@/data/skills";
import { cn } from "@/lib/utils";

const statusStyles: Record<PdiStatus, string> = {
  concluido: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 status-done",
  "em-andamento": "bg-primary/10 text-primary border-primary/30",
  "nao-iniciado": "bg-muted text-muted-foreground border-border",
};

const statusIcons = {
  concluido: CheckCircle2,
  "em-andamento": Loader,
  "nao-iniciado": CircleDashed,
} as const;

export const StatusBadge = ({ status, className }: { status: PdiStatus; className?: string }) => {
  const Icon = statusIcons[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        statusStyles[status],
        className,
      )}
    >
      <Icon size={12} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
};

/** Cor de cada nível: verde = experiência prática, amarelo = em desenvolvimento, vermelho = básico. */
const LEVEL_COLOR: Record<SkillLevel, string> = {
  "experiencia-pratica": "bg-emerald-500",
  "em-desenvolvimento": "bg-amber-400",
  basico: "bg-rose-500",
};

export const LevelDot = ({ level, className }: { level: SkillLevel; className?: string }) => (
  <span
    role="img"
    aria-label={SKILL_LEVELS[level].label}
    title={SKILL_LEVELS[level].label}
    className={cn("inline-block h-3 w-3 shrink-0 rounded-full", LEVEL_COLOR[level], className)}
  />
);

export const Tag = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground",
      className,
    )}
  >
    {children}
  </span>
);
