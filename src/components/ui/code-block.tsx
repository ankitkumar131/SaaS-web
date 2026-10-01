"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
  }, [text]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={`group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-200 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-1.5 text-teal-300"
          >
            <Check className="h-3.5 w-3.5" /> Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function CodeBlock({
  code,
  filename,
  lang = "bash",
  showCopy = true,
  className = "",
}: {
  code: string;
  filename?: string;
  lang?: string;
  showCopy?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-ink-850/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-coral-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-teal-400/80" />
          </span>
          <span className="ml-1 flex items-center gap-1.5 font-mono text-xs text-slate-400">
            {filename ? (
              filename
            ) : (
              <>
                <TerminalIcon className="h-3.5 w-3.5" /> {lang}
              </>
            )}
          </span>
        </div>
        {showCopy && <CopyButton text={code} />}
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code className="font-mono text-slate-200">{code}</code>
      </pre>
    </div>
  );
}

/** Inline single-line command chip with a copy affordance. */
export function CommandChip({ command, prefix = "$" }: { command: string; prefix?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 font-mono text-sm backdrop-blur">
      <span className="select-none text-coral-400">{prefix}</span>
      <span className="flex-1 truncate text-slate-200">{command}</span>
      <CopyButton text={command} label="" className="!border-0 !bg-transparent" />
    </div>
  );
}

/** A mock terminal that types out a sequence of lines. */
export function TerminalReplay({
  lines,
  className = "",
  startDelay = 400,
}: {
  lines: { text: string; tone?: "prompt" | "cmd" | "out" | "ok" | "dim" }[];
  className?: string;
  startDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let acc = startDelay;
    lines.forEach((_, i) => {
      acc += lines[i].text.length * 8 + 260;
      timers.push(setTimeout(() => !cancelled && setVisible(i + 1), acc));
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toneClass = (tone?: string) =>
    tone === "prompt"
      ? "text-coral-400"
      : tone === "cmd"
        ? "text-slate-100"
        : tone === "ok"
          ? "text-teal-300"
          : tone === "dim"
            ? "text-slate-500"
            : "text-slate-300";

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-white/10 bg-ink-950/90 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-ink-850/70 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-coral-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-teal-400/80" />
        </span>
        <span className="font-mono text-xs text-slate-500">mycode — zsh</span>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.slice(0, visible).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex gap-2 ${toneClass(l.tone)}`}
          >
            {l.tone === "cmd" && <span className="select-none text-coral-400">❯</span>}
            {l.tone === "prompt" && <span className="select-none text-teal-400">?</span>}
            <span className="whitespace-pre-wrap break-words">{l.text}</span>
          </motion.div>
        ))}
        {visible < lines.length && (
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-teal-400 align-middle" />
        )}
      </div>
    </div>
  );
}
