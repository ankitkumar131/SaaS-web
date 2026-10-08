import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = (path) => readFileSync(join(root, path), "utf8");

// Use the existing TypeScript dependency, without an extra runner or network access.
async function loadData(path) {
  const { outputText } = ts.transpileModule(source(path), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const facts = await loadData("src/lib/mycode.ts");
const { DOCS_SECTIONS } = await loadData("src/components/docs/sections.ts");
const docs = source("src/app/docs/page.tsx");

function publicSourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? publicSourceFiles(path) : /\.[jt]sx?$/.test(path) ? [path] : [];
  });
}

const publicSources = publicSourceFiles(join(root, "src"));

test("the CLI snapshot version is used by the hero and docs", () => {
  assert.equal(facts.MYCODE_VERSION, "3.2.1");
  assert.equal(facts.VERIFIED_DATE, "October 8, 2026");
  assert.match(source("src/components/site/hero.tsx"), /v\{MYCODE_VERSION\}/);
  assert.match(docs, /CLI v\{MYCODE_VERSION\}/);
});

test("ten canonical CLI commands are counted separately from aliases and flags", () => {
  const commands = facts.CLI_COMMANDS.map(({ command }) => command.split(" ")[1]);
  assert.deepEqual(commands.toSorted(), [
    "agent", "chat", "config", "doctor", "edit", "explain", "fix", "init", "sessions", "skills",
  ]);
  assert.equal(new Set(commands).size, 10);
  assert.deepEqual(facts.CLI_ALIASES.map(({ command }) => command.split(" ")[1]), ["run", "setup"]);
  assert.match(docs, /CLI_COMMANDS\.map/);
  for (const file of ["pricing.tsx", "social-proof.tsx"]) {
    assert.match(source(`src/components/site/${file}`), /CLI_COMMANDS\.length/);
  }
  assert.match(docs, /<InlineCode>\/review<\/InlineCode> is a chat slash command/);
});

test("only list, test, and remove are advertised as config subcommands", () => {
  assert.deepEqual(facts.CONFIG_COMMANDS.map(({ command }) => command.split(" ")[2]), [
    "list", "test", "remove",
  ]);
  assert.match(facts.CONFIG_COMMANDS[1].description, /does not contact providers/);
  assert.match(facts.CLI_COMMANDS.find(({ command }) => command === "mycode doctor").description, /no connectivity probe/);
  assert.match(docs, /can report an offline provider as\s+active/);
});

test("chat options are scoped to chat/run rather than advertised globally", () => {
  assert.deepEqual(facts.CHAT_OPTIONS.map(({ option }) => option.split(",")[0]), [
    "--model", "--query", "--continue", "--resume", "--yolo",
  ]);
  assert.match(docs, /not to every CLI command/);
  assert.match(docs, /--allow-all/);
  assert.match(docs, /<InlineCode>\/allow-all<\/InlineCode>/);
});

test("all 22 canonical tools are documented; landing highlights are valid tools", () => {
  const expected = [
    "read_file", "write_file", "patch", "list_dir", "glob", "search_files", "read_document",
    "read_pdf", "terminal", "process", "execute_code", "git_status", "web_search", "web_fetch",
    "skills_list", "skill_view", "skill_manage", "todo_write", "read_instructions", "memory",
    "delegate", "question",
  ];
  const names = facts.AGENT_TOOLS.map(({ name }) => name);
  assert.deepEqual(names.toSorted(), expected.toSorted());
  assert.equal(new Set(names).size, 22);
  assert.match(docs, /AGENT_TOOLS\.map/);
  const agent = source("src/components/site/agent-mode.tsx");
  const highlights = [...agent.matchAll(/name: "([a-z_]+)"/g)].map((match) => match[1]);
  assert.ok(highlights.length > 0);
  for (const name of highlights) assert.ok(names.includes(name), `Unknown highlighted tool: ${name}`);
  for (const file of ["agent-mode.tsx", "features.tsx", "pricing.tsx", "social-proof.tsx"]) {
    assert.match(source(`src/components/site/${file}`), /AGENT_TOOLS\.length/);
  }
});

