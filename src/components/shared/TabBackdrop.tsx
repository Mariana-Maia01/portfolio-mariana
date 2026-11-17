import { motion } from "framer-motion";
import { Heart, Skull, Sparkles } from "lucide-react";

/**
 * Fundo decorativo das abas — o mesmo clima do topo da aba "Sobre":
 * brilhos suaves em rosa/roxo e ícones flutuando devagar.
 */
const TabBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[900px] overflow-hidden">
    <div className="absolute top-[12%] right-1/4 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />
    <div className="absolute top-[45%] left-1/3 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />
    <div className="absolute top-[30%] left-[8%] h-48 w-48 rounded-full bg-primary/[0.03] blur-[80px]" />

    <motion.div
      animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[14%] right-[8%] text-primary/20"
    >
      <Skull size={52} />
    </motion.div>
    <motion.div
      animate={{ y: [8, -8, 8], rotate: [0, -15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute top-[26%] right-[22%] text-accent/20"
    >
      <Heart size={30} />
    </motion.div>
    <motion.div
      animate={{ y: [-6, 12, -6] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[55%] right-[12%] text-primary/15"
    >
      <Sparkles size={36} />
    </motion.div>
  </div>
);

export default TabBackdrop;
