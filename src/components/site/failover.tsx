"use client";

import { motion } from "motion/react";
import { ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/react-bits/ScrollReveal/ScrollReveal";
import { SectionHeading, Reveal } from "./primitives";
import { FAILOVER_REACTIONS } from "@/lib/mycode";

const CHAIN = [
  { label: "Your request", sub: "mycode chat", tone: "neutral" as const },
  { label: "① OpenRouter", sub: "priority 1", tone: "coral" as const },
  { label: "② Ollama", sub: "local · priority 2", tone: "teal" as const },
  { label: "③ OpenAI", sub: "priority 3", tone: "coral" as const },
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
          title="Keep coding through"
          highlight="provider failures"
          subtitle="Chain providers by priority. When one fails, MyCode can preserve context and continue with a working fallback."
        />

        {/* Manifesto — scrub-revealed on scroll */}
        <ScrollReveal
          containerClassName="mx-auto mt-10 max-w-3xl text-center"
          textClassName="text-xl font-semibold leading-relaxed text-slate-200 sm:text-2xl"
          baseOpacity={0.14}
          baseRotation={2}
          blurStrength={6}
        >
          Rate limits. Outages. Context limits. MyCode can switch providers and continue your task when a working fallback is available.
        </ScrollReveal>

        {/* Chain */}
        <Reveal delay={80} distance={30}>
          <div className="mt-12 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:justify-center lg:gap-3">
            {CHAIN.map((node, i) => (
              <div key={node.label} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-3">
                <div
                  className={`flex w-full flex-col items-center rounded-2xl border px-6 py-4 text-center lg:w-auto lg:min-w-[180px] ${toneStyles[node.tone]}`}
                >
                  <span className="text-sm font-semibold">{node.label}</span>
                  <span className="mt-0.5 text-xs opacity-70">{node.sub}</span>
                </div>
                {i < CHAIN.length - 1 && (
                  <div className="flex items-center justify-center gap-1.5 py-1 text-slate-500 lg:py-0">
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="hidden lg:block"
                    >
                      <ChevronRight className="h-6 w-6 text-coral-400" />
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="lg:hidden"
                    >
                      <ChevronDown className="h-6 w-6 text-coral-400" />
                    </motion.span>
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
              {FAILOVER_REACTIONS.map((e) => (
                <div
                  key={e.code}
                  className="grid grid-cols-1 items-start gap-2 px-5 py-3.5 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center sm:gap-4"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="shrink-0 rounded-md bg-coral-500/15 px-2 py-1 font-mono text-xs font-bold text-coral-300 ring-1 ring-coral-400/20">
                      {e.code}
                    </span>
                    <span className="min-w-0 break-words text-sm font-medium text-white">{e.name}</span>
                  </div>
                  <div className="min-w-0 text-sm leading-relaxed text-slate-400">{e.behavior}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-500">
            OpenAI-compatible retry/backoff follows the SDK&apos;s maxRetries setting. MyCode parses
            Retry-After but does not apply a cooldown. Skips last for this request, not permanently.{" "}
            <a href="/docs#failover" className="text-teal-300 underline underline-offset-4">Read the failover details</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
