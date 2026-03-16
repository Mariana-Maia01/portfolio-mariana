import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Github, Linkedin, Skull, Award } from "lucide-react";

const EMAIL = "marianadominguezmaia@gmail.com";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skull size={16} className="text-primary" />
            <p className="text-primary font-mono text-sm">contato</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Vamos <span className="gradient-pink">conversar?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            Tem um projeto em mente? Quer conversar sobre tecnologia?
            Fique à vontade para me encontrar nas redes sociais ou me enviar um email.
          </p>

          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-primary/30 hover:border-primary transition-all cursor-pointer"
          >
            <span className="text-lg font-mono font-semibold gradient-pink">{EMAIL}</span>
            {copied ? (
              <Check size={18} className="text-primary" />
            ) : (
              <Copy size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
          {copied && (
            <p className="text-xs text-primary animate-fade-in">Copiado!</p>
          )}

          <div className="flex gap-3 pt-2">
            {[
              { icon: Github, href: "https://github.com/Mariana-Maia01", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/marianadominguezmaia/", label: "LinkedIn" },
              { icon: Award, href: "https://www.credly.com/users/mariana-dominguez-maia-01/badges#credly", label: "Credly" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn-kawaii w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
