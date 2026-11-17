import { Bot, Bug, Cloud, Code2, Database, Wrench } from "lucide-react";
import { SKILL_LEVELS, skillCategories } from "@/data/skills";
import type { SkillCategory, SkillLevel } from "@/types/portfolio";
import { Reveal, Section } from "@/components/shared/Section";
import { LevelDot } from "@/components/shared/Badges";

const icons: Record<SkillCategory["icon"], typeof Bug> = {
  qa: Bug,
  code: Code2,
  database: Database,
  cloud: Cloud,
  ai: Bot,
  tools: Wrench,
};

const LEVEL_ORDER: SkillLevel[] = ["experiencia-pratica", "em-desenvolvimento", "basico"];

const Skills = () => (
  <Section
    headingLevel="h1"
    id="conhecimentos"
    title={<>Tecnologias e <span className="gradient-pink">nível de domínio</span></>}
    description="A cor ao lado de cada tecnologia indica meu nível atual de domínio."
  >
    <Reveal className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-sm text-muted-foreground" aria-label="Legenda de níveis">
      {LEVEL_ORDER.map((l) => (
        <span key={l} className="inline-flex items-center gap-2">
          <LevelDot level={l} />
          <span>
            <span className="text-foreground font-medium">{SKILL_LEVELS[l].label}</span>
            {SKILL_LEVELS[l].description && <> — {SKILL_LEVELS[l].description}</>}
          </span>
        </span>
      ))}
    </Reveal>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((cat, i) => {
        const Icon = icons[cat.icon];
        const sorted = [...cat.skills].sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));
        return (
          <Reveal key={cat.id} delay={i * 0.06} className="punk-card p-6 hover:translate-y-0 hover:scale-100">
            <h3 className="flex items-center gap-3 font-display font-bold text-xl mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={18} className="text-primary" aria-hidden />
              </span>
              {cat.title}
            </h3>
            <ul className="divide-y divide-border">
              {sorted.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-4 py-3" title={`${SKILL_LEVELS[s.level].label}${s.context ? ` · ${s.context}` : ""}`}>
                  <span className="text-base leading-snug">
                    {s.name}
                    {s.context && <span className="mt-0.5 block text-sm text-muted-foreground">{s.context}</span>}
                  </span>
                  <LevelDot level={s.level} />
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

export default Skills;
