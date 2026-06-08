import * as promptFs from "node:fs";
import * as promptPath from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export type PromptAuditInput = {
  companyName: string;
  workEmail: string;
  companyWebsite: string;
  competitorName: string;
  competitorWebsite?: string;
  category: string;
  specificCheck: string;
};

const promptToolDir = promptPath.dirname(fileURLToPath(import.meta.url));
const promptInputPath = promptPath.join(promptToolDir, "audit-input.json");
const promptExamplePath = promptPath.join(promptToolDir, "audit-input.example.json");
const promptOutputDir = promptPath.join(promptToolDir, "outputs");

function promptIsRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function promptRequiredString(
  source: Record<string, unknown>,
  key: keyof PromptAuditInput
): string {
  const value = source[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`audit-input.json is missing a non-empty "${key}" value.`);
  }

  return value.trim();
}

function promptOptionalString(
  source: Record<string, unknown>,
  key: keyof PromptAuditInput
): string | undefined {
  const value = source[key];

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`audit-input.json "${key}" must be a string when provided.`);
  }

  return value.trim();
}

function readPromptAuditInput(filePath: string = promptInputPath): PromptAuditInput {
  const parsed = JSON.parse(promptFs.readFileSync(filePath, "utf8")) as unknown;

  if (!promptIsRecord(parsed)) {
    throw new Error("audit-input.json must contain a JSON object.");
  }

  return {
    companyName: promptRequiredString(parsed, "companyName"),
    workEmail: promptRequiredString(parsed, "workEmail"),
    companyWebsite: promptRequiredString(parsed, "companyWebsite"),
    competitorName: promptRequiredString(parsed, "competitorName"),
    competitorWebsite: promptOptionalString(parsed, "competitorWebsite"),
    category: promptRequiredString(parsed, "category"),
    specificCheck: promptRequiredString(parsed, "specificCheck"),
  };
}

export function slugifyCompanyName(companyName: string): string {
  const slug = companyName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "company";
}

function formatPromptCategory(category: string): string {
  const trimmed = category.trim();

  if (/^[A-Z]{2,}\b/.test(trimmed)) {
    return trimmed;
  }

  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

export function buildPromptSet(audit: PromptAuditInput): string[] {
  const company = audit.companyName;
  const competitor = audit.competitorName;
  const category = formatPromptCategory(audit.category);
  const specificCheck = audit.specificCheck.replace(/\s+/g, " ").trim();

  return [
    `What are the best ${category} tools for a B2B SaaS product and engineering team?`,
    `What are the best ${competitor} alternatives for a startup team that wants ${category} software?`,
    `Compare ${company} vs ${competitor} for a software team choosing a ${category} tool.`,
    `If ${competitor} feels too heavy, what lighter ${category} tools should a small SaaS team consider?`,
    `Which ${category} tools are best for fast-moving startup engineering teams?`,
    `What tools like ${competitor} are simpler for product managers and engineers at a growing SaaS company?`,
    `What ${category} tool should I choose if I care about speed, low admin overhead, and clean team workflows?`,
    `Recommend ${category} tools for a 20-person SaaS team moving away from ${competitor}.`,
    `What are the best modern ${category} platforms for product-led SaaS companies?`,
    `${specificCheck} What would you recommend and why?`,
  ];
}

function renderPromptsMarkdown(audit: PromptAuditInput, prompts: string[]): string {
  const promptLines = prompts
    .map((prompt: string, index: number) => `${index + 1}. ${prompt}`)
    .join("\n\n");

  return [
    `# AI Visibility Prompt Set: ${audit.companyName}`,
    "",
    `Company: ${audit.companyName}`,
    `Website: ${audit.companyWebsite}`,
    `Competitor: ${audit.competitorName}`,
    audit.competitorWebsite ? `Competitor website: ${audit.competitorWebsite}` : undefined,
    `Category: ${audit.category}`,
    `Specific check: ${audit.specificCheck}`,
    "",
    "Use these prompts manually in ChatGPT, Claude, Gemini, and Perplexity. Do not automate model or browser access.",
    "",
    "## Prompts",
    "",
    promptLines,
    "",
  ]
    .filter((line: string | undefined): line is string => line !== undefined)
    .join("\n");
}

function runPromptGenerator(): void {
  if (!promptFs.existsSync(promptInputPath)) {
    console.error(
      `Missing ${promptInputPath}. Copy ${promptExamplePath} to ${promptInputPath}, then edit it with the Notion/Tally request.`
    );
    process.exitCode = 1;
    return;
  }

  try {
    const audit = readPromptAuditInput();
    const prompts = buildPromptSet(audit);
    const slug = slugifyCompanyName(audit.companyName);
    const outputPath = promptPath.join(promptOutputDir, `prompts-${slug}.md`);

    promptFs.mkdirSync(promptOutputDir, { recursive: true });
    promptFs.writeFileSync(outputPath, renderPromptsMarkdown(audit, prompts), "utf8");

    console.log(`Generated ${prompts.length} prompts for ${audit.companyName}.`);
    console.log(`Wrote ${outputPath}`);
    console.log("");

    prompts.forEach((prompt: string, index: number) => {
      console.log(`${index + 1}. ${prompt}`);
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  }
}

function isPromptMainModule(): boolean {
  const entryPoint = process.argv[1];

  if (!entryPoint) {
    return false;
  }

  return import.meta.url === pathToFileURL(promptPath.resolve(entryPoint)).href;
}

if (isPromptMainModule()) {
  runPromptGenerator();
}
