import { PencilLine } from "lucide-react";
import { CodeBlock, CommandChip } from "@/components/ui/code-block";
import { Eyebrow, Reveal } from "@/components/site/primitives";
import {
  DocSection,
  P,
  InlineCode,
  List,
  Callout,
  DocTable,
} from "@/components/docs/doc-primitives";

const REPO = "https://github.com/ankitkumar131/mycode-ai";

const WIZARD = `$ mycode init

⚡ MyCode Setup Wizard

? Priority: 1
? Provider name: groq
? Choose your AI provider: ⚙️  Custom (any OpenAI-compatible endpoint)
? Enter the model identifier: llama-3.1-70b-versatile
? Enter your API key: gsk_xxxxxxxxxxxxxxx
? Enter the API base URL: https://api.groq.com/openai/v1

✓ Added provider: groq`;

const SETTINGS_JSON = `{
  "providers": [
    {
      "priority": 1,
      "name": "my-openrouter",
      "api_provider": "openrouter",
      "model": "google/gemini-2.5-flash",
      "api_key": "sk-or-...",
      "base_url": "https://openrouter.ai/api/v1",
      "read": true,
      "write": true,
      "max_retries": 3
    },
    {
      "priority": 2,
      "name": "local-ollama",
      "api_provider": "ollama",
      "model": "llama3.1:8b",
      "base_url": "http://localhost:11434",
      "read": true,
      "write": true,
      "max_retries": 3
    }
  ],
  "preferences": {
    "theme": "dark",
    "confirm_writes": true,
    "confirm_commands": true,
    "log_conversations": true
  }
}`;

const MYCODE_MD = `# Project: My Awesome App

## Tech Stack
- Language: TypeScript
- Framework: React + Next.js
- Database: PostgreSQL
- Package Manager: pnpm

## Conventions
- Use functional components
- Follow Airbnb ESLint config
- Use kebab-case for file names

## Instructions
- Always add unit tests for new features
- Use Tailwind CSS for styling
- Follow the repository's PR template`;

const SDK_CODE = `import { MyCodeSDK } from '@mycode/sdk';

const sdk = new MyCodeSDK();

// Register a custom tool
sdk.registerTool({
  name: 'deploy',
  description: 'Deploy the application',
  parameters: { environment: { type: 'string' } },
  execute: async ({ environment }) => {
    return { success: true, url: \`https://\${environment}.myapp.com\` };
  }
});

// Register a custom provider
sdk.registerProvider({
  name: 'my-custom-llm',
  chat: async (messages) => { /* ... */ },
  isAvailable: async () => true,
});`;

