import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Skull, Trophy } from "lucide-react";
import hackathonFatec from "@/assets/hackathon-fatec.png";
import ideathonMicrosoft from "@/assets/ideathon-microsoft.png";

interface HackathonEvent {
  type: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
}

const events: HackathonEvent[] = [
  {
    type: "Hackathon",
    title: "Fatec Mogi das Cruzes | Acreditar",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "O desafio foi inspirado na Teoria da Liderança Situacional. Nossa equipe desenvolveu o projeto combinando design, lógica de programação e conceitos de liderança para representar uma liderança adaptável.",
    image: ideathonMicrosoft,
  },
  {
    type: "Ideathon",
    title: "Microsoft",
    tags: ["Teamwork", "Onboarding", "Developer Experience"],
    description:
      "Nosso projeto focou na experiência de onboarding para novos desenvolvedores na Square. O objetivo era facilitar o acesso às informações técnicas e a adaptação rápida ao entrar na empresa.",
    image: hackathonFatec,
  },
];

const Hackathons = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hackathons" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skull size={16} className="text-primary" />
            <p className="text-primary font-mono text-sm">competições</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Hackathons <span className="gradient-pink">&amp; Ideathons</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="punk-card overflow-hidden group"
            >
              {/* Event photo */}
              <div className="h-52 bg-secondary/50 relative overflow-hidden">
                <img
                  src={event.image}
                  alt={`${event.type} – ${event.title}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <span className="absolute top-3 left-3 text-primary font-mono text-xs font-bold uppercase tracking-wider bg-card/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-primary/30">
                  {event.type}
                </span>
              </div>

              {/* Card content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-primary shrink-0" />
                  <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                    {event.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-lg bg-secondary border border-border text-xs text-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
