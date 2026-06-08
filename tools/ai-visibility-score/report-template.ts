type ReportScoreBreakdownRow = {
  label: string;
  maxPoints: number;
  earnedPoints: number;
  explanation: string;
};

type ReportAuditInput = {
  companyName: string;
  companyWebsite: string;
  competitorName: string;
  competitorWebsite?: string;
  category: string;
  specificCheck: string;
};

type ReportModelSummary = {
  modelName: string;
  promptCount: number;
  companyMentionRate: number;
  competitorMentionRate: number;
  averageRecommendation: string;
  averageAccuracy: string;
  averageCategoryAssociation: string;
  notes: string[];
};

type ReportTemplateData = {
  audit: ReportAuditInput;
  prompts: string[];
  overallScore: number;
  scoreBreakdown: ReportScoreBreakdownRow[];
  modelSummaries: ReportModelSummary[];
  mainVisibilityGap: string;
  firstRecommendedFix: string;
  roadmap: string[];
  generatedAt: string;
  observationCount: number;
};

function formatReportPoints(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function renderReport(data: ReportTemplateData): string {
  const promptList = data.prompts
    .map((prompt: string, index: number) => `${index + 1}. ${prompt}`)
    .join("\n");

  const breakdownTable = [
    "| Area | Max points | Earned | How it was scored |",
    "| --- | ---: | ---: | --- |",
    ...data.scoreBreakdown.map(
      (row: ReportScoreBreakdownRow) =>
        `| ${row.label} | ${row.maxPoints} | ${formatReportPoints(row.earnedPoints)} | ${row.explanation} |`
    ),
  ].join("\n");

  const modelNotes = data.modelSummaries
    .map((summary: ReportModelSummary) => {
      const notes =
        summary.notes.length > 0
          ? summary.notes.map((note: string) => `  - ${note}`).join("\n")
          : "  - No manual notes entered.";

      return [
        `### ${summary.modelName}`,
        "",
        `- Prompts observed: ${summary.promptCount}`,
        `- Company mention rate: ${Math.round(summary.companyMentionRate * 100)}%`,
        `- Competitor mention rate: ${Math.round(summary.competitorMentionRate * 100)}%`,
        `- Average recommendation strength: ${summary.averageRecommendation}`,
        `- Average description accuracy: ${summary.averageAccuracy}`,
        `- Average category association: ${summary.averageCategoryAssociation}`,
        "- Notes:",
        notes,
      ].join("\n");
    })
    .join("\n\n");

  const roadmap = data.roadmap
    .map((item: string, index: number) => `${index + 1}. ${item}`)
    .join("\n");

  return [
    `# AI Visibility Score: ${data.audit.companyName} vs ${data.audit.competitorName}`,
    "",
    `Generated: ${data.generatedAt}`,
    "",
    "This is a directional visibility check based on manual observations across AI tools. It is not a scientific benchmark, and it should not be read as a promise of rankings, pipeline, or revenue.",
    "",
    "## 1. Company checked",
    "",
    `- Company: ${data.audit.companyName}`,
    `- Website: ${data.audit.companyWebsite}`,
    `- Category: ${data.audit.category}`,
    "",
    "## 2. Competitor checked",
    "",
    `- Competitor: ${data.audit.competitorName}`,
    data.audit.competitorWebsite ? `- Website: ${data.audit.competitorWebsite}` : "- Website: Not provided",
    "",
    "## 3. What we tested",
    "",
    `We manually tested whether AI tools surfaced ${data.audit.companyName} in buyer-intent prompts related to ${data.audit.category}, especially when compared with ${data.audit.competitorName}.`,
    "",
    `Specific check: ${data.audit.specificCheck}`,
    "",
    `Manual observations reviewed: ${data.observationCount}`,
    "",
    "## 4. Prompt set",
    "",
    promptList,
    "",
    "## 5. Visibility score",
    "",
    `Overall score: ${data.overallScore}/100`,
    "",
    breakdownTable,
    "",
    "## 6. Model-by-model notes",
    "",
    modelNotes,
    "",
    "## 7. Main visibility gap",
    "",
    data.mainVisibilityGap,
    "",
    "## 8. First recommended fix",
    "",
    data.firstRecommendedFix,
    "",
    "## 9. 30-day action roadmap",
    "",
    roadmap,
    "",
    "## 10. Summary",
    "",
    `${data.audit.companyName} has a directional AI visibility score of ${data.overallScore}/100 against ${data.audit.competitorName} for ${data.audit.category}. The practical next step is to improve the clearest content/entity signal behind the main gap, then rerun the same prompt set manually after changes have had time to be indexed and referenced.`,
    "",
  ].join("\n");
}
