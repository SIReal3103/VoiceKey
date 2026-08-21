---
title: "VoiceKey Evidence and Claim Audit"
date: "2026-08-21"
scope: "Judge-facing proposal, README, research notes, and rendered PDF"
status: "complete"
---

# VoiceKey Evidence and Claim Audit

## Code Review Summary

### Scope

- Primary proposal: `voicekey-technical-proposal.md`
- Reader entry point: `README.md`
- Research notes in `research/`, with close review of Edge feasibility, papers/models, hardware feasibility, cost model, market/social evidence, and video evidence.
- Rendered deliverable: `voicekey-technical-proposal-v2.1.pdf`.
- Focus: academic evidence, offline and real-time claims, Android/iOS paths, USB/phone compute, hardware costs, platforms, comparable products, and public demos.

### Scout Findings

- The recent change is documentation-only, but it affects three public representations of the same proposal: Markdown, DOCX, and PDF. The rendered PDF repeats the current iOS claim, so editing Markdown alone is insufficient.
- `pdfinfo` reports that `voicekey-technical-proposal-v2.1.pdf` has 18 pages. `plan.md` still records a v1.4, 28-page render. The plan is not an accurate audit trail for v2.1.
- The primary proposal is more cautious than several older research notes. Those notes still call USB audio "deterministic" or "broadly compatible", even though the primary proposal correctly requires per-phone route verification.
- This is documentation, not application code. Concurrency, database efficiency, authorization, and type-coverage checks are not applicable. Claim provenance, cross-artifact consistency, external-link provenance, and release gates are the relevant production risks.

### Overall Assessment

The core direction is credible and substantially more careful than a typical concept proposal. The PhoST architecture claim is correct: the paper reports 508 audio hours and found its cascaded system outperformed the end-to-end comparison in that study. PhoWhisper, PhoMT, the Whisper model-card caveat, QCS6490, and Genio 1200 are used with mostly appropriate limits. The proposal does not present targets as achieved VoiceKey results.

One factual iOS claim is wrong. A few evidence links and research-note statements are also too loose for a judge-facing evidence pack. Fix the blocker, regenerate both rendered artifacts, then address the high-priority evidence gaps before claiming an offline or social-demo evidence package is complete.

### Critical Issues

#### C1. `AccessoryAccess` is incorrectly described as an iOS USB-accessory path