test("provider examples distinguish three wizard URLs, the SDK default, and Custom URLs", () => {
  assert.deepEqual([...facts.PROVIDER_TYPES], ["openai", "anthropic", "openrouter", "ollama", "custom"]);
  const wizardDefaults = facts.PROVIDERS.filter(({ urlSource }) => urlSource === "wizard");
  assert.deepEqual(wizardDefaults.map(({ apiProvider }) => apiProvider).toSorted(), [
    "anthropic", "ollama", "openrouter",
  ]);
  assert.deepEqual(facts.PROVIDERS.filter(({ urlSource }) => urlSource === "sdk").map(({ name }) => name), ["OpenAI"]);
  const custom = facts.PROVIDERS.filter(({ urlSource }) => urlSource === "manual");
  assert.equal(custom.length, 7);
  for (const provider of custom) {
    assert.equal(provider.apiProvider, "custom");
    assert.ok(new URL(provider.url).hostname);
  }
  assert.match(source("src/components/site/providers.tsx"), /PROVIDER_SETUP_LABELS\[p\.urlSource\]/);
  assert.match(docs, /PROVIDER_SETUP_LABELS\[provider\.urlSource\]/);
});

test("the actual nine-prompt free-text wizard is shared across the site and docs", () => {
  const prompts = facts.SETUP_TRANSCRIPT.match(/^(Priority|Provider name|API provider|Model|API key|Base URL|Read permission|Write permission|Max retries).*:/gm);
  assert.equal(prompts.length, 9);
  assert.match(facts.SETUP_TRANSCRIPT, /API provider \(openai\/anthropic\/openrouter\/ollama\/custom\):/);
  assert.match(facts.SETUP_TRANSCRIPT, /Config saved to: .*\/\.mycode\/settings\.json/);
  for (const path of ["src/app/docs/page.tsx", "src/components/site/hero.tsx", "src/components/site/how-it-works.tsx"]) {
    assert.match(source(path), /SETUP_TRANSCRIPT/);
  }
  assert.match(docs, /Ollama skips the API-key question/);
});

test("the settings example is valid JSON with effective camelCase preferences", () => {
  const settings = JSON.parse(facts.SETTINGS_EXAMPLE);
  assert.equal(settings.version, "1");
  assert.equal(settings.providers.length, 2);
  assert.deepEqual(settings.preferences, {
    theme: "dark", confirmWrites: true, confirmCommands: true, logConversations: true,
  });
  for (const provider of settings.providers) {
    assert.ok(facts.PROVIDER_TYPES.includes(provider.apiProvider));
    assert.equal(typeof provider.baseUrl, "string");
    assert.equal(typeof provider.maxRetries, "number");
    assert.equal(provider.read, true);
    assert.equal(provider.write, true);
    for (const key of Object.keys(provider)) assert.ok(!key.includes("_"));
  }
  assert.match(docs, /preference keys are not normalized/);
});

test("failover describes SDK retries, request-local skips, and message-based context errors", () => {
  assert.equal(facts.FAILOVER_REACTIONS.length, 5);
  const rateLimit = facts.FAILOVER_REACTIONS.find(({ code }) => code === "429");
  assert.match(rateLimit.behavior, /SDK retries according to maxRetries/);
  for (const code of ["401 / 403", "ECONNREFUSED"]) {
    assert.match(facts.FAILOVER_REACTIONS.find((row) => row.code === code).behavior, /for this request/);
  }
  assert.match(facts.FAILOVER_REACTIONS.find(({ code }) => code === "Context").behavior, /HTTP 413 alone is not mapped/);
  assert.match(docs, /does not use it to schedule a cooldown/);
  assert.match(source("src/components/site/failover.tsx"), /FAILOVER_REACTIONS\.map/);
});

