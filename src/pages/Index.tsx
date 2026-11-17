import { useRef } from "react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import PdiSection from "@/components/pdi/PdiSection";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import TabBackdrop from "@/components/shared/TabBackdrop";
import { useHashTab } from "@/hooks/use-hash-tab";
import { tabs, type TabId } from "@/data/navigation";
import { spring } from "@/lib/motion";

/** Conteúdo de cada aba. Para mover uma seção de aba, basta mudá-la de lugar aqui. */
const TAB_CONTENT: Record<TabId, () => JSX.Element> = {
  sobre: () => (
    <>
      <Hero />
      <About />
      <Experience />
    </>
  ),
  pdi: () => <PdiSection />,
  projetos: () => <Projects />,
  conhecimentos: () => <Skills />,
  formacao: () => <Education />,
};

const TAB_ORDER = tabs.map((t) => t.id) as TabId[];

/**
 * Troca de aba com coerência espacial: o conteúdo entra pelo lado da aba escolhida
 * (como a "lente" da navbar) e sai pelo lado oposto. Com redução de movimento,
 * o MotionConfig mantém só o fade.
 */
const tabVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 32 }),
  center: { opacity: 1, x: 0, transition: spring.gentle },
  exit: (dir: number) => ({ opacity: 0, x: dir * -32, transition: { ...spring.snappy, duration: 0.2 } }),
};

const Index = () => {
  const { tab } = useHashTab();
  const Content = TAB_CONTENT[tab];

  // Direção da navegação: +1 indo para uma aba à direita, -1 para a esquerda.
  const prevTab = useRef(tab);
  const direction = useRef(0);
  if (prevTab.current !== tab) {
    direction.current = Math.sign(TAB_ORDER.indexOf(tab) - TAB_ORDER.indexOf(prevTab.current));
    prevTab.current = tab;
  }

  return (
    // reducedMotion="user": respeita a preferência do sistema por menos animações
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar active={tab} />
      <main id="conteudo" className="min-h-screen overflow-x-clip bg-background">
        <AnimatePresence mode="wait" initial={false} custom={direction.current}>
          <motion.div
            key={tab}
            custom={direction.current}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={tab === "sobre" ? undefined : "relative pt-16"}
          >
            {/* Mesmo fundo decorativo da aba Sobre (que já tem o seu no Hero) */}
            {tab !== "sobre" && <TabBackdrop />}
            <div className={tab === "sobre" ? undefined : "relative z-10"}>
              <Content />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
};

export default Index;
