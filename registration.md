# OneVoice AI Challenge — Registration Form

> Competition: https://luma.com/g1rwi7ag  
> Template required: https://bit.ly/OVAC-Info-Template

---

## Your Info

**Name:**  
<!-- Full name -->

**Email:**  
hiep.cbla5@gmail.com

**Mobile Number:**  
<!-- Include country code, e.g. +84 xxx xxx xxx -->

**Applicant Type:**  
<!-- Individual / Team -->

---

## Participant / Team Details

**Template link (Anyone with link can view):**  
<!-- Fill in the template at https://bit.ly/OVAC-Info-Template then paste the shared link here -->

**Team Name:**  
<!-- Required for team participation -->

**Number of Members:**  
<!-- Required for team participation -->

---

## Project Info

**Name of Your Project:**  
VoiceKey — Pocket AI Translator Dongle

**Briefly describe your proposed solution:**  
VoiceKey is a USB-C dongle the size of a thumb drive that plugs directly into any smartphone and performs real-time, two-way voice translation — both from the microphone (conversations) and from system audio (any app playing sound: YouTube, Zoom, phone calls, podcasts). All AI runs on-device with no internet required, at a hardware cost under $10.

**What makes your solution innovative or different from existing approaches?**  
- **Dual-mode translation**: (1) Mic mode — translate live conversations; (2) System Audio mode — intercept and translate audio from any app in real-time (YouTube, Zoom, TikTok, phone calls, movies)
- Fully offline — runs on embedded NPU (ESP32-S3 / ARM Cortex-M55 + Ethos-U55), no internet required
- Physical dongle sits between phone and headphones → captures both mic input and audio output without OS-level permission hacks
- 10x cheaper than any existing hardware translator ($10 vs $99–$299)
- No app installation needed — recognized as standard USB audio + HID device by any phone
- Compatible with any USB-C OTG smartphone (Android + iPhone 15+)
- Open-source AI stack (Whisper, NLLB-200, Piper) → no per-query licensing cost

**Describe your technical approach (AI models, hardware, system design, or methodology):**  
- **Hardware**: USB-C dongle with ESP32-S3 or ARM Cortex-M55 + Ethos-U55 NPU, MEMS microphone, USB audio codec (captures both mic input and phone audio output), speaker / 3.5mm headphone pass-through
- **System Audio Translation**: Dongle acts as USB audio interface — phone routes all audio output through the dongle. The NPU taps the outgoing audio stream, runs ASR+NMT+TTS pipeline, and mixes translated speech back into the headphone output in real-time
- **Mic Translation**: MEMS mic captures speaker voice → same ASR→NMT→TTS pipeline → output through speaker
- **ASR**: Whisper tiny / Whisper base quantized to INT8, running fully on-device
- **Translation**: NLLB-200 distilled 600M (or lighter seq2seq < 200M params) quantized for edge inference
- **TTS**: Piper TTS lightweight, on-device — voice cloning optional for natural-sounding output
- **Streaming pipeline**: Chunk-based VAD (Voice Activity Detection) → rolling 2s audio windows → overlapping inference to minimize latency
- **Cloud fallback**: Optional Wi-Fi/LTE call via host phone for rare language pairs — estimated < $0.001/sentence
- **Target latency**: < 1.5 seconds end-to-end (mic mode), < 2s (system audio mode with buffering)

**Expected Language Pair to Support:**  
- Vietnamese ↔ English (priority)
- Vietnamese ↔ Chinese
- English ↔ Thai
- English ↔ Indonesian
- English ↔ Khmer

**Project's Current Development Phase:**  
Idea / Concept

**Real-world Use Case or Industry:**  
- Tourism & hospitality (translate foreign-language tour guides, hotel TV, local radio)
- Healthcare (translate doctor consultations, medical videos, patient app audio)
- Education & vocational training (translate online lectures, YouTube tutorials in real-time)
- Cross-border trade (Vietnam–China, Thailand–Myanmar corridors)
- Remote work & meetings (translate Zoom/Teams calls without a subscription service)
- Labor migration support (translate government announcements, workplace safety audio)

**What impact do you expect your solution to create?**  
VoiceKey removes language barriers for 200M+ users across Southeast Asia at an ownership cost under $10 — compared to $200+ for existing dedicated translation devices. The system audio translation feature is transformative: users can watch any foreign-language video, join any meeting, or receive any phone call and hear it in their native language instantly — without changing apps, without subscriptions, and without internet. This directly benefits rural communities, migrant workers, and budget travelers in developing markets where existing solutions are either too expensive or too data-hungry.

**How could your solution evolve into a real product or deployment in the future?**  
- Phase 1 (Q3 2026): EVT hardware prototype with ESP32-S3, supporting EN↔VI
- Phase 2 (Q4 2026–Q1 2027): 100-user beta in HCMC and Bangkok; first production run of 5,000 units sold via Shopee/Lazada/TikTok Shop
- Phase 3 (2027): OEM white-label for hotel chains, airports, and hospital check-in kiosks; expand to 10 ASEAN languages
- Long-term: Integrate eSIM for standalone operation without a host phone; enter India (Hindi↔English — 500M+ speakers)

---

## Links & Attachments

**Upload Pitch Deck (PDF):**  
<!-- Google Drive / Dropbox link to VoiceKey-PitchDeck.pdf -->

**Demo Video or Prototype Link:**  
<!-- YouTube / Loom / Drive link -->

**GitHub / Project Repository:**  
<!-- https://github.com/... -->
