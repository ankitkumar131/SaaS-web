"use client";

import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";
import StarBorder from "@/components/react-bits/StarBorder/StarBorder";
import { AGENT_TOOLS, APP_REPO, CLI_COMMANDS } from "@/lib/mycode";

type Tier = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  featured?: boolean;
  roadmap?: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "Community",
    price: "$0",
    period: "forever · MIT",
    tagline: "The full CLI, free and open source. It runs on your machine; inference uses your configured local or cloud providers.",
    featured: true,
    cta: "Install now",
    ctaHref: "#get-started",
    features: [
      `${CLI_COMMANDS.length} core CLI commands + aliases`,
      "Native & OpenAI-compatible providers + failover",
      `${AGENT_TOOLS.length} built-in agent tools`,
      "MYCODE.md project context",
      "MCP server tools in chat — included",
      "SKILL.md skills & custom slash commands",
      "Saved sessions & resume controls",
      "Self-contained JS bundle (Node.js 20+)",
    ],
  },
  {
    name: "Pro",
    price: "Planned",
    period: "not available yet",
    tagline: "A planned hosted layer for individuals who want dashboards and editor integrations.",
    roadmap: true,
    cta: "Follow on GitHub",
    ctaHref: APP_REPO,
    features: [
      "Web dashboard",
      "VS Code extension",
      "Managed provider relay",
      "Conversation history sync",
    ],
  },
  {
    name: "Enterprise",
    price: "Planned",
    period: "not available yet",
    tagline: "Planned governance, isolation, and support for teams using the agent.",
    roadmap: true,
    cta: "Discuss team needs",
    ctaHref: `${APP_REPO}/issues`,
    features: [
      "SSO / SAML",
      "Air-gapped & on-prem",
      "Audit logs & compliance",
      "Team collaboration",
      "Priority support & SLA",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Free and open source,"
          highlight="forever"
          subtitle="The MIT-licensed CLI runs on your machine with your own providers. Hosted Pro and Enterprise layers are plans, not available products."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 110} distance={50} className="h-full">
              {tier.featured ? (
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-coral-500 via-coral-400 to-teal-500 p-px shadow-2xl shadow-coral-500/10">
                  <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-ink-900 p-7">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-coral-500 to-teal-500 px-3.5 py-1 text-xs font-bold text-white shadow-lg">
                        <Sparkles className="h-3.5 w-3.5" /> Free forever
                      </span>
                    </div>
                    <TierBody tier={tier} />
                  </div>
                </div>
              ) : (
                <div className="h-full rounded-3xl border border-white/10 bg-ink-850/40 p-7">
                  <TierBody tier={tier} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-500">
          No MyCode subscription is required. Provider API usage may have its own costs.
          The CLI contacts the npm registry once per run to check for updates (3-second timeout);
          cloud providers, web tools, and MCP servers may also use the network.
        </p>
      </div>
    </section>
  );
}

function TierBody({ tier }: { tier: Tier }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
        {tier.roadmap && (
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 ring-1 ring-white/10">
            Roadmap
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-white">{tier.price}</span>
        <span className="text-sm text-slate-500">{tier.period}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{tier.tagline}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                tier.featured ? "bg-teal-500/20 text-teal-300" : "bg-white/5 text-slate-400"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        {tier.featured ? (
          <StarBorder
            as="a"
            href={tier.ctaHref}
            color="#ff6f5e"
            speed="6s"
            thickness={1}
            backgroundColor="#0a0e16"
            borderColor="rgba(255,111,94,0.3)"
            textColor="#ffffff"
            className="w-full [&_.inner-content]:!w-full [&_.inner-content]:!py-3 [&_.inner-content]:!font-semibold"
          >
            <span className="flex items-center justify-center gap-2">
              {tier.cta} <ArrowRight className="h-4 w-4" />
            </span>
          </StarBorder>
        ) : (
          <a
            href={tier.ctaHref}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {tier.cta}
          </a>
        )}
      </div>
    </div>
  );
}
