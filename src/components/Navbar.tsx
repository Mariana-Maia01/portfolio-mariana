import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/img/logo.webp";
import { tabs, type TabId } from "@/data/navigation";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

const navItems = tabs;

const Navbar = ({ active }: { active: TabId }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [refracts, setRefracts] = useState(false);

  // Refração via filtro SVG no backdrop só renderiza corretamente em navegadores Chromium;
  // nos demais a barra mantém o vidro com blur (sem distorção).
  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
    setRefracts(!!brands?.some((b) => b.brand === "Chromium"));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-6xl">
      {/* Mapa de deslocamento do Liquid Glass: ondula levemente o que passa por trás da barra */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="liquid-refraction" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <nav
        aria-label="Navegação principal"
        className={cn(
          "liquid-glass rounded-full transition-[border-radius,box-shadow] duration-300",
          refracts && "liquid-glass--refract",
          (scrolled || mobileOpen) && "liquid-glass--raised",
          mobileOpen && "rounded-3xl",
        )}
      >
        {/* Grade em 3 colunas (1fr · auto · 1fr): as abas ficam no centro exato da barra,
            independentemente da largura do logo à esquerda e dos controles à direita */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2 md:px-5">
          <a href="#sobre" className="flex items-center gap-2 group justify-self-start" aria-label="Ir para o início">
            <img src={logo} alt="" width={28} height={28} className="w-7 h-7 object-contain group-hover:animate-wiggle" />
            <span className="text-sm font-bold font-display">mari.maia</span>
          </a>

          <ul className="hidden md:flex items-center justify-center gap-0.5">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    // "Lente" de vidro que desliza entre as abas
                    <motion.span
                      layoutId="liquid-lens"
                      aria-hidden
                      className="liquid-lens absolute inset-0"
                      transition={spring.snappy}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "pressable relative z-10 block whitespace-nowrap rounded-full px-4 py-1.5 text-sm tracking-[-0.005em] transition-colors duration-200",
                      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="pressable md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", transition: spring.snappy }}
              exit={{ opacity: 0, height: 0, transition: { ...spring.snappy, duration: 0.25 } }}
              className="md:hidden overflow-hidden border-t border-border px-4 py-3 grid grid-cols-2 gap-1"
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0, transition: { ...spring.snappy, delay: 0.03 * i } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "pressable block rounded-xl px-3 py-2.5 text-sm transition-colors",
                      active === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
