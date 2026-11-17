import { useCallback, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Github, Lightbulb, ListChecks, Puzzle } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types/portfolio";
import { Reveal, Section } from "@/components/shared/Section";
import { Tag } from "@/components/shared/Badges";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  // Ponto de onde o modal "nasce" (e para onde volta ao fechar): o card clicado.
  const origin = useRef<{ x: number; y: number } | null>(null);

  const openProject = (p: Project, e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // Clique de teclado (detail 0) não tem coordenadas: usa o centro do card.
    origin.current = e.detail === 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: e.clientX, y: e.clientY };
    setSelected(p);
  };

  /** Ancora a escala do modal no card de origem (offsetWidth/Height ignoram o transform da animação). */
  const anchorToOrigin = useCallback((node: HTMLDivElement | null) => {
    if (!node || !origin.current) return;
    const left = (window.innerWidth - node.offsetWidth) / 2;
    const top = (window.innerHeight - node.offsetHeight) / 2;
    node.style.transformOrigin = `${origin.current.x - left}px ${origin.current.y - top}px`;
  }, []);

  return (
    <Section
      headingLevel="h1"
      id="projetos"
      title={<>Projetos <span className="gradient-pink">acadêmicos e pessoais</span></>}
      description="Problema, solução e aprendizados de cada projeto. Clique em um card para ver os detalhes."
      aside={
        <a
          href="https://github.com/Mariana-Maia01"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
        >
          <Github size={16} aria-hidden /> Todos os repositórios <ArrowUpRight size={14} aria-hidden />
        </a>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} id={`projeto-${p.id}`} className="scroll-mt-28">
            <article className="punk-card overflow-hidden group h-full flex flex-col">
              <button
                type="button"
                onClick={(e) => openProject(p, e)}
                className="pressable-soft text-left flex-1 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                aria-label={`Ver detalhes do projeto ${p.name}`}
              >
                <div className="aspect-[16/9] bg-secondary/50 overflow-hidden border-b border-border">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={`Captura de tela do projeto ${p.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-primary mb-2">{p.context}</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold leading-snug group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed flex-1">{p.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.techs.slice(0, 5).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    {p.techs.length > 5 && <Tag className="text-muted-foreground">+{p.techs.length - 5}</Tag>}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                    Ver detalhes <ArrowUpRight size={14} aria-hidden />
                  </span>
                </div>
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent
          ref={anchorToOrigin}
          className="dialog-from-origin max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card p-0 gap-0 thin-scroll"
        >
          {selected && (
            <>
              {selected.image && (
                <img
                  src={selected.image}
                  alt={`Captura de tela do projeto ${selected.name}`}
                  className="w-full aspect-[16/8] object-cover object-top border-b border-border"
                />
              )}
              <div className="p-6 md:p-8 space-y-6">
                <DialogHeader className="text-left space-y-2">
                  <p className="text-sm font-medium text-primary">{selected.context}</p>
                  <DialogTitle className="text-2xl font-display">{selected.name}</DialogTitle>
                  <DialogDescription className="leading-relaxed">{selected.summary}</DialogDescription>
                </DialogHeader>

                <Detail icon={Puzzle} title="Problema que resolve">
                  <p className="text-muted-foreground">{selected.problem}</p>
                </Detail>
                <Detail icon={ListChecks} title="Principais funcionalidades">
                  <List items={selected.features} />
                </Detail>
                <Detail icon={Lightbulb} title="Aprendizados">
                  <List items={selected.learnings} />
                </Detail>

                <div className="flex flex-wrap gap-2">
                  {selected.techs.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={selected.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-kawaii pressable inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    <Github size={16} aria-hidden /> Ver no GitHub
                  </a>
                  {selected.demoUrl && (
                    <a
                      href={selected.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      Demonstração <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
};

const Detail = ({ icon: Icon, title, children }: { icon: typeof Puzzle; title: string; children: React.ReactNode }) => (
  <section className="text-base leading-relaxed">
    <h4 className="flex items-center gap-2 font-semibold mb-2">
      <Icon size={16} className="text-primary" aria-hidden /> {title}
    </h4>
    {children}
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground marker:text-primary">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

export default Projects;
