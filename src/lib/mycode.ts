/**
 * Product-content snapshot verified against MyCode CLI 3.2.1 on 2026-10-08.
 * Keep the landing page and docs on the same command, tool, and provider facts.
 * This is the CLI version, not this website's independent package version.
 */
export const MYCODE_VERSION = "3.2.1";
export const VERIFIED_DATE = "October 8, 2026";
export const APP_REPO = "https://github.com/ankitkumar131/mycode-ai";
export const WEBSITE_REPO = "https://github.com/ankitkumar131/SaaS-web";
export const INSTALL_COMMAND = "npm install -g @ankitkumar131/mycode-ai";

// Count canonical commands only; aliases and help/version flags are separate.
export const CLI_COMMANDS = [
  { command: "mycode chat", description: "Start an interactive AI session (the default command)" },
  { command: "mycode agent [task]", description: "Work on a multi-step task using the agent's tools" },
  { command: "mycode explain <file>", description: "Ask the AI to explain a code file" },
  { command: "mycode fix <file|error>", description: "Ask the AI to diagnose and fix a file or error" },
  { command: "mycode edit <file> <instruction>", description: "Edit a file with AI assistance" },
  { command: "mycode config", description: "Manage providers with list, test, or remove" },
  { command: "mycode init", description: "Add a provider or change provider priorities interactively" },
  { command: "mycode doctor", description: "Show environment and configuration information; no connectivity probe" },
  { command: "mycode skills", description: "List installed skills" },
  { command: "mycode sessions", description: "List saved sessions" },
] as const;

export const CLI_ALIASES = [
  { command: 'mycode run "<task>"', description: "Use the chat query path for a one-shot task" },
  { command: "mycode setup", description: "Alias for mycode init" },
] as const;

export const CONFIG_COMMANDS = [
  { command: "mycode config list", description: "Show configured providers and models" },
  { command: "mycode config test", description: "Print the router's initial status; does not contact providers" },
  { command: "mycode config remove <name>", description: "Remove a named provider from settings" },
] as const;

export const CHAT_OPTIONS = [
  { option: "--model, -m <name>", description: "Select a configured provider/model for this chat" },
  { option: "--query, -q <text>", description: "Run one query and exit (-Q also accepts a query)" },
  { option: "--continue, -c", description: "Resume the latest session for this directory" },
  { option: "--resume, -r <id>", description: "Resume a saved session by ID or title" },
  { option: "--yolo, --allow-all", description: "Skip approval prompts; use only when you trust the task" },
] as const;

export const AGENT_TOOLS = [
  { name: "read_file", description: "Read file contents with line ranges" },
  { name: "write_file", description: "Create, overwrite, or append to a file" },
  { name: "patch", description: "Replace a block of text in an existing file" },
  { name: "list_dir", description: "List files and directories" },
  { name: "glob", description: "Find files by glob pattern" },
  { name: "search_files", description: "Find files by pattern or search their contents" },
  { name: "read_document", description: "Extract text from documents, spreadsheets, and presentations" },
  { name: "read_pdf", description: "Extract PDF text with page selection" },
  { name: "terminal", description: "Run shell commands with safety guards; supports background tasks" },
  { name: "process", description: "Manage background processes, logs, input, and termination" },
  { name: "execute_code", description: "Execute code snippets in a shell execution environment" },
  { name: "git_status", description: "Inspect the Git branch, working tree, and recent commits" },
  { name: "web_search", description: "Search the web for information" },
  { name: "web_fetch", description: "Fetch a web page and extract its content" },
  { name: "skills_list", description: "List available reusable skills" },
  { name: "skill_view", description: "Read a skill's SKILL.md or reference files" },
  { name: "skill_manage", description: "Create, edit, patch, or remove skills" },
  { name: "todo_write", description: "Track a multi-step task with a live todo list" },
  { name: "read_instructions", description: "Read workspace instruction files" },
  { name: "memory", description: "Persist useful facts and conventions across sessions" },
  { name: "delegate", description: "Delegate a self-contained task to a focused sub-agent" },
  { name: "question", description: "Ask the user for clarification or input" },
] as const;

export type AgentToolName = (typeof AGENT_TOOLS)[number]["name"];

export const PROVIDER_TYPES = ["openai", "anthropic", "openrouter", "ollama", "custom"] as const;

type Provider = {
  name: string;
  apiProvider: (typeof PROVIDER_TYPES)[number];
  url: string;
  urlSource: "wizard" | "sdk" | "manual";
  local: boolean;
};

