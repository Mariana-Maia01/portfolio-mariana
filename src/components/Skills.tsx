import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Infinity as InfinityIcon, Wrench, Skull } from "lucide-react";

const categories = [
  {
    title: "Front-end",
    icon: Code2,
    skills: [
      { name: "React" },
      { name: "JavaScript" },
      { name: "CSS" },
      { name: "HTML" },
    ],
  },
  {
    title: "Back-end",
    icon: Server,
    skills: [
      { name: "Java" },
      { name: "C#" },
      { name: "PostgreSQL" },
      { name: "SQL" },
      { name: "NoSQL" },
      { name: "REST APIs" },
      { name: "Spring Boot" },
      { name: "JPA/Hibernate" },
    ],
  },
  {
    title: "DevOps",
    icon: InfinityIcon,
    skills: [
      { name: "Docker" },
      { name: "Linux" },
      { name: "AWS (S3, EC2, RDS)" },
      { name: "CI/CD" },
    ],
  },
  {
    title: "Ferramentas",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "Kanban" },
      { name: "Scrum" },
      { name: "Postman" },
    ],
  },
];

const SkillTag = ({ name }: { name: string }) => (
  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground font-medium">
    {name}
  </span>
);

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="habilidades" className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skull size={16} className="text-primary" />
            <p className="text-primary font-mono text-sm">habilidades</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Minhas <span className="gradient-pink">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="punk-card p-6 space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <cat.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillTag key={skill.name} name={skill.name} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
