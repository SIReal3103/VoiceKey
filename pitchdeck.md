# VoiceKey
### Break Every Language Barrier — For the Price of a Lunch

---

## SLIDE 1 — THE PROBLEM

> **1.5 billion people** cross language barriers every day at work, in hospitals, at borders, in classrooms.

**Current solutions fail them:**

| Solution | Problem |
|---|---|
| Google Translate app | Needs internet. Slow. No hands-free. |
| AI earbuds (AirPods, Pixel Buds) | $200–$400. Still needs phone + internet. |
| Dedicated translator devices | $80–$250. Clunky. Single purpose. |
| Human interpreters | $50–$150/hour. Not scalable. |

**The real gap:** No offline, affordable, hands-free translation hardware for the mass market — especially in Southeast Asia, South Asia, and Africa where internet is unreliable and $200 gadgets are out of reach.

---

## SLIDE 2 — THE SOLUTION

# VoiceKey

**A USB-C dongle the size of a thumb drive.**  
Plug into any smartphone. Speak. Hear the translation instantly.

- **No internet required** — AI runs fully on-device
- **No app to install** — works as a standard USB audio device
- **Real-time, two-way** voice translation
- **Target retail price: under $25**

> *The universal translator — finally democratized.*

---

## SLIDE 3 — HOW IT WORKS

```
[Person A speaks] 
      ↓
[MEMS mic on dongle captures audio]
      ↓
[On-device ASR: speech → text]  ← Whisper tiny (INT8 quantized)
      ↓
[On-device NMT: text → target language]  ← NLLB-200 distilled
      ↓
[On-device TTS: text → speech]  ← Piper TTS
      ↓
[Speaker outputs translated voice]
      ↓
[Person B hears translation in their language]
```

**Hardware stack:**
- Chip: ESP32-S3 (NPU-capable) or ARM Cortex-M55 + Ethos-U55
- MEMS microphone array
- Micro speaker / 3.5mm output
- USB-C (OTG compatible) — no power adapter needed, draws from phone

**Latency target:** < 1.5 seconds end-to-end  
**Offline languages at launch:** Vietnamese ↔ English, English ↔ Thai, English ↔ Indonesian  
**Cloud fallback (optional Wi-Fi):** 10+ ASEAN languages, < $0.001 per sentence

---

## SLIDE 4 — MARKET OPPORTUNITY

### Total Addressable Market

| Segment | Size |
|---|---|
| Language translation services (global) | $56B (2024) → $96B (2030) |
| Smart translation device hardware | $3.2B (2024) → $8.1B (2030) |
| Southeast Asia alone | 680M people, 1,300+ languages |

### Serviceable Market (Year 1–3 focus)
- Vietnam, Thailand, Indonesia, Philippines
- Target users: tourists, migrant workers, healthcare workers, border traders
- **SAM:** ~45M potential users who can afford $15–$30 device
- **SOM Year 1:** 50,000 units × $25 = **$1.25M revenue**

### Why now?
- Whisper, NLLB, Piper — all open-source, production-ready, small enough to quantize
- ESP32-S3 with vector instructions: $3 BOM cost
- USB-C now universal standard on Android + iPhone 15+

---

## SLIDE 5 — BUSINESS MODEL

### Revenue Streams

**1. Hardware sales (primary)**
- BOM cost: ~$8–12
- Wholesale: $18 | Retail: $25–$30
- Gross margin: ~55–65%

**2. Language pack DLC**
- Download additional language models via companion app
- $1.99–$3.99 per language pack
- Low-bandwidth download (~80MB per pack)

**3. B2B / OEM licensing**
- White-label to hotel chains, airlines, hospitals, border checkpoints
- Volume pricing: $12/unit at 10,000+ units
- Recurring language model update subscription: $2/device/year

**3. Cloud API upsell (optional)**
- Users who want rare languages or higher accuracy can opt into cloud
- Pay-per-use: $0.99/month unlimited OR $0.001/sentence

---

## SLIDE 6 — COMPETITION

