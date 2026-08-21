# VoiceKey paper evidence refresh

Date: 2026-08-21
Search date: 2026-08-21
Scope: primary sources only. Papers, ACL Anthology, arXiv originals, and official model cards or repositories.

## Bottom line

The proposal's core architecture is still right: offline EN-VI on Android should start as a cascaded pipeline, not direct speech-to-speech. The strongest paper-level proof is PhoST, which gives an EN-VI benchmark and reports cascade > end-to-end on that benchmark. The next strongest evidence is PhoWhisper for Vietnamese ASR and PhoMT for Vietnamese-English MT. Whisper paper + whisper.cpp justify the ASR baseline and mobile runtime path, but they do not prove VoiceKey latency or end-to-end product readiness.

The main correction is boundary control. Several sources in the current proposal are good implementation references, but they are not product proof:

- whisper.cpp proves a C/C++ runtime and Android support, not VoiceKey quality.
- OPUS-MT model cards prove license and a usable bilingual baseline, not shipping quality.
- NLLB-200 distilled 600M is research-only and not production-deployment eligible as written.
- SeamlessM4T proves direct speech translation research is real, but the on-device export excludes Vietnamese.
- Moonshine is a credible low-latency ASR alternative, but it is still an alternative runtime choice, not proof of VoiceKey's EN-VI translation goal.

## Evidence matrix

| Source | Exact URL | Venue / date | What it directly supports | Boundary it does not cross | Recommendation |
|---|---|---|---|---|---|
| PhoST | https://arxiv.org/abs/2208.04243 | arXiv submitted 2022-08-08; INTERSPEECH 2022 to appear | EN-VI speech translation benchmark exists; 508 audio hours; 331K triplets; cascade outperforms end-to-end on that benchmark | Does not prove VoiceKey on Android, real-time turn-taking, or production UX | Retain |
| PhoWhisper | https://arxiv.org/abs/2406.02555 | arXiv submitted 2024-03-27; accepted to ICLR 2024 Tiny Papers | Vietnamese-specific Whisper fine-tunes; 844-hour dataset; state-of-the-art on benchmark Vietnamese ASR datasets | Does not prove mobile latency, battery, or offline deployment quality on VoiceKey's target phone | Retain |
| PhoMT | https://aclanthology.org/2021.emnlp-main.369/ | EMNLP 2021, Nov 2021 | 3.02M Vietnamese-English sentence pairs; first large-scale VN-EN MT study; mBART best on their benchmark | Does not prove OPUS-MT quality, on-device speed, or shipping license for VoiceKey | Retain as benchmark anchor, not as a runtime proof |
| Whisper paper | https://arxiv.org/abs/2212.04356 | arXiv submitted 2022-12-06; PMLR 2023 | Large-scale weak supervision; 680k hours; strong zero-shot ASR foundation | Does not prove real-time performance, Android packaging, or Vietnamese-specific quality | Retain |
| whisper.cpp | https://github.com/ggml-org/whisper.cpp | Official repo, current as of 2026-08-21 | C/C++ runtime, integer quantization, and Android/iOS examples/support | Does not prove product accuracy or benchmark latency for VoiceKey | Retain as implementation evidence only |
| OPUS-MT EN-VI / VI-EN | https://huggingface.co/Helsinki-NLP/opus-mt-en-vi and https://huggingface.co/Helsinki-NLP/opus-mt-vi-en | Hugging Face model cards, current page shows Apache-2.0 and train date 2020-06-17 / 2020-08-21 | Licensed bilingual translation baseline; direct EN-VI and VI-EN checkpoints; usable comparison target | Does not prove it is the best model, fastest model, or final VoiceKey shipping choice | Add / retain as candidate baseline |
| SeamlessM4T | https://arxiv.org/abs/2308.11596 | arXiv submitted 2023-08-22 | Direct speech-to-speech / speech-to-text research family; broad multilingual speech translation | On-device small export is limited to eng/fra/hin/por/spa, so it does not cover Vietnamese | Add as phase-2 comparator only |
| SeamlessM4T on-device README | https://github.com/facebookresearch/seamless_communication/blob/main/docs/m4t/on_device_README.md | Official repo docs, current as of 2026-08-21 | On-device export is experimental and explicitly lists supported languages | Does not support VoiceKey's EN-VI on-device MVP | Add as negative evidence against direct EN-VI on-device MVP |
| Moonshine | https://arxiv.org/abs/2410.15608 | arXiv submitted 2024-10-21 | Low-latency ASR for live transcription and voice commands; compute reduction versus Whisper tiny-en | Does not prove translation quality; does not prove EN-VI speech translation | Add as ASR/mobile alternative comparator |
| NLLB-200 distilled 600M | https://huggingface.co/facebook/nllb-200-distilled-600M | Model card, current page | 200-language MT research model; useful multilingual comparator; eval on FLORES-200 | Card says CC-BY-NC, research-only, and not released for production deployment | Add only as research comparator, not shipping default |

## Measured paper results vs VoiceKey hypotheses

### What is measured in the source set

- PhoST measures EN-VI speech translation on 508 audio hours and shows cascade > end-to-end on that benchmark.
- PhoWhisper measures Vietnamese ASR fine-tuning on 844 hours and reports SOTA on Vietnamese ASR benchmarks.
- PhoMT measures 3.02M VN-EN pairs and reports mBART as the best baseline on its benchmark.
- Whisper measures large-scale weak supervision and zero-shot transfer at 680k hours.
- SeamlessM4T measures broad multilingual direct ST and reports better-than-prior SOTA on its reported benchmarks, but the on-device export is language-limited.
- Moonshine measures low-latency ASR efficiency against Whisper tiny-en, but it is ASR only.

### What VoiceKey still has to prove

- That the chosen Android phone can run the full offline pipeline with acceptable heat, battery, and latency.
- That turn-based auto endpointing feels natural in face-to-face conversation.
- That the phone-only baseline is weaker enough that a USB-C accessory is worth its cost.
- That a specific bilingual runtime candidate, such as OPUS-MT or another pair-specific model, beats the fallback on the target device and target accents.
- That the release package has the right license and redistribution story for every model and voice.

## Exact proposal changes I would make

1. Keep the PhoST citation in the architecture section, but explicitly say it supports the cascade-first MVP decision, not VoiceKey performance.
2. Keep PhoWhisper for Vietnamese ASR claims, but do not imply it proves mobile deployment. Phrase it as evaluation context.
3. Keep PhoMT as the Vietnamese text MT benchmark anchor, but make OPUS-MT the shipping candidate only after a separate runtime and license bake-off.
4. Add one sentence that NLLB-200 distilled 600M is a research comparator only, because the model card says it is not released for production deployment.
5. Add one sentence that SeamlessM4T on-device is a useful comparator, but not an EN-VI on-device path because the official on-device export does not include Vietnamese.
6. If Moonshine stays in the proposal, move it to a secondary comparator or appendix. Do not treat it as proof for the translation product path.

## Ranking

1. PhoST
2. PhoWhisper
3. PhoMT
4. Whisper + whisper.cpp
5. OPUS-MT EN-VI / VI-EN
6. SeamlessM4T as a phase-2 comparator
7. Moonshine as a mobile ASR alternative
8. NLLB-200 distilled 600M as a non-commercial research comparator

## Unresolved questions

- Which exact Android handset class is the official demo target?
- Is the final submission allowed to show a text-only fallback when the speech path fails?
- Do you want the proposal to keep iOS as phone-only validation, or should iOS be removed from the narrative entirely?
- Which voice-pack license constraints are acceptable for the final TTS story?
