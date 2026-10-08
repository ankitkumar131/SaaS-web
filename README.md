# MyCode — SaaS Website

A high-converting marketing site + documentation for **[MyCode](https://github.com/ankitkumar131/mycode-ai)** — *your universal AI coding agent in the terminal* (OpenAI-compatible APIs, native Anthropic, and Ollama).

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and animated components from the **[React Bits](https://reactbits.dev)** library, themed in **coral 🪸 & teal 🌊**.

## ✨ Highlights

- **Animated landing page** — Aurora WebGL background, split-text headings, animated gradients, magnetic CTAs, spotlight cards, animated stat counters, an infinite provider marquee, and an electric-border callout.
- **Buttery smooth scrolling** — global [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll wired into GSAP ScrollTrigger, so every React Bits scroll animation stays in sync.
- **Full documentation site** (`/docs`) — install, quick start, providers, failover, CLI commands, agent tools, configuration, project context, skills, MCP, and contributing — with a scroll-spy sidebar.
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

## ✅ Content accuracy & checks

Website copy describes **MyCode CLI 3.2.1**, verified on **2026-10-08**. The website's own npm version is separate from the CLI version.

- Shared product facts and examples live in `src/lib/mycode.ts`; both the landing page and `/docs` use them.
- There are **10 core CLI commands**, plus `run` / `setup` aliases and help/version flags. Skills and sessions are counted; code review is the `/review` chat command.
- There are **22 built-in agent tools**. MCP can add tools in chat and is included in the free CLI, alongside skills.
- The wizard accepts five API provider types. Only Anthropic, OpenRouter, and Ollama have wizard-filled URLs; OpenAI uses the SDK default, and other services use Custom + a manual URL.
- Approval prompts are **on by default**, not unconditional. The source build is a JavaScript bundle that still requires Node.js 20+.
- `doctor` and `config test` report configuration/status, not provider connectivity. The CLI's npm update check is disclosed in the site and docs.
- Public plugin SDK, A2A server, and native executable claims are not advertised as implemented.

When the CLI changes, re-verify these facts against that release, update the snapshot and examples, and run:

```bash
npm test         # content regression tests (no network requests)
npm run lint
npm run build
```

The web docs are maintained in `src/app/docs/page.tsx`, not rendered from the application's README. The “Edit on GitHub” link points to this website repository.

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
