import type { Project } from "@/types/portfolio";
import fidelidade from "@/assets/img/project-fidelidade.webp";
import screenmatch from "@/assets/img/project-screenmatch.webp";
import libraryApp from "@/assets/img/project-library-app.webp";
import minecraftAws from "@/assets/img/project-minecraft-aws.webp";

/**
 * Projetos exibidos no portfólio.
 * Conteúdo baseado nos repositórios públicos do GitHub — ao adicionar um projeto,
 * descreva apenas o que existe no código/README.
 */
export const projects: Project[] = [
  {
    id: "fidelidade-bagatelle",
    name: "Sistema de Fidelidade Bagatelle",
    context: "Acadêmico",
    summary:
      "Aplicação web de programa de fidelidade com cashback para uma perfumaria, desenvolvida em projeto de extensão de apoio ao microempreendedorismo local.",
    problem:
      "O negócio precisava controlar clientes, vendas e cashback de forma organizada e identificar oportunidades de recompra.",
    techs: ["Java", "Spring Boot", "JPA/Hibernate", "PostgreSQL", "Thymeleaf", "Maven", "Docker"],
    features: [
      "Cadastro e busca de clientes por CPF ou nome.",
      "Cadastro de produtos com busca por nome ou marca.",
      "Registro de vendas com geração e uso de cashback, validando o saldo disponível.",
      "Dashboard com cashback prestes a expirar e sugestões de recompra.",
    ],
    learnings: [
      "Modelagem relacional de clientes, produtos, vendas e registros de cashback.",
      "Organização em camadas: controller, service e repository.",
      "Implementação de regras de negócio na camada de serviço.",
    ],
    repoUrl: "https://github.com/Mariana-Maia01/crm",
    image: fidelidade,
  },
  {
    id: "screenmatch",
    name: "Screenmatch",
    context: "Curso / Bootcamp",
    summary:
      "API REST em Java com Spring Boot que consome a OMDb API, persiste séries e episódios e expõe endpoints de consulta.",
    problem: "Centralizar e consultar dados de séries e episódios obtidos de uma API externa.",
    techs: ["Java", "Spring Boot", "JPA/Hibernate", "PostgreSQL", "REST", "Maven"],
    features: [
      "Integração com a OMDb API e conversão de JSON para objetos Java.",
      "Endpoints para listar séries, top 5, lançamentos e busca por categoria.",
      "Consulta de temporadas e episódios por série.",
      "DTOs para expor apenas os dados necessários.",
    ],
    learnings: [
      "Mapeamento de relacionamentos OneToMany/ManyToOne com JPA.",
      "Consultas derivadas e @Query com JPQL portável (LOWER + LIKE no lugar de ILIKE).",
      "Tratamento de erros de parsing de datas e números vindos da API.",
      "Uso de variáveis de ambiente para chaves de API.",
    ],
    repoUrl: "https://github.com/Mariana-Maia01/screenmatch-web",
    image: screenmatch,
  },
  {
    id: "library-app",
    name: "Library App",
    context: "Curso / Bootcamp",
    summary:
      "Aplicação .NET para gestão de biblioteca desenvolvida no bootcamp Microsoft GitHub Copilot Challenge.",
    problem: "Gerenciar empréstimos de livros, leitores e estoque de uma biblioteca.",
    techs: ["C#", ".NET", "Clean Architecture", "Testes unitários", "GitHub Copilot"],
    features: [
      "Gestão de livros, leitores (patrons) e empréstimos.",
      "Notificação de empréstimos em atraso.",
      "Aplicação console organizada em camadas de domínio e infraestrutura.",
      "Projeto de testes unitários para a camada de domínio.",
    ],
    learnings: [
      "Separação de responsabilidades com Clean Architecture.",
      "Uso do GitHub Copilot para gerar código, testes e documentação.",
    ],
    repoUrl: "https://github.com/Mariana-Maia01/bootcamp-github",
    image: libraryApp,
  },
  {
    id: "minecraft-aws",
    name: "Servidor Minecraft na AWS EC2",
    context: "Pessoal",
    summary:
      "Guia prático de criação e configuração de um servidor Minecraft Java Edition em uma instância EC2.",
    problem: "Hospedar um servidor de jogo na nuvem usando os recursos da AWS.",
    techs: ["AWS EC2", "Amazon Linux", "SSH/SCP", "Java (Corretto)", "Security Groups"],
    features: [
      "Criação de instância EC2 e configuração de security group (portas 22 e 25565).",
      "Acesso remoto via SSH e envio de arquivos com SCP.",
      "Instalação do Java e configuração de memória do servidor.",
      "Documentação passo a passo no README.",
    ],
    learnings: [
      "Provisionamento básico de infraestrutura na AWS.",
      "Regras de rede e segurança em security groups.",
      "Administração de servidor Linux pela linha de comando.",
    ],
    repoUrl: "https://github.com/Mariana-Maia01/minecraft-server-aws-ec2",
    image: minecraftAws,
  },
];
