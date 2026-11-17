import type { SkillCategory, SkillLevel } from "@/types/portfolio";

/**
 * Conhecimentos técnicos por categoria.
 * Níveis disponíveis (edite conforme sua autoavaliação):
 *  - "experiencia-pratica": já usei em trabalho ou projeto real
 *  - "em-desenvolvimento": estou usando/estudando ativamente
 *  - "basico": conheço os conceitos, pouca prática
 */
export const SKILL_LEVELS: Record<SkillLevel, { label: string; description?: string }> = {
  "experiencia-pratica": { label: "Experiência prática"},
  "em-desenvolvimento": { label: "Em desenvolvimento"},
  basico: { label: "Conhecimento básico"},
};

export const skillCategories: SkillCategory[] = [
  {
    id: "dev",
    title: "Desenvolvimento backend",
    icon: "code",
    skills: [
      { name: "Java", level: "experiencia-pratica" },
      { name: "Spring Boot", level: "experiencia-pratica" },
      { name: "APIs REST", level: "em-desenvolvimento" },
      { name: "JPA/Hibernate", level: "experiencia-pratica" },
      { name: "Testes unitários (JUnit)", level: "em-desenvolvimento" },
      { name: "Microsserviços", level: "basico" },
    ],
  },
  {
    id: "aws",
    title: "AWS",
    icon: "cloud",
    skills: [
      { name: "Amazon EC2", level: "experiencia-pratica" },
      { name: "Amazon S3", level: "experiencia-pratica" },
      { name: "AWS Lambda", level: "em-desenvolvimento" },
      { name: "AWS IAM", level: "em-desenvolvimento" },
      { name: "QuickSight", level: "basico" },
    ],
  },
  {
    id: "ia",
    title: "Inteligência Artificial",
    icon: "ai",
    skills: [
      { name: "Ferramentas de IA generativa", level: "experiencia-pratica" },
      { name: "Agentes de IA", level: "em-desenvolvimento" },
      { name: "Amazon Bedrock", level: "em-desenvolvimento" },
      { name: "RAG", level: "basico" },
      { name: "Prompt Engineering", level: "experiencia-pratica" },
    ],
  },
  {
    id: "qa",
    title: "QA e Automação",
    icon: "qa",
    skills: [
      { name: "Cypress", level: "experiencia-pratica" },
      { name: "JavaScript", level: "experiencia-pratica" },
      { name: "Cucumber", level: "experiencia-pratica" },
      { name: "Gherkin", level: "experiencia-pratica" },
      { name: "BDD", level: "experiencia-pratica" },
      { name: "Allure", level: "experiencia-pratica" },
    ],
  },
  {
    id: "db",
    title: "Banco de Dados",
    icon: "database",
    skills: [
      { name: "SQL", level: "experiencia-pratica" },
      { name: "PostgreSQL", level: "experiencia-pratica" },
      { name: "Amazon Aurora", level: "em-desenvolvimento" },
      { name: "Modelagem de dados", level: "experiencia-pratica" },
    ],
  },
  {
    id: "tools",
    title: "Ferramentas e processos",
    icon: "tools",
    skills: [
      { name: "Git", level: "experiencia-pratica" },
      { name: "Docker", level: "em-desenvolvimento" },
      { name: "Jira", level: "experiencia-pratica" },
      { name: "Metodologias ágeis", level: "experiencia-pratica" },
    ],
  },
];
