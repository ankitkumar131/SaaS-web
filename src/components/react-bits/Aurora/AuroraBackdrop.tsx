"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// WebGL is the heaviest asset on the page — never bundle it in the
// initial server render and only mount it when the section is near.
const Aurora = dynamic(() => import("@/components/react-bits/Aurora/Aurora"), {
  ssr: false,
});

type AuroraBackdropProps = {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
};

/**
 * Lazy Aurora stage with a pure-CSS coral/teal gradient fallback.
 * First paint is instant (CSS only); the shader fades in when nearby.
 */
export default function AuroraBackdrop({
  colorStops = ["#ff6f5e", "#2dd4bf", "#ff8b76"],
  amplitude = 1.15,
  blend = 0.6,
  speed = 0.6,
  className = "",
}: AuroraBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!nearby) return;
    const schedule = () => setReady(true);
    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(schedule, { timeout: 1200 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = setTimeout(schedule, 250);
    return () => clearTimeout(t);
  }, [nearby]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* Instant CSS fallback — also the reduced-motion experience */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(52% 42% at 22% 30%, ${colorStops[0]}30, transparent 70%), radial-gradient(48% 42% at 78% 32%, ${colorStops[1]}26, transparent 70%), radial-gradient(60% 50% at 50% 85%, ${colorStops[2]}1f, transparent 70%)`,
        }}
      />
      {ready && (
        <div className="absolute inset-0 animate-[aurora-fade-in_1.2s_ease-out]">
          <Aurora colorStops={colorStops} amplitude={amplitude} blend={blend} speed={speed} />
        </div>
      )}
    </div>
  );
}
