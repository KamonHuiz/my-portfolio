import { FiMail } from "react-icons/fi";
import { FaGithub, FaFacebookF, FaLinkedinIn, FaThreads } from "react-icons/fa6";
import type { SocialLink } from "@/data/site";

const icons = {
  mail: FiMail,
  github: FaGithub,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  threads: FaThreads,
} as const;

export default function SocialIcon({
  name,
  className = "",
}: {
  name: SocialLink["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
