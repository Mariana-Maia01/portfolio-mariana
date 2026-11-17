import { Briefcase, HeartHandshake } from "lucide-react";
import { experiences } from "@/data/experience";
import { formatPeriod } from "@/lib/date";
import { Reveal, Section } from "@/components/shared/Section";
import { Tag } from "@/components/shared/Badges";

/** Rótulo pequeno de grupo, no estilo dos cabeçalhos de lista da Apple. */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{children}</h4>
);

const Experience = () => (
  <Section
    id="experiencia"
    title={<>Experiência <span className="gradient-pink">profissional</span></>}
    description="Onde atuo, quais responsabilidades assumo e o que já entreguei."
  >
    <ol className="space-y-6">
      {experiences.map((exp, i) => {
        const Icon = exp.type === "Voluntariado" ? HeartHandshake : Briefcase;
        const isCurrent = !exp.end;
        return (
          <li key={exp.id}>
            <Reveal delay={i * 0.08}>
              <article className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-[0_1px_2px_hsl(var(--foreground)/0.04),0_16px_40px_-24px_hsl(var(--foreground)/0.25)]">
                {/* Cabeçalho: quem, onde e quando */}
                <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.015em] md:text-[1.75rem]">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-[0.95rem] text-muted-foreground">
                        <span className="font-medium text-foreground/90">{exp.company}</span> · {exp.type}
                      </p>
                    </div>
                  </div>

                  <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium tabular-nums text-foreground/80">
                    {isCurrent && (
                      <span className="relative flex h-2 w-2" aria-hidden>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                    )}
                    {formatPeriod(exp.start, exp.end, exp.periodLabel)}
                  </p>
                </header>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/85 md:text-[1.05rem]">{exp.context}</p>

                <div className="mt-7 border-t border-border/70 pt-7">
                  <Eyebrow>Principais atividades</Eyebrow>
                  {/* Colunas de texto (não grid): cada coluna empilha seus itens sem
                      buracos quando um item ocupa duas linhas e o vizinho só uma */}
                  <ul className="mt-4 -mb-2.5 md:columns-2 md:gap-x-12">
                    {exp.activities.map((a) => (
                      <li key={a} className="flex break-inside-avoid gap-3 pb-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
                        <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-border/70 pt-7">
                  <Eyebrow>Ferramentas</Eyebrow>
                  <div className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias e ferramentas">
                    {exp.tools.map((t) => (
                      <Tag key={t} className="rounded-full px-3">
                        {t}
                      </Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  </Section>
);

export default Experience;