export const PROVIDER_SETUP_LABELS = {
  wizard: "URL filled by wizard",
  sdk: "OpenAI SDK default",
  manual: "Custom · paste URL",
} as const;

export const PROVIDERS = [
  { name: "OpenRouter", apiProvider: "openrouter", url: "https://openrouter.ai/api/v1", urlSource: "wizard", local: false },
  { name: "OpenAI", apiProvider: "openai", url: "https://api.openai.com/v1", urlSource: "sdk", local: false },
  { name: "Anthropic", apiProvider: "anthropic", url: "https://api.anthropic.com", urlSource: "wizard", local: false },
  { name: "Ollama", apiProvider: "ollama", url: "http://localhost:11434", urlSource: "wizard", local: true },
  { name: "NVIDIA NIM", apiProvider: "custom", url: "https://integrate.api.nvidia.com/v1", urlSource: "manual", local: false },
  { name: "Groq", apiProvider: "custom", url: "https://api.groq.com/openai/v1", urlSource: "manual", local: false },
  { name: "Together AI", apiProvider: "custom", url: "https://api.together.xyz/v1", urlSource: "manual", local: false },
  { name: "Fireworks AI", apiProvider: "custom", url: "https://api.fireworks.ai/inference/v1", urlSource: "manual", local: false },
  { name: "Mistral AI", apiProvider: "custom", url: "https://api.mistral.ai/v1", urlSource: "manual", local: false },
  { name: "DeepSeek", apiProvider: "custom", url: "https://api.deepseek.com/v1", urlSource: "manual", local: false },
  { name: "LM Studio", apiProvider: "custom", url: "http://localhost:1234/v1", urlSource: "manual", local: true },
] as const satisfies readonly Provider[];

export const FAILOVER_REACTIONS = [
  { code: "429", name: "Rate limited", behavior: "Provider SDK retries according to maxRetries, then MyCode tries the next provider" },
  { code: "5xx", name: "Server error", behavior: "Try the next provider after the current attempt and any SDK retries fail" },
  { code: "401 / 403", name: "Auth error", behavior: "Warn and skip the provider for this request; it is not permanently disabled" },
  { code: "Context", name: "Window exceeded", behavior: "Recognized context-limit messages trigger failover; HTTP 413 alone is not mapped" },
  { code: "ECONNREFUSED", name: "Connection refused", behavior: "Recognized connection errors skip the provider for this request" },
] as const;

// Transcript of the free-text wizard, not a provider selection menu.
// The sample home directory and API key are placeholders.
export const SETUP_TRANSCRIPT = `$ mycode init

MyCode Setup

Priority (1): 1
Provider name (provider-1): groq
API provider (openai/anthropic/openrouter/ollama/custom):
  anthropic uses the native Messages API (thinking + prompt caching)custom
Model (gpt-4o): llama-3.1-70b-versatile
API key: gsk_xxxxxxx
Base URL: https://api.groq.com/openai/v1
Read permission (true/false) [true]:
Write permission (true/false) [true]:
Max retries (3):

Config saved to: /home/you/.mycode/settings.json`;

export const SETTINGS_EXAMPLE = `{
  "version": "1",
  "providers": [
    {
      "priority": 1,
      "name": "my-openrouter",
      "apiProvider": "openrouter",
      "model": "google/gemini-2.5-flash",
      "apiKey": "sk-or-...",
      "baseUrl": "https://openrouter.ai/api/v1",
      "read": true,
      "write": true,
      "maxRetries": 3
    },
    {
      "priority": 2,
      "name": "local-ollama",
      "apiProvider": "ollama",
      "model": "llama3.1:8b",
      "baseUrl": "http://localhost:11434",
      "read": true,
      "write": true,
      "maxRetries": 3
    }
  ],
  "preferences": {
    "theme": "dark",
    "confirmWrites": true,
    "confirmCommands": true,
    "logConversations": true
  }
}`;

// Merge these fragments into settings.json; they are not complete configs.
export const MCP_SETTINGS_EXAMPLE = `{
  "mcp": {
    "servers": [
      {
        "name": "filesystem",
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "/absolute/path/to/your/project"
        ]
      }
    ]
  }
}`;

export const QUICK_COMMANDS_EXAMPLE = `{
  "quickCommands": {
    "check": {
      "type": "exec",
      "command": "npm test",
      "description": "Run this project's tests"
    }
  }
}`;

export const SKILL_EXAMPLE = `---
name: test-changes
description: Review changes and run the project's tests
---

# Test changes
1. Inspect the diff and identify affected behavior.
2. Read the project's test scripts before choosing a command.
3. Add or update tests for changed behavior.
4. Run the relevant tests and summarize any failures.`;
