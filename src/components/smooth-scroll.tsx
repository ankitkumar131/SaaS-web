"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global smooth scrolling powered by Lenis, wired into GSAP's ScrollTrigger
 * so every React Bits scroll animation stays perfectly in sync. Also enables
 * smooth scrolling for in-page anchor links.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });
    } catch {
      return;
    }

    // Keep ScrollTrigger in sync with Lenis' smoothed scroll position.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor navigation.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis?.scrollTo(el as HTMLElement, { offset: -84, duration: 1.2 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    // Refresh ScrollTrigger measurements once layout settles
    // (fonts, images, late content) so reveals trigger at the right spot.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    const refreshTimer = setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(refreshTimer);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}