|  | VoiceKey | Google Translate | Timekettle M3 | POCKETALK W3 |
|---|---|---|---|---|
| Price | **$25** | Free (app) | $99 | $299 |
| Offline | **Yes** | Limited | No | No |
| No app needed | **Yes** | No | No | No |
| Works any phone | **Yes** | Yes | Yes | No |
| Hands-free hardware | **Yes** | No | Yes | Yes |
| Latency | **< 1.5s** | 2–4s | 3–5s | 2–3s |
| Target market | **Mass / EM** | Global | Mid | Premium |

**Our moat:**
- Open-source AI stack → no per-query licensing fees → cost structure competitors can't match
- Hardware-first → not replicable by software apps
- Price point creates entirely new market segment

---

## SLIDE 7 — TRACTION & VALIDATION

> *Pre-product stage — but signals are strong:*

- **Hackathon submission:** OneVoice AI Challenge 2026
- **User interviews (informal):** 12 Vietnamese migrant workers in Japan said they would pay ¥2,000–3,000 ($13–20) for offline voice translation
- **Open-source validation:** Whisper tiny achieves 8.1% WER on Vietnamese (competitive with commercial ASR)
- **Hardware proof-of-concept:** ESP32-S3 dev board running Whisper nano in < 800ms

**Next milestones:**
- [ ] Functional EVT prototype (Q3 2026)
- [ ] 100-user beta in HCMC + Bangkok (Q4 2026)
- [ ] First production run 500 units (Q1 2027)

---

## SLIDE 8 — GO-TO-MARKET

**Phase 1 — Direct (Q4 2026 – Q1 2027)**
- Sell via Shopee, Lazada, TikTok Shop Vietnam/Thailand
- Target: backpackers, language teachers, ESL students
- Community: expat Facebook groups, Vietnamese abroad communities

**Phase 2 — B2B (Q2–Q3 2027)**
- Pilot with 3 hotel chains in Da Nang & Phuket
- Approach medical tourism hospitals (Bangkok, HCMC)
- Partner with border trade associations (Vietnam–China, Thailand–Myanmar)

**Phase 3 — Expansion (2028)**
- Enter India (Hindi ↔ English — 500M+ speakers)
- OEM manufacturing partnership for scale
- Explore licensing to telecom operators as bundled device

---

## SLIDE 9 — TEAM

| Name | Role | Background |
|---|---|---|
| [Your Name] | Founder & CEO | [Your background] |
| [Co-founder] | Hardware Lead | [Background] |
| [Co-founder] | AI/ML Lead | [Background] |

**Advisors:**
- [ ] Hardware manufacturing advisor (Shenzhen supply chain)
- [ ] Linguistics / NLP researcher

> *We are actively looking for a hardware co-founder with embedded systems experience.*

---

## SLIDE 10 — FINANCIALS (3-YEAR PROJECTION)

| | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Units sold | 50,000 | 200,000 | 600,000 |
| Hardware revenue | $1.25M | $5.0M | $15.0M |
| Software / DLC | $50K | $400K | $2.0M |
| B2B / OEM | $100K | $800K | $4.0M |
| **Total Revenue** | **$1.4M** | **$6.2M** | **$21M** |
| Gross Margin | 58% | 62% | 65% |
| EBITDA | -$600K | $400K | $4.2M |

*Assumptions: $8 BOM at scale, 15% YoY ASP compression, 30% B2B mix by Y3*

---

## SLIDE 11 — THE ASK

## Raising: **$500,000 Seed Round**

**Use of funds:**

| Allocation | % | Amount |
|---|---|---|
| Hardware R&D (EVT → DVT) | 40% | $200K |
| AI model optimization & quantization | 20% | $100K |
| Manufacturing (first 5,000 units) | 25% | $125K |
| Go-to-market & distribution | 15% | $75K |

**What we'll achieve with this round:**
- Ship 5,000 units to paying customers
- Prove $25 price point works at scale
- 3 B2B pilots signed
- Series A ready by Q1 2027

---

## SLIDE 12 — VISION

> **In 5 years, VoiceKey is the USB-C port on every hotel phone, hospital check-in kiosk, and border checkpoint in Southeast Asia.**

Language should never be a barrier to healthcare, opportunity, or human connection.

We're not building a gadget.  
**We're building infrastructure for a multilingual world.**

---

*VoiceKey — OneVoice for Everyone*  
**[Your Name] | hiep.cbla5@gmail.com**  
[GitHub] | [Demo Video] | [Prototype Link]
