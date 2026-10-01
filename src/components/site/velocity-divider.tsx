"use client";

import ScrollVelocity from "@/components/react-bits/ScrollVelocity/ScrollVelocity";

/**
 * Full-bleed scroll-reactive marquee divider. Speed + direction follow the
 * user's scroll velocity — the signature Antigravity-style motion moment.
 */
export default function VelocityDivider({
  texts = ["ANY PROVIDER", "NO LOCK-IN", "YOUR KEYS"],
  velocity = 28,
  className = "",
}: {
  texts?: string[];
  velocity?: number;
  className?: string;
}) {
  return (
    <section aria-hidden="true" className={`relative w-full overflow-hidden py-10 sm:py-14 ${className}`}>
      <ScrollVelocity
        texts={texts}
        velocity={velocity}
        numCopies={6}
        rowClassName={[
          "mx-6 text-4xl font-black uppercase tracking-tight text-white/90 sm:mx-8 sm:text-6xl",
          "mx-6 text-4xl font-black uppercase tracking-tight text-stroke-teal sm:mx-8 sm:text-6xl",
        ]}
        className="w-full space-y-3"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />
    </section>
  );
}
