import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Skull, Heart } from "lucide-react";

const timeline = [
  {
    year: "2024 - 2027",
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    description: "Fatec Mogi das Cruzes — Formação superior em desenvolvimento de software.",
  },
  {
    year: "jul 2025",
    title: "GitHub Copilot Challenge",
    description: "Microsoft — Bootcamp focado em desenvolvimento de software com IA integrada ao fluxo de programação. Uso do GitHub Copilot como pair programmer, debugging, geração de testes e documentação com auxílio de IA. Aplicação de prompt engineering para melhorar produtividade e qualidade do código.",
  },
  {
    year: "nov 2025",
    title: "Formação Java Web: crie aplicações usando Spring Boot",
    description: "Alura — Criação de aplicações backend com Java, Spring Boot e Maven. Implementação de API REST com operações CRUD (Spring MVC). Persistência de dados com PostgreSQL e JPA. Uso de Collections, Streams e Lambdas. Integração com API externa e deploy da aplicação.",
  },
  {
    year: "dez 2025",
    title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    description: "Google Cloud Skills Boost — Uso de prompts multimodais (texto + imagem + vídeo) para extração de informações. Implementação de Multimodal RAG para busca contextual com citações. Criação de metadados e recuperação de trechos relevantes em documentos. Aplicação prática de IA generativa com Gemini em dados não estruturados.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiencia" className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skull size={16} className="text-primary" />
            <p className="text-primary font-mono text-sm">trajetória</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Minha <span className="gradient-pink">Experiência</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 mt-1.5 flex items-center justify-center">
                  <Heart size={8} className="text-primary-foreground" fill="currentColor" />
                </div>

                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] punk-card p-6 ${
                    i % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                  }`}
                >
                  <span className="text-primary font-mono text-sm font-bold">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-display font-bold text-foreground mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
