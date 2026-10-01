"use client";

import type { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/primitives";

export function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-white/5 py-12 last:border-0">
      <Reveal distance={28}>
        <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-coral-500 to-teal-500" />
          {title}
        </h2>
      </Reveal>
      <Reveal delay={60} distance={24}>
        <div className="docs-prose mt-6 space-y-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-300">{children}</p>;
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-teal-300">
      {children}
    </code>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-400" />
          <span className="text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const CALLOUT_STYLES = {
  info: {
    wrap: "border-teal-400/25 bg-teal-500/5",
    icon: <Info className="h-5 w-5 text-teal-300" />,
    label: "Note",
  },
  tip: {
    wrap: "border-coral-400/25 bg-coral-500/5",
    icon: <Lightbulb className="h-5 w-5 text-coral-300" />,
    label: "Tip",
  },
  warn: {
    wrap: "border-amber-400/25 bg-amber-500/5",
    icon: <AlertTriangle className="h-5 w-5 text-amber-300" />,
    label: "Important",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: ReactNode;
}) {
  const s = CALLOUT_STYLES[type];
  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${s.wrap}`}>
      <span className="mt-0.5 shrink-0">{s.icon}</span>
      <div className="text-sm leading-relaxed text-slate-300">
        <span className="font-semibold text-white">{title ?? s.label}. </span>
        {children}
      </div>
    </div>
  );
}

export function DocTable({
  head,
  rows,
}: {
  head: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink-850/70 text-xs uppercase tracking-wider text-slate-400">
          <tr>
            <th className="px-4 py-3 font-semibold">{head[0]}</th>
            <th className="px-4 py-3 font-semibold">{head[1]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map(([a, b], i) => (
            <tr key={i} className="transition hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-mono text-[13px] text-teal-300">{a}</td>
              <td className="px-4 py-3 text-slate-300">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
