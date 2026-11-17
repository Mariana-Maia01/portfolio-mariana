import type { ExperienceItem } from "@/types/portfolio";

/**
 * Experiências profissionais e voluntárias, da mais recente para a mais antiga.
 * Para encerrar uma experiência, preencha `end` no formato "AAAA-MM".
 */
export const experiences: ExperienceItem[] = [
  {
    id: "geopixel-qa",
    company: "Geopixel",
    role: "QA Intern",
    type: "Estágio",
    start: "2026-05",
    context:
      "Atuação na equipe de Quality Assurance, participando de atividades de validação de funcionalidades, testes de regressão, identificação de defeitos e automação de testes.",
    activities: [
      "Execução de testes funcionais e regressivos.",
      "Identificação, documentação e abertura de bugs, incluindo descrição, severidade e evidências.",
      "Participação em validações e homologações de funcionalidades.",
      "Desenvolvimento de cenários de testes utilizando BDD e Gherkin.",
      "Desenvolvimento de automações utilizando Cypress, JavaScript e Cucumber.",
      "Criação de cards e critérios de aceite para atividades de automação.",
      "Apoio à equipe em processos de validação e qualidade.",
      "Participação em reuniões e discussões sobre funcionalidades e melhorias.",
      "Compartilhamento de conhecimento e apoio a outros integrantes da equipe.",
    ],
    highlights: [
      "Desenvolvimento das primeiras 6 automações logo no início do estágio, com complexidade crescente.",
      "Evolução de atividades de testes manuais para automação.",
      "Participação em diferentes frentes de QA.",
      "Documentação de defeitos com evidências para os desenvolvedores.",
    ],
    tools: ["Cypress", "JavaScript", "Cucumber", "Gherkin", "BDD", "Git", "Jira", "Claude"],
  },
];
