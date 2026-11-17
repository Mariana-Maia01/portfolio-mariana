import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Heart, Skull, Sparkles, Mouse, Download } from "lucide-react";
import { spring } from "@/lib/motion";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Valores ligados ao scroll não passam pelo MotionConfig: sem isso o parallax
  // continuaria para quem pediu menos movimento (gatilho vestibular clássico).
  const reduce = useReducedMotion();
  const parallax = !reduce;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
    >
      {/* Parallax background layer */}
      <motion.div style={parallax ? { y: bgY } : undefined} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-[60%] left-[10%] w-48 h-48 rounded-full bg-primary/3 blur-[80px]" />
      </motion.div>

      {/* Parallax floating elements */}
      <motion.div style={parallax ? { y: floatingY, opacity } : undefined} className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] text-primary/20"
        >
          <Skull size={60} />
        </motion.div>
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] right-[25%] text-accent/20"
        >
          <Heart size={35} />
        </motion.div>
        <motion.div
          animate={{ y: [-6, 12, -6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] right-[15%] text-primary/15"
        >
          <Sparkles size={40} />
        </motion.div>
        <motion.div
          animate={{ y: [5, -10, 5], rotate: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[35%] right-[35%] text-accent/10"
        >
          <Heart size={24} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div style={parallax ? { y: contentY, opacity } : undefined} className="relative z-10 page-frame pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.gentle, delay: 0.1 }}
          className="flex items-center gap-2 mb-5"
        >
          <span className="text-lg md:text-xl text-muted-foreground">Olá, sou a</span>
          <span className="text-lg md:text-xl font-bold text-foreground">Mariana Maia</span>
          <Heart size={14} className="text-primary" fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.gentle, delay: 0.18 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-[-0.035em] mb-8"
        >
          <span className="block">
            Dev. <span className="gradient-pink">Fullstack</span>
          </span>
          <span className="block mt-2 text-[0.62em] sm:text-[0.8em] font-light tracking-[-0.02em] text-muted-foreground">
            com foco em{" "}
            <span className="text-primary font-bold pink-glow-text whitespace-nowrap">back-end</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.gentle, delay: 0.26 }}
          className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mb-10"
        >
          <p className="text-base md:text-lg leading-relaxed max-w-md text-muted-foreground">
            Transformando ideias e{" "}
            <span className="font-semibold text-foreground">requisitos em soluções de software funcionais</span>
          </p>
          <div className="flex items-center gap-2">
            {["AWS", "AI","Cloud", "Java"].map((tech) => (
              <span
                key={tech}
                className="h-9 min-w-9 px-2.5 rounded-lg bg-secondary border border-border flex items-center justify-center text-sm font-bold text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.gentle, delay: 0.34 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a
            href="#contato"
            className="btn-kawaii pressable inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm pink-glow"
          >
            Vamos conversar
            <Mail size={16} />
          </a>
          <a
            href="/assets/mariana-dominguez-maia-cv.pdf"
            download="mariana-dominguez-maia-cv.pdf"
            className="pressable inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-primary text-primary font-bold text-sm hover:bg-primary/10 transition-colors duration-200"
          >
            Download CV
            <Download size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#quem-sou-eu"
        aria-label="Ir para Quem sou eu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Mouse size={28} className="animate-float" />
        <span className="text-sm">scroll</span>
      </motion.a>
    </section>
  );
};

export default Hero;
