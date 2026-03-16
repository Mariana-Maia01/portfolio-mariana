import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import kuromiLogo from "@/assets/kuromi-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "início", href: "#hero" },
  { label: "habilidades", href: "#habilidades" },
  { label: "portfólio", href: "#portfolio" },
  { label: "sobre", href: "#sobre" },
  { label: "hackathons", href: "#hackathons" },
  { label: "contato", href: "#contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[calc(100%-2rem)] max-w-5xl rounded-full border border-border ${
        scrolled ? "bg-card/95 shadow-lg backdrop-blur-md" : "bg-card/80 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <a href="#hero" className="flex items-center gap-1.5 group">
          <img src={kuromiLogo} alt="Logo" className="w-7 h-7 object-contain group-hover:animate-wiggle" />
          <span className="text-sm font-bold font-display text-foreground">mari.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-primary nav-link-underline pb-0.5 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card rounded-b-2xl border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
