---
title: "VoiceKey Research Evidence Consolidation"
date: "2026-08-21"
status: "complete"
scope: "Academic evidence, comparable products, public demos, and claim boundaries"
---

# VoiceKey Research Evidence Consolidation

## Purpose

This record consolidates the research review used to improve the judge-facing VoiceKey proposal. It separates three things that are often mixed together: published research results, vendor workflow demonstrations, and VoiceKey results that have not yet been measured.

## Core conclusion

The evidence supports an Android-first, offline, turn-based English-Vietnamese translation prototype. It supports a cascade of speech detection, speech recognition, text translation, bilingual text, and optional speech output. It does not prove that VoiceKey already meets a latency, accuracy, battery, microphone, or offline-no-egress target. Those are release gates in the proposal.

The evidence does not establish a reason to build a USB storage stick for models. The phone can hold the language pack. The optional USB-C companion should remain only if controlled tests show better capture, clearer control, or greater trust than the phone-only baseline.

## Best academic evidence

| Evidence | Direct support | Limit | Proposal use |
|---|---|---|---|
| [PhoST](https://arxiv.org/abs/2208.04243), INTERSPEECH 2022 | EN-VI speech translation benchmark with 508 audio hours; its reported cascade outperformed its end-to-end comparison | Not an Android or VoiceKey benchmark | Primary reason to begin with a cascade |
| [PhoWhisper](https://arxiv.org/abs/2406.02555), ICLR 2024 Tiny Papers | Vietnamese ASR model family and evaluation context | Does not prove mobile latency or product quality | ASR candidate and Vietnamese evaluation context |
| [PhoMT](https://aclanthology.org/2021.emnlp-main.369/), EMNLP 2021 | Vietnamese-English text-MT benchmark context | Does not select a production model or license | Translation evaluation context |
| [Whisper](https://arxiv.org/abs/2212.04356) and [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | ASR foundation and a local C/C++ runtime path | The model card says released Whisper models are not real-time out of the box | Baseline only, measured on each phone |
| [SeamlessM4T on-device documentation](https://github.com/facebookresearch/seamless_communication/blob/main/docs/m4t/on_device_README.md) | On-device direct speech-translation research exists | Its documented small on-device export does not include Vietnamese | Phase-2 comparator, not the EN-VI MVP |

## Best comparable products and demos

| Comparator | Direct product evidence | Demo evidence | What it helps a judge understand | Boundary |
|---|---|---|---|---|
| Timekettle W4 Pro | [Official product page](https://www.timekettle.co/pages/w4-pro) | [Official tutorial](https://www.youtube.com/watch?v=llJjfzfHR7c) | Phone-coupled earbud form factor and vendor pack workflow | Vendor workflow, not a controlled quality or latency benchmark. Its reviewed offline-pair list is not evidence for EN-VI offline translation. |
| Pocketalk S2 Plus | [Official product page](https://pocketalk.com/product/pocketalk-s2-plus-5-year-esim-white) and [S2 setup manual](https://manual.pocketalk.com/pts2/en/01.html) | [How to Translate](https://www.youtube.com/watch?v=93i6N-KHhco) | Screen-first handheld translator and connectivity setup | Vendor documentation, not a VoiceKey comparison result |
| Vasco Translator E1 and V4 | [E1 product page](https://vasco-translator.com/translators/vasco-translator-e1) and [V4 product page](https://vasco-translator.com/translators/vasco-translator-v4) | [E1 demo](https://www.youtube.com/watch?v=C92rY4D9dAk) | Wearable and dedicated-device interaction patterns | Vendor workflow, not a benchmark |

## Social evidence rule

Social sources can help discover user flows but not prove product performance. The secondary examples retained are a [Timekettle Facebook video](https://www.facebook.com/timekettleglobal/videos/welcome-to-the-official-w4-pro-ai-interpreter-earbuds-tutorial-in-this-video-wel/501790599342399/) and a [Timekettle W3 versus M3 Douyin store video](https://www.douyin.com/shipin/7277811363270084644). The Douyin example only shows the vendor-described interaction difference between hands-free W3 use and button-triggered M3 turns. TikTok Shop is excluded from the proposal appendix because a retail listing is not a dependable technical demo.

## Corrections made after the review

1. Removed the incorrect implication that Apple `AccessoryAccess` is an iOS USB-accessory route. iOS remains a phone-only validation track until a supported wired path is demonstrated.
2. Replaced the broad Whisper size range with per-candidate measurement of quantized file size, runtime memory, accuracy, heat, and latency.
3. Added a network-enabled no-egress capture test alongside Airplane Mode. Airplane Mode alone is not enough to prove that an app makes no outbound request when a network is available.
4. Defined the required signed-pack contract: a pinned release key, signed manifest, file-hash verification, rejection of unsigned or revoked packs, and tests for key rotation and rollback.
5. Clarified that the STUSB4500 is an alternative controller reference, not a component in the passive USB-device BOM by default.
6. Replaced unverified or weakly labelled video links with three official vendor tutorials and canonical product pages. Facebook and Douyin remain secondary only.
7. Removed older statements that called USB audio routing deterministic or broadly compatible. The current requirement is per-phone route and reconnect verification.

## Required proof before a product claim

- A named Android phone, OS build, app build, pack hash, model revisions, and test-set version.
- Airplane Mode and network-enabled no-egress results for the same installed pack.
- Active microphone-route evidence during recording, plus phone-microphone fallback behavior.
- Measured P50 and P95 endpoint-to-text response time, heat, battery change, failures, and 30-minute stability.
- Bilingual human review of target-context turns, including names, numbers, technical terms, and target noise.
- A release ledger for every model, tokenizer, runtime, dataset obligation, and voice.

## Supporting detailed reports

- [Paper evidence refresh](260821-paper-evidence-refresh.md)
- [Product demo refresh](260821-product-demo-refresh.md)
- [Evidence and claim audit](260821-evidence-claim-audit.md)
