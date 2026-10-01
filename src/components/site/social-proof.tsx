"use client";

import CountUp from "@/components/react-bits/CountUp/CountUp";
import { Reveal } from "./primitives";

const PROVIDERS = [
  "OpenRouter",
  "OpenAI",
  "NVIDIA NIM",
  "Ollama",
  "Groq",
  "Together AI",
  "Fireworks AI",
  "Mistral AI",
  "DeepSeek",
  "Azure OpenAI",
  "LM Studio",
  "Any OpenAI-compatible API",
];

const STATS = [
  { value: 100, suffix: "%", label: "OpenAI-compatible", sub: "works with any endpoint" },
  { value: 8, suffix: "", label: "Agent tools", sub: "read · write · search · run" },
  { value: 9, suffix: "", label: "CLI commands", sub: "chat · agent · fix · review" },
  { value: 0, suffix: "", label: "Vendor lock-in", sub: "your keys, your models" },
];

export default function SocialProof() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} distance={30}>
              <div className="text-center md:text-left">
                <div className="flex items-baseline justify-center gap-1 md:justify-start">
                  <span className="bg-gradient-to-br from-coral-400 to-teal-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                    <CountUp to={stat.value} duration={2.2} separator="" />
                  </span>
                  <span className="text-2xl font-bold text-teal-400">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Provider marquee */}
        <Reveal delay={120} distance={20}>
          <div className="mt-12">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              One agent · every major provider
            </p>
            <div className="mask-fade-x relative overflow-hidden">
              <div className="flex w-max animate-marquee items-center gap-3">
                {[...PROVIDERS, ...PROVIDERS].map((p, i) => (
                  <span
                    key={`${p}-${i}`}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-coral-400 to-teal-400" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
