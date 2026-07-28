"use client";

import { Rss, Globe, Mail } from "lucide-react";
import { useZenMode } from "@/context/ZenModeContext";

const socialLinks = [
  { icon: Globe, href: "https://example.com", label: "Website" },
  { icon: Mail, href: "mailto:hello@gather.example", label: "Email" },
  { icon: Rss, href: "/", label: "RSS Feed" },
];

export default function Footer() {
  const { zenMode } = useZenMode();

  return (
    <footer
      className={`zen-transition border-t border-ink/5 bg-cream ${
        zenMode ? "zen-hidden" : ""
      }`}
      id="site-footer"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-center md:flex-row md:text-left">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-lg font-bold text-ink">Gather</span>
          <span className="text-sm text-ink-faint">A space for collected thoughts.</span>
        </div>

        <p className="text-sm text-ink-faint">
          © {new Date().getFullYear()} Gather. Written slowly and thoughtfully.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="rounded-full border border-ink/10 p-2 text-ink-faint transition-colors duration-300 hover:border-sage hover:text-sage-dark"
              id={`footer-social-${social.label.toLowerCase().replace(" ", "-")}`}
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
