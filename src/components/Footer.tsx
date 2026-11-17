import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { usePdi } from "@/context/PdiProvider";
import { formatDate } from "@/lib/date";
import { spring } from "@/lib/motion";
import { SocialIcon } from "@/components/shared/SocialIcon";

/** E-mail que se copia com um toque: o feedback acontece no próprio botão, no mesmo instante. */
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copiar e-mail ${profile.email}`}
        className="pressable group inline-flex max-w-full items-center gap-3 rounded-full border border-border bg-card py-2 pl-5 pr-2 text-left shadow-[0_1px_2px_hsl(var(--foreground)/0.04),0_10px_28px_-18px_hsl(var(--foreground)/0.3)] hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="truncate text-[0.95rem] font-medium text-foreground sm:text-base">{profile.email}</span>
        <span
          className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition-colors duration-200 ${
            copied ? "bg-emerald-500/15 text-emerald-500" : "bg-primary text-primary-foreground"
          }`}
        >
          <span className="relative grid h-3.5 w-3.5 place-items-center">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: spring.momentum }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.12 } }}
                className="grid place-items-center"
              >
                {copied ? <Check size={14} strokeWidth={3} aria-hidden /> : <Copy size={14} aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="w-[3.4rem] text-center">{copied ? "Copiado" : "Copiar"}</span>
        </span>
      </button>
      <p className="sr-only" aria-live="polite">
        {copied ? "E-mail copiado para a área de transferência" : ""}
      </p>
    </>
  );
};

const Footer = () => {
  const { doc } = usePdi();
  const lastUpdated = doc.lastUpdated;
  return (
  <footer id="contato" aria-labelledby="contato-title" className="scroll-mt-24 border-t border-border bg-card/40">
    {/* Contato: destino do botão "Vamos conversar" */}
    <div className="page-frame flex flex-col items-center py-16 text-center md:py-20">
      <h2
        id="contato-title"
        className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-4xl"
      >
        Vamos <span className="gradient-pink">conversar?</span>
      </h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        Copie meu e-mail e me mande uma mensagem. Respondo por lá.
      </p>

      <div className="mt-8 flex w-full flex-col items-center gap-3">
        <CopyEmail />
      </div>
    </div>

    <div className="border-t border-border/70 py-8">
      <div className="page-frame flex flex-col items-center justify-between gap-5 text-sm text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <div className="flex items-center gap-4">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-colors hover:text-primary"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
        <p className="tabular-nums">PDI atualizado em {formatDate(lastUpdated)}</p>
      </div>
    </div>
  </footer>
);
};

export default Footer;
