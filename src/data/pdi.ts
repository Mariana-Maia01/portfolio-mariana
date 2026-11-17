import type { PdiArea, PdiGoal, PdiHistoryEntry } from "@/types/portfolio";

/**
 * PDI — Plano de Desenvolvimento Individual
 * ------------------------------------------------------------------
 * Este arquivo é a ÚNICA fonte de dados do painel de PDI.
 * Para atualizar:
 *   1. Marque ações do `actionPlan` como `done: true` quando concluídas.
 *   2. O progresso E o status são calculados a partir delas (nada é preenchido à mão):
 *      nenhuma feita = "Não iniciado", algumas = "Em andamento", todas = "Concluído".
 *   3. Registre o que fez em `activities` (data "AAAA-MM" ou "AAAA-MM-DD").
 *   4. Adicione `evidences` (projetos, cursos, certificados, links).
 *   5. Atualize `updatedAt` do objetivo e `pdiMeta.lastUpdated`.
 *   6. Se quiser, registre o marco em `pdiHistory`.
 * Para criar um objetivo novo, copie um bloco existente e troque o `id`.
 * Para criar uma área nova, adicione em `pdiAreas` e use o `id` dela no objetivo.
 */

export const pdiMeta = {
  lastUpdated: "2026-11-17",
  horizons: {
    curto: "Curto prazo · até 6 meses",
    medio: "Médio prazo · 6 a 12 meses",
    longo: "Longo prazo · mais de 12 meses",
  },
} as const;

export const pdiAreas: PdiArea[] = [
  {
    id: "cloud-ia",
    letter: "A",
    name: "Cloud e Inteligência Artificial",
    description: "Certificação AWS em IA e estudo de agentes de IA.",
  },
  {
    id: "backend",
    letter: "B",
    name: "Desenvolvimento backend",
    description: "Java, Spring Boot, APIs REST, microsserviços e entrega contínua.",
  },
  {
    id: "observabilidade",
    letter: "C",
    name: "Observabilidade",
    description: "Monitoramento de sistemas com Grafana.",
  },
  {
    id: "carreira",
    letter: "D",
    name: "Carreira",
    description: "Portfólio e projeto principal.",
  },
];

