import { Award, Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/types/portfolio";

const icons = { github: Github, linkedin: Linkedin, credly: Award, mail: Mail } as const;

export const SocialIcon = ({ icon, size = 18 }: { icon: SocialLink["icon"]; size?: number }) => {
  const Icon = icons[icon];
  return <Icon size={size} aria-hidden />;
};
