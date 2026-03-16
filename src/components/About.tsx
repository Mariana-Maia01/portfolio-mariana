import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Skull, Target, Zap, Heart, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skull size={16} className="text-primary" />
            <p className="text-primary font-mono text-sm">sobre mim</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Quem sou <span className="gradient-pink">eu</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl bg-secondary border-2 border-primary/20 overflow-hidden pink-glow">
              <img src={profilePhoto} alt="Mariana - Desenvolvedora Fullstack" className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center"
            >
              <Heart size={16} className="text-primary" fill="currentColor" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              Desenvolvedora em formação pelo curso de Análise e Desenvolvimento de
              Sistemas na Fatec Mogi das Cruzes, atualmente em busca de estágio na
              área de desenvolvimento de software.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Tenho construído experiência prática com Java, Spring Boot, APIs REST
              e bancos de dados relacionais, além de explorar as tecnologias mais recentes.
              Busco uma oportunidade onde possa contribuir com
              código de qualidade e continuar evoluindo tecnicamente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Target, label: "Foco em resultados" },
                { icon: Zap, label: "Performance otimizada" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="punk-card flex items-center gap-3 px-4 py-3"
                >
                  <Icon size={20} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>

            <a
              href="/assets/mariana-dominguez-maia-cv.pdf"
              download="mariana-dominguez-maia-cv.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-bold text-sm hover:bg-primary/10 transition-colors duration-200 w-fit"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
