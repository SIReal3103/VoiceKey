# Research Report: Offline Mobile Translator Papers and Models

Date: 2026-08-20
Scope: Offline English-Vietnamese real-time speech translation on Android, expandable to selected Southeast Asian languages.

## Table of Contents
- [Executive Summary](#executive-summary)
- [Research Methodology](#research-methodology)
- [Key Findings](#key-findings)
- [Module Comparison Table](#module-comparison-table)
- [Recommended Pipelines](#recommended-pipelines)
- [Evaluation Plan](#evaluation-plan)
- [Reported Benchmarks vs Proposed Targets](#reported-benchmarks-vs-proposed-targets)
- [Sources](#sources)
- [Limitations](#limitations)
- [Unresolved Questions](#unresolved-questions)

## Executive Summary

The credible offline Android answer for EN <-> VI is still a cascaded pipeline, not a single direct speech-to-speech model. The strongest public evidence says direct multilingual speech translation is mature in research, but the phone-ready versions are either too large or too language-limited for EN-VI. In particular, SeamlessM4T v1/v2 is strong academically, yet the on-device small export only covers `eng, fra, hin, por, spa`, so it is not a credible EN-VI on-device MVP. [3][4]

Best MVP: offline VAD/noise gate -> streaming ASR -> text MT -> local TTS. For ASR, `whisper.cpp` is the most defensible Android-friendly path because it is explicit about Android support and quantized Whisper inference. For a commercial EN-VI release, pair-specific OPUS-MT EN-VI / VI-EN is the candidate to bake off because its model cards are Apache-2.0; the full weights/tokenizer/runtime/provenance ledger still has to pass. NLLB-200 distilled models remain research comparators only: the 600M card is CC-BY-NC/research-only and excludes production deployment absent explicit rights. For TTS, Piper voices via Sherpa-ONNX are the cleanest practical route because the ecosystem already has offline Android TTS support and Vietnamese voices exist in the Piper voice catalog. [2][7][14][19][20][22][23]

Phase 2 expansion to Southeast Asia should prioritize languages only after each text/ASR/TTS stack has its own quality and commercial-release review. Indonesian, Thai, Malay, and Tagalog are the first research candidates; Burmese, Khmer, and Lao require explicit text-only or weaker-TTS boundaries if evidence supports them. NLLB's research coverage can inform this exploration, but it does not create a commercial shipping path. [3][4][6][7]

## Research Methodology

- Sources consulted: peer-reviewed papers, arXiv papers, official model cards, and official repos/docs.
- Date range of materials: 2018-2026, with emphasis on primary sources published or updated through 2026-08-20.
- Search focus: EN-VI speech translation, on-device Android inference, multilingual ASR/MT/TTS, VAD/noise handling, quantization/runtime, and evaluation datasets/metrics.
- Evidence rule: reported benchmarks are kept separate from proposed targets; no fabricated benchmark numbers are used.
- Source weighting:
  - Highest: papers, official repos, official model cards, and official docs.
  - Medium: official issue/discussion threads only when they clarify product limitations.
  - Low: community demos or marketing copy. I avoided using them as factual support.

## Key Findings

### 1. ASR

Whisper remains the safest baseline for offline multilingual speech recognition. The paper shows large-scale weak supervision over 680k hours and strong zero-shot transfer. The `whisper.cpp` project is the operational reason it matters here: it is an open-source C/C++ implementation with Android support and integer quantization, which makes it materially more plausible on phones than server-first runtimes. [1][2]

For EN-VI, Whisper is credible because Vietnamese is part of the multilingual Whisper ecosystem and because the Android implementation path is well established. The main trade-off is compute: model size and streaming latency still matter, so `tiny/base` are likely too weak for noisy real conversations, while `small` is the practical floor for a serious MVP. That last statement is an engineering inference, not a paper claim. [1][2]

Moonshine Voice is an interesting emerging alternative because it advertises on-device Android support and very small models, but it is not yet the safer primary choice than Whisper for a proposal that needs conservative credibility. I am not ranking it above Whisper because the public evidence is thinner and the ecosystem is newer. [21]

### 2. MT

NLLB-200 is the strongest multilingual MT coverage reference in the source set. The paper covers 200 languages and FLORES-200, and the official model cards expose distilled checkpoints such as 600M and 1.3B. However, the 600M card is CC-BY-NC, research-only, and says it is not released for production deployment. It can inform a non-commercial comparison for English-Vietnamese and SEA exploration; it cannot be the commercial product default without explicit rights. [6][7]

The NLLB issue is both licence and runtime. It needs a mobile-friendly inference path and careful quantization, but quantization does not change licence terms. CTranslate2 is strong technically because it explicitly supports INT8, INT16, FP16, BF16, and AWQ quantization, but its official docs are CPU/GPU inference docs, not an Android-ready product story. It remains a benchmark/runtime research option, not evidence for a production NLLB Android release. [7][16]

For the pair-specific commercial candidate, the Helsinki-NLP OPUS-MT EN-VI / VI-EN model cards are useful baselines. They are smaller-class Marian models with Apache-2.0 cards, but card availability still does not complete the release audit: validate quality, artifact provenance, tokenizer, runtime/code, and redistribution conditions. The trade-off is lower multilingual extensibility and a quality ceiling that must be measured against the target use case. [22][23]

### 3. Direct speech translation

Direct S2ST is academically real but not the MVP for this project. SeamlessM4T and SeamlessStreaming are excellent papers, but the on-device export is the key constraint: the small model is experimental and only covers five languages for on-device tasks, none of which is Vietnamese. The large and medium SeamlessM4T checkpoints are 2.3B and 1.2B parameters, respectively, which is a bad fit for a phone-first offline product if you want a credible Android battery/thermal story. [3][4][5]

My conclusion is blunt: for EN-VI on Android, direct S2ST is a phase-2 research topic, not a phase-1 shipping path. Use a cascaded stack first. [3][4][5]

### 4. VAD and noise handling

Silero VAD is the best practical low-latency gate in the source set. The repo claims sub-1 ms processing for a 30+ ms chunk on a single CPU thread and a roughly 2 MB JIT model. The wiki also emphasizes robustness across noisy conditions. That makes it a strong front-end gate for end-of-utterance detection and speech segmentation. [14]

RNNoise is still valuable as a lightweight noise suppression layer. The algorithm is old but solid: hybrid DSP + neural noise suppression, low complexity, and real-time orientation. In a mobile pipeline, I would place RNNoise before ASR only if microphone conditions are bad enough to justify the extra latency and tuning burden. [15]

WebRTC VAD remains a very fast baseline, but it is weaker at distinguishing speech from noise than Silero. Use it only if the implementation budget is tiny or if you need a fallback path. [17]

### 5. TTS

Piper is the most useful on-device TTS fit for this project because it is explicitly local/offline, has a real voice catalog, and the voice catalog includes Vietnamese voices. The archived repo status is a risk signal, but the ecosystem around Piper has remained active through Sherpa-ONNX, which offers offline Android TTS support for Piper and VITS engines. [19][20]

VITS is a key architectural paper behind modern end-to-end TTS. It supports the idea that a high-quality voice layer can still be compact enough for device use, but the practical product question is voices, phonemizers, and mobile runtime packaging, not just model architecture. [18]

### 6. Datasets and evaluation

FLEURS is the best broad speech benchmark in the source set for multilingual ASR and translation-style evaluation because it covers 102 languages with about 12 hours per language. Common Voice remains useful for real-world noise and accent variation. CoVoST2 and CVSS are important because they show how high-quality speech translation corpora are structured, even if they are not a direct EN-VI benchmark. [9][10][11]

For MT, FLORES-200 is the right public text benchmark family because NLLB uses it, and it is the standard way to compare EN <-> VI text translation behavior. For automatic MT metrics, SacreBLEU is the reproducibility baseline and COMET is the quality-estimation metric with better human correlation. [6][12][13]

My inference from the source landscape: there is no equally canonical public EN-VI speech translation benchmark with the same maturity as FLORES-200 for text. That is why the validation plan should combine public component benchmarks with a small internal EN-VI speech set. [9][10][11]

## Module Comparison Table

| Module | Candidate models / runtimes | Languages | On-device suitability | Known constraints |
|---|---|---|---|---|
| VAD / noise | Silero VAD, RNNoise, WebRTC VAD | Language-agnostic | High for Silero/WebRTC; medium for RNNoise depending on tuning | Silero is strongest practical gate; RNNoise helps in noise but adds tuning; WebRTC is fast but weaker on speech-vs-noise discrimination. [14][15][17] |
| ASR | Whisper small/base via `whisper.cpp`; Moonshine Voice as emerging alternative | Whisper: multilingual incl. Vietnamese; Moonshine claims Vietnamese support | High for Whisper.cpp; medium for Moonshine due maturity risk | Whisper needs careful quantization/model sizing; Moonshine is promising but not my primary recommendation. [1][2][21] |
| MT | OPUS-MT EN-VI / VI-EN shipping candidate; NLLB-200 distilled 600M research comparator | OPUS-MT: EN-VI and VI-EN; NLLB research coverage: 200 languages | Medium-high after OPUS quality/runtime/licence ledger; NLLB is non-commercial benchmark-only | OPUS needs package/provenance and Android validation. NLLB has both Android and commercial-licence blockers for release. [6][7][16][22][23] |
| TTS | Piper Vietnamese voices via Sherpa-ONNX; VITS via Sherpa-ONNX | Vietnamese, English, and many other voices depending on pack | High for Piper/Sherpa-ONNX; medium for custom VITS voices | Voice quality and phonemization quality vary by voice; archived Piper repo means runtime ecosystem matters more than repo status. [19][20] |
| Direct ST | SeamlessM4T Large v2, SeamlessM4T Medium, UnitY-Small-S2T | Broad research coverage, but on-device small export is only eng/fra/hin/por/spa | Low for EN-VI on-device MVP | Large/medium are too heavy for phone-first offline use; on-device small does not cover Vietnamese. [3][4][5] |

## Recommended Pipelines

### MVP pipeline

1. Microphone input on Android.
2. Silero VAD to segment speech and suppress silence.
3. Optional RNNoise when the acoustic environment is noisy.
4. Whisper small or base through `whisper.cpp` for streaming ASR.
5. OPUS-MT EN-VI / VI-EN as the shipping MT candidate, through a measured native/ONNX runtime and a full commercial-release ledger. Use NLLB-200 only in a non-commercial coverage bake-off until explicit rights are cleared.
6. Piper TTS via Sherpa-ONNX for Vietnamese and English speech output.
7. Text transcript visible on the phone at every step.

Why this is the MVP:
- Best evidence-to-risk ratio.
- Works with offline constraints.
- Keeps the model stack modular.
- Lets you swap MT/TTS components without rewriting the ASR front end.

### Extensible pipeline

1. Keep the same VAD -> ASR -> MT -> TTS spine.
2. Add language routing by source language and domain.
3. Add terminology memory/glossary handling before MT decode.
4. Add per-language TTS packs only where voice quality is acceptable.
5. Add direct speech translation only as an experimental branch, not as the default shipping path.

Recommended phase-2 SEA expansion order:
1. Indonesian.
2. Thai.
3. Malay.
4. Tagalog.
5. Burmese.
6. Khmer.
7. Lao.

Reasoning:
- These are covered by the broad multilingual text stack far more credibly than a custom EN-VI-only system.
- Speech output quality will vary by available TTS voices; text translation can expand faster than full speech translation.
- This ordering keeps product risk low and keeps the ASR/MT/TTS stack reusable. [3][4][6][7][19][20]

## Evaluation Plan

### ASR

- Primary metrics: WER and CER.
- Suggested slices:
  - Clean read speech.
  - Noisy street / café speech.
  - Far-field speech.
  - Short commands.
  - Long conversational turns.
  - Code-switched EN-VI speech.
  - Proper nouns, numbers, dates, and named entities.

### MT

- Primary metrics: SacreBLEU and COMET.
- Human review: adequacy, terminology preservation, register, and refusal of hallucinated content.
- Suggested slices:
  - FLORES-200 EN <-> VI.
  - Travel/conversation phrases.
  - Safety and operations phrases.
  - Terminology-heavy utterances.
  - Short fragments produced by ASR, not only clean text.

### TTS

- Primary metrics: MOS and intelligibility.
- Human review: pronunciation of Vietnamese names, numbers, acronyms, and English loanwords.
- Suggested slices:
  - Short replies.
  - Longer paragraph output.
  - Mixed-language text.
  - Proper nouns and digits.

### End-to-end

- Primary metrics: end-to-end latency, real-time factor, and time-to-first-audio for translated speech.
- Suggested slices:
  - Fast interruption-heavy back-and-forth.
  - Single long utterance.
  - Noisy environment.
  - Battery/thermal soak test on a midrange Android phone.

### Test set guidance

- Use public corpora for component benchmarking first: FLEURS, Common Voice, FLORES-200, and the speech-translation corpora used in CoVoST2/CVSS-style evaluation. [9][10][11]
- Build a small internal EN-VI set from real target conversations because the public benchmark landscape is incomplete for direct EN-VI speech translation. That is an inference from the source set, not a paper claim. [9][10][11]

## Reported Benchmarks vs Proposed Targets

### Reported in sources

- Whisper paper: 680k hours of multilingual and multitask supervision; strong zero-shot transfer. [1]
- SeamlessM4T: 101 speech-input languages, 96 text input/output languages, 35 speech-output languages; Large v1/v2 at 2.3B, Medium at 1.2B. [3][4]
- Seamless on-device export: 281M / 235M variants exist, but only for `eng, fra, hin, por, spa`. [4]
- NLLB: 200-language MT research model, with distilled 600M and 1.3B checkpoints available; the 600M card is non-commercial/research-only and not production-deployment eligible as written. [6][7]
- FLEURS: 102 languages, about 12 hours per language. [11]
- CoVoST2: 21 languages into English and 15 from English. [9]
- CVSS: derived from Common Voice + CoVoST2 for multilingual speech-to-speech evaluation. [10]
- Silero VAD: sub-1 ms chunk processing claim and roughly 2 MB JIT model. [14]
- whisper.cpp: quantized Whisper inference on Android-capable C/C++ runtime. [2]

### Proposed targets for this project

- ASR: reduce WER/CER versus the chosen baseline on all target slices, especially noisy speech and code-switching.
- MT: improve COMET and SacreBLEU on EN-VI held-out text and preserve terminology under domain slices.
- TTS: achieve intelligibility that survives real-time conversation use, not just lab-clean MOS.
- E2E: keep latency low enough that turn-taking feels natural on a midrange Android phone under sustained load.

These are intentionally non-numeric here because the correct numbers should come from your own baseline run on the chosen handset class, not from paper averages on different data.

## Sources

1. [Whisper: Robust Speech Recognition via Large-Scale Weak Supervision](https://arxiv.org/abs/2212.04356)
2. [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp)
3. [SeamlessM4T: Massively Multilingual and Multimodal Machine Translation](https://arxiv.org/abs/2308.11596)
4. [facebookresearch/seamless_communication docs: SeamlessM4T on-device README](https://github.com/facebookresearch/seamless_communication/blob/main/docs/m4t/on_device_README.md)
5. [Seamless: Multilingual Expressive and Streaming Speech Translation](https://arxiv.org/abs/2312.05187)
6. [No Language Left Behind: Scaling Human-Centered Machine Translation](https://arxiv.org/abs/2207.04672)
7. [facebook/nllb-200-distilled-600M model card — CC-BY-NC, research/non-production boundary](https://huggingface.co/facebook/nllb-200-distilled-600M)
8. [fairseq S2T: Fast Speech-to-Text Modeling with fairseq](https://arxiv.org/abs/2010.05171)
9. [CoVoST 2 and Massively Multilingual Speech-to-Text Translation](https://arxiv.org/abs/2007.10310)
10. [CVSS Corpus and Massively Multilingual Speech-to-Speech Translation](https://arxiv.org/abs/2201.03713)
11. [FLEURS: Few-shot Learning Evaluation of Universal Representations of Speech](https://arxiv.org/abs/2205.12446)
12. [COMET: A Neural Framework for MT Evaluation](https://arxiv.org/abs/2009.09025)
13. [A Call for Clarity in Reporting BLEU Scores / SacreBLEU](https://arxiv.org/abs/1804.08771)
14. [snakers4/silero-vad](https://github.com/snakers4/silero-vad)
15. [xiph/rnnoise](https://github.com/xiph/rnnoise)
16. [CTranslate2 quantization docs](https://opennmt.net/CTranslate2/quantization.html)
17. [py-webrtcvad](https://github.com/wiseman/py-webrtcvad)
18. [VITS: Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech](https://arxiv.org/abs/2106.06103)
19. [rhasspy/piper voices catalog](https://github.com/rhasspy/piper/blob/master/VOICES.md)
20. [k2-fsa/sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)
21. [moonshine-ai/moonshine](https://github.com/moonshine-ai/moonshine)
22. [Helsinki-NLP/opus-mt-en-vi](https://huggingface.co/Helsinki-NLP/opus-mt-en-vi)
23. [Helsinki-NLP/opus-mt-vi-en](https://huggingface.co/Helsinki-NLP/opus-mt-vi-en)

## Limitations

- I did not run benchmark code in this pass.
- I did not validate the exact Android build path for every candidate runtime on this specific repo.
- I did not inspect proprietary or licensed commercial speech models because the proposal should not depend on them for an offline challenge.
- Public EN-VI speech translation data is thinner than text translation data; that is a real constraint and it changes how aggressive the MVP should be.

## Unresolved Questions

- Which Android handset class is the actual target for the demo: Snapdragon 7-series, 8-series, or mixed midrange?
- Is the proposal allowed to ship with text-only fallback for some SEA languages at launch?
- Do we want a strict no-cloud guarantee, or is an opt-in fallback acceptable for unsupported language pairs?
- Which TTS license constraints are acceptable for the final product voice packs?
