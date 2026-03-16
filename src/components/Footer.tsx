import { Github, Linkedin, Heart, Skull, Award } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 px-4 bg-card/50">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Skull size={16} className="text-primary" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Todos os direitos reservados.
        </p>
      </div>

      <div className="flex items-center gap-4">
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
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
        Feito com <Heart size={14} className="text-primary" fill="currentColor" /> e muito café
      </p>
    </div>
  </footer>
);

export default Footer;
