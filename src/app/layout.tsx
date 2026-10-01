import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const geistSans = GeistSans;

const geistMono = GeistMono;

export const metadata: Metadata = {
  metadataBase: new URL("https://mycode-ai.dev"),
  title: {
    default: "MyCode — Your Universal AI Coding Agent",
    template: "%s · MyCode",
  },
  description:
    "Like Claude Code, but works with any AI provider. One agent, any OpenAI-compatible API, automatic failover, and autonomous tool use — straight from your terminal.",
  keywords: [
    "AI coding agent",
    "CLI",
    "OpenRouter",
    "Ollama",
    "OpenAI",
    "terminal",
    "developer tools",
    "MyCode",
  ],
  authors: [{ name: "ankitkumar131" }],
  openGraph: {
    title: "MyCode — Your Universal AI Coding Agent",
    description:
      "One agent. Any AI provider. No lock-in. Just code. Bring your own API key and start coding in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-ink-950 font-sans text-slate-200 antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
