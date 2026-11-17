import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Target, Zap, Heart, Download } from "lucide-react";
import profilePhoto from "@/assets/img/profile-photo.webp";
import { Section } from "@/components/shared/Section";
import { followSpring, spring } from "@/lib/motion";

/** Inclinação máxima da foto, em graus. Pequena de propósito: um gesto, não um truque. */
const MAX_TILT = 7;

/**
 * Foto que acompanha o ponteiro 1:1 (manipulação direta) e volta ao repouso com uma mola
 * criticamente amortecida ao sair. Só com mouse/caneta; desligada com redução de movimento.
 */
const TiltPhoto = () => {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, followSpring);
  const sy = useSpring(py, followSpring);
  const rotateY = useTransform(sx, [0, 1], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(sy, [0, 1], [MAX_TILT, -MAX_TILT]);
  // Brilho que segue o ponteiro, na cor da identidade (rosa), sem gradiente de fundo
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:900px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY }}
        className="group/photo relative aspect-square w-full rounded-3xl bg-secondary border-2 border-primary/20 overflow-hidden pink-glow [transform-style:preserve-3d]"
      >
        <img src={profilePhoto} alt="Mariana - Desenvolvedora Fullstack" className="w-full h-full object-cover" />
        {!reduce && (
          <motion.span
            aria-hidden
            style={{ left: glareX, top: glareY }}
            className="pointer-events-none absolute h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 opacity-0 blur-3xl transition-opacity duration-300 group-hover/photo:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
};

const About = () => (
  <Section id="quem-sou-eu" title={<>Quem sou <span className="gradient-pink">eu</span></>}>
    <div className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...spring.gentle, delay: 0.1 }}
        className="relative w-full max-w-xs sm:max-w-sm"
      >
        <TiltPhoto />
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
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...spring.gentle, delay: 0.2 }}
        className="max-w-2xl"
      >
        <div className="space-y-5 text-base md:text-lg leading-relaxed">
          <p className="text-foreground/90">
            Desenvolvedora em formação pelo curso de Análise e Desenvolvimento de
            Sistemas na Fatec Mogi das Cruzes, atualmente em busca de estágio na
            área de desenvolvimento de software.
          </p>
          <p className="text-muted-foreground">
            Tenho construído experiência prática com Java, Spring Boot, APIs REST
            e bancos de dados relacionais, além de explorar as tecnologias mais recentes.
            Busco uma oportunidade onde possa contribuir com
            código de qualidade e continuar evoluindo tecnicamente.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Target, label: "Foco em resultados" },
            { icon: Zap, label: "Performance otimizada" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="punk-card flex items-center gap-3 px-5 py-4">
              <Icon size={20} className="text-primary shrink-0" />
              <span className="text-base text-foreground">{label}</span>
            </div>
          ))}
        </div>

        <a
          href="/assets/mariana-dominguez-maia-cv.pdf"
          download="mariana-dominguez-maia-cv.pdf"
          className="pressable mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-bold text-sm hover:bg-primary/10 transition-colors duration-200 w-fit"
        >
          <Download size={16} />
          Download CV
        </a>
      </motion.div>
    </div>
  </Section>
);

export default About;
