import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Skull } from "lucide-react";
import crmPreview from "@/assets/crm-preview.png";
import cloudPreview from "@/assets/cloud-preview.png";
import screenmatchPreview from "@/assets/screenmatch-preview.png";
import libraryPreview from "@/assets/library-preview.png";

const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "Dashboard completo para gestão de loja virtual com analytics e relatórios.",
    techs: ["Java", "Spring Boot", "JPA", "Hibernate", "REST", "Maven", "PostgreSQL"],
    link: "https://github.com/Mariana-Maia01/crm",
    image: crmPreview,
  },
  {
    title: "Screenmatch",
    description: "API REST que consome a OMDb API para cadastrar, armazenar e consultar séries e episódios. Implementa operações CRUD, consultas personalizadas e persistência com JPA/Hibernate.",
    techs: ["Java", "Spring Boot", "JPA", "Hibernate", "REST", "Maven", "PostgreSQL", "API Integration"],
    link: "https://github.com/Mariana-Maia01/screenmatch-web",
    image: screenmatchPreview,
  },
  {
    title: "Library App",
    description: "Sistema backend para gerenciamento de biblioteca, incluindo cadastro de usuários, empréstimos de livros e controle de estoque.",
    techs: ["C#", ".NET", "Copilot"],
    link: "https://github.com/Mariana-Maia01/bootcamp-github",
    image: libraryPreview,
  },
  {
    title: "Cloud na Prática",
    description: "Projeto de infraestrutura em nuvem com criação e configuração de servidor Minecraft utilizando serviços da AWS.",
    techs: ["AWS", "Cloud Computing", "Linux", "EC2"],
    link: "https://github.com/Mariana-Maia01/minecraft-server-aws-ec2",
    image: cloudPreview,
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skull size={16} className="text-primary" />
            <p className="text-primary font-mono text-sm">portfólio</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Meus <span className="gradient-pink">Projetos</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="punk-card overflow-hidden group"
            >
              <div className="h-48 bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                ) : (
                  <Skull size={40} className="text-primary/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} /> Ver Projeto
                  </a>
                  <a
                    href="https://github.com/Mariana-Maia01"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
