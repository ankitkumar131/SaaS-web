"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { DOCS_SECTIONS } from "./sections";

export default function DocsSidebar() {
  const [active, setActive] = useState<string>(DOCS_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.5, 1] }
    );
    DOCS_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          On this page
        </p>
        <nav className="flex flex-col gap-0.5">
          {DOCS_SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="docs-active"
                    className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-gradient-to-r from-coral-500/15 to-teal-500/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {s.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-8 rounded-xl border border-white/10 bg-ink-850/40 p-4">
          <p className="text-sm font-semibold text-white">Need the CLI?</p>
          <p className="mt-1 text-xs text-slate-400">
            MyCode is a terminal tool. Install it and run <code className="font-mono text-teal-300">mycode</code>{" "}
            in any project.
          </p>
        </div>
      </div>
    </aside>
  );
}