export const pdiGoals: PdiGoal[] = [
  {
    id: "aws-ai-practitioner",
    areaId: "cloud-ia",
    competency: "Certificação AWS AI Practitioner",
    objective: "Obter a certificação AWS Certified AI Practitioner.",
    justification:
      "Valida conhecimentos de IA, IA generativa e dos serviços de IA da AWS, e fortalece o currículo para vagas que unem cloud e IA.",
    horizon: "curto",
    actionPlan: [
      { description: "Ler o guia oficial do exame e mapear os domínios cobrados.", done: true },
      { description: "Estudar os conteúdos de cada domínio (fundamentos de IA/ML, IA generativa, serviços AWS, IA responsável e segurança).", done: true },
      { description: "Fazer simulados e revisar os pontos fracos.", done: false },
      { description: "Agendar e realizar o exame.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Ler o exam guide e montar um cronograma de estudo semanal."],
    updatedAt: "2026-11-16",
  },
  {
    id: "agentes-ia",
    areaId: "cloud-ia",
    competency: "Agentes de IA",
    objective: "Aprofundar os estudos sobre agentes de IA.",
    justification:
      "Agentes permitem automatizar tarefas de várias etapas — inclusive em fluxos de desenvolvimento e de testes — e são uma tendência forte na área.",
    horizon: "medio",
    actionPlan: [
      { description: "Estudar os conceitos de agentes: ferramentas (tools), memória, planejamento e orquestração.", done: true },
      { description: "Conhecer frameworks e serviços para construir agentes.", done: false },
      { description: "Construir um agente simples para resolver uma tarefa real e publicar no GitHub.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Escolher um material introdutório sobre agentes de IA."],
    updatedAt: "2026-11-16",
  },
  {
    id: "apis-rest-java",
    areaId: "backend",
    competency: "APIs REST com Java",
    objective: "Me aprofundar no desenvolvimento de APIs REST com Java e Spring Boot.",
    justification:
      "APIs REST aparecem em praticamente todas as vagas backend Java; entender como são construídas também melhora a forma de testá-las.",
    horizon: "medio",
    actionPlan: [
      { description: "Estudar boas práticas de design de APIs REST (recursos, verbos HTTP, status codes, versionamento, paginação).", done: false },
      { description: "Implementar validação de entrada e tratamento global de erros.", done: false },
      { description: "Documentar a API com OpenAPI/Swagger.", done: false },
      { description: "Escrever testes da API (unitários e de integração).", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Revisar uma API existente (ex.: Screenmatch) aplicando as boas práticas estudadas."],
    updatedAt: "2026-11-17",
  },
  {
    id: "microsservicos-kafka",
    areaId: "backend",
    competency: "Microsserviços e Kafka",
    objective: "Me aprofundar em arquitetura de microsserviços e mensageria com Apache Kafka.",
    justification:
      "Microsserviços e mensageria são a base de muitos sistemas backend modernos e aparecem com frequência em vagas Java + AWS.",
    horizon: "medio",
    actionPlan: [
      { description: "Estudar arquitetura de microsserviços (comunicação entre serviços, service discovery, API gateway).", done: false },
      { description: "Estudar Apache Kafka (tópicos, produtores, consumidores, partições).", done: false },
      { description: "Construir um projeto com dois ou mais microsserviços se comunicando via Kafka.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Definir o escopo de um projeto prático com microsserviços e Kafka."],
    updatedAt: "2026-11-17",
  },
  {
    id: "grafana-observabilidade",
    areaId: "observabilidade",
    competency: "Grafana",
    objective: "Dominar o Grafana para observabilidade.",
    justification:
      "Observabilidade ajuda a entender o comportamento de sistemas em produção e a identificar problemas mais rápido — complementa o trabalho de QA.",
    horizon: "medio",
    actionPlan: [
      { description: "Estudar os pilares da observabilidade: métricas, logs e traces.", done: false },
      { description: "Configurar o Grafana com uma fonte de dados (ex.: Prometheus) e criar dashboards.", done: false },
      { description: "Configurar alertas no Grafana.", done: false },
      { description: "Monitorar um projeto próprio com Grafana.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Subir um ambiente local com Grafana + Prometheus para os primeiros testes."],
    updatedAt: "2026-11-16",
  },
  {
    id: "java-spring-solido",
    areaId: "backend",
    competency: "Java 17+ e Spring Boot 3",
    objective: "Consolidar Java moderno e Spring Boot 3 com testes automatizados.",
    justification:
      "Java e Spring Boot são o requisito número 1 das vagas de backend Java; testes bem feitos são um diferencial natural para quem vem de QA.",
    horizon: "curto",
    actionPlan: [
      { description: "Revisar recursos do Java 17/21 (records, streams, Optional, novidades da linguagem).", done: true },
      { description: "Criar uma API Spring Boot 3 com validação, tratamento global de erros e documentação (OpenAPI/Swagger).", done: true },
      { description: "Adicionar autenticação com Spring Security + JWT.", done: true },
      { description: "Escrever testes unitários (JUnit 5 + Mockito) e de integração (Testcontainers).", done: true },
    ],
    activities: [],
    evidences: [
      { label: "Screenmatch: API REST com Spring Boot", type: "projeto", projectId: "screenmatch" },
      { label: "Sistema de Fidelidade Bagatelle", type: "projeto", projectId: "fidelidade-bagatelle" },
    ],
    nextSteps: [],
    updatedAt: "2026-11-17",
  },
  {
    id: "aws-para-devs",
    areaId: "cloud-ia",
    competency: "AWS para desenvolvedores",
    objective: "Publicar e operar uma aplicação Java na AWS usando os serviços mais pedidos nas vagas.",
    justification:
      "As vagas Java + AWS citam com frequência Lambda, API Gateway, SQS/SNS, S3, RDS e IAM; usá-los num projeto real é a melhor prova.",
    horizon: "medio",
    actionPlan: [
      { description: "Publicar uma API Spring Boot na AWS (ECS, Elastic Beanstalk ou Lambda + API Gateway).", done: false },
      { description: "Usar RDS/Aurora como banco e S3 para arquivos.", done: false },
      { description: "Implementar comunicação assíncrona com SQS/SNS.", done: false },
      { description: "Configurar permissões com IAM (menor privilégio) e logs no CloudWatch.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Fazer o primeiro deploy de uma API simples na AWS."],
    updatedAt: "2026-11-17",
  },
  {
    id: "ia-em-java",
    areaId: "cloud-ia",
    competency: "IA aplicada em Java",
    objective: "Integrar IA generativa em aplicações Java com Spring AI e Amazon Bedrock.",
    justification:
      "Vagas de Java com IA pedem integração de LLMs em sistemas Spring Boot, RAG e agentes — une meu foco em Java com IA e AWS.",
    horizon: "medio",
    actionPlan: [
      { description: "Estudar Spring AI e fazer a primeira chamada a um modelo no Amazon Bedrock.", done: false },
      { description: "Implementar RAG com banco vetorial (ex.: PostgreSQL + pgvector).", done: false },
      { description: "Criar um agente com tool calling que use funções da própria API.", done: false },
      { description: "Escrever testes e avaliar a qualidade das respostas da IA.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Seguir um tutorial de Spring AI com Amazon Bedrock."],
    updatedAt: "2026-11-17",
  },
  {
    id: "projeto-principal",
    areaId: "carreira",
    competency: "Projeto principal do portfólio",
    objective: "Construir um projeto completo que junte Java, AWS, IA e testes.",
    justification:
      "Um projeto de ponta a ponta serve de evidência para vários objetivos ao mesmo tempo e é o que mais chama atenção de recrutadores técnicos.",
    horizon: "medio",
    actionPlan: [
      { description: "Definir o problema e o escopo (ex.: API com assistente de IA usando RAG).", done: false },
      { description: "Desenvolver com Spring Boot, testes automatizados e documentação.", done: false },
      { description: "Publicar na AWS com pipeline de CI/CD.", done: false },
      { description: "Documentar no GitHub (README com arquitetura e prints) e adicionar ao portfólio.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Escrever uma página com a ideia, as funcionalidades e a arquitetura do projeto."],
    updatedAt: "2026-11-17",
  },
  {
    id: "docker-cicd",
    areaId: "backend",
    competency: "Docker e CI/CD",
    objective: "Automatizar build, testes e deploy com Docker e GitHub Actions.",
    justification:
      "Pipelines de CI/CD e containers aparecem em boa parte das vagas e conectam desenvolvimento com qualidade.",
    horizon: "medio",
    actionPlan: [
      { description: "Containerizar uma aplicação Spring Boot com Docker e Docker Compose.", done: false },
      { description: "Criar um pipeline no GitHub Actions que rode build e testes a cada push.", done: false },
      { description: "Automatizar o deploy na AWS pelo pipeline.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Adicionar um workflow de build e testes a um repositório existente."],
    updatedAt: "2026-11-17",
  },
  {
    id: "aws-developer-associate",
    areaId: "cloud-ia",
    competency: "Certificação AWS Developer Associate",
    objective: "Obter a certificação AWS Certified Developer – Associate.",
    justification:
      "É a certificação AWS mais alinhada a vagas de desenvolvimento e aparece como diferencial em vagas Java + AWS.",
    horizon: "longo",
    actionPlan: [
      { description: "Concluir a AWS AI Practitioner primeiro.", done: false },
      { description: "Estudar os domínios do exame (desenvolvimento, segurança, deploy e troubleshooting).", done: false },
      { description: "Fazer simulados e agendar o exame.", done: false },
    ],
    activities: [],
    evidences: [],
    nextSteps: ["Ler o guia do exame depois de concluir a AI Practitioner."],
    updatedAt: "2026-11-17",
  },
];

/** Histórico de evolução do PDI (mais recente primeiro). */
export const pdiHistory: PdiHistoryEntry[] = [
  { date: "2026-11-17", description: "Java 17+ e Spring Boot 3 concluído; objetivo de preparação para processos seletivos removido." },
  { date: "2026-11-17", description: "Novas metas focadas em vagas Java + AWS + IA: Java/Spring Boot, AWS para devs, IA em Java, Docker/CI-CD, projeto principal, preparação para vagas e AWS Developer Associate." },
  { date: "2026-11-16", description: "PDI definido com 4 objetivos: AWS AI Practitioner, agentes de IA, backend com Java/microsserviços/Kafka e Grafana." },
];
