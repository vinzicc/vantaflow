# AI Visibility Score CLI

Internal local utility for preparing Vantaflow Free AI Visibility Score deliverables. This is not a SaaS dashboard, backend service, paid API workflow, or model/browser automation.

## Privacy rules

- Do not commit real client or prospect data.
- Use the example files only as templates.
- Keep real working files local and ignored by git:
  - `audit-input.json`
  - `observations.json`
- Outputs are ignored except sample preview files.
- Do not paste private client context into committed example files.

## Setup

From the repo root:

```bash
copy tools\ai-visibility-score\audit-input.example.json tools\ai-visibility-score\audit-input.json
copy tools\ai-visibility-score\observations.example.json tools\ai-visibility-score\observations.json
```

Edit `audit-input.json` with the Notion/Tally request.

## Generate prompts

```bash
npm run audit:prompts
```

The tool reads `tools/ai-visibility-score/audit-input.json`, prints 10 buyer-intent prompts, and writes:

```text
tools/ai-visibility-score/outputs/prompts-[company-name].md
```

## Manually test prompts

Paste the same prompt set manually into:

- ChatGPT
- Claude
- Gemini
- Perplexity

Do not scrape these tools, automate browser sessions, or call paid APIs for this workflow.

## Fill observations

Edit `tools/ai-visibility-score/observations.json` for each model and prompt. Each observation records whether the company and competitor were mentioned, rough rank position, recommendation strength, description accuracy, category association, and notes.

Use `null` for rank when the answer does not provide a ranked list or when the item was not mentioned.

## Generate report

```bash
npm run audit:report
```

The tool reads `audit-input.json` and `observations.json`, calculates a transparent rule-based 100-point directional score, then writes:

```text
tools/ai-visibility-score/outputs/report-[company-name].md
tools/ai-visibility-score/outputs/follow-up-[company-name].md
```

## Use the follow-up draft

Open the generated follow-up draft, sanity-check it against your manual observations, and personalize it before sending. The draft is intentionally casual-professional, founder-led, async-friendly, and avoids guaranteed results.

## Scoring caveat

This is a directional visibility check, not a scientific benchmark. The score is meant to make manual review faster and more consistent. It does not promise rankings, pipeline, revenue, or future model behavior.
