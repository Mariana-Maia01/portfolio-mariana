import { useState } from "react";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { ArrowUpRight, Award, BadgeCheck, BookOpen, GraduationCap, Rocket, Trophy, type LucideIcon } from "lucide-react";
import { courses, degrees, events } from "@/data/education";
import type { Course } from "@/types/portfolio";
import { formatDate } from "@/lib/date";
import { Reveal, Section } from "@/components/shared/Section";
import { Tag } from "@/components/shared/Badges";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<Course["kind"], string> = {
  curso: "Curso",
  bootcamp: "Bootcamp",
  badge: "Skill badge",
  certificacao: "Certificação",
};

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "curso", label: "Cursos" },
  { id: "badge", label: "Badges" },
  { id: "bootcamp", label: "Bootcamps" },
] as const;

const STATUS_ORDER: Course["status"][] = ["concluido", "em-andamento", "planejado"];

const Education = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  // Certificações concluídas primeiro
  const certifications = courses
    .filter((c) => c.kind === "certificacao")
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));
  const studies = courses
    .filter((c) => c.kind !== "certificacao" && (filter === "all" || c.kind === filter))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <Section
      headingLevel="h1"
      id="formacao"
      title={<>Formação, cursos e <span className="gradient-pink">certificações</span></>}
    >
      {/* Graduação */}
      {degrees.map((d) => (
        <Reveal key={d.course} className="punk-card p-6 md:p-8 mb-16 flex flex-col md:flex-row md:items-center gap-5 hover:translate-y-0 hover:scale-100">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap size={26} className="text-primary" aria-hidden />
          </span>
          <div className="flex-1">
            <h3 className="font-display font-bold text-xl md:text-2xl leading-snug">{d.course}</h3>
            <p className="mt-1 text-base text-foreground/85">{d.institution}</p>
            {d.details && <p className="text-sm text-muted-foreground mt-1">{d.details}</p>}
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm font-medium tabular-nums text-primary">
              {formatDate(d.start)} — {formatDate(d.end)}
            </p>
            <span className="mt-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
              {d.status}
            </span>
          </div>
        </Reveal>
      ))}

     

      {/* Cursos e estudos */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <SubTitle icon={BookOpen} className="mb-0">
          Cursos e estudos
        </SubTitle>
        <div role="group" aria-label="Filtrar cursos" className="inline-flex flex-wrap rounded-full border border-border bg-card p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                filter === f.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="course-filter-pill"
                  aria-hidden
                  transition={spring.snappy}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.04} className="h-full">
            <CourseCard course={c} />
          </Reveal>
        ))}
      </div>

      {/* Eventos */}
      <SubTitle icon={Trophy} className="mt-16">
        Hackathons e ideathons
      </SubTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <article className="punk-card overflow-hidden group h-full">
              {e.image && (
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={e.image}
                    alt={`${e.type} ${e.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-primary/30 bg-card/85 backdrop-blur px-2.5 py-1 text-xs font-medium text-primary">
                    {e.type}
                  </span>
                </div>
              )}
              <div className="p-6 space-y-3">
                <h4 className="font-display font-bold text-xl leading-snug">{e.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">{e.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {e.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

const SubTitle = ({ icon: Icon, children, className }: { icon: LucideIcon; children: React.ReactNode; className?: string }) => (
  <h3 className={cn("flex items-center gap-2.5 font-display font-bold text-xl md:text-2xl mb-6", className)}>
    <Icon size={20} className="text-primary" aria-hidden /> {children}
  </h3>
);

const CERT_STATUS: Record<Course["status"], { label: string; className: string }> = {
  concluido: { label: "Concluída", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 status-done" },
  "em-andamento": { label: "Em preparação", className: "bg-amber-400/10 text-amber-500 border-amber-400/30" },
  planejado: { label: "Planejada", className: "bg-muted text-muted-foreground border-border" },
};

const CertCard = ({ course }: { course: Course }) => {
  const done = course.status === "concluido";
  const status = CERT_STATUS[course.status];
  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border p-6 flex gap-5 items-start",
        done ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card" : "border-dashed border-border bg-card/60",
      )}
    >
      <span
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
          done ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg" : "bg-secondary text-primary",
        )}
      >
        <Award size={26} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium mb-2", status.className)}>
          {status.label}
        </span>
        <h4 className="font-display font-bold text-lg leading-snug">{course.name}</h4>
        <p className="text-sm text-muted-foreground">
          {course.provider}
          {course.date && <> · {formatDate(course.date)}</>}
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          {course.url && (
            <a href={course.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
              Ver credencial <ArrowUpRight size={12} aria-hidden />
            </a>
          )}
          {!done && (
            <a href="#pdi" className="inline-flex items-center gap-1 text-primary hover:underline">
              Ver plano no PDI <ArrowUpRight size={12} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const KIND_ICON: Record<Course["kind"], LucideIcon> = {
  curso: BookOpen,
  bootcamp: Rocket,
  badge: BadgeCheck,
  certificacao: Award,
};

const CourseCard = ({ course }: { course: Course }) => {
  const Icon = KIND_ICON[course.kind];
  return (
    <article className="punk-card h-full p-6 flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={18} aria-hidden />
        </span>
        <span className="text-xs tabular-nums text-muted-foreground">{course.date ? formatDate(course.date) : ""}</span>
      </div>
      <h4 className="mt-4 text-base font-semibold leading-snug">{course.name}</h4>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {course.provider} · {KIND_LABEL[course.kind]}
        {course.status === "em-andamento" && <span className="ml-1 text-amber-500">· em andamento</span>}
      </p>
      {course.description && <p className="mt-3 text-base text-muted-foreground leading-relaxed">{course.description}</p>}
      {course.url && (
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver certificado <ArrowUpRight size={12} aria-hidden />
        </a>
      )}
    </article>
  );
};

export default Education;
