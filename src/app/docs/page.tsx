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
import {
  AGENT_TOOLS,
  APP_REPO,
  CHAT_OPTIONS,
  CLI_ALIASES,
  CLI_COMMANDS,
  CONFIG_COMMANDS,
  FAILOVER_REACTIONS,
  INSTALL_COMMAND,
  MCP_SETTINGS_EXAMPLE,
  MYCODE_VERSION,
  PROVIDERS,
  PROVIDER_SETUP_LABELS,
  PROVIDER_TYPES,
  QUICK_COMMANDS_EXAMPLE,
  SETTINGS_EXAMPLE,
  SETUP_TRANSCRIPT,
  SKILL_EXAMPLE,
  VERIFIED_DATE,
  WEBSITE_REPO,
} from "@/lib/mycode";

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

export const metadata = {
  title: "Documentation",
  description: "Install, configure, and use MyCode-AI — providers, agent tools, skills, and MCP.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Reveal distance={16}>
        <Eyebrow>Documentation · CLI v{MYCODE_VERSION}</Eyebrow>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Install &amp; use <span className="text-gradient">MyCode-AI</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Get the coding agent running in your terminal — from provider setup to agent tools,
          reusable skills, and MCP servers.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          Covers CLI v{MYCODE_VERSION} · Content verified {VERIFIED_DATE}.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <CommandChip command={INSTALL_COMMAND} />
          </div>
          <a
            href={`${WEBSITE_REPO}/edit/main/src/app/docs/page.tsx`}
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
            <InlineCode>MyCode</InlineCode> is an open-source AI coding agent that lives in your
            terminal. Bring your own API key or connect a local model — no MyCode account is needed.
          </P>
          <P>
            It supports OpenAI-compatible chat-completions APIs, the native Anthropic Messages API,
            and native Ollama. Services such as Groq, Together AI, NVIDIA NIM, and LM Studio can be
            configured with the <InlineCode>custom</InlineCode> type and their base URL.
          </P>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-coral-400/20 bg-coral-500/5 p-4">
              <h3 className="text-sm font-semibold text-coral-300">The problem</h3>
              <List
                items={[
                  "Locked into a single AI provider",
                  "No fallback when services go down",
                  "Expensive API costs, no alternatives",
                  "Can't choose local models for inference",
                ]}
              />
            </div>
            <div className="rounded-xl border border-teal-400/20 bg-teal-500/5 p-4">
              <h3 className="text-sm font-semibold text-teal-300">The MyCode way</h3>
              <List
                items={[
                  "Choose native or OpenAI-compatible providers",
                  "Automatic failover across configured providers",
                  "Use your own keys or local models",
                  "Free CLI, including skills and MCP support",
                ]}
              />
            </div>
          </div>
          <Callout type="info" title="Local CLI, configured network access">
            The CLI runs on your machine, but cloud inference sends requests to your configured
            providers. Local models keep inference on their host. MyCode also contacts the npm
            registry once per run to check for updates (a 3-second timeout); web tools and MCP servers
            can make their own network requests. Local inference does not mean every operation is offline.
          </Callout>
        </DocSection>

        <DocSection id="install" title="Installation">
          <P>
            MyCode requires <InlineCode>Node.js 20+</InlineCode>. Install it globally from npm:
          </P>
          <CodeBlock code={INSTALL_COMMAND} filename="terminal" />
          <P>Verify the version and inspect your environment:</P>
          <CodeBlock
            code={"mycode --version\nmycode doctor   # environment and configuration information"}
            filename="terminal"
          />
          <Callout type="info" title="Diagnostics are not connectivity tests">
            <InlineCode>doctor</InlineCode> shows Node, configuration, provider names, skills, and
            terminal information. It does not probe provider connectivity.
          </Callout>
          <Callout type="tip" title="Self-contained JavaScript bundle">
            The application&apos;s source build produces{" "}
            <InlineCode>packages/cli/dist/mycode-standalone.cjs</InlineCode> with its dependencies
            bundled. It still requires <strong>Node.js 20+</strong>. Native executable downloads are
            not available for this release.
          </Callout>
        </DocSection>

        <DocSection id="quick-start" title="Quick start">
          <P>
            Run <InlineCode>mycode init</InlineCode>. For an API provider, the free-text wizard asks
            nine questions: priority, provider name, API provider type, model, API key, base URL,
            read permission, write permission, and maximum retries. Ollama skips the API-key question.
          </P>
          <CodeBlock code={SETUP_TRANSCRIPT} filename="Example setup transcript" showCopy={false} />
          <P>
            This example enters <InlineCode>custom</InlineCode> for Groq. The API key and home
            directory are placeholders; blank permission and retry answers accept the shown defaults.
            Choose a model currently offered by your provider.
          </P>
          <P>Then start coding:</P>
          <CodeBlock code="mycode chat" filename="terminal" />
          <Callout type="info" title="Add multiple providers">
            Run <InlineCode>mycode init</InlineCode> again to choose <strong>Add a new provider</strong>,{" "}
            <strong>Change provider priorities</strong>, or <strong>Exit</strong>. Lower priority
            numbers come first. If a provider fails, MyCode can continue with another configured provider.
          </Callout>
        </DocSection>

        <DocSection id="providers" title="Providers">
          <P>
            The wizard accepts five API provider types:{" "}
            {PROVIDER_TYPES.map((type, i) => (
              <span key={type}>
                {i > 0 && ", "}<InlineCode>{type}</InlineCode>
              </span>
            ))}.
            Anthropic and Ollama use their native APIs; the other types use the OpenAI-compatible path.
          </P>
          <P>
            Only Anthropic, OpenRouter, and Ollama have URLs filled by the wizard. For OpenAI, leaving
            the URL blank uses the OpenAI SDK&apos;s default. The remaining examples below require{" "}
            <InlineCode>custom</InlineCode> and a manually entered URL — they are not wizard shortcuts.
          </P>
          <DocTable
            head={["Provider", "Setup", "API base URL"]}
            rows={PROVIDERS.map((provider) => [
              provider.name,
              `${provider.apiProvider} · ${PROVIDER_SETUP_LABELS[provider.urlSource]}`,
              provider.url,
            ])}
          />
          <Callout type="tip" title="Custom provider">
            Use <InlineCode>custom</InlineCode> for an endpoint that accepts the OpenAI
            chat-completions format, such as self-hosted vLLM or your own compatible gateway. The
            wizard does not offer a separate NVIDIA NIM type; use its Custom URL above.
          </Callout>
        </DocSection>

        <DocSection id="failover" title="Automatic failover">
          <P>
            Providers are chained by priority. Recognized rate limits, server, authentication,
            context-limit, and connection errors can switch the request to the next provider while
            preserving the conversation. Continuation still needs a working, configured fallback.
          </P>
          <DocTable
            head={["Failure", "Reaction"]}
            rows={FAILOVER_REACTIONS.map((error) => [`${error.code} · ${error.name}`, error.behavior])}
          />
          <Callout type="info" title="Retries and request-local skips">
            On the OpenAI-compatible path, retry/backoff is handled by the provider SDK according
            to <InlineCode>maxRetries</InlineCode>. MyCode parses <InlineCode>Retry-After</InlineCode>{" "}
            but does not use it to schedule a cooldown. Skips last for the current request; providers
            are not permanently disabled and can be tried again later. Context sizing and compaction
            also account for the current provider&apos;s window.
          </Callout>
        </DocSection>

        <DocSection id="commands" title="CLI commands">
          <P>
            There are {CLI_COMMANDS.length} core commands. Aliases and help/version flags are listed
            separately, not counted as additional commands.
          </P>
          <DocTable
            head={["Command", "Description"]}
            rows={CLI_COMMANDS.map((command) => [command.command, command.description])}
          />
          <DocTable
            head={["Alias", "Description"]}
            rows={CLI_ALIASES.map((alias) => [alias.command, alias.description])}
          />
          <P>
            Use <InlineCode>mycode --help</InlineCode> for usage and{" "}
            <InlineCode>mycode --version</InlineCode> for the installed CLI version.
          </P>
          <h3 className="pt-3 text-lg font-semibold text-white">Chat options</h3>
          <P>
            These options belong to <InlineCode>chat</InlineCode> (and its <InlineCode>run</InlineCode>{" "}
            alias), not to every CLI command. <InlineCode>--model</InlineCode> selects a configured
            provider/model for chat; it is not a universal command option.
          </P>
          <DocTable
            head={["Option", "Description"]}
            rows={CHAT_OPTIONS.map((option) => [option.option, option.description])}
          />
          <CodeBlock
            code={'mycode chat --model google/gemini-2.5-flash\nmycode chat -q "Explain this project without changing files"\nmycode chat --continue\nmycode sessions   # find IDs for chat --resume'}
            filename="terminal"
          />
          <h3 className="pt-3 text-lg font-semibold text-white">Inside an interactive chat</h3>
          <P>
            Type <InlineCode>/help</InlineCode> to discover slash commands. For example,{" "}
            <InlineCode>/review</InlineCode> is a chat slash command, not a standalone CLI command;{" "}
            <InlineCode>/model</InlineCode> switches models, <InlineCode>/skills</InlineCode> shows
            skills, and <InlineCode>/mcp</InlineCode> shows configured MCP servers.
          </P>
        </DocSection>

        <DocSection id="agent" title="Agent mode">
          <P>
            Agent mode reads your codebase, plans actions, and uses tools to work on multi-step tasks.
            There are {AGENT_TOOLS.length} built-in tools, using the canonical names below. Tool settings
            can restrict this set, and MCP servers can add more tools in chat.
          </P>
          <CodeBlock code={'mycode agent "Review this project and propose tests"'} filename="terminal" />
          <DocTable
            head={["Tool", "Description"]}
            rows={AGENT_TOOLS.map((tool) => [tool.name, tool.description])}
          />
          <Callout type="warn" title="Confirmed by default, not unconditionally">
            File writes and dangerous shell commands are confirmed by default. In chat,{" "}
            <InlineCode>--yolo</InlineCode> (alias <InlineCode>--allow-all</InlineCode>),{" "}
            <InlineCode>/allow-all</InlineCode>, or the <InlineCode>confirmWrites</InlineCode> /{" "}
            <InlineCode>confirmCommands</InlineCode> preferences can disable approval prompts. Only
            opt out for tasks you trust. Some command patterns remain blocked by the safety guards.
          </Callout>
          <P>
            The agent loop: <InlineCode>Observe → Think → Plan → Act → Repeat</InlineCode>.
          </P>
        </DocSection>

        <DocSection id="configuration" title="Configuration">
          <P>
            Your configuration lives in <InlineCode>~/.mycode/settings.json</InlineCode>. The supported
            config subcommands are:
          </P>
          <DocTable
            head={["Command", "Description"]}
            rows={CONFIG_COMMANDS.map((command) => [command.command, command.description])}
          />
          <CodeBlock
            code={"mycode config list            # view configured providers\nmycode config test            # report initial router status, not connectivity\nmycode config remove <name>   # replace <name> with a provider name"}
            filename="terminal"
          />
          <Callout type="warn" title="An active status is not proof of connectivity">
            <InlineCode>config test</InlineCode> constructs the router and prints its initial
            in-memory status. It makes no provider request and can report an offline provider as
            active. <InlineCode>doctor</InlineCode> does not probe providers either.
          </Callout>
          <P>
            Use camelCase keys, as written by <InlineCode>mycode init</InlineCode>. Legacy snake_case
            provider keys are accepted on read, but preference keys are not normalized — use{" "}
            <InlineCode>confirmWrites</InlineCode>, <InlineCode>confirmCommands</InlineCode>, and{" "}
            <InlineCode>logConversations</InlineCode>. The <InlineCode>version</InlineCode> field below
            is the settings schema version, not the CLI version.
          </P>
          <CodeBlock code={SETTINGS_EXAMPLE} filename="settings.json" lang="json" />
          <P>Additional supported settings include:</P>
          <DocTable
            head={["Setting", "Purpose"]}
            rows={[
              ["mcp.servers", "Configure MCP server commands for chat (see MCP below)"],
              ["vimMode", "Enable Vim-style input editing"],
              ["disabledTools", "Disable named tools by default"],
              ["toolsets", "Restrict the enabled tool groups"],
              ["skills.externalDirs", "Discover skills from additional directories"],
              ["quickCommands", "Define slash commands that execute shell commands or aliases"],
              ["personalities", "Define named system-prompt overlays"],
              ["contextWindows", "Set approximate context windows by provider name or model"],
            ]}
          />
        </DocSection>

        <DocSection id="project-context" title="Project context (MYCODE.md)">
          <P>
            Create a <InlineCode>.mycode/MYCODE.md</InlineCode> file to give MyCode knowledge of your
            project. Its instructions are loaded into interactions for consistent, project-aware responses.
          </P>
          <CodeBlock code={MYCODE_MD} filename=".mycode/MYCODE.md" lang="markdown" />
        </DocSection>

        <DocSection id="skills" title="Skills & custom slash commands">
          <P>
            Skills are reusable instructions stored in <InlineCode>SKILL.md</InlineCode> files. Put
            workspace skills in <InlineCode>.mycode/skills/&lt;name&gt;/SKILL.md</InlineCode>, or user
            skills in <InlineCode>~/.mycode/skills/&lt;name&gt;/SKILL.md</InlineCode>. List them with{" "}
            <InlineCode>mycode skills</InlineCode> or <InlineCode>/skills</InlineCode> inside chat.
          </P>
          <CodeBlock
            code={SKILL_EXAMPLE}
            filename=".mycode/skills/test-changes/SKILL.md"
            lang="markdown"
          />
          <P>
            You can also store custom slash-command prompts in{" "}
            <InlineCode>.mycode/commands/*.md</InlineCode>, or define shell/alias commands with{" "}
            <InlineCode>quickCommands</InlineCode>. For example, merge this fragment into your settings
            to make <InlineCode>/check</InlineCode> run the current project&apos;s test script:
          </P>
          <CodeBlock code={QUICK_COMMANDS_EXAMPLE} filename="settings.json fragment" lang="json" />
          <Callout type="info" title="Saved sessions">
            <InlineCode>mycode sessions</InlineCode> lists saved conversations. Use{" "}
            <InlineCode>mycode chat --continue</InlineCode> for the latest session in this directory,
            or <InlineCode>mycode chat --resume &lt;id&gt;</InlineCode> to choose one.
          </Callout>
        </DocSection>

        <DocSection id="mcp" title="MCP (included in the free CLI)">
          <P>
            Model Context Protocol support already ships in the Community CLI. Configure stdio
            servers in <InlineCode>mcp.servers</InlineCode>; chat starts the server processes,
            performs the MCP handshake, and makes their tools available to the agent. Use{" "}
            <InlineCode>/mcp</InlineCode> inside chat to inspect the servers.
          </P>
          <P>
            Merge this example into <InlineCode>settings.json</InlineCode> and replace the absolute
            project path. It uses an external filesystem MCP server launched with{" "}
            <InlineCode>npx</InlineCode>, which may download the server package from npm:
          </P>
          <CodeBlock code={MCP_SETTINGS_EXAMPLE} filename="settings.json fragment" lang="json" />
          <Callout type="warn" title="Trust the servers you configure">
            MCP servers run as child processes on your machine and expose their own capabilities.
            Review the server and limit its allowed paths before enabling it. MCP support is free;
            an external service may have its own costs.
          </Callout>
          <P>
            Skills and MCP are the shipped extension paths. This release does not offer a published
            plugin SDK or an A2A CLI server.
          </P>
        </DocSection>

        <DocSection id="contributing" title="Contributing">
          <P>
            Contributions to the{" "}
            <a href={APP_REPO} target="_blank" rel="noreferrer" className="text-teal-300 underline underline-offset-4">
              application repository
            </a>{" "}
            are welcome. To correct these web docs, use the Edit on GitHub link above; shared command,
            tool, and provider data lives in <InlineCode>src/lib/mycode.ts</InlineCode> in the website repository.
          </P>
          <List
            items={[
              "Fork the relevant repository",
              "Create a feature branch",
              "Make and test your changes",
              "Commit and push your branch",
              "Open a Pull Request",
            ]}
          />
          <Callout type="info" title="License">
            MyCode is open source under the <strong>MIT License</strong>. The application&apos;s{" "}
            <InlineCode>NOTICE.md</InlineCode> records third-party attribution for the vendored Ponytail rules.
          </Callout>
        </DocSection>
      </div>
    </div>
  );
}
