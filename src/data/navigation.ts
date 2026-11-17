/** Abas do site. A aba ativa fica na URL (#sobre, #pdi...), então links e o botão "voltar" funcionam. */
export const tabs = [
  { id: "sobre", label: "Sobre" },
  { id: "pdi", label: "PDI" },
  { id: "projetos", label: "Projetos" },
  { id: "conhecimentos", label: "Conhecimentos" },
  { id: "formacao", label: "Formação" },
] as const;

export type TabId = (typeof tabs)[number]["id"];

/** Âncoras antigas/internas que apontam para uma aba. */
export const tabAliases: Record<string, TabId> = {
  inicio: "sobre",
  "quem-sou-eu": "sobre",
  experiencia: "sobre",
};
