"use client";

import type { ComponentType } from "react";
import {
  Globe,
  RefreshCcw,
  Bot,
  ShieldCheck,
  FileCode2,
  Puzzle,
  Network,
  TerminalSquare,
  Boxes,
} from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard/SpotlightCard";
import { SectionHeading, Reveal } from "./primitives";

type Feature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: "coral" | "teal";
};

const FEATURES: Feature[] = [
  {
    icon: Globe,
    title: "Universal AI provider",
    description:
      "Connect to any AI API — OpenRouter, OpenAI, Ollama, Groq, or your own endpoint. Just the URL, model, and key.",
    accent: "coral",
  },
  {
    icon: RefreshCcw,
    title: "Automatic failover",
    description:
      "Chain providers by priority. Rate limits, outages, or context overflow? MyCode seamlessly switches to the next.",
    accent: "teal",
  },
  {
    icon: Bot,
    title: "Autonomous agent mode",
    description:
      "The agent reads, writes, searches, and runs commands — planning multi-step tasks until the job is done.",
    accent: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Safety by design",
    description:
      "File writes and dangerous commands always ask for confirmation. Per-provider read/write permissions keep you in control.",
    accent: "coral",
  },
  {
    icon: FileCode2,
    title: "Project-aware context",
    description:
      "A MYCODE.md file feeds your stack, conventions, and instructions into every interaction for consistent results.",
    accent: "coral",
  },
  {
    icon: Puzzle,
    title: "Extensible SDK",
    description:
      "Register custom tools and providers with the SDK. Build plugins that plug straight into the agent loop.",
    accent: "teal",
  },
  {
    icon: Network,
    title: "A2A protocol server",
    description:
      "Expose capabilities over the Agent-to-Agent protocol for multi-agent orchestration across your stack.",
    accent: "teal",
  },
  {
    icon: TerminalSquare,
    title: "Beautiful terminal UI",
    description:
      "Rich markdown, streaming output, spinners, and color — a polished experience powered by Ink.",
    accent: "coral",
  },
  {
    icon: Boxes,
    title: "Standalone binary",
    description:
      "Ship as a Single Executable Application. No Node.js required — just download and run anywhere.",
    accent: "teal",
  },
];

const accentRing: Record<Feature["accent"], string> = {
  coral: "from-coral-500/20 to-coral-500/5 text-coral-300 group-hover:border-coral-400/40",
  teal: "from-teal-500/20 to-teal-500/5 text-teal-300 group-hover:border-teal-400/40",
};

const spotColor: Record<Feature["accent"], string> = {
  coral: "rgba(255,111,94,0.14)",
  teal: "rgba(45,212,191,0.14)",
};

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to"
          highlight="ship with AI"
          subtitle="A complete coding agent that respects your stack, your keys, and your budget — with no vendor lock-in."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(i % 3) * 90} distance={50}>
                <SpotlightCard
                  spotlightColor={spotColor[feature.accent]}
                  className="group h-full border border-white/10 bg-ink-850/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${accentRing[feature.accent]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
