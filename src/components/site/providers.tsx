"use client";

import { Check, Lock, Plug } from "lucide-react";
import ElectricBorder from "@/components/react-bits/ElectricBorder/ElectricBorder";
import { SectionHeading, Reveal } from "./primitives";

const PROVIDERS = [
  { name: "OpenRouter", url: "https://openrouter.ai/api/v1", local: false },
  { name: "OpenAI", url: "https://api.openai.com/v1", local: false },
  { name: "NVIDIA NIM", url: "https://integrate.api.nvidia.com/v1", local: false },
  { name: "Groq", url: "https://api.groq.com/openai/v1", local: false },
  { name: "Together AI", url: "https://api.together.xyz/v1", local: false },
  { name: "Fireworks AI", url: "https://api.fireworks.ai/inference/v1", local: false },
  { name: "Mistral AI", url: "https://api.mistral.ai/v1", local: false },
  { name: "DeepSeek", url: "https://api.deepseek.com/v1", local: false },
  { name: "Ollama", url: "http://localhost:11434", local: true },
  { name: "LM Studio", url: "http://localhost:1234/v1", local: true },
];

export default function Providers() {
  return (
    <section id="providers" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Providers"
          title="One interface,"
          highlight="every API"
          subtitle="If it speaks the OpenAI chat-completions format, MyCode can drive it. Pick a preset or point at your own endpoint."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROVIDERS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 70} distance={30}>
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-850/40 px-4 py-3.5 transition hover:border-teal-400/30 hover:bg-ink-800/60">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    {p.name}
                    {p.local && <Lock className="h-3.5 w-3.5 text-teal-400" />}
                  </div>
                  <div className="truncate font-mono text-xs text-teal-300/70">{p.url}</div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    p.local
                      ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30"
                      : "bg-white/5 text-slate-400 ring-1 ring-white/10"
                  }`}
                >
                  {p.local ? "Local" : "Cloud"}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} distance={30}>
          <div className="mt-6">
            <ElectricBorder color="#ff6f5e" speed={1.1} chaos={0.1} borderRadius={20} className="bg-ink-900/60">
              <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral-500/15 text-coral-300 ring-1 ring-coral-400/30">
                    <Plug className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">Any OpenAI-compatible API</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Azure OpenAI, self-hosted vLLM, LM Studio, or your own gateway — use the{" "}
                      <span className="font-medium text-teal-300">Custom</span> provider and paste the URL.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-teal-300">
                  <Check className="h-4 w-4" /> Just works
                </div>
              </div>
            </ElectricBorder>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
