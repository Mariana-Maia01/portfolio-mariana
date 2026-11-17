import { FileDown, Loader2, LogOut, Plus, ShieldCheck } from "lucide-react";
import { usePdi } from "@/context/PdiProvider";

/** Barra que aparece no PDI só para a administradora logada. */
export const AdminToolbar = ({ onNew }: { onNew: () => void }) => {
  const { saving, error, clearError, signOut, resetToFile } = usePdi();
  const onReset = () => {
    if (window.confirm("Substituir o PDI do site pelos dados do arquivo src/data/pdi.ts? As edições feitas pelo painel serão perdidas.")) {
      resetToFile();
    }
  };
  return (
    <div className="mb-8 rounded-2xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <ShieldCheck size={16} className="text-primary" aria-hidden />
          Modo edição
          {saving && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 size={12} className="animate-spin" aria-hidden /> salvando…
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onNew}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Plus size={15} aria-hidden /> Novo objetivo
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Usar os dados de src/data/pdi.ts"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/50"
          >
            <FileDown size={15} aria-hidden /> Restaurar do arquivo
          </button>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/50"
          >
            <LogOut size={15} aria-hidden /> Sair
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Clique nas ações do plano para marcar como concluídas. As mudanças ficam visíveis para todos na hora.
      </p>
      {error && (
        <p role="alert" className="mt-2 text-sm text-rose-500">
          {error}{" "}
          <button type="button" onClick={clearError} className="underline">
            ok
          </button>
        </p>
      )}
    </div>
  );
};
