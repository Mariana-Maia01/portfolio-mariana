/**
 * Tipos centrais do portfólio.
 * Todo o conteúdo do site vive em `src/data/*` e segue estes contratos,
 * para que os componentes visuais não precisem ser alterados ao atualizar informações.
 */

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "credly" | "mail";
}

export interface Profile {
  fullName: string;
  shortName: string;
  headline: string;
  role: string;
  company: string;
  education: string;
  summary: string;
  email: string;
  cvPath: string;
  location?: string;
  socials: SocialLink[];
  about: {
    paragraphs: string[];
    interests: string[];
    highlights: { label: string; value: string }[];
  };
}

/* ----------------------------- Experiência ----------------------------- */

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: "Estágio" | "Voluntariado" | "CLT" | "PJ" | "Projeto";
  start: string; // formato "AAAA-MM"
  end?: string; // ausente = atual
  /** Texto livre para o período, quando não houver meses exatos (ex.: "2025") */
  periodLabel?: string;
  context: string;
  activities: string[];
  highlights: string[];
  tools: string[];
}

/* --------------------------------- PDI --------------------------------- */

export type PdiStatus = "nao-iniciado" | "em-andamento" | "concluido";
export type PdiHorizon = "curto" | "medio" | "longo";

export interface PdiArea {
  id: string;
  letter: string;
  name: string;
  description: string;
}

export interface PdiAction {
  description: string;
  done: boolean;
}

export interface PdiActivity {
  /** "AAAA-MM" ou "AAAA-MM-DD" */
  date: string;
  description: string;
}

export interface PdiEvidence {
  label: string;
  type: "experiencia" | "projeto" | "curso" | "certificacao" | "evento" | "outro";
  /** id de um projeto em src/data/projects.ts (opcional) */
  projectId?: string;
  url?: string;
}

export interface PdiGoal {
  id: string;
  areaId: string;
  competency: string;
  objective: string;
  justification: string;
  horizon: PdiHorizon;
  /** O status não é preenchido: é derivado do actionPlan (ver goalStatus em lib/pdi.ts). */
  actionPlan: PdiAction[];
  activities: PdiActivity[];
  evidences: PdiEvidence[];
  nextSteps: string[];
  /** "AAAA-MM-DD": data em que o objetivo foi revisado pela última vez */
  updatedAt: string;
}

export interface PdiHistoryEntry {
  date: string;
  description: string;
}

/* ------------------------------- Projetos ------------------------------ */

export interface Project {
  id: string;
  name: string;
  context: "Acadêmico" | "Pessoal" | "Curso / Bootcamp";
  summary: string;
  problem: string;
  techs: string[];
  features: string[];
  learnings: string[];
  repoUrl: string;
  demoUrl?: string;
  image?: string;
}

/* ------------------------------ Habilidades ---------------------------- */

export type SkillLevel = "basico" | "em-desenvolvimento" | "experiencia-pratica";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Onde a habilidade foi usada (opcional, aparece como dica) */
  context?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: "qa" | "code" | "database" | "cloud" | "ai" | "tools";
  skills: Skill[];
}

/* ------------------------------- Formação ------------------------------ */

export interface Degree {
  institution: string;
  course: string;
  start: string;
  end: string;
  status: "Em andamento" | "Concluído";
  details?: string;
}

export interface Course {
  name: string;
  provider: string;
  date?: string;
  status: "concluido" | "em-andamento" | "planejado";
  kind: "curso" | "bootcamp" | "badge" | "certificacao";
  description?: string;
  url?: string;
}

export interface EventItem {
  type: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
}
