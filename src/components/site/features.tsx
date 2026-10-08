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
import { AGENT_TOOLS } from "@/lib/mycode";

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
      "Use OpenAI-compatible APIs, native Anthropic, or Ollama. Configure your provider, model, key, and endpoint — no vendor lock-in.",
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
      `Use ${AGENT_TOOLS.length} built-in tools for files, shell commands, documents, planning, memory, and sub-agent delegation.`,
    accent: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Safety by design",
    description:
      "File writes and dangerous commands ask for confirmation by default. Chat approvals can be disabled; per-provider read/write permissions also apply.",
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
    title: "Reusable skills",
    description:
      "Keep repeatable procedures in SKILL.md files. Discover, load, and manage skills, or define your own slash commands.",
    accent: "teal",
  },
  {
    icon: Network,
    title: "MCP tools — included",
    description:
      "Connect stdio MCP servers through mcp.servers and inspect them with /mcp in chat. Already shipped in the free CLI.",
    accent: "teal",
  },
  {
    icon: TerminalSquare,
    title: "Beautiful terminal UI",
    description:
      "Rich markdown, streaming output, spinners, themes, and diff views — with custom rendering using chalk and marked.",
    accent: "coral",
  },
  {
    icon: Boxes,
    title: "Self-contained JS bundle",
    description:
      "The source build bundles CLI dependencies into mycode-standalone.cjs. It still requires Node.js 20+; no native executable download is offered.",
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

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(i % 3) * 90} distance={50} className="h-full">
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
