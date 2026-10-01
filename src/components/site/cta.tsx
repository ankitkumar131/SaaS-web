"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import AuroraBackdrop from "@/components/react-bits/Aurora/AuroraBackdrop";
import Magnet from "@/components/react-bits/Magnet/Magnet";
import StarBorder from "@/components/react-bits/StarBorder/StarBorder";
import { LogoMark } from "@/components/ui/logo";
import { CommandChip } from "@/components/ui/code-block";
import { Eyebrow } from "./primitives";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = ["your code.", "any ai.", "your way."];

/**
 * Three stacked lines revealed by a SINGLE scrubbed trigger, so every line
 * is always at the same animation state — perfectly aligned, tight rhythm.
 */
function CtaHeadline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = el.querySelectorAll(".cta-char");
    if (!chars.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 120, scaleY: 2.2, scaleX: 0.75, opacity: 0, transformOrigin: "50% 0%" },
        {
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mt-6">
      {HEADLINE_LINES.map((line) => (
        <div key={line} className="overflow-hidden pb-[0.09em] -mb-[0.09em]">
          <span
            aria-label={line}
            className="block text-center text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold leading-[1.06] tracking-tight text-white"
          >
            {line.split("").map((ch, i) => (
              <span key={i} aria-hidden="true" className="cta-char inline-block will-change-transform">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

const REPO = "https://github.com/ankitkumar131/mycode-ai";

export default function CtaSection() {
  return (
    <section id="get-started" className="relative isolate scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <AuroraBackdrop
          colorStops={["#2dd4bf", "#ff6f5e", "#2dd4bf"]}
          amplitude={1.3}
          blend={0.7}
          speed={0.5}
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/70 to-ink-950" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group flex justify-center"
        >
          <LogoMark className="h-14 w-14" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Get started</Eyebrow>
        </motion.div>

        <CtaHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-300"
        >
          Install in seconds, bring your own API key, and start shipping with an agent that never locks you in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-9 max-w-md"
        >
          <CommandChip command="npm install -g @ankitkumar131/mycode-ai" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnet padding={90} magnetStrength={3}>
            <StarBorder
              as="a"
              href="#hero"
              color="#2dd4bf"
              speed="6s"
              thickness={1.5}
              backgroundColor="#0a0e16"
              borderColor="rgba(45,212,191,0.35)"
              textColor="#ffffff"
              className="[&_.inner-content]:!px-7 [&_.inner-content]:!py-3.5 [&_.inner-content]:!font-semibold"
            >
              <span className="flex items-center gap-2">
                Start coding now <ArrowRight className="h-4 w-4" />
              </span>
            </StarBorder>
          </Magnet>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            <GithubIcon className="h-4 w-4" /> <Star className="h-4 w-4" /> Star on GitHub
          </a>
        </motion.div>

        <p className="mt-6 text-xs text-slate-500">MIT licensed · Requires Node.js 20+ · No account needed</p>
      </div>
    </section>
  );
}
