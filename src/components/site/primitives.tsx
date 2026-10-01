"use client";

import type { ReactNode } from "react";
import AnimatedContent from "@/components/react-bits/AnimatedContent/AnimatedContent";
import SplitText from "@/components/react-bits/SplitText/SplitText";

export function Reveal({
  children,
  delay = 0,
  distance = 60,
  direction = "vertical",
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
  once?: boolean;
}) {
  return (
    <AnimatedContent
      distance={distance}
      direction={direction}
      delay={delay}
      duration={0.8}
      className={className}
      threshold={0.15}
    >
      {children}
    </AnimatedContent>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-coral-500/25 bg-coral-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-300 ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral-500" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <Reveal distance={30}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <SplitText
        tag="h2"
        text={title}
        splitType="words"
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        delay={40}
        duration={0.9}
        className={`text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl ${
          align === "center" ? "justify-center" : ""
        }`}
      />
      {highlight && (
        <div className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="text-gradient">{highlight}</span>
        </div>
      )}
      {subtitle && (
        <Reveal delay={120} distance={30}>
          <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
