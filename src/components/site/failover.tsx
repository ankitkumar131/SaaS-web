"use client";

import { motion } from "motion/react";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";

const CHAIN = [
  { label: "Your request", sub: "mycode chat", tone: "neutral" as const },
  { label: "① OpenRouter", sub: "priority 1", tone: "coral" as const },
  { label: "② Ollama", sub: "local · priority 2", tone: "teal" as const },
  { label: "③ OpenAI", sub: "priority 3", tone: "coral" as const },
];

const ERRORS = [
  { code: "429", name: "Rate limited", behavior: "Wait briefly, then try the next provider" },
  { code: "5xx", name: "Server error", behavior: "Immediately try the next provider" },
  { code: "401 / 403", name: "Auth error", behavior: "Skip the provider and warn you" },
  { code: "413", name: "Context too long", behavior: "Try next — it may have a larger window" },
  { code: "ECONNREFUSED", name: "Connection refused", behavior: "Skip the provider (it's offline)" },
];

const toneStyles = {
  neutral: "border-white/10 bg-ink-850/60 text-white",
  coral: "border-coral-400/30 bg-coral-500/10 text-coral-200",
  teal: "border-teal-400/30 bg-teal-500/10 text-teal-200",
};

export default function Failover() {
  return (
    <section id="failover" className="relative scroll-mt-24 border-y border-white/5 bg-ink-900/30 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resilience"
          title="Never get blocked by"
          highlight="a down provider"
          subtitle="Chain multiple providers by priority. When one fails, MyCode fails over automatically — you just keep coding."
        />

        {/* Chain */}
        <Reveal delay={80} distance={30}>
          <div className="mt-14 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-center">
            {CHAIN.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center gap-3 lg:flex-row">
                <div
                  className={`flex w-full min-w-[180px] flex-col items-center rounded-2xl border px-6 py-4 text-center lg:w-auto ${toneStyles[node.tone]}`}
                >
                  <span className="text-sm font-semibold">{node.label}</span>
                  <span className="mt-0.5 text-xs opacity-70">{node.sub}</span>
                </div>
                {i < CHAIN.length - 1 && (
                  <div className="flex items-center gap-1.5 text-slate-500 lg:flex-col">
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="hidden lg:block"
                    >
                      <ChevronRight className="h-6 w-6 text-coral-400" />
                    </motion.span>
                    <span className="rotate-90 lg:rotate-0">
                      <ChevronRight className="h-6 w-6 text-coral-400 lg:hidden" />
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                      fails?
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Error table */}
        <Reveal delay={140} distance={30}>
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-850/40">
            <div className="flex items-center gap-2 border-b border-white/10 bg-ink-850/60 px-5 py-3">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">How failover reacts</span>
            </div>
            <div className="divide-y divide-white/5">
              {ERRORS.map((e) => (
                <div
                  key={e.code}
                  className="grid grid-cols-1 items-center gap-1 px-5 py-3.5 sm:grid-cols-[140px_1fr] sm:gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-coral-500/15 px-2 py-1 font-mono text-xs font-bold text-coral-300 ring-1 ring-coral-400/20">
                      {e.code}
                    </span>
                    <span className="text-sm font-medium text-white">{e.name}</span>
                  </div>
                  <div className="text-sm text-slate-400">{e.behavior}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
