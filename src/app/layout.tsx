import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const geistSans = GeistSans;

const geistMono = GeistMono;

export const metadata: Metadata = {
  metadataBase: new URL("https://mycodeai.antideploy.app"),
  title: {
    default: "MyCode-AI — Your Universal AI Coding Agent",
    template: "%s · MyCode-AI",
  },
  description:
    "One coding agent for OpenAI-compatible APIs, Anthropic, and Ollama. Bring your own keys, use automatic failover, and work with tools, skills, and MCP in your terminal.",
  keywords: [
    "AI coding agent",
    "CLI",
    "OpenRouter",
    "Ollama",
    "OpenAI",
    "Anthropic",
    "MCP",
    "terminal",
    "developer tools",
    "MyCode",
  ],
  authors: [{ name: "ankitkumar131" }],
  openGraph: {
    title: "MyCode-AI — Your Universal AI Coding Agent",
    description:
      "Your terminal, your keys, your choice of compatible provider. An open-source coding agent with automatic failover, skills, and MCP support.",
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
