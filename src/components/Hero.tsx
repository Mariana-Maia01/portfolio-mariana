import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Heart, Skull, Sparkles, Mouse, Download } from "lucide-react";

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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Parallax background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-[60%] left-[10%] w-48 h-48 rounded-full bg-primary/3 blur-[80px]" />
      </motion.div>

      {/* Parallax floating elements */}
      <motion.div style={{ y: floatingY, opacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
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
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 container mx-auto px-6 md:px-12 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-base md:text-lg text-muted-foreground">Olá sou</span>
          <span className="text-base md:text-lg font-bold text-foreground">Mariana</span>
          <Heart size={14} className="text-primary animate-pulse-pink" fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display leading-[1.1] mb-6"
        >
          <span className="text-5xl md:text-7xl lg:text-8xl font-black block">
            Dev. <span className="gradient-pink">Fullstack</span>
          </span>
          <span className="text-4xl md:text-6xl lg:text-7xl font-light text-muted-foreground block mt-2">
            com foco em{" "}
            <span className="text-primary font-bold pink-glow-text">back-end</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
        >
          <p className="text-sm md:text-base max-w-md text-muted-foreground">
            Transformando ideias e{" "}
            <span className="font-semibold text-foreground">requisitos em soluções de software funcionais</span>
          </p>
          <div className="flex items-center gap-2">
            {["C#", "C", "C++", "Java"].map((tech) => (
              <span
                key={tech}
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-xs font-bold text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#contato"
            className="btn-kawaii inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm animate-pulse-pink"
          >
            Vamos conversar
            <Mail size={16} />
          </a>
          <a
            href="/assets/mariana-dominguez-maia-cv.pdf"
            download="mariana-dominguez-maia-cv.pdf"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary text-primary font-bold text-sm hover:bg-primary/10 transition-colors duration-200"
          >
            Download CV
            <Download size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#habilidades"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Mouse size={36} className="animate-float" />
        <span className="text-sm font-mono">scroll</span>
      </motion.a>
    </section>
  );
};

export default Hero;