- **Blocker:** Yes. Do not file the current proposal as technically fact-checked.
- **Locations:** [proposal lines 231 and 388](../voicekey-technical-proposal.md#L231), [Edge feasibility line 62](../research/voicekey-edge-coprocessor-feasibility.md#L62), and the generated DOCX/PDF.
- **Evidence status:** Incorrect. Apple's current documentation describes the preliminary `AccessoryAccess` entitlement as enabling USB-device access on **macOS**. Apple's WWDC material describes the framework as USB pass-through for virtual machines. It is not evidence of a custom wired iPhone/iPad accessory path. [Apple entitlement documentation](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.accessory-access.usb?changes=__1), [Apple WWDC26 description](https://developer.apple.com/videos/play/wwdc2026/224/?time=274). Apple's established External Accessory documentation is about MFi accessories using Lightning or Bluetooth, not proof of a generic iPhone USB-C path. [Apple External Accessory](https://developer.apple.com/documentation/externalaccessory/)
- **Impact:** A judge who follows the Apple link can disprove the statement immediately. It also undermines the otherwise disciplined Android-first scope.
- **Exact replacement for proposal line 231 and research line 62:**

  > iOS can first be evaluated as a phone-only app using the built-in microphone and speaker through AVAudioSession. `AccessoryAccess` is not an iOS USB-accessory path; Apple documents it for macOS USB access. A custom wired iPhone accessory is out of scope until it is demonstrated on a current Apple-supported iOS framework and hardware.

- **Appendix correction:** Replace the `AccessoryAccess` row at proposal line 388 with a row for `AVAudioSession` only, or state that `External Accessory` is not evidence for this USB-C design.
- **Required follow-up:** Regenerate DOCX and PDF, then re-run render and page review after the Markdown correction.

### High Priority

#### H1. The offline claim has a good boundary but not a reproducible no-egress test in the main proposal

- **Blocker:** Yes before calling a demo or product release "offline with no cloud fallback". Not a blocker to a proposal that remains explicitly unmeasured.
- **Locations:** [proposal lines 36, 72, 102, 202, and 321-325](../voicekey-technical-proposal.md#L36); [offline research line 296](../research/offline-phone-translator-research.md#L296).
- **Evidence status:** Partially specified. Airplane Mode proves that a tested flow can work with radio connectivity disabled. It does not, by itself, prove that the app makes no outbound request when a network is available. The stronger internal research note already calls for traffic capture, but the judge-facing acceptance row omits the method.
- **Impact:** A hidden telemetry, update check, crash reporter, or fallback path can pass an Airplane Mode demo yet invalidate the privacy/offline claim during normal use.
- **Exact replacement for the last acceptance condition in proposal line 202:**

  > All required turns pass both in Airplane Mode and in a network-enabled capture test that records zero VoiceKey outbound connections after the verified local pack is installed. Report the pack version and hash, capture method, crashes, and route losses for the 30-minute session.

- **Recommended demo addition:** Show the network-capture result or an independently reproducible test record. Airplane Mode remains a useful visual precondition, not the whole proof.

#### H2. “Signed language pack” is a security label without a defined verification contract

- **Blocker:** Yes before making an integrity or controlled-deployment claim. Not a blocker for an early technical concept if the wording remains a requirement.
- **Locations:** [proposal lines 36, 149, 294, and 321-325](../voicekey-technical-proposal.md#L36).
- **Evidence status:** Design intent only. No pack manifest, trust anchor, signature verification point, rollback policy, or key-revocation behavior is specified. A hash by itself does not prove authenticity; a signature without a pinned trust root does not give a reviewer a testable integrity path.
- **Impact:** A judge cannot distinguish “signed” from a label in the UI. Firmware and model-pack provenance are central to the privacy and offline story.
- **Exact replacement for the first bullet in proposal line 321:**

  > Each pack contains a versioned manifest signed by a release key pinned in the app. Before activation, the app verifies the manifest signature and listed file hashes and rejects unsigned, tampered, or revoked packs. Key rotation and rollback behavior are release tests.

- **Scope note:** This is a release requirement, not a claim that the mechanism already exists.

#### H3. “Official” video labels are not all independently traceable from the linked pages

- **Blocker:** No for the concept proposal. Yes if the appendix is presented as a verified catalogue of official demos.
- **Locations:** [proposal lines 398-405](../voicekey-technical-proposal.md#L398).
- **Evidence status:** Mixed.
  - The W4 Pro link resolves with the title “The Official W4 Pro AI Interpreter Earbuds Tutorial”. It is a valid official-workflow reference. [YouTube](https://www.youtube.com/watch?v=llJjfzfHR7c)
  - The Douyin link resolves to one Timekettle W3 versus M3 video, posted by the Timekettle flagship store. It is not a “store/tutorial collection.” Its text specifically contrasts hands-free W3 use with M3 button-triggered turns. [Douyin](https://www.douyin.com/shipin/7277811363270084644)
  - The current audit could not retrieve channel metadata for the M3, offline-resource, Pocketalk, and Vasco YouTube IDs. A retrieval failure is not proof that a URL is dead, but it is insufficient to call each one “official” without checking the channel and title.
  - Facebook displayed a temporary-block/login page. The table already warns of this. TikTok is a retail listing and is correctly not treated as a demo or performance source.
- **Impact:** The evidence boundary is conceptually correct, but an inaccurate “official” label is easy to challenge. It is safer to use canonical vendor product pages plus videos whose channel metadata is saved in the evidence record.
- **Exact replacements:**
  - Replace the Douyin row name with: `Timekettle W3 versus M3 official-store video`.
  - Replace the Douyin observation with: `Shows the vendor-described interaction difference: W3 hands-free speaking versus M3 button-triggered turns. Vendor workflow only; no accuracy or latency claim.`
  - For every YouTube row whose channel has not been rechecked, replace `official` with `vendor-labelled, channel verification pending`, or replace it with a link whose channel/title snapshot is recorded in `research/video-demo-and-pricing-evidence.md`.

### Medium Priority

#### M1. The ASR candidate row combines an implausibly broad size budget with an ambiguous use of PhoWhisper

- **Blocker:** No. Correct before presenting a hardware-memory plan as decision-ready.
- **Location:** [proposal line 164](../voicekey-technical-proposal.md#L164).
- **Evidence status:** Needs clarification. The Whisper model card lists Whisper small at 244M parameters. A 50 MB lower bound is not a transparent “Whisper small” budget without naming a very aggressive quantization scheme, a different model, or both. [Whisper model card](https://github.com/openai/whisper/blob/main/model-card.md) PhoWhisper is a Vietnamese ASR model family trained from Whisper, not an evaluation corpus. Its paper reports five versions and 844 hours of Vietnamese training data. [PhoWhisper](https://arxiv.org/abs/2406.02555)
- **Impact:** The current row could be read as promising Whisper-small quality inside a 50 MB pack, and “evaluation with PhoWhisper” could be read as using a model as a test set.
- **Exact replacement:**

  > Speech recognition: benchmark multilingual Whisper base and small variants through whisper.cpp, then compare them with PhoWhisper variants on named Vietnamese ASR test sets. Record each candidate's actual quantized model-file size, runtime memory, and latency; do not use one shared 50 to 250 MB range as evidence for Whisper small.

#### M2. Main-proposal cost bands are honest estimates, but their calculation trail is hidden from judges

- **Blocker:** No for a concept proposal. Yes for procurement approval, ROI, or a claimed selling price.
- **Locations:** [proposal lines 111-125 and 249-264](../voicekey-technical-proposal.md#L111); [cost model lines 65-84 and 184-208](../research/hardware-software-cost-model.md#L65).
- **Evidence status:** Traceable in the research note, not in the main proposal. The main document presents $45-$70, $38-$60, and pilot cash bands but only says that the full model is “retained with project documentation.” The research model has the quantity, yield/rework, fixture, field-support, and exclusions rules.
- **Impact:** A judge cannot see whether pilot cash includes labor, loaner phones, lab capital, or NRE. The primary document is therefore easy to misread as a complete project cost.
- **Exact addition after proposal line 125:**

  > Calculation and exclusion detail: see the linked cost model. Direct pilot cash includes dongles, fixtures, labels/shipping, replacement reserve, and field support. It excludes NRE, loaner phones, formal certification, and lab capital unless a row explicitly states otherwise.

- **Required link:** Link `research/hardware-software-cost-model.md` from that sentence.

#### M3. STUSB4500 is an alternative sink/PD-controller reference, not a v1 passive-device BOM part

- **Blocker:** No, but correct before a schematic or supplier conversation.
- **Locations:** [proposal lines 239, 253, and 264](../voicekey-technical-proposal.md#L239); [hardware feasibility lines 155 and 164](../research/hardware-android-feasibility.md#L155).
- **Evidence status:** Internally inconsistent in presentation. The stated v1 design uses a passive USB-device CC path and no pass-through charging. STUSB4500 is a sink/PD-controller class, which the research note itself says is only needed for a different named controller design.
- **Impact:** Listing it as a generic component anchor can make the architecture look undecided and can invite double-counting or the wrong USB role in early BOM discussion.
- **Exact replacement for the first sentence of proposal line 253:**

  > The public anchors cover the MCU, codec, and microphone. STUSB4500 is an alternative sink/PD-controller reference only and is excluded from the v1 passive USB-device CC BOM unless the selected schematic explicitly changes to a controller-based topology.

#### M4. Older research notes overstate USB-C predictability and conflict with the main proposal's release gates

- **Blocker:** No, but remove the contradiction from any material a judge can open.
- **Locations:** [market/social research lines 7, 76, and 82](../research/market-social-benchmarks.md#L7); [hardware feasibility line 193](../research/hardware-android-feasibility.md#L193); contrast [proposal lines 102-107 and 277-280](../voicekey-technical-proposal.md#L102).
- **Evidence status:** Unsupported overclaim in the older notes. USB removes Bluetooth pairing, but it does not make audio routing deterministic across Android OEMs. Android's `AudioRecord.getRoutedDevice()` documentation itself says a route result is valid only while recording. [Android AudioRecord](https://developer.android.com/reference/android/media/AudioRecord)
- **Impact:** This contradiction can make the later proposal look selectively cautious.
- **Exact replacement for each “deterministic/broadly compatible/best overall” claim:**

  > A wired USB audio path can reduce pairing steps, but actual microphone routing, reconnect behavior, and task benefit vary by supported Android phone and must be measured against the phone-only baseline.

#### M5. The judge-facing paper citations are links, not full scholarly references

- **Blocker:** No.
- **Locations:** [proposal lines 376-390](../voicekey-technical-proposal.md#L376).
- **Evidence status:** Factually sound but weakly presented. The three most important papers are only named in table links. A judge has to infer author, year, venue, and relevance.
- **Impact:** This makes strong research look less rigorous than it is.
- **Exact additions to Appendix A:**

  > Nguyen et al. (2022), “A High-Quality and Large-Scale Dataset for English-Vietnamese Speech Translation,” arXiv:2208.04243. Supports the 508-hour EN-VI benchmark and its cascade-versus-end-to-end result.

  > Le, Nguyen, and Nguyen (2024), “PhoWhisper: Automatic Speech Recognition for Vietnamese,” arXiv:2406.02555. Supports Vietnamese ASR candidate and evaluation context.

  > Doan et al. (2021), “PhoMT: A High-Quality and Large-Scale Benchmark Dataset for Vietnamese-English Machine Translation,” EMNLP 2021, DOI 10.18653/v1/2021.emnlp-main.369. Supports text-MT evaluation context.

#### M6. `plan.md` is stale and claims checks for a different artifact

- **Blocker:** No for the product concept. It blocks an accurate audit trail.
- **Locations:** [plan lines 5, 17, and 25](../plan.md#L5); current proposal metadata [lines 9-14](../voicekey-technical-proposal.md#L9).
- **Evidence status:** Incorrect metadata. `plan.md` says v1.4 was rendered as 28 pages, while the committed `voicekey-technical-proposal-v2.1.pdf` is 18 pages and the proposal identifies itself as v2.1.
- **Impact:** The plan's statement that all visual and evidence checks are complete cannot be trusted as a v2.1 verification record.
- **Exact replacement for plan status:**

  > v2.1, 21 August 2026: Markdown, DOCX, and 18-page PDF were rendered for review. This status is conditional on resolving open evidence findings recorded in `reports/260821-evidence-claim-audit.md`; team details, calendar dates, and a real VoiceKey demo remain filing inputs.

### Edge Cases Found by Scout

1. A repair to the Markdown iOS claim will leave the DOCX/PDF false unless they are rebuilt. Treat rendered files as dependents, not archives.
2. A no-network test performed only in Airplane Mode can conceal normal-mode telemetry or an online fallback. The test must include a network-enabled capture run.
3. USB presence is not proof that the companion microphone is selected. Route inspection is valid only during active recording, so the demo must show active route state and a phone-mic fallback.
4. A social-video URL can remain live while its channel, region access, product revision, and marketing claim change. Store a title/channel/date observation, not just the URL.
5. An MCU/PD controller class can look compatible at a row level while having the wrong USB-C power role for the selected topology. The passive-device and controller-based cases must remain mutually exclusive.

### Positive Observations

- The main proposal clearly distinguishes targets and release gates from measured results.
- The PhoST claim at proposal line 139 is accurately bounded to that paper's benchmark. [PhoST](https://arxiv.org/abs/2208.04243)
- The Whisper model-card warning is used correctly. It warns that released Whisper models are not real-time out of the box, and the proposal does not turn that into a VoiceKey latency result. [Whisper model card](https://github.com/openai/whisper/blob/main/model-card.md)
- QCS6490 and Genio 1200 figures are correctly presented as hardware-class context, not VoiceKey throughput. Qualcomm documents up to 12 dense TOPS and 16 GB LPDDR5 for QCS6490; MediaTek documents 4.8 TOPS and up to 16 GB LP4X for Genio 1200. [QCS6490](https://www.qualcomm.com/internet-of-things/products/q6-series/qcs6490), [Genio 1200](https://genio.mediatek.com/genio-1200)
- The main document correctly avoids calling vendor videos latency, accuracy, microphone, or offline-performance proof.

### Recommended Actions

1. Fix C1 in Markdown and Edge research, remove the iOS misuse from Appendix A, then regenerate and review DOCX/PDF.
2. Add the network-enabled egress test and the signed-pack verification contract before any “offline/no cloud fallback” result is presented.
3. Re-verify every video marked official. Rename the Douyin entry to the actual W3-versus-M3 video and keep Facebook/TikTok as low-evidence references.
4. Separate ASR candidate sizes by actual model and quantization; correct PhoWhisper wording.
5. Add a direct link to the cost model, state exclusions in the main proposal, and make the Type-C topology explicit.
6. Replace stale USB predictability wording in older research notes and update `plan.md` to v2.1/18 pages.
7. Add full bibliographic entries for PhoST, PhoWhisper, and PhoMT to the judge-facing Appendix.

### Metrics

- Type coverage: Not applicable. Documentation-only review.
- Test coverage: Not applicable. No runnable implementation was reviewed.
- Linting issues: Not applicable. Static documentation checks only.
- Fresh primary-source checks: Apple iOS/macOS framework scope, Android audio-route API behavior, PhoST, PhoWhisper, PhoMT, Whisper model card, QCS6490, Genio 1200, selected YouTube/Douyin/TikTok/Facebook links.
- Plan verification: Failed for artifact-version/page-count accuracy. `plan.md` requires an update.

### Unresolved Questions

1. Which exact Android phone models, OS builds, model revisions, quantizations, and test sample counts will support the first actual result?
2. Will package installation need internet access, sideloading, or managed-device distribution? That decision determines how a strict no-egress runtime policy is enforced.
3. Does the selected MCU and USB stack pass a real USB Audio Class route/reconnect test on Pixel, Samsung, and Snapdragon devices?
4. Which current Apple-supported iOS accessory framework, if any, can be demonstrated for a wired companion? Until answered, keep iOS phone-only.
