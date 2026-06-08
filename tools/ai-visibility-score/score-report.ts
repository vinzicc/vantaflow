import * as scoreFs from "node:fs";
import * as scorePath from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  buildPromptSet,
  slugifyCompanyName,
  type PromptAuditInput,
} from "./generate-prompts.ts";
import { renderFollowUp } from "./follow-up-template.ts";
import { renderReport } from "./report-template.ts";

type ScoreRecommendationStrength = "none" | "weak" | "moderate" | "strong";
type ScoreDescriptionAccuracy = "poor" | "partial" | "mostly_accurate" | "accurate";
type ScoreCategoryAssociation = "wrong" | "weak" | "moderate" | "strong";

type ScoreAuditInput = PromptAuditInput;

type ScorePromptObservation = {
  prompt: string;
  companyMentioned: boolean;
  competitorMentioned: boolean;
  companyRank: number | null;
  competitorRank: number | null;
  recommendationStrength: ScoreRecommendationStrength;
  descriptionAccuracy: ScoreDescriptionAccuracy;
  categoryAssociation: ScoreCategoryAssociation;
  notes: string;
};

type ScoreModelObservation = ScorePromptObservation & {
  modelName: string;
};

type ScoreObservationsFile = {
  models: Record<string, ScorePromptObservation[]>;
};

type ScoreBreakdownRow = {
  label: string;
  maxPoints: number;
  earnedPoints: number;
  explanation: string;
};

type ScoreModelSummary = {
  modelName: string;
  promptCount: number;
  companyMentionRate: number;
  competitorMentionRate: number;
  averageRecommendation: string;
  averageAccuracy: string;
  averageCategoryAssociation: string;
  notes: string[];
};

const scoreToolDir = scorePath.dirname(fileURLToPath(import.meta.url));
const scoreInputPath = scorePath.join(scoreToolDir, "audit-input.json");
const scoreInputExamplePath = scorePath.join(scoreToolDir, "audit-input.example.json");
const scoreObservationsPath = scorePath.join(scoreToolDir, "observations.json");
const scoreObservationsExamplePath = scorePath.join(scoreToolDir, "observations.example.json");
const scoreOutputDir = scorePath.join(scoreToolDir, "outputs");

const scoreStrengthValues: Record<ScoreRecommendationStrength, number> = {
  none: 0,
  weak: 0.35,
  moderate: 0.7,
  strong: 1,
};

const scoreAccuracyValues: Record<ScoreDescriptionAccuracy, number> = {
  poor: 0,
  partial: 0.35,
  mostly_accurate: 0.75,
  accurate: 1,
};

const scoreCategoryValues: Record<ScoreCategoryAssociation, number> = {
  wrong: 0,
  weak: 0.35,
  moderate: 0.7,
  strong: 1,
};

const scoreStrengthLabels: ScoreRecommendationStrength[] = ["none", "weak", "moderate", "strong"];
const scoreAccuracyLabels: ScoreDescriptionAccuracy[] = ["poor", "partial", "mostly_accurate", "accurate"];
const scoreCategoryLabels: ScoreCategoryAssociation[] = ["wrong", "weak", "moderate", "strong"];

function scoreIsRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function scoreRequiredString(
  source: Record<string, unknown>,
  key: string,
  sourceName: string
): string {
  const value = source[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${sourceName} is missing a non-empty "${key}" value.`);
  }

  return value.trim();
}

function scoreOptionalString(
  source: Record<string, unknown>,
  key: string,
  sourceName: string
): string | undefined {
  const value = source[key];

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`${sourceName} "${key}" must be a string when provided.`);
  }

  return value.trim();
}

function readScoreAuditInput(): ScoreAuditInput {
  const parsed = JSON.parse(scoreFs.readFileSync(scoreInputPath, "utf8")) as unknown;

  if (!scoreIsRecord(parsed)) {
    throw new Error("audit-input.json must contain a JSON object.");
  }

  return {
    companyName: scoreRequiredString(parsed, "companyName", "audit-input.json"),
    workEmail: scoreRequiredString(parsed, "workEmail", "audit-input.json"),
    companyWebsite: scoreRequiredString(parsed, "companyWebsite", "audit-input.json"),
    competitorName: scoreRequiredString(parsed, "competitorName", "audit-input.json"),
    competitorWebsite: scoreOptionalString(parsed, "competitorWebsite", "audit-input.json"),
    category: scoreRequiredString(parsed, "category", "audit-input.json"),
    specificCheck: scoreRequiredString(parsed, "specificCheck", "audit-input.json"),
  };
}

function scoreParseBoolean(
  source: Record<string, unknown>,
  key: keyof ScorePromptObservation,
  context: string
): boolean {
  const value = source[key];

  if (typeof value !== "boolean") {
    throw new Error(`${context}.${key} must be a boolean.`);
  }

  return value;
}

function scoreParseRank(
  source: Record<string, unknown>,
  key: keyof ScorePromptObservation,
  context: string
): number | null {
  const value = source[key];

  if (value === null) {
    return null;
  }

  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  throw new Error(`${context}.${key} must be a positive integer or null.`);
}

function scoreParseEnum<T extends string>(
  source: Record<string, unknown>,
  key: keyof ScorePromptObservation,
  allowed: readonly T[],
  context: string
): T {
  const value = source[key];

  if (typeof value === "string" && allowed.includes(value as T)) {
    return value as T;
  }

  throw new Error(`${context}.${key} must be one of: ${allowed.join(", ")}.`);
}

function scoreParseObservation(raw: unknown, context: string): ScorePromptObservation {
  if (!scoreIsRecord(raw)) {
    throw new Error(`${context} must be a JSON object.`);
  }

  return {
    prompt: scoreRequiredString(raw, "prompt", context),
    companyMentioned: scoreParseBoolean(raw, "companyMentioned", context),
    competitorMentioned: scoreParseBoolean(raw, "competitorMentioned", context),
    companyRank: scoreParseRank(raw, "companyRank", context),
    competitorRank: scoreParseRank(raw, "competitorRank", context),
    recommendationStrength: scoreParseEnum(raw, "recommendationStrength", scoreStrengthLabels, context),
    descriptionAccuracy: scoreParseEnum(raw, "descriptionAccuracy", scoreAccuracyLabels, context),
    categoryAssociation: scoreParseEnum(raw, "categoryAssociation", scoreCategoryLabels, context),
    notes: scoreRequiredString(raw, "notes", context),
  };
}

function readScoreObservationsFile(): ScoreObservationsFile {
  const parsed = JSON.parse(scoreFs.readFileSync(scoreObservationsPath, "utf8")) as unknown;

  if (!scoreIsRecord(parsed) || !scoreIsRecord(parsed.models)) {
    throw new Error("observations.json must contain a JSON object with a models object.");
  }

  const models: Record<string, ScorePromptObservation[]> = {};

  for (const [modelName, rawObservations] of Object.entries(parsed.models)) {
    if (!Array.isArray(rawObservations)) {
      throw new Error(`observations.json models.${modelName} must be an array.`);
    }

    models[modelName] = rawObservations.map((rawObservation: unknown, index: number) =>
      scoreParseObservation(rawObservation, `observations.json models.${modelName}[${index}]`)
    );
  }

  return { models };
}

function scoreAverage(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum: number, value: number) => sum + value, 0) / values.length;
}

function scoreRoundToTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function scoreCompetitorGapValue(observation: ScoreModelObservation): number {
  if (observation.companyMentioned && !observation.competitorMentioned) {
    return 1;
  }

  if (!observation.companyMentioned && observation.competitorMentioned) {
    return 0;
  }

  if (!observation.companyMentioned && !observation.competitorMentioned) {
    return 0.5;
  }

  if (observation.companyRank !== null && observation.competitorRank !== null) {
    if (observation.companyRank < observation.competitorRank) {
      return 1;
    }

    if (observation.companyRank === observation.competitorRank) {
      return 0.5;
    }

    return 0;
  }

  if (observation.companyRank !== null && observation.competitorRank === null) {
    return 0.8;
  }

  if (observation.companyRank === null && observation.competitorRank !== null) {
    return 0.2;
  }

  return 0.5;
}

function scoreLabelFromAverage(value: number, labels: readonly string[]): string {
  if (labels.length === 4) {
    if (value >= 0.85) {
      return labels[3];
    }

    if (value >= 0.55) {
      return labels[2];
    }

    if (value >= 0.2) {
      return labels[1];
    }
  }

  return labels[0] ?? "unknown";
}

function flattenScoreObservations(observationsFile: ScoreObservationsFile): ScoreModelObservation[] {
  return Object.entries(observationsFile.models).flatMap(
    ([modelName, observations]: [string, ScorePromptObservation[]]) =>
      observations.map((observation: ScorePromptObservation) => ({
        ...observation,
        modelName,
      }))
  );
}

function calculateScoreBreakdown(observations: ScoreModelObservation[]): ScoreBreakdownRow[] {
  const mentionCoverage = scoreAverage(
    observations.map((observation: ScoreModelObservation) => (observation.companyMentioned ? 1 : 0))
  );
  const recommendationStrength = scoreAverage(
    observations.map(
      (observation: ScoreModelObservation) => scoreStrengthValues[observation.recommendationStrength]
    )
  );
  const descriptionAccuracy = scoreAverage(
    observations.map((observation: ScoreModelObservation) => scoreAccuracyValues[observation.descriptionAccuracy])
  );
  const categoryAssociation = scoreAverage(
    observations.map((observation: ScoreModelObservation) => scoreCategoryValues[observation.categoryAssociation])
  );
  const competitorGap = scoreAverage(observations.map(scoreCompetitorGapValue));

  return [
    {
      label: "Mention Coverage",
      maxPoints: 30,
      earnedPoints: scoreRoundToTenth(mentionCoverage * 30),
      explanation: "Company mentions divided by total manual observations.",
    },
    {
      label: "Recommendation Strength",
      maxPoints: 25,
      earnedPoints: scoreRoundToTenth(recommendationStrength * 25),
      explanation: "Average of none=0, weak=0.35, moderate=0.7, strong=1.",
    },
    {
      label: "Description Accuracy",
      maxPoints: 20,
      earnedPoints: scoreRoundToTenth(descriptionAccuracy * 20),
      explanation: "Average of poor=0, partial=0.35, mostly_accurate=0.75, accurate=1.",
    },
    {
      label: "Category Association",
      maxPoints: 15,
      earnedPoints: scoreRoundToTenth(categoryAssociation * 15),
      explanation: "Average of wrong=0, weak=0.35, moderate=0.7, strong=1.",
    },
    {
      label: "Competitor Gap",
      maxPoints: 10,
      earnedPoints: scoreRoundToTenth(competitorGap * 10),
      explanation: "Rewards company mentions, better rank position, or appearing when the competitor does not.",
    },
  ];
}

function describeScoreMainGap(audit: ScoreAuditInput, breakdown: ScoreBreakdownRow[]): string {
  const lowest = [...breakdown].sort(
    (left: ScoreBreakdownRow, right: ScoreBreakdownRow) =>
      left.earnedPoints / left.maxPoints - right.earnedPoints / right.maxPoints
  )[0];

  if (!lowest) {
    return "No observations were available, so the main visibility gap could not be identified.";
  }

  if (lowest.label === "Mention Coverage") {
    return `${audit.companyName} is not appearing consistently enough across the tested buyer-intent prompts. Before optimizing nuance, the main gap is basic visibility in the category conversation.`;
  }

  if (lowest.label === "Recommendation Strength") {
    return `${audit.companyName} may be mentioned, but the answers are not consistently recommending it strongly for the buyer use cases tested.`;
  }

  if (lowest.label === "Description Accuracy") {
    return `AI tools are not describing ${audit.companyName} accurately enough. This can weaken trust even when the company is mentioned.`;
  }

  if (lowest.label === "Category Association") {
    return `${audit.companyName} is not being tied clearly enough to ${audit.category}. The category/entity signal likely needs to be more explicit.`;
  }

  return `${audit.competitorName} still has a stronger or more familiar position in the tested prompts. ${audit.companyName} needs clearer comparison and alternative signals.`;
}

function describeScoreFirstFix(audit: ScoreAuditInput, mainGap: string): string {
  const lowerGap = mainGap.toLowerCase();

  if (lowerGap.includes("not appearing")) {
    return `Create or refresh a clear ${audit.category} alternatives page that names the use cases ${audit.companyName} is best for, including a practical ${audit.companyName} vs ${audit.competitorName} section.`;
  }

  if (lowerGap.includes("not consistently recommending")) {
    return `Add buyer-use-case copy that states when ${audit.companyName} is the better fit, especially for lightweight, startup, and fast-moving team scenarios.`;
  }

  if (lowerGap.includes("describing")) {
    return `Tighten the public product description, category language, and comparison copy so AI answers have clearer factual material to reuse.`;
  }

  if (lowerGap.includes("category")) {
    return `Make the ${audit.category} association more explicit across title tags, headings, comparison pages, FAQs, and concise product summaries.`;
  }

  return `Publish a practical ${audit.companyName} vs ${audit.competitorName} and alternatives page focused on decision criteria buyers actually ask AI tools about.`;
}

function buildScoreRoadmap(audit: ScoreAuditInput): string[] {
  return [
    `Week 1: Draft or update one focused ${audit.companyName} vs ${audit.competitorName} comparison page with honest fit, tradeoffs, and buyer use cases.`,
    `Week 2: Add a category-focused FAQ or alternatives section that uses the exact ${audit.category} language buyers are likely to ask about.`,
    "Week 3: Improve entity consistency across product descriptions, metadata, help docs, and public profile snippets without adding hype.",
    "Week 4: Manually rerun the same 10 prompts, compare observations, and decide the next content fix from the new gap.",
  ];
}

function summarizeScoreModels(observationsFile: ScoreObservationsFile): ScoreModelSummary[] {
  return Object.entries(observationsFile.models).map(
    ([modelName, observations]: [string, ScorePromptObservation[]]) => {
      const companyMentionRate = scoreAverage(
        observations.map((observation: ScorePromptObservation) => (observation.companyMentioned ? 1 : 0))
      );
      const competitorMentionRate = scoreAverage(
        observations.map((observation: ScorePromptObservation) => (observation.competitorMentioned ? 1 : 0))
      );
      const recommendationAverage = scoreAverage(
        observations.map(
          (observation: ScorePromptObservation) => scoreStrengthValues[observation.recommendationStrength]
        )
      );
      const accuracyAverage = scoreAverage(
        observations.map(
          (observation: ScorePromptObservation) => scoreAccuracyValues[observation.descriptionAccuracy]
        )
      );
      const categoryAverage = scoreAverage(
        observations.map(
          (observation: ScorePromptObservation) => scoreCategoryValues[observation.categoryAssociation]
        )
      );
      const notes = observations
        .map((observation: ScorePromptObservation) => observation.notes.trim())
        .filter((note: string) => note.length > 0)
        .slice(0, 3);

      return {
        modelName,
        promptCount: observations.length,
        companyMentionRate,
        competitorMentionRate,
        averageRecommendation: scoreLabelFromAverage(recommendationAverage, scoreStrengthLabels),
        averageAccuracy: scoreLabelFromAverage(accuracyAverage, scoreAccuracyLabels),
        averageCategoryAssociation: scoreLabelFromAverage(categoryAverage, scoreCategoryLabels),
        notes,
      };
    }
  );
}

function runScoreReport(): void {
  const missingFiles: string[] = [];

  if (!scoreFs.existsSync(scoreInputPath)) {
    missingFiles.push(
      `Missing ${scoreInputPath}. Copy ${scoreInputExamplePath} to ${scoreInputPath}, then edit it with the Notion/Tally request.`
    );
  }

  if (!scoreFs.existsSync(scoreObservationsPath)) {
    missingFiles.push(
      `Missing ${scoreObservationsPath}. Copy ${scoreObservationsExamplePath} to ${scoreObservationsPath}, then fill it after manual model testing.`
    );
  }

  if (missingFiles.length > 0) {
    console.error(missingFiles.join("\n"));
    process.exitCode = 1;
    return;
  }

  try {
    const audit = readScoreAuditInput();
    const observationsFile = readScoreObservationsFile();
    const observations = flattenScoreObservations(observationsFile);

    if (observations.length === 0) {
      throw new Error("observations.json must contain at least one prompt observation.");
    }

    const prompts = buildPromptSet(audit);
    const breakdown = calculateScoreBreakdown(observations);
    const overallScore = Math.round(
      breakdown.reduce((sum: number, row: ScoreBreakdownRow) => sum + row.earnedPoints, 0)
    );
    const mainVisibilityGap = describeScoreMainGap(audit, breakdown);
    const firstRecommendedFix = describeScoreFirstFix(audit, mainVisibilityGap);
    const modelSummaries = summarizeScoreModels(observationsFile);
    const slug = slugifyCompanyName(audit.companyName);
    const generatedAt = new Date().toISOString();

    const reportMarkdown = renderReport({
      audit,
      prompts,
      overallScore,
      scoreBreakdown: breakdown,
      modelSummaries,
      mainVisibilityGap,
      firstRecommendedFix,
      roadmap: buildScoreRoadmap(audit),
      generatedAt,
      observationCount: observations.length,
    });

    const followUpMarkdown = renderFollowUp({
      audit,
      overallScore,
      mainVisibilityGap,
      firstRecommendedFix,
    });

    scoreFs.mkdirSync(scoreOutputDir, { recursive: true });

    const reportPath = scorePath.join(scoreOutputDir, `report-${slug}.md`);
    const followUpPath = scorePath.join(scoreOutputDir, `follow-up-${slug}.md`);

    scoreFs.writeFileSync(reportPath, reportMarkdown, "utf8");
    scoreFs.writeFileSync(followUpPath, followUpMarkdown, "utf8");

    console.log(`AI Visibility Score: ${overallScore}/100`);
    console.log(`Wrote ${reportPath}`);
    console.log(`Wrote ${followUpPath}`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  }
}

function isScoreMainModule(): boolean {
  const entryPoint = process.argv[1];

  if (!entryPoint) {
    return false;
  }

  return import.meta.url === pathToFileURL(scorePath.resolve(entryPoint)).href;
}

if (isScoreMainModule()) {
  runScoreReport();
}
