"use client";

import { motion } from "motion/react";
import { ArrowRight, BookOpen, Star, Zap } from "lucide-react";
import AuroraBackdrop from "@/components/react-bits/Aurora/AuroraBackdrop";
import SplitText from "@/components/react-bits/SplitText/SplitText";
import GradientText from "@/components/react-bits/GradientText/GradientText";
import TextType from "@/components/react-bits/TextType/TextType";
import StarBorder from "@/components/react-bits/StarBorder/StarBorder";
import Magnet from "@/components/react-bits/Magnet/Magnet";
import { CommandChip, TerminalReplay } from "@/components/ui/code-block";
import { Eyebrow } from "./primitives";

const REPO = "https://github.com/ankitkumar131/mycode-ai";

const TERMINAL_LINES = [
  { text: "npm install -g @ankitkumar131/mycode-ai", tone: "cmd" as const },
  { text: "added 1 package in 3s", tone: "dim" as const },
  { text: "mycode init", tone: "cmd" as const },
  { text: "⚡ MyCode Setup Wizard", tone: "out" as const },
  { text: "? Choose your AI provider: Custom (OpenAI-compatible)", tone: "prompt" as const },
  { text: "? Model: llama-3.1-70b-versatile   ? Base URL: api.groq.com", tone: "prompt" as const },
  { text: "✓ Added provider: groq  (priority 1)", tone: "ok" as const },
  { text: "mycode chat", tone: "cmd" as const },
  { text: "You: add a dark mode toggle to the navbar", tone: "out" as const },
  { text: "MyCode: on it — reading src, planning edits… ✓ done", tone: "ok" as const },
];

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* Aurora background — lazy WebGL over an instant CSS fallback */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <AuroraBackdrop
          colorStops={["#ff6f5e", "#2dd4bf", "#ff8b76"]}
          amplitude={1.15}
          blend={0.6}
          speed={0.6}
          className="opacity-70"
        />
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/70 to-ink-950" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>
              <Zap className="h-3.5 w-3.5" /> Universal AI coding agent · v1.0
            </Eyebrow>
          </motion.div>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            <SplitText
              text="Your universal AI"
              tag="span"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              delay={60}
              duration={1}
              className="block"
            />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-1 block"
            >
              <GradientText colors={["#ff8b76", "#2dd4bf", "#ff6f5e"]} animationSpeed={7} className="!font-extrabold">
                coding agent.
              </GradientText>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
          >
            Like Claude Code, but it works with{" "}
            <span className="font-semibold text-white">any AI provider</span>. Bring your own API key —
            no lock-in, automatic failover, and autonomous tool use right in your terminal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-5 flex items-center gap-2 font-mono text-sm text-teal-300"
          >
            <span className="text-slate-500">works with</span>
            <TextType
              text={["OpenRouter", "Ollama", "Groq", "OpenAI", "NVIDIA NIM", "any OpenAI-compatible API"]}
              typingSpeed={55}
              deletingSpeed={30}
              pauseDuration={1600}
              className="font-semibold text-teal-300"
              cursorCharacter="_"
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-9 flex w-full max-w-xl flex-col items-center gap-4"
          >
            <div className="w-full sm:max-w-md">
              <CommandChip command="npm install -g @ankitkumar131/mycode-ai" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Magnet padding={80} magnetStrength={3}>
                <StarBorder
                  as="a"
                  href="#get-started"
                  color="#2dd4bf"
                  speed="6s"
                  thickness={1.5}
                  backgroundColor="#0a0e16"
                  borderColor="rgba(45,212,191,0.35)"
                  textColor="#ffffff"
                  className="[&_.inner-content]:!px-6 [&_.inner-content]:!py-3 [&_.inner-content]:!font-semibold"
                >
                  <span className="flex items-center gap-2">
                    Get started free <ArrowRight className="h-4 w-4" />
                  </span>
                </StarBorder>
              </Magnet>
              <a
                href="/docs"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" /> Read the docs
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                <Star className="h-4 w-4" /> Star on GitHub
              </a>
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 w-full max-w-3xl"
          >
            <TerminalReplay lines={TERMINAL_LINES} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
