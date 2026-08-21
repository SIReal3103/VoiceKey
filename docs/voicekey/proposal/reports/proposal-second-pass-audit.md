---
title: "VoiceKey Second-Pass Evidence and Economics Audit"
date: "2026-08-21"
status: "complete-with-open-validation-gates"
scope:
  - market pricing and product video evidence
  - scientific citation quality
  - hardware/software equipment and pilot economics
  - claim boundary review
---

# VoiceKey Second-Pass Evidence and Economics Audit

## Summary

Verdict: **recommend proceed to a tightly bounded 10-user BYOD technical pilot; do not approve a production price, broad Android claim, or real-time accuracy claim yet.**

The revised proposal now has a defensible evidence chain for the most consequential decisions:

- **Architecture:** PhoST directly supports a cascade-first EN-VI MVP; it reports 508 audio hours, 331K triplets, and a cascaded system outperforming end-to-end on that benchmark.
- **Vietnamese readiness:** PhoWhisper, PhoMT, and PhoAudiobook add Vietnamese-specific ASR, MT, and TTS research anchors rather than relying only on generic multilingual model cards.
- **Product benchmark:** six accessible official/independent product videos are recorded alongside Douyin/Facebook/TikTok evidence, with a hard boundary that videos demonstrate workflow rather than accuracy/latency.
- **Economics:** market retail price, hardware/component cost, direct pilot cash, NRE, and benefit math are separated so BOM is not mistaken for an enterprise price or a pilot ROI result.

## Audit Method

| Area | Review rule | Result |
|---|---|---|
| Scientific papers | Prefer primary paper/ACL/arXiv source; map each claim to what it actually proves | Pass with caveat: no local benchmark has been run |
| Repositories/model cards | Treat as implementation evidence only | Pass: wording now avoids turning Android/runtime leads into product performance facts |
| Product demos | Separate official/independent workflow demo from performance proof | Pass: 6 accessible videos added; social links remain secondary evidence |
| Current prices | Use date, region/page boundary, and bundle/recurring-cost caveat | Pass: price is an anchor, not a VoiceKey price recommendation |
| Cost model | Split direct pilot cash, per-unit estimates, equipment, and NRE | Pass: each is labelled planning/pre-quote where applicable |
| Benefits | Use formula and illustrative proxy, not promised ROI | Pass: site baseline and actual minutes avoided are required |

## Findings and Changes Required Before Claims

| Claim area | Revised position | Evidence still required before public claim |
|---|---|---|
| EN-VI architecture | Cascade is chosen because it is modular and supported by PhoST’s EN-VI benchmark result | Actual handset P50/P95, WER/CER, MT and TTS evaluation |
| Offline behaviour | No runtime cloud traffic after signed pack installation | Airplane Mode test, packet/egress audit, pack-version screenshot |
| Hardware benefit | Dual-mic/physical PTT is a hypothesis, not a proven advantage | Same-task comparison against phone mic in target noise/device slices |
| Android support | Pixel 8 reference plus Samsung/Snapdragon matrix only | Per-model USB route, reconnect, thermal, and microphone permission results |
| Price | Kit + deployment + optional managed service is recommended | Two CM quotes, warranty/returns reserve, support time, local tax/channel assumptions |
| ROI | Potential value is measured via avoided bilingual assistance and task time | Site baseline, actual use, labour rate, support/replacement costs |

## Cost Review

| Layer | Approved use now | Not approved now |
|---|---|---|
| EVT/pilot companion cost ($45-$70 / $38-$60) | Prototype budget planning | Public unit-price claim |
| Direct pilot cash ($2.75k-$9.20k for 10 BYOD users; $5.40k-$18.00k for 30) | Funding/approval discussion | Profitability claim |
| NRE ($65k-$95k lean; $95k-$140k realistic first release) | Scope and staffing conversation | Treating NRE as per-unit BOM |
| Competitor retail ($381.65-$449 observed pages) | Market-positioning reference | Price matching or margin forecast |

## Recommendation

Proceed in this order:

1. Run the phone-only EN-VI offline baseline and capture the exact pack/phone/version.
2. Build a UAC2 + PTT + LED EVT with no PD pass-through, battery, screen, modem, or on-dongle inference.
3. Test Pixel, Samsung, and Snapdragon routes; retain a phone-mic fallback only as a visible fallback.
4. Conduct the 10-user BYOD pilot, measure the benefit formula inputs, and collect two CM quotes before the 30-user expansion.
5. Decide whether to price, add a SEA pack, or retain text-only fallback only after the data gates pass.

## Unresolved Questions

- Which actual Android handsets will the submitting team own/borrow for EVT and demo?
- Does the pilot site require loaner phones, MDM, or Google Play distribution?
- Which Vietnamese/English TTS packs pass commercial licence and intelligibility review?
- What local labour/interpreter cost and deployment tax/channel assumptions should replace the US planning proxies?
- Who are the submitting team members, legal owner, and project contact required by the challenge form?