export const metadata = {
  title: "Documentation",
  description: "Install, configure, and use MyCode-AI — the universal AI coding agent.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Hero */}
      <Reveal distance={16}>
        <Eyebrow>Documentation</Eyebrow>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Install &amp; use <span className="text-gradient">MyCode-AI</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Everything you need to get the universal AI coding agent running in your terminal — from
          install to autonomous agent mode.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <CommandChip command="npm install -g @ankitkumar131/mycode-ai" />
          </div>
          <a
            href={`${REPO}/edit/main/README.md`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-teal-300"
          >
            <PencilLine className="h-4 w-4" /> Edit on GitHub
          </a>
        </div>
      </Reveal>

      <div className="mt-8">
        <DocSection id="introduction" title="Introduction">
          <P>
            <InlineCode>MyCode</InlineCode> is a universal AI coding agent that lives in your terminal.
            Think <em>Claude Code</em>, but it works with <strong className="text-white">any AI provider that has an API</strong> —
            you just bring your API key.
          </P>
          <P>
            It speaks a universal OpenAI-compatible interface, so it works out of the box with OpenRouter,
            NVIDIA NIM, Ollama, OpenAI, Groq, Together AI, Mistral, Fireworks, DeepSeek, or your own
            self-hosted endpoint.
          </P>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-coral-400/20 bg-coral-500/5 p-4">
              <h3 className="text-sm font-semibold text-coral-300">The problem</h3>
              <List
                items={[
                  "Locked into a single AI provider",
                  "No fallback when services go down",
                  "Expensive API costs, no alternatives",
                  "Can't use local models for privacy",
                ]}
              />
            </div>
            <div className="rounded-xl border border-teal-400/20 bg-teal-500/5 p-4">
              <h3 className="text-sm font-semibold text-teal-300">The MyCode way</h3>
              <List
                items={[
                  "Any AI provider — just enter API details",
                  "Automatic failover keeps you coding",
                  "Free tiers via OpenRouter & Ollama",
                  "Local models — fully private & offline",
                ]}
              />
            </div>
          </div>
        </DocSection>

        <DocSection id="install" title="Installation">
          <P>
            MyCode requires <InlineCode>Node.js 20+</InlineCode>. Install it globally from npm:
          </P>
          <CodeBlock code="npm install -g @ankitkumar131/mycode-ai" filename="terminal" />
          <P>Verify the install and check your system:</P>
          <CodeBlock code={"mycode --version\nmycode doctor   # system diagnostics & provider health"} filename="terminal" />
          <Callout type="tip" title="No Node.js?">
            You can also build a <strong>standalone binary</strong> (Single Executable Application) that runs
            without Node.js — just download and run it anywhere.
          </Callout>
        </DocSection>

        <DocSection id="quick-start" title="Quick start">
          <P>
            Run the setup wizard. It asks for just <strong className="text-white">four things</strong>:
            provider, model, API key, and base URL.
          </P>
          <CodeBlock code={WIZARD} filename="mycode init" />
          <P>Then start coding:</P>
          <CodeBlock code="mycode chat" filename="terminal" />
          <Callout type="info" title="Add multiple providers">
            You can add several providers during setup for automatic failover. If provider #1 goes down,
            MyCode seamlessly switches to #2, then #3, and so on.
          </Callout>
        </DocSection>

        <DocSection id="providers" title="Providers">
          <P>
            Pick a preset during <InlineCode>mycode init</InlineCode>, or choose{" "}
            <strong className="text-white">Custom</strong> to connect to any OpenAI-compatible endpoint.
          </P>
          <DocTable
            head={["Provider", "API base URL"]}
            rows={[
              ["OpenRouter", "https://openrouter.ai/api/v1"],
              ["OpenAI", "https://api.openai.com/v1"],
              ["NVIDIA NIM", "https://integrate.api.nvidia.com/v1"],
              ["Ollama (local)", "http://localhost:11434"],
              ["Groq", "https://api.groq.com/openai/v1"],
              ["Together AI", "https://api.together.xyz/v1"],
              ["Fireworks AI", "https://api.fireworks.ai/inference/v1"],
              ["Mistral AI", "https://api.mistral.ai/v1"],
              ["DeepSeek", "https://api.deepseek.com/v1"],
              ["LM Studio (local)", "http://localhost:1234/v1"],
            ]}
          />
          <Callout type="tip" title="Custom provider">
            Use the <strong>Custom</strong> provider type to connect to anything that follows the OpenAI
            chat-completions format — Azure OpenAI, self-hosted vLLM, or your own gateway.
          </Callout>
        </DocSection>

        <DocSection id="commands" title="CLI commands">
          <DocTable
            head={["Command", "Description"]}
            rows={[
              ["mycode chat", "Start an interactive AI chat session"],
              ["mycode agent", "Start the AI agent with autonomous tool use"],
              ["mycode explain <file>", "Get an AI explanation of any code file"],
              ["mycode fix <file>", "Detect and fix bugs in your code"],
              ["mycode edit <file>", "Edit code with AI assistance"],
              ["mycode review <file>", "AI-powered code review with suggestions"],
              ["mycode config", "Manage configuration (set / get / list / reset)"],
              ["mycode init", "Set up providers interactively"],
              ["mycode doctor", "System diagnostics & provider health check"],
            ]}
          />
          <P>Global options work with any command:</P>
          <CodeBlock
            code={"mycode <command> --provider <name>   # override default provider\nmycode <command> --model <name>      # override default model\nmycode <command> --verbose           # enable verbose logging\nmycode <command> --no-color          # disable colored output"}
            filename="options"
          />
        </DocSection>

        <DocSection id="agent" title="Agent mode">
          <P>
            Agent mode gives MyCode autonomous superpowers — it reads your codebase, understands context,
            plans actions, and executes them with built-in tools until the task is complete.
          </P>
          <CodeBlock code="mycode agent" filename="terminal" />
          <DocTable
            head={["Tool", "Description"]}
            rows={[
              ["read_file", "Read file contents with optional line ranges"],
              ["write_file", "Create or overwrite files (with confirmation)"],
              ["edit_file", "Surgical find-and-replace editing"],
              ["list_directory", "List directory contents with metadata"],
              ["search_files", "Glob-based file pattern search"],
              ["search_code", "Regex code search across your project"],
              ["run_command", "Execute shell commands (with safety guards)"],
              ["web_search", "Search the web for information"],
            ]}
          />
          <Callout type="warn" title="Safety by design">
            All file writes and dangerous shell commands (<InlineCode>rm</InlineCode>,{" "}
            <InlineCode>format</InlineCode>, …) require your explicit confirmation before execution. You
            always stay in control.
          </Callout>
          <P>
            The agent loop: <InlineCode>Observe → Think → Plan → Act → Repeat</InlineCode>.
          </P>
        </DocSection>

        <DocSection id="configuration" title="Configuration">
          <P>
            Your provider configuration lives in <InlineCode>~/.mycode/settings.json</InlineCode>. Manage it
            from the CLI:
          </P>
          <CodeBlock
            code={"mycode config list     # view current config\nmycode config test     # test all provider connections\nmycode config reset    # reset configuration"}
            filename="terminal"
          />
          <P>Example settings structure:</P>
          <CodeBlock code={SETTINGS_JSON} filename="settings.json" lang="json" />
        </DocSection>

        <DocSection id="project-context" title="Project context (MYCODE.md)">
          <P>
            Create a <InlineCode>.mycode/MYCODE.md</InlineCode> file to give MyCode deep knowledge of your
            project. It&apos;s loaded into every interaction for consistent, project-aware responses.
          </P>
          <CodeBlock code={MYCODE_MD} filename=".mycode/MYCODE.md" lang="markdown" />
        </DocSection>

        <DocSection id="sdk" title="SDK & plugins">
          <P>
            Build custom extensions with the MyCode SDK — register your own tools and providers that plug
            straight into the agent.
          </P>
          <CodeBlock code={SDK_CODE} filename="plugin.ts" lang="typescript" />
          <P>
            You can also run the <strong className="text-white">A2A protocol server</strong> for multi-agent
            orchestration:
          </P>
          <CodeBlock code="mycode a2a-server --port 3000" filename="terminal" />
        </DocSection>

        <DocSection id="contributing" title="Contributing">
          <P>Contributions are welcome! Here&apos;s how to get started:</P>
          <List
            items={[
              "Fork the repository",
              "Create your feature branch (git checkout -b feature/amazing-feature)",
              "Commit your changes (git commit -m 'Add amazing feature')",
              "Push to the branch (git push origin feature/amazing-feature)",
              "Open a Pull Request",
            ]}
          />
          <Callout type="info" title="License">
            MyCode is open source under the <strong>MIT License</strong>.
          </Callout>
        </DocSection>
      </div>
    </div>
  );
}
