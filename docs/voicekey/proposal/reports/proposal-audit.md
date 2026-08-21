# Proposal Audit

## Verdict

The proposal is technically disciplined on the core architecture and evidence-boundary points, but it is **not submission-ready yet**. The main problems are not factual Android/AI errors; they are rubric coverage and unresolved submission placeholders.

**Safe to create DOCX now:** No. Fix the required items below first. After those fixes, DOCX export is reasonable without a deeper technical rewrite.

## Rubric Coverage Matrix

| Criterion | Weight | Coverage Score | Audit Note |
|---|---:|---:|---|
| 1. AI Approach & Technical Design | 35% | 4/5 | Strong evidence discipline, clear offline boundary, explicit model/risk gating. |
| 2. Hardware & Device Concept | 25% | 3/5 | Architecture is coherent, but the proposal does not yet anchor its latency/power story to one concrete reference handset / compute platform. |
| 3. Business Solution | 15% | 4/5 | Positioning is differentiated and the market evidence is correctly bounded. |
| 4. Problem Definition & Impact | 15% | 4/5 | Clear target user, context, and deployment constraints. |
| 5. Team and Execution Plan | 10% | 2/5 | Actual team roster is missing, and the checklist currently overstates completion. |

## Required Fixes

### 1. Replace the team placeholders before submission

- **Location:** `### 7.1 Role-Based Team Profile` at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L321)
- **Nearby text:** `This concept proposal intentionally does not invent personal names or credentials. The submitting team must replace the role labels below with its actual roster before formal submission.`
- **Why this is required:** The template's Section 7 is explicitly about real team members. A role-only table is honest, but it is still an unresolved placeholder. This directly weakens the 10% Team/Execution criterion and makes the document non-final.
- **Correction direction:** Replace `VoiceKey Core Team` rows with actual names, roles, expertise, and contribution areas.

### 2. Fix the submission-checklist contradiction

- **Location:** `## 8. Submission Checklist` at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L355)
- **Nearby text:** `Placeholders replaced ... | Done; formal team/legal identifiers remain submitting-team owned`
- **Why this is required:** Item 7 cannot be marked `Done` while the proposal still admits unresolved team/legal identifiers. That is an internal contradiction judges can spot immediately.
- **Correction direction:** Mark the item accurately until the roster and any remaining formal identifiers are filled, then switch it to `Done`.

### 3. Anchor the hardware/AI story to one concrete reference handset or compute platform

- **Location:** `### 5.1 Platform Selection & Justification` at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L199)
- **Nearby text:** the table compares `Phone-only App | USB Audio/Mic Companion | Autonomous Edge Translator`, while `### 7.2 Project Timeline` still says `Select reference handset` later at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L337)
- **Why this is required:** The template asks for platform justification in a hardware-evaluation sense. The current section defends the accessory architecture, but it does not yet tie latency, RAM, thermal, and delegate assumptions to one named phone class or reference handset. That leaves the strongest quantitative claims floating.
- **Correction direction:** Keep the accessory-vs-handheld comparison, but add one concrete reference phone class or named handset and state the assumed compute path for the demo build.

## Optional Polish

### Executive summary length passes, but format is slightly off-template

- **Location:** `## 1. Executive Summary` at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L16)
- **Finding:** The section is about **261 words**, so it satisfies the template's 200-300 word range.
- **Polish note:** The template asks for `3-4 short paragraphs`; the current `1.3 Key Value Proposition` is a bullet list. This is not a factual problem, but converting it to a short paragraph would fit the template more literally.

### Clarify demo-link status rather than leaving it as a project-state note

- **Location:** `## 8. Submission Checklist` item 8 at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L366)
- **Nearby text:** `Pending project execution - do not claim complete before the evidence demo is recorded`
- **Note:** This is honest, but for a final submission it should become either a real link or an explicit `N/A / not yet available` status, depending on challenge rules.

### Update the submission date at export time

- **Location:** top metadata table at [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L8)
- **Finding:** The file currently says `21/08/2026`. If the document is exported on August 20, 2026, this should be corrected to the actual submission/export date.

## Requested Technical Checks

| Check | Audit Result |
|---|---|
| Android USB role correctness | **Pass.** The document consistently uses Android phone as USB host and the dongle as USB device/UAC2 peripheral. |
| No direct phone-NPU claim | **Pass.** The proposal explicitly avoids claiming USB access to a phone NPU. |
| Offline definition | **Pass.** Offline is defined as no runtime network use after language-pack install, with no invisible cloud fallback. |
| Model-to-language feasibility | **Pass with discipline.** EN <-> VI is the quality anchor; SEA expansion is gated by pair-specific evidence. |
| Latency / power / BOM labeling | **Pass.** Quantitative values are consistently labeled as `target`, `budget`, `estimate`, or `engineering band`, not as measured results. |
| Social-media evidence classification | **Pass.** Douyin/Facebook/TikTok references are treated as demo/promotional evidence, not performance proof. |
| Executive-summary length | **Pass.** About 261 words. |
| Team / demo placeholders | **Fail for submission readiness.** Team roster is still placeholder content; demo checklist status is still unresolved. |

## Bottom Line

This draft is factually careful where it matters most: Android USB role, offline boundary, evidence labeling, and no fabricated model/hardware certainty. The blockers are procedural and rubric-facing: real team identities, a truthful completion checklist, and one concrete reference handset/compute anchor.
