"use client";

import { Download, Settings2, MessageSquareCode } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { SectionHeading, Reveal } from "./primitives";

const STEPS = [
  {
    icon: Download,
    step: "01",
    title: "Install",
    description: "One global install. Works on any machine with Node.js 20+ — or grab the standalone binary.",
    code: "npm install -g @ankitkumar131/mycode-ai",
    lang: "bash",
  },
  {
    icon: Settings2,
    step: "02",
    title: "Set up your provider",
    description:
      "The wizard asks four things: provider, model, API key, and base URL. Add several for automatic failover.",
    code: `mycode init

# → Provider : Custom (any OpenAI-compatible endpoint)
# → Model    : llama-3.1-70b-versatile
# → API key  : sk-xxxxxxxx
# → Base URL : https://api.groq.com/openai/v1
✓ Added provider: groq (priority 1)`,
    lang: "bash",
  },
  {
    icon: MessageSquareCode,
    step: "03",
    title: "Start coding",
    description: "Chat for quick answers, or hand the wheel to agent mode for autonomous, multi-step work.",
    code: `mycode chat     # interactive AI session
mycode agent    # autonomous tool use
mycode fix src/app.tsx`,
    lang: "bash",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From install to first commit in"
          highlight="under a minute"
          subtitle="No accounts, no dashboards, no lock-in. Just your terminal and your API key."
        />

        <div className="relative mt-16">
          {/* connector */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-coral-500/40 to-transparent lg:block" />

          <div className="grid items-stretch gap-8 lg:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.step} delay={i * 140} distance={50} className="h-full">
                  <div className="relative flex h-full flex-col">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-850 shadow-lg shadow-black/40">
                        <Icon className="h-6 w-6 text-teal-300" />
                      </span>
                      <span className="bg-gradient-to-br from-coral-400 to-teal-400 bg-clip-text text-5xl font-black text-transparent">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
                    <div className="mt-5 flex-1">
                      <CodeBlock code={s.code} lang={s.lang} filename={s.lang} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
