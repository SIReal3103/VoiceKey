# VoiceKey Proposal Documentation

VoiceKey is a proposed Android-first system for short, face-to-face English-Vietnamese conversations. The first prototype uses the phone for local AI, display, microphone, and speaker. A USB-C companion is evaluated for better audio capture, turn control, and a visible recording state. A separate Edge-compute track is included only if it proves a measured benefit.

## Start Here

1. Read [the technical proposal](voicekey-technical-proposal.md) for the product decision, real-time translation flow, hardware scope, research basis, and pilot gates.
2. Download the rendered [DOCX](voicekey-technical-proposal-v2.1.docx) or [PDF](voicekey-technical-proposal-v2.1.pdf) for reviewer sharing.
3. Use `research/` to review papers, platform constraints, commercial products, pricing, and public demo sources.
4. Use `reports/` to review earlier evidence checks and assumptions.

## What This Documentation Does and Does Not Claim

The documentation supports a research-backed product direction. It does not claim that a VoiceKey prototype has already achieved a particular latency, accuracy, battery life, microphone advantage, USB reliability, or commercial release status. Those outcomes require measurements on named phones and prototype hardware, plus licensing review for every shipped model and voice.

Public social and video links are included to show adjacent product formats and workflows. They are not proof of VoiceKey performance.

Before formal filing, replace the team-role placeholders with real names and credentials, add calendar dates, and add a recording of the actual VoiceKey prototype.

## Structure

- `voicekey-technical-proposal.md`: primary judge-facing proposal
- `voicekey-technical-proposal-v2.1.docx`: rendered review document
- `voicekey-technical-proposal-v2.1.pdf`: rendered review document
- `research/voicekey-edge-coprocessor-feasibility.md`: research basis for the phone-first and future Edge-compute decision
- `research/`: background research and source records
- `reports/`: audits, evidence boundaries, and recommendations
- `plan.md`: preparation and delivery notes
