"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, MoonStar, Sparkles, SunMedium } from "lucide-react";
import { useZenMode } from "@/context/ZenModeContext";

const navLinks = [
  { href: "/#posts-grid", label: "Writing" },
  { href: "/#about", label: "About" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  const { zenMode } = useZenMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("gather-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("gather-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header
      className={`zen-transition sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur-md ${
        zenMode ? "zen-hidden" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2" id="header-logo">
          <span className="rounded-full border border-sage/20 bg-sage/10 p-1.5 text-sage">
            <Sparkles size={14} />
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-sage-dark">
            Gather
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" id="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium uppercase tracking-[0.2em] text-ink-light transition-colors duration-300 hover:text-sage-dark after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-sage after:transition-all after:duration-300 hover:after:w-full"
              id={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-full border border-ink/10 bg-white/70 p-2 text-ink-light transition-colors hover:bg-sage/10 hover:text-ink"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-ink-light transition-colors hover:bg-sage/10 hover:text-ink md:hidden"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 pb-4" id="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-ink/5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-ink-light transition-colors duration-300 hover:text-sage-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
