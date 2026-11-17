import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

interface SectionProps {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  muted?: boolean;
  /** "narrow" centraliza cabeçalho e conteúdo numa coluna mais estreita (usado no Contato). */
  width?: "default" | "narrow";
  aside?: ReactNode;
  /** "h1" quando a seção é o título da aba (PDI, Projetos...); "h2" quando é uma seção dentro da aba. */
  headingLevel?: "h1" | "h2";
}

/** Wrapper padrão de seção: cabeçalho consistente + moldura única + fundo alternado. */
export const Section = ({ id, title, description, children, className, muted, width = "default", aside, headingLevel = "h2" }: SectionProps) => {
  const narrow = width === "narrow";
  const Heading = headingLevel;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("section-padding scroll-mt-24", muted && "bg-muted/30", className)}
    >
      <div className="page-frame">
        <Reveal
          className={cn(
            "mb-10 md:mb-14 flex flex-col gap-6",
            narrow ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
          )}
        >
          <div className={cn("max-w-2xl", narrow && "mx-auto")}>
            <Heading
              id={`${id}-title`}
              className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
            >
              {title}
            </Heading>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
            )}
          </div>
          {aside}
        </Reveal>
        <div className={cn(narrow && "mx-auto max-w-3xl")}>{children}</div>
      </div>
    </section>
  );
};

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** Revela o conteúdo suavemente ao entrar na viewport (respeita prefers-reduced-motion via MotionConfig). */
export const Reveal = ({ delay = 0, children, ...rest }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ ...spring.gentle, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);