test("MCP is in Community, not the Pro roadmap, and configuration examples are valid", () => {
  const pricing = source("src/components/site/pricing.tsx");
  const community = pricing.slice(pricing.indexOf('name: "Community"'), pricing.indexOf('name: "Pro"'));
  const pro = pricing.slice(pricing.indexOf('name: "Pro"'), pricing.indexOf('name: "Enterprise"'));
  assert.match(community, /MCP server tools in chat — included/);
  assert.match(community, /SKILL\.md skills & custom slash commands/);
  assert.doesNotMatch(pro, /MCP/);
  assert.match(pro, /not available yet/);
  const { mcp } = JSON.parse(facts.MCP_SETTINGS_EXAMPLE);
  assert.equal(mcp.servers[0].command, "npx");
  assert.ok(mcp.servers[0].args.includes("@modelcontextprotocol/server-filesystem"));
  const { quickCommands } = JSON.parse(facts.QUICK_COMMANDS_EXAMPLE);
  assert.deepEqual(quickCommands.check, {
    type: "exec", command: "npm test", description: "Run this project's tests",
  });
  assert.match(facts.SKILL_EXAMPLE, /^---\nname: test-changes\ndescription:/);
});

test("docs navigation and incoming section links point to real sections", () => {
  const renderedIds = [...docs.matchAll(/<DocSection id="([a-z-]+)"/g)].map((match) => match[1]);
  assert.deepEqual(DOCS_SECTIONS.map(({ id }) => id), renderedIds);
  for (const path of publicSources) {
    for (const [, id] of readFileSync(path, "utf8").matchAll(/\/docs#([a-z-]+)/g)) {
      assert.ok(renderedIds.includes(id), `${path}: missing docs section #${id}`);
    }
  }
  const footer = source("src/components/site/footer.tsx");
  assert.match(footer, /\/docs#skills/);
  assert.match(footer, /\/docs#mcp/);
  assert.match(docs, /WEBSITE_REPO\}\/edit\/main\/src\/app\/docs\/page\.tsx/);
  assert.doesNotMatch(docs, /edit\/main\/README\.md/);
});

test("safety defaults, Node requirement, and npm update requests are disclosed", () => {
  assert.match(docs, /confirmed by default/);
  assert.match(docs, /still requires <strong>Node\.js 20\+<\/strong>/);
  assert.match(docs, /npm\s+registry once per run/);
  assert.match(source("src/components/site/pricing.tsx"), /npm registry once per run/);
  const features = source("src/components/site/features.tsx");
  assert.match(features, /confirmation by default/);
  assert.match(features, /chalk and marked/);
  assert.match(features, /still requires Node\.js 20\+/);
});

test("unsupported commands, APIs, tools, flags, and obsolete promises do not return", () => {
  const unsupported = [
    /\bmycode review\b/,
    /\bmycode a2a-server\b/,
    /\bmycode config (?:set|get|reset)\b/,
    /\bMyCodeSDK\b/,
    /registerTool\s*\(/,
    /registerProvider\s*\(/,
    /\bsearch_code\b/,
    /--provider\b/,
    /--verbose\b/,
    /--no-color\b/,
    /Choose your AI provider:/,
    /Added provider:/,
    /\bv1\.0\b/,
    /\bfour things\b/i,
    /\bAll 9 CLI commands\b/i,
    /\b8 tools\b/i,
    /powered by Ink/i,
    /Single Executable Application/,
    /No Node\.js required/i,
    /always (?:ask for|require).*confirmation/i,
    /Everything runs locally/i,
  ];
  for (const path of publicSources) {
    const text = readFileSync(path, "utf8");
    for (const pattern of unsupported) assert.doesNotMatch(text, pattern, `${path}: obsolete claim ${pattern}`);
  }
});
