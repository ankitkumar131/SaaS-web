# MyCode — SaaS Website

A high-converting marketing site + documentation for **[MyCode](https://github.com/ankitkumar131/mycode-ai)** — *your universal AI coding agent in the terminal* (like Claude Code, but it works with **any** AI provider).

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and animated components from the **[React Bits](https://reactbits.dev)** library, themed in **coral 🪸 & teal 🌊**.

## ✨ Highlights

- **Animated landing page** — Aurora WebGL background, split-text headings, animated gradients, magnetic CTAs, spotlight cards, animated stat counters, an infinite provider marquee, and an electric-border callout.
- **Buttery smooth scrolling** — global [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll wired into GSAP ScrollTrigger, so every React Bits scroll animation stays in sync.
- **Full documentation site** (`/docs`) — install, quick start, providers, CLI commands, agent mode, configuration, project context, SDK, and contributing — with a scroll-spy sidebar.
- **Coral & teal design system** — a cohesive token set defined in Tailwind's `@theme`.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## 🧱 Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + Tailwind CSS v4 |
| Animation | Framer Motion (`motion`), GSAP + ScrollTrigger, Lenis |
| Components | React Bits (Aurora, SplitText, GradientText, TextType, StarBorder, SpotlightCard, CountUp, AnimatedContent, ElectricBorder, ScrollFloat, Magnet, …) |
| Icons | lucide-react |

## 📂 Structure

```
src/
  app/
    page.tsx            # landing page (composes the sections)
    docs/               # documentation site
  components/
    react-bits/         # React Bits component sources (+ .d.ts typings)
    site/               # landing page sections (hero, features, pricing, …)
    docs/               # docs shell, sidebar, primitives
    ui/                 # code block / terminal, icons
    smooth-scroll.tsx   # Lenis + GSAP ScrollTrigger integration
```

## 📄 About MyCode

MyCode is an open-source (MIT) AI coding agent CLI. Install it and bring your own API key:

```bash
npm install -g @ankitkumar131/mycode-ai
mycode init
mycode chat
```

See the live docs at `/docs` for the full guide.

---

Made with ❤️ using React Bits & Next.js. Showcasing [ankitkumar131/mycode-ai](https://github.com/ankitkumar131/mycode-ai).
