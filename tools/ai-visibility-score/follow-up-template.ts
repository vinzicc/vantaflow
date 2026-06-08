type FollowUpAuditInput = {
  companyName: string;
  workEmail: string;
  competitorName: string;
  category: string;
};

type FollowUpTemplateData = {
  audit: FollowUpAuditInput;
  overallScore: number;
  mainVisibilityGap: string;
  firstRecommendedFix: string;
};

function extractFollowUpFirstName(workEmail: string): string {
  const emailMatch = workEmail.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const localPart = emailMatch?.[0]?.split("@")[0] ?? "";
  const firstChunk = localPart.split(/[._-]/)[0] ?? "";

  if (firstChunk.length === 0) {
    return "there";
  }

  return firstChunk.charAt(0).toUpperCase() + firstChunk.slice(1).toLowerCase();
}

export function renderFollowUp(data: FollowUpTemplateData): string {
  const firstName = extractFollowUpFirstName(data.audit.workEmail);

  return [
    `Subject: AI visibility snapshot for ${data.audit.companyName}`,
    "",
    `Hi ${firstName},`,
    "",
    `I ran the directional AI visibility check for ${data.audit.companyName} against ${data.audit.competitorName} in ${data.audit.category}.`,
    "",
    `Your score came out to ${data.overallScore}/100.`,
    "",
    `The main gap I saw: ${data.mainVisibilityGap}`,
    "",
    `The first fix I would make: ${data.firstRecommendedFix}`,
    "",
    "This is not a scientific benchmark, but it is a useful snapshot of how AI tools are currently framing the category and the comparison.",
    "",
    "If it is useful, I can turn this into a Founder Beta Snapshot for $199. That would include a tighter prompt review, the highest-leverage page/content fixes, and a simple 30-day action plan you can work through async.",
    "",
    "No pressure either way. I wanted to send the quick read so you have something concrete to react to.",
    "",
    "Best,",
    "Vantaflow",
    "",
  ].join("\n");
}
