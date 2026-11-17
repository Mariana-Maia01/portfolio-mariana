import type { Course, Degree, EventItem } from "@/types/portfolio";
import hackathonFatec from "@/assets/img/event-hackathon-fatec.webp";
import ideathonMicrosoft from "@/assets/img/event-ideathon-microsoft.webp";

export const degrees: Degree[] = [
  {
    institution: "Fatec Mogi das Cruzes",
    course: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    start: "2025-02",
    end: "2027-12",
    status: "Em andamento",
    details: "Graduação noturna · previsão de conclusão em dez 2027",
  },
];

/**
 * Cursos, bootcamps, badges e certificações.
 * Só marque `kind: "certificacao"` com `status: "concluido"` quando a certificação for obtida.
 */
export const courses: Course[] = [
  {
    name: "Formação Java Web: crie aplicações usando Spring Boot",
    provider: "Alura",
    date: "2025-11",
    status: "concluido",
    kind: "curso",
    description: "APIs REST com Spring Boot, persistência com JPA e PostgreSQL, integração com API externa.",
  },
  {
    name: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    provider: "Google Cloud Skills Boost",
    date: "2025-12",
    status: "concluido",
    kind: "badge",
    description: "Prompts multimodais e RAG multimodal com Gemini para extração de informações.",
  },
  {
    name: "Develop GenAI Apps with Gemini and Streamlit",
    provider: "Google Cloud Skills Boost",
    status: "concluido",
    kind: "badge",
  },
  {
    name: "GitHub Copilot Challenge",
    provider: "Microsoft",
    date: "2025-07",
    status: "concluido",
    kind: "bootcamp",
    description: "Desenvolvimento com IA no fluxo de programação: geração de código, testes e documentação.",
  },
  {
    name: "IT Essentials",
    provider: "Cisco Networking Academy",
    date: "2025",
    status: "concluido",
    kind: "curso",
  },
  {
    name: "AWS Certified AI Practitioner",
    provider: "Amazon Web Services",
    status: "planejado",
    kind: "certificacao",
    description: "Meta do PDI — ainda não iniciada.",
  },
];

export const events: EventItem[] = [
  {
    type: "Hackathon",
    title: "Fatec Mogi das Cruzes | Acreditar",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "Desafio inspirado na Teoria da Liderança Situacional. A equipe combinou design, lógica de programação e conceitos de liderança para representar uma liderança adaptável.",
    image: hackathonFatec,
  },
  {
    type: "Ideathon",
    title: "Microsoft",
    tags: ["Trabalho em equipe", "Onboarding", "Developer Experience"],
    description:
      "Projeto focado na experiência de onboarding de novos desenvolvedores na Square, facilitando o acesso a informações técnicas e a adaptação ao entrar na empresa.",
    image: ideathonMicrosoft,
  },
];
