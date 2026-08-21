# Research Report: Paper Citation Deep Review for Offline EN<->VI Speech Translation

Date: 2026-08-20
Scope: Offline/on-device EN<->VI speech translation on Android, with ASR, MT, direct S2ST limits, Vietnamese datasets, VAD/noise, TTS, and mobile inference.

## Table of Contents
- [Executive Summary](#executive-summary)
- [What The Current Material Gets Right](#what-the-current-material-gets-right)
- [Weak Or Overstated Citations To Fix](#weak-or-overstated-citations-to-fix)
- [Claim To Source Map](#claim-to-source-map)
- [Citation-Ready Reference List](#citation-ready-reference-list)
- [Proposal Amendments](#proposal-amendments)
- [Limitations](#limitations)

## Executive Summary

The current proposal direction is broadly right: for offline EN-VI on Android, a cascaded pipeline is the credible MVP. The strongest source-backed reason is the EN-VI speech-translation paper itself, which reports that the traditional cascaded approach still outperforms end-to-end on its 508-hour benchmark. That paper is the single most important citation for the architecture choice. [1]

The biggest citation risk in the existing material is not the architecture claim. It is overextending model cards and repos into product claims they do not prove. In particular, `CTranslate2` proves quantization options, not Android readiness; `whisper.cpp` proves Android support, not end-to-end latency; `Silero VAD` repo claims are self-reported performance, not independent benchmarking; and `Piper`/`Sherpa-ONNX` prove offline TTS availability, not license suitability or voice quality for your exact Vietnamese voice pack. A more serious release issue is NLLB-200 distilled 600M: its model card is CC-BY-NC, research-only, and explicitly excludes production deployment, so it cannot be the commercial MT default absent explicit rights. [6][8][10][11][12][13][14][29]

For Vietnamese coverage, the proposal should stop relying on generic multilingual sources alone. There is enough Vietnamese-specific evidence to anchor the pipeline: PhoWhisper for ASR, PhoMT for MT, PhoST for EN-VI speech translation, VIVOS/Common Voice/VietSuperSpeech for ASR data, and PhoAudiobook for TTS data. Those are the citations that should carry the proposal, not generic "language coverage" claims from broader model cards. [1][2][3][4][5][15][16][17]

## What The Current Material Gets Right

1. `Whisper` is a defensible offline ASR baseline because the paper is about large-scale weak supervision and the repo has an Android-capable C/C++ implementation path. That supports the claim that Whisper is operationally plausible on phones. It does not, by itself, prove a specific latency target. [2][8]

2. `SeamlessM4T` is a real direct speech translation family, and the docs clearly state broad language coverage and the on-device small model limits. That supports the claim that direct S2ST is academically real but not the best EN-VI phone-first MVP. [6][7]

3. `NLLB` is a useful multilingual MT research comparator if the goal is later SEA expansion. The paper supports its 200-language research coverage and the model card exposes distilled checkpoints, but the distilled 600M card is CC-BY-NC/research-only and says it is not released for production deployment. It therefore cannot be the commercial default absent explicit rights; it also does not prove mobile packaging simplicity. [9][29]

4. `PhoMT` is a strong Vietnamese-English text MT dataset and benchmark. It supports a more credible EN-VI MT evaluation plan than generic MT benchmarks alone. [3]

5. `PhoWhisper` is a stronger Vietnamese ASR citation than plain Whisper for any claim about Vietnamese-specific ASR quality. [4]

6. `PhoST` is the key citation for EN-VI speech translation. It is the one source that directly says cascaded still beats modern end-to-end on the EN-VI benchmark it introduces. [1]

## Weak Or Overstated Citations To Fix

| Existing citation / claim pattern | Problem | Better source or correction |
|---|---|---|
| `CTranslate2 quantization docs` used as if they imply Android readiness | Docs show quantization modes, not a mobile packaging story | Keep it only for quantization/runtime options; do not imply Android support. [10] |
| `py-webrtcvad` used as if it proves VAD algorithm quality | Wrapper repo is not the canonical technical source | If kept, frame it as an implementation detail; otherwise cite WebRTC VAD itself or demote to fallback only. [14] |
| `Silero VAD` repo numbers used as hard performance proof | Repo claims are self-reported, not third-party benchmarked | Use as an engineering lead, not as a published benchmark. [11] |
| `Piper` voices catalog used as proof of production-ready Vietnamese TTS | Voice existence is not voice quality, licensing, or maintainability | State only that Vietnamese voices exist in the catalog; add license review as a separate step. [12] |
| `Sherpa-ONNX` used as proof of a finished product stack | Official repo/docs support offline Android TTS, not your exact app integration | Treat it as a runtime option, not a final solution guarantee. [13] |
| `Moonshine Voice` treated as a primary ASR alternative | Source evidence is thinner than Whisper/PhoWhisper | Keep as a secondary research note only unless you benchmark it yourself. [18] |
| `SeamlessM4T` on-device small export used as if it covers Vietnamese | The on-device README explicitly limits languages to `eng, fra, hin, por, spa` | Do not present it as an EN-VI on-device option. [7] |
| `NLLB` model card used as a shipping default or proof of mobile feasibility | Card supports research language coverage, not runtime feasibility, and the distilled 600M card is CC-BY-NC/research-only | Use it only as a non-commercial comparator until explicit commercial rights exist; do not call it mobile-ready or ship-ready. [9][29] |

## Claim To Source Map

| Claim to support | Best supporting source(s) | What the source actually proves | Strength |
|---|---|---|---|
| EN-VI speech translation benchmark exists and cascaded still wins | PhoST paper | 508 audio hours, 331K triplets, cascaded outperforms end-to-end on the benchmark | Strong |
| Offline ASR baseline should be Whisper-family | Whisper paper + whisper.cpp repo | Whisper is robust zero-shot ASR; whisper.cpp has Android support and quantized inference | Strong |
| Vietnamese-specific ASR should be anchored by PhoWhisper | PhoWhisper paper | Five Vietnamese Whisper fine-tunes trained on 844 hours, SOTA on Vietnamese ASR benchmarks | Strong |
| Vietnamese MT benchmark should be PhoMT, not only generic multilingual MT | PhoMT paper | 3.02M EN-VI sentence pairs, strong baseline study | Strong |
| Direct S2ST is research-real but not MVP | SeamlessM4T paper + on-device README + Seamless v2 paper | Broad S2ST exists, but on-device small export is only 5 languages and not Vietnamese | Strong |
| NLLB is a multilingual MT research comparator for SEA exploration, not a release candidate | NLLB paper + model card | 200-language multilingual MT and distilled checkpoints exist; the distilled 600M card is non-commercial/research-only | Strong [9][29] |
| VAD/noise gate should be lightweight and local | Silero VAD repo + RNNoise paper | Practical low-latency VAD/noise suppression exists | Medium-strong |
| TTS should be local/offline and Android-capable | Piper voices catalog + Sherpa-ONNX repo | Vietnamese voices exist and offline Android TTS is supported by Sherpa-ONNX | Medium-strong |
| Vietnamese speech data for ASR evaluation should not rely on a single corpus | VIVOS paper + Common Voice + VietSuperSpeech + VietMed | Vietnamese speech corpora are fragmented by style/domain; conversational data is a gap | Strong |
| TTS evaluation for Vietnamese needs language-specific data | PhoAudiobook paper | 941-hour Vietnamese TTS dataset exists and improves zero-shot TTS models | Strong |
| MT metrics should use SacreBLEU and COMET | SacreBLEU paper + COMET paper | BLEU needs standardized reporting; COMET correlates better with human judgment | Strong |

## Citation-Ready Reference List

1. Linh The Nguyen, Nguyen Luong Tran, Long Doan, Manh Luong, Dat Quoc Nguyen. 2022. "A High-Quality and Large-Scale Dataset for English-Vietnamese Speech Translation." arXiv:2208.04243. https://arxiv.org/abs/2208.04243
   - Supports: direct EN-VI ST benchmark, dataset size, and the key finding that cascaded still beats end-to-end on this benchmark.

2. Thanh-Thien Le, Linh The Nguyen, Dat Quoc Nguyen. 2024. "PhoWhisper: Automatic Speech Recognition for Vietnamese." ICLR 2024 Tiny Papers / arXiv:2406.02555. https://arxiv.org/abs/2406.02555
   - Supports: Vietnamese-specific ASR quality claim, Whisper fine-tuning on 844 hours, SOTA on Vietnamese ASR benchmarks.

3. Long Doan, Linh The Nguyen, Nguyen Luong Tran, Thai Hoang, Dat Quoc Nguyen. 2021. "PhoMT: A High-Quality and Large-Scale Benchmark Dataset for Vietnamese-English Machine Translation." EMNLP 2021. https://arxiv.org/abs/2110.12199
   - Supports: EN-VI text MT benchmark, 3.02M sentence pairs, and baseline comparison context.

4. Ye Jia, Ron J. Weiss, Fadi Biadsy, Wolfgang Macherey, Melvin Johnson, Zhifeng Chen, Yonghui Wu. 2019. "Direct Speech-to-Speech Translation with a Sequence-to-Sequence Model." Interspeech 2019. https://arxiv.org/abs/1904.06037
   - Supports: direct S2ST is feasible in research, but it is still an older baseline and useful mainly to contrast against cascade-first EN-VI deployment.

5. Loan Do, Thanh Ngoc Nguyen, Thanh Pham, Vinh Do, Hien Nguyen, Charlotte Nguyen. 2026. "VietSuperSpeech: A Large-Scale Vietnamese Conversational Speech Dataset for ASR Fine-Tuning in Chatbot, Customer Support, and Call Center Applications." arXiv:2603.01894. https://arxiv.org/abs/2603.01894
   - Supports: conversational Vietnamese ASR data, 267.39 hours, realistic deployment style coverage.

6. Seamless Communication, Loic Barrault, Yu-An Chung, Mariano Cora Meglioli, et al. 2023. "SeamlessM4T: Massively Multilingual and Multimodal Machine Translation." arXiv:2308.11596. https://arxiv.org/abs/2308.11596
   - Supports: direct S2ST/T2ST/T2TT/ASR family, around 100 languages, 2.3B and 1.2B model sizes in the family.

7. Facebook Research / Seamless Communication team. 2023. "SeamlessM4T on-device README." Official docs. https://github.com/facebookresearch/seamless_communication/blob/main/docs/m4t/on_device_README.md
   - Supports: the on-device export is experimental and only covers eng/fra/hin/por/spa.

8. Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, Ilya Sutskever. 2022. "Robust Speech Recognition via Large-Scale Weak Supervision." arXiv:2212.04356; PMLR 2023. https://arxiv.org/abs/2212.04356
   - Supports: Whisper as a robust offline ASR base and the scale of weak supervision.

9. NLLB Team, Marta R. Costa-jussa, James Cross, Onur Celebi, Maha Elbayad, Kenneth Heafield, Kevin Heffernan, et al. 2022. "No Language Left Behind: Scaling Human-Centered Machine Translation." arXiv:2207.04672. https://arxiv.org/abs/2207.04672
   - Supports: 200-language multilingual MT, FLORES-200 benchmark, low-resource language focus.

10. OpenNMT / CTranslate2 documentation. Quantization docs. https://opennmt.net/CTranslate2/quantization.html
    - Supports: runtime quantization options only; not Android readiness.

11. `snakers4/silero-vad`. Official repository. https://github.com/snakers4/silero-vad
   - Supports: lightweight VAD implementation and self-reported low-latency operation.

12. Xiph / Mozilla `rnnoise`. Official repo. https://github.com/xiph/rnnoise
    - Supports: hybrid DSP + deep-learning noise suppression, low-complexity real-time noise handling.

13. `rhasspy/piper` voices catalog. Official repo. https://github.com/rhasspy/piper/blob/master/VOICES.md
    - Supports: existence of Vietnamese voice packs in the catalog, but not licensing or quality guarantees.

14. `k2-fsa/sherpa-onnx`. Official repo. https://github.com/k2-fsa/sherpa-onnx
    - Supports: offline Android TTS support and runtime support for Piper/VITS engines.

15. Hieu-Thi Luong, Hai-Quan Vu. 2016. "A non-expert Kaldi recipe for Vietnamese Speech Recognition System." WLSI/OIAF4HLT 2016. https://aclanthology.org/W16-5207/
    - Supports: early Vietnamese ASR corpus and practical baseline context for Vietnamese speech recognition.

16. Pham Ngoc Phuong, Quoc Truong Do, Luong Chi Mai. 2019. "A High Quality and Phonetically Balanced Speech Corpus for Vietnamese." arXiv:1904.05569. https://arxiv.org/abs/1904.05569
   - Supports: classical Vietnamese speech corpus resource, useful for phonetic balance and controlled speech.

17. Thi Vu, Linh The Nguyen, Dat Quoc Nguyen. 2025. "Zero-Shot Text-to-Speech for Vietnamese." ACL 2025 Short Papers. https://aclanthology.org/2025.acl-short.81/
   - Supports: PhoAudiobook, a 941-hour Vietnamese TTS dataset, and stronger Vietnamese TTS evaluation evidence.

18. Mozilla Common Voice. Official dataset page. https://commonvoice.mozilla.org/en/datasets
    - Supports: Vietnamese is available as a community speech dataset; useful for public multilingual ASR evaluation.

19. K. Le-Duc, et al. 2024. "VietMed: A Dataset and Benchmark for Automatic Speech Recognition in the Medical Domain." LREC-COLING 2024. https://aclanthology.org/2024.lrec-main.1509/
    - Supports: domain-specific Vietnamese ASR data and the point that evaluation should not rely on one corpus.

20. Matt Post. 2018. "A Call for Clarity in Reporting BLEU Scores." EMNLP 2018. https://arxiv.org/abs/1804.08771
   - Supports: SacreBLEU / standardized BLEU reporting.

21. Ricardo Rei, Craig Stewart, Ana C. Farinha, Alon Lavie. 2020. "COMET: A Neural Framework for MT Evaluation." EMNLP 2020. https://arxiv.org/abs/2009.09025
   - Supports: COMET as a better aligned MT quality metric than raw BLEU alone.

22. Alexis Conneau, Min Ma, Simran Khanuja, Yu Zhang, Vera Axelrod, Siddharth Dalmia, Jason Riesa, Clara Rivera, Ankur Bapna. 2022. "FLEURS: Few-shot Learning Evaluation of Universal Representations of Speech." arXiv:2205.12446. https://arxiv.org/abs/2205.12446
   - Supports: broad multilingual speech benchmark, 102 languages, around 12 hours per language.

23. Changhan Wang, Anne Wu, Juan Pino. 2020. "CoVoST 2 and Massively Multilingual Speech-to-Text Translation." arXiv:2007.10310. https://arxiv.org/abs/2007.10310
   - Supports: multilingual speech translation corpus structure and baseline setting.

24. Ye Jia, Michelle Tadmor Ramanovich, Quan Wang, Heiga Zen. 2022. "CVSS Corpus and Massively Multilingual Speech-to-Speech Translation." arXiv:2201.03713. https://arxiv.org/abs/2201.03713
   - Supports: direct speech-to-speech benchmark construction and cascade/direct comparison context.

25. Jaehyeon Kim, Jungil Kong, Juhee Son. 2021. "Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech." arXiv:2106.06103. https://arxiv.org/abs/2106.06103
   - Supports: lightweight end-to-end TTS architecture basis.

26. Jungil Kong, Jaehyeon Kim, Jaekyoung Bae. 2020. "HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis." arXiv:2010.05646. https://arxiv.org/abs/2010.05646
   - Supports: fast, high-fidelity vocoder architecture.

27. `whisper.cpp` official repository. https://github.com/ggml-org/whisper.cpp
   - Supports: Android support and quantized Whisper inference runtime.

28. `Helsinki-NLP/opus-mt-en-vi` and `Helsinki-NLP/opus-mt-vi-en` model cards. https://huggingface.co/Helsinki-NLP/opus-mt-en-vi and https://huggingface.co/Helsinki-NLP/opus-mt-vi-en
   - Supports: bilingual fallback MT models.

29. `facebook/nllb-200-distilled-600M` model card. https://huggingface.co/facebook/nllb-200-distilled-600M
   - Supports: CC-BY-NC/research-only and non-production-deployment boundary for this specific checkpoint.

## Proposal Amendments

1. Make `PhoST` the primary citation for the architecture decision. The proposal should explicitly say the EN-VI benchmark paper found cascaded still outperforms end-to-end, so the MVP is intentionally cascaded, not direct S2ST. [1]

2. Replace generic "Whisper is good for Vietnamese" language with `PhoWhisper` for Vietnamese-specific ASR claims. Keep `Whisper` only for the base ASR family and mobile runtime feasibility via `whisper.cpp`. [2][8]

3. Replace generic "NLLB is mobile-friendly" with "NLLB is a multilingual research comparator; the distilled 600M card is non-commercial and cannot be a product default without explicit rights." Keep Android packaging as a separate engineering problem and select a separately audited pair-specific shipping candidate. [9][29]

4. Keep `CTranslate2` only as the quantization/runtime option, not as proof of Android deployment. If the proposal wants a true mobile runtime claim, that part needs a separate implementation citation or benchmark. [10]

5. Use `PhoMT` and `PhoAudiobook` as the main Vietnamese text MT and TTS evaluation anchors. They are stronger than generic benchmark claims for this language pair. [3][17]

6. Keep `Silero VAD` and `RNNoise` as implementation options, but do not present their repo numbers as published benchmark truth. Phrase them as practical engineering choices. [11][12]

7. Demote `Moonshine` to an appendix note unless you benchmark it yourself. It is not the safest citation for a proposal that needs conservative technical credibility. [18]

8. For phase-2 SEA expansion, keep the language list but attach the disclaimer that text coverage is easier than speech or TTS coverage. Do not claim full speech parity for every SEA language unless you have voice packs and ASR data. [6][9][17][20]

9. Add a one-line note in the proposal that the public EN-VI speech benchmark landscape is thin, so internal evaluation must be built around PhoST plus a small real-world conversational set. [1][5]

## Limitations

- I did not run any model code or device benchmarks.
- I did not verify every commercial TTS/ASR license attached to each voice/model pack.
- Some repo-level claims are inherently self-reported; I flagged those rather than trying to convert them into hard evidence.
- This review focuses on citation quality and claim support, not on final BOM or UX wording.
