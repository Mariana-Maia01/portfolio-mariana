import type { Profile } from "@/types/portfolio";

export const profile: Profile = {
  fullName: "Mariana Dominguez Maia",
  shortName: "Mariana",
  headline: "Qualidade de software, automação de testes e desenvolvimento",
  role: "QA Intern",
  company: "Geopixel",
  education: "Análise e Desenvolvimento de Sistemas — Fatec Mogi das Cruzes",
  summary:
    "Atuo com Quality Assurance na Geopixel, validando funcionalidades, documentando defeitos e automatizando testes com Cypress e BDD. Em paralelo, desenvolvo projetos em Java e estudo IA aplicada e cloud.",
  email: "marianadominguezmaia@gmail.com",
  cvPath: "/assets/mariana-dominguez-maia-cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Mariana-Maia01", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marianadominguezmaia/", icon: "linkedin" },
    {
      label: "Credly",
      href: "https://www.credly.com/users/mariana-dominguez-maia-01/badges#credly",
      icon: "credly",
    },
  ],
  about: {
    paragraphs: [
      "Sou estudante de Análise e Desenvolvimento de Sistemas na Fatec Mogi das Cruzes e estagiária de QA na Geopixel. No dia a dia, executo testes funcionais e de regressão, registro defeitos com evidências para o time de desenvolvimento e escrevo automações com Cypress, Cucumber e Gherkin.",
      "Comecei pelo desenvolvimento: construí APIs e aplicações em Java com Spring Boot, modelei bancos relacionais e subi infraestrutura simples na AWS. Essa base em desenvolvimento ajuda no trabalho de QA: entender como o sistema é construído facilita prever onde ele pode falhar e escrever testes que façam sentido para o time.",
      "Meu foco agora é aprofundar automação de testes, consolidar a base em backend e dados e aplicar inteligência artificial e cloud em problemas reais.",
    ],
    interests: [
      "Qualidade de software",
      "Automação de testes",
      "Desenvolvimento backend",
      "Análise de dados",
      "Inteligência artificial",
      "Cloud computing",
    ],
    highlights: [
      { label: "Atuação atual", value: "QA Intern · Geopixel" },
      { label: "Formação", value: "ADS · Fatec Mogi das Cruzes" },
    ],
  },
};
