"use client";

import {
  FileText,
  PenLine,
  Wrench,
  FolderOpen,
  FolderSearch,
  ScanSearch,
  Terminal,
  Globe,
  Repeat,
  ShieldCheck,
} from "lucide-react";
import { TerminalReplay } from "@/components/ui/code-block";
import { SectionHeading, Reveal } from "./primitives";
import { AGENT_TOOLS, type AgentToolName } from "@/lib/mycode";

const TOOLS = [
  { icon: FileText, name: "read_file", desc: "Read files & line ranges" },
  { icon: PenLine, name: "write_file", desc: "Writes (default approval)" },
  { icon: Wrench, name: "patch", desc: "Replace a block of text" },
  { icon: FolderOpen, name: "list_dir", desc: "List files & directories" },
  { icon: FolderSearch, name: "glob", desc: "Find files by glob pattern" },
  { icon: ScanSearch, name: "search_files", desc: "Search file contents" },
  { icon: Terminal, name: "terminal", desc: "Shell with safety guards" },
  { icon: Globe, name: "web_search", desc: "Look things up live" },
] satisfies { icon: typeof FileText; name: AgentToolName; desc: string }[];

const LOOP = ["Observe", "Think", "Plan", "Act", "Repeat"];

const AGENT_TERMINAL = [
  { text: 'mycode agent "refactor src/auth.js to async/await"', tone: "cmd" as const },
  { text: "🤖 planning steps…", tone: "dim" as const },
  { text: "✓ read_file    src/auth.js", tone: "ok" as const },
  { text: "✓ search_files  content=\"callback\"", tone: "ok" as const },
  { text: "Approval requested before file edits", tone: "prompt" as const },
  { text: "✓ patch        src/auth.js", tone: "ok" as const },
  { text: "✓ terminal     npm test", tone: "ok" as const },
  { text: "Review the diff and test results.", tone: "out" as const },
];

export default function AgentMode() {
  return (
    <section id="agent" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-coral-500/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: copy + tools */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Agent mode"
              title="Hand it the wheel."
              highlight="It does the work."
              subtitle={`Agent mode plans and works on multi-step tasks with ${AGENT_TOOLS.length} built-in tools, including memory, delegation, questions, and live todo tracking.`}
            />

            <Reveal delay={80} distance={30}>
              <p className="mt-8 text-sm text-slate-400">
                A few core tools —{" "}
                <a href="/docs#agent" className="text-teal-300 underline underline-offset-4">
                  see all {AGENT_TOOLS.length} built-in tools
                </a>.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TOOLS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.name}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-850/40 px-3.5 py-3 transition hover:border-teal-400/30"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300 ring-1 ring-teal-400/20">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-sm font-medium text-white">{t.name}</div>
                        <div className="truncate text-xs text-slate-500">{t.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={140} distance={30}>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Repeat className="h-4 w-4 text-coral-400" />
                {LOOP.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {step}
                    </span>
                    {i < LOOP.length - 1 && <span className="text-coral-400">→</span>}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180} distance={30}>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal-400/20 bg-teal-500/5 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">Confirmed by default.</span> File writes and dangerous
                  commands prompt for approval. Chat prompts can be disabled with --yolo / --allow-all,
                  /allow-all, or settings.{" "}
                  <a href="/docs#agent" className="text-teal-300 underline underline-offset-4">Review the safety options</a>.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: terminal */}
          <Reveal delay={120} direction="horizontal" distance={60}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-coral-500/10 via-transparent to-teal-500/10 blur-2xl" />
              <TerminalReplay lines={AGENT_TERMINAL} startDelay={200} title="mycode — illustrative agent workflow" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
