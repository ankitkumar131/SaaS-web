"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import Logo from "@/components/ui/logo";

const REPO = "https://github.com/ankitkumar131/mycode-ai";

export default function DocsTopbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo href="/" />
          <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400 sm:flex">
            <BookOpen className="h-3.5 w-3.5" /> Docs
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </div>
    </header>
  );
}
