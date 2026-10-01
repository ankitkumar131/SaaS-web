import Link from "next/link";
import { Heart } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";

const REPO = "https://github.com/ankitkumar131/mycode-ai";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how" },
      { label: "Providers", href: "/#providers" },
      { label: "Agent mode", href: "/#agent" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Installation", href: "/docs#install" },
      { label: "Quick start", href: "/docs#quick-start" },
      { label: "CLI commands", href: "/docs#commands" },
      { label: "Configuration", href: "/docs#configuration" },
      { label: "Agent tools", href: "/docs#agent" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: REPO, external: true },
      { label: "npm package", href: "https://www.npmjs.com/package/@ankitkumar131/mycode-ai", external: true },
      { label: "Issues", href: `${REPO}/issues`, external: true },
      { label: "Contributing", href: "/docs#contributing" },
      { label: "MIT License", href: `${REPO}/blob/main/LICENSE`, external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-teal-500">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7 4 12l4 5" />
                  <path d="M16 7l4 5-4 5" />
                </svg>
              </span>
              <span className="text-lg font-bold text-white">
                My<span className="text-gradient">Code</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Your universal AI coding agent in the terminal. One agent, any AI provider, no lock-in — just code.
            </p>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" /> ankitkumar131/mycode-ai
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="text-sm text-slate-400 transition hover:text-teal-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MyCode. Open source under the MIT License.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Built with <Heart className="h-3.5 w-3.5 fill-coral-500 text-coral-500" /> using
            <span className="font-medium text-teal-300">React Bits</span> &amp; Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
