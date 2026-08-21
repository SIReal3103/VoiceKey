---
title: "VoiceKey Cost and Implementation Model"
date: "2026-08-20"
status: "research-complete"
plan: "/Users/macbook/Documents/ChatGPT/OneVoice/plans/260820-0945-offline-mobile-translator-proposal/plan.md"
---

# VoiceKey Cost and Implementation Model

## Table of Contents
- [Executive Summary](#executive-summary)
- [Assumptions](#assumptions)
- [Hardware Cost Model](#hardware-cost-model)
- [Prototype Equipment Checklist](#prototype-equipment-checklist)
- [Software Stack and Tooling Cost](#software-stack-and-tooling-cost)
- [NRE Cost Model](#nre-cost-model)
- [Manufacturing and Pilot Operations](#manufacturing-and-pilot-operations)
- [TCO and ROI Framework](#tco-and-roi-framework)
- [Sensitivity and Risks](#sensitivity-and-risks)
- [Sources](#sources)
- [Unresolved Questions](#unresolved-questions)

## Executive Summary

The cheapest credible v1 is still the same architecture from the feasibility note: a USB Audio Class companion dongle for Android, with the phone doing all inference locally. That keeps the BOM small, avoids any claim of direct phone-NPU access, and lets the product stay offline-first. The economics are driven far more by Android app/inference engineering and pilot support than by the raw silicon BOM.

Decision summary:
- Complete companion planning bands are EVT $45-$70, pilot $38-$60, and 100-unit preproduction $30-$45 per unit; each remains quote-dependent.
- Tooling and prototype gear are cheap relative to labor, unless the team has to buy a full bench from scratch.
- NRE is the real spend. A realistic first release needs embedded, Android, inference, QA, and pilot support labor.
- A 10-30 user pilot is affordable as cash outlay, but not enough to amortize serious NRE. Use it to validate usage, not to claim positive business payback.

All cost figures below are planning estimates or price anchors from current public listings. Anything involving assembly, enclosure, certification, or phone procurement still needs formal quotes.

## Assumptions

- Currency: USD.
- Product scope: one USB-C dongle per user, no battery, no speaker, no cellular radio.
- Runtime: offline speech pipeline runs on the Android phone.
- Pilot: 10-30 users, 1 dongle per active user, a 10% usable spare pool, and a separately stated manufacturing-yield/rework allowance.
- Phone strategy: BYOD first; loaner phones are optional.
- Distribution: private APK or internal test distribution preferred; Google Play is optional.
- Voice stack: EN-VI first, expand later. No cloud runtime dependency in the base case.
- Volume cases used in this model:
  - EVT: 10 assembled units.
  - Pilot: 30 users, 33 dongles incl. spares.
  - Preproduction: 100 units.

## Hardware Cost Model

### Cost anchors from current public sources

| Item | Source anchor | What it proves | Price anchor |
|---|---|---|---|
| Type-C sink/PD controller class | STUSB4500 on Mouser / ST / Newark | A real, current sink-controller option for a compact USB-C device | $1.64-$2.22 at 1-10 pcs on distributor listings; $1.11-$1.20 at reel volume |
| MCU class | STM32U575CIT6 on Mouser | A viable low-power MCU with USB-capable class fit | $10.62 at qty 1; $7.03 at qty 100 |
| Audio codec class | TLV320AIC3263 on TI | A low-power stereo codec with 4 digital mic support | $13.577 at 1-99; $7.379 at 1k |
| Digital MEMS mic class | Syntiant SPH0655LM4H-1-8 on DigiKey | A current digital PDM MEMS mic price anchor | $1.69 at qty 1; $1.05 at qty 100 |
| Play distribution fee | Google Play Console help | Optional app store distribution fee | US$25 one-time registration fee |

Source links are in the [Sources](#sources) section.

### Selected v1 hardware cost boundaries

This is the base hardware class set for a phone-attached dongle. Each line has an exclusive inclusion boundary. The figures are cross-volume/public-listing calibration anchors, not an orderable or automatically summable BOM; the complete-unit bands below are the only bands used for pilot-cash math until two CM quotes exist.

| Block | Recommended class | Planning cost per unit | Notes |
|---|---|---:|---|
| USB connection | One male plug/pigtail, passive USB-device CC implementation, ESD, connection-specific passives | $1.50-$4.00 | Includes the cable/plug/pigtail exactly once. Excludes enclosure, general PCB passives, and a second pigtail. A PD/controller path is an unselected future option, not a v1 row. |
| MCU / bridge | STM32U5-class low-power MCU | $7.00-$10.62 | Use only as much MCU as audio bridge/control requires |
| Audio codec / front end | TLV320AIC3263-class or equivalent | $7.38-$13.58 | Low-volume pilot should assume the higher end of the range |
| MEMS microphones | 2x digital PDM/I2S MEMS mic | $2.10-$4.26 | Range reflects two current mic price anchors |
| Controls and PCB | Button, LED, PCB, and non-USB passives | $3.15-$8.60 | Excludes CC/ESD/cable/pigtail already in USB connection. |
| Enclosure, assembly, and test | Small shell, strain relief, low-volume SMT/functional test/rework | $9.00-$28.00 | Excludes cable/pigtail already in USB connection; this varies most by volume. |

**Configuration rule.** Select exactly one Type-C design in the schematic: passive USB-device CC (v1 base) or a named controller/PD configuration. Do not carry both into the same BOM. Recompute the complete-unit quote only after that selection, the production quantity, and the supplier are known.

### Per-unit totals

| Volume case | Estimated assembled unit cost | What is included |
|---|---:|---|
| EVT, 10 units | $45-$70 | Hardware BOM + basic assembly/test + simple enclosure |
| Pilot, 30-40 units | $38-$60 | Better assembly pricing, still not full production economics |
| 100-unit preproduction | $30-$45 | Lower assembly and mic/MCU pricing; still quote-dependent |

Interpretation:
- The dongle itself is not the expensive part.
- The cost-sensitive choice is whether to keep the board extremely simple or add PD complexity, on-board DSP, battery, or pass-through charging.
- For v1, do not add battery or on-dongle heavy DSP unless the acoustic case forces it.

## Prototype Equipment Checklist

This is the minimum bench for a believable EVT and pilot loop.

| Item | Purpose | Planning cost | Quote status |
|---|---|---:|---|
| 3 Android test phones (Pixel, Samsung, Snapdragon class) | Compatibility matrix, thermal and audio routing checks | $600-$2,500 total | Must be procured or borrowed; exact model choice is project-specific |
| USB power meter / current monitor | Measure dongle draw and phone-side current | $15-$120 | Can be bought off the shelf |
| Bench power supply | Stable bring-up and current limit | $80-$300 | Can be borrowed if lab already has one |
| Logic analyzer | USB/MCU timing and bus debug | $10-$500 | Depends on whether a cheap or professional unit is used |
| Oscilloscope | Power, reset, and signal integrity debugging | $200-$1,500+ | Often borrowable in a lab |
| Soldering and rework kit | Board bring-up and fixups | $100-$400 | One-time lab cost |
| Audio test gear | SPL meter or calibrated reference mic/headphones | $50-$400 | Quote/borrow as needed |
| Thermal check tool | IR thermometer or thermal camera | $20-$500 | Optional but useful for sustained inference tests |
| 3D print / prototype enclosure service | Fast enclosure iteration | $50-$300 per iteration | Quote required |

### Prototype equipment budget

- If the team already has a lab: $300-$1,200 incremental.
- If the team must buy most equipment: $1,000-$4,500.
- If the team also needs a professional scope, thermal camera, and better audio instrumentation: $2,000-$8,000.

## Software Stack and Tooling Cost

### Recommended stack

| Layer | Candidate | Cost model |
|---|---|---|
| Android app | Kotlin + NDK/JNI | $0 license cost |
| USB audio capture | Android USB host + audio routing | $0 license cost |
| ASR runtime | whisper.cpp-style local inference | $0 license cost |
| MT runtime | quantized on-device translation runtime | $0 license cost |
| TTS runtime | Sherpa-ONNX / Piper-class offline TTS | $0 license cost |
| VAD / noise gate | Silero VAD / RNNoise-class | $0 license cost |
| CI | GitHub Actions / local CI | $0-$50/month, depending on usage and repo visibility |
| App distribution | Sideload or internal app sharing | $0 if sideloaded; US$25 one-time if Google Play Console is used |

### Tooling notes

- Android Studio, NDK, and command-line build tools are free.
- If the pilot uses Google Play for internal/private distribution, the one-time developer registration fee is US$25.
- Do not budget for paid cloud inference in the base case. If cloud fallback is added, treat it as a separate product decision because it changes privacy, offline behavior, and operating cost.

## NRE Cost Model

### Labor assumptions

I am using BLS May 2024 median-wage proxies, then adding a planning overhead factor for actual project cost. That overhead is an estimate, not a sourced fact.

| Role proxy | BLS source | Median annual wage | Median hourly wage equivalent | Planning loaded rate |
|---|---|---:|---:|---:|
| Software developer | BLS OOH (May 2024) | $133,080 | $63.98/hr | $85-$115/hr |
| Electrical engineer | BLS OOH | $111,910 | $53.80/hr | $75-$95/hr |
| QA tester / software test | BLS OOH | $102,610 | $49.33/hr | $65-$90/hr |
| Interpreter / translator for pilot scripting | BLS OOH | $59,440 | $28.58/hr | $40-$60/hr |

### Planned work breakdown

| Workstream | Hours | Primary role | Cost band |
|---|---:|---|---:|
| Hardware schematic, PCB, bring-up | 180-300 | EE | $13.5k-$28.5k |
| Android app and USB audio integration | 260-420 | Software dev | $22.1k-$48.3k |
| Offline inference packaging and tuning | 180-320 | Software dev | $15.3k-$36.8k |
| QA, device matrix, bug fixing | 120-180 | QA | $7.8k-$16.2k |
| Pilot setup, training, support, scripts | 60-120 | SW dev + interpreter support | $3.0k-$7.2k |
| Compliance pre-scan / advisory | 40-80 | EE + external lab quote | $3.0k-$7.6k |

The NRE row for pilot setup covers pre-deployment engineering and preparation labor. It is separate from the field-period support reserve in the direct-cash table below. If the same person-hours are paid from one budget, record them in one layer only; do not add them twice.

### NRE scenario rule and total

The scenarios are alternatives, not additive. Before a funding/procurement decision, a WBS ledger must list included workstreams, approved hours, loaded rates, and exclusions for each scenario. At the displayed high inputs, all six workstreams total $144.6k, so the full-workstream maximum is rounded to **$145k**. The compliance row may include only named pre-scan/advisory; formal certification/lab work is separately quote-required.

| Scenario | Inclusion rule | Formal compliance lab | Planning total |
|---|---|---|---:|
| Lean MVP | Approved subset and hour caps that sum to the stated band | Excluded; quote required | $65k-$95k |
| More realistic first release | Full/reduced workstream plan with named caps; maximum rounds all-workstream high input | Pre-scan only if named; certification excluded unless quoted | $95k-$145k |

Interpretation:
- Hardware cost is not the budget killer.
- Android integration, model packaging, and pilot QA are the major burn items.
- If the team adds a cloud service, a native standalone battery product, or a broad phone-compatibility promise, NRE rises fast.

## Manufacturing and Pilot Operations

### Manufacturing cost structure

For a low-volume pilot, assume:
- 10% usable spare units, rounded up.
- A 15% manufacturing yield/rework allowance applied consistently as `production units = ceil(usable units / 0.85)`. This is a planning policy, not a supplier yield claim.
- One simple test fixture.
- No injection mold in the first pilot unless volume is already committed.

| Pilot | Active users | Usable spares | Usable units | Production units | Unit-cost source | Hardware cash |
|---|---:|---:|---:|---:|---:|---:|
| 10-user | 10 | 1 | 11 | 13 | EVT $45-$70 | $585-$910 |
| 30-user | 30 | 3 | 33 | 39 | Pilot $38-$60 | $1,482-$2,340 |

| Item | 10-user pilot | 30-user pilot | Quote status |
|---|---:|---:|---|
| Dongles incl. spares and stated yield/rework allowance | $585-$910 | $1,482-$2,340 | Formula above; no additional manufacturing-yield reserve is hidden here |
| Loaner phones, only for the non-BYOD variant | $600-$1,500 for two phones | $1,000-$4,000 for two-to-four phones | Explicit contingency; do not include in BYOD totals |
| Fixtures and test jig | $500-$2,500 | $500-$3,500 | Quote required |
| Packaging, labels, shipping | $150-$500 | $300-$900 | Quote required |
| Field replacements and returns reserve | $100-$300 | $300-$900 | Planning reserve |
| Support / onboarding | $1,500-$5,000 | $3,000-$10,000 | Depends on support intensity |

### Pilot totals

#### 10-user pilot

- Direct cash outlay, BYOD phones: **$2.835k-$9.210k** (the sum of the five non-phone rows above under the stated quantity policy).
- Direct cash outlay, with two loaner phones: **$3.435k-$10.710k** (BYOD total plus the stated $0.60k-$1.50k loaner provision).

#### 30-user pilot

- Direct cash outlay, BYOD phones: **$5.582k-$17.640k** (the sum of the five non-phone rows above under the stated quantity policy).
- Direct cash outlay, with two-to-four loaner phones: **$6.582k-$21.640k** (BYOD total plus the stated $1.00k-$4.00k loaner provision).

### Test-lab capital boundary

The pilot totals above contain the simple fixture used for the pilot, but exclude general lab capital and the permanent phone-compatibility bench. If equipment and three test phones cannot be borrowed, budget **$0.90k-$7.00k** for a basic acquisition (the $0.60k-$2.50k phone band plus $0.30k-$4.50k bench band). A more professional scope, thermal camera, and audio instrumentation can exceed that range. Treat this as separately approved capital, not as a hidden component of direct pilot cash or NRE labor.

### What the pilot is for

The pilot should answer:
- Does the USB audio path work across the supported Android matrix?
- Does the offline pipeline feel fast enough for short turn-taking?
- Does the phone thermal profile stay acceptable on the chosen handset class?
- Does the physical dongle actually improve usage versus phone mic capture?

The pilot should not be used to claim final unit economics. NRE is still carrying too much of the total cost.

## TCO and ROI Framework

### Cost buckets

| Bucket | Examples |
|---|---|
| Upfront NRE | Hardware design, app engineering, inference integration, QA |
| Per-unit CAPEX | Dongle BOM, assembly, packaging, spares |
| Pilot OPEX | Onboarding, support, bug fixes, replacements |
| Ongoing OPEX | App maintenance, model updates, device compatibility testing |
| Optional platform fees | Google Play registration fee, if used |

### Benefit buckets

| Benefit | How to measure |
|---|---|
| Interpreter minutes avoided | Compare baseline assisted conversations vs pilot usage |
| Faster task completion | Time from first utterance to final understood instruction |
| Fewer clarification loops | Count repeated explanations or re-asks |
| Lower support burden | Fewer escalations to bilingual staff |
| Privacy / policy value | Qualitative, but important for adoption |

### Illustrative BLS May 2024 median-wage proxy for labor value

Use the BLS interpreters and translators May 2024 median wage only as an illustrative proxy, not as a bill rate, cost floor, or site labor assumption:
- Median annual wage: $59,440.
- Hourly equivalent: about $28.58/hr.

Use a site-approved hourly value or documented alternative cost for a decision-grade benefit calculation. The BLS proxy alone does not establish the cost of avoided bilingual assistance.

### Example break-even math

If a 30-user deployment avoids 1 hour per user per month of live bilingual assistance:
- 30 users x 12 months x 1 hour = 360 hours/year.
- 360 hours x $28.58/hr = about $10,289/year gross value using the illustrative BLS May 2024 median-wage proxy.

If it avoids 2 hours per user per month:
- 720 hours/year.
- 720 x $28.58 = about $20,578/year gross value.

Interpretation:
- This is an illustrative gross-benefit calculation, not a break-even conclusion.
- Compare measured 12-month benefit with measured 12-month direct-pilot cost before an ROI claim; full NRE remains separate.

### ROI formulas to use in the proposal

```text
12-month gross benefit =
  (avoided interpreter hours during the 12-month period x site-approved hourly value)
  + (non-overlapping task hours saved during the same period x loaded site labour rate)

12-month direct-pilot cost =
  direct pilot cash
  + (12-month support + replacement + distribution not already included in direct pilot cash)

12-month direct-pilot ROI (%) =
  ((12-month gross benefit - 12-month direct-pilot cost)
   / 12-month direct-pilot cost) × 100

Ongoing annual net benefit after the pilot =
  (avoided interpreter hours x site-approved hourly value)
  + (non-overlapping task hours saved x loaded site labour rate)
  - (ongoing support + replacement + distribution not already included in direct pilot cash)
```

For the ROI metric above, the 12-month period begins at pilot deployment and uses observed values from that period. The 12-month direct-pilot cost includes direct pilot cash and only the 12-month operating costs not already recorded there; it excludes NRE and test-lab/device capital. Measurement rule: each observed avoided minute belongs to exactly one benefit bucket. The cost ledger labels every line as direct pilot cash, later recurring OPEX, NRE, capital, or explicitly excluded/site-funded; no line may occur in two buckets.

For a wider product-investment case, allocate NRE and lab capital once across a stated portfolio and a stated 12-, 24-, or 36-month horizon. Do not subtract an amortised amount from annual benefit and also include the same full capital amount in the ROI denominator.

Recommended measurement rules:
- Measure actual avoided minutes, not self-reported satisfaction only.
- Track P50 and P95 end-to-end latency.
- Track support tickets per active user.
- Track capture failures by device model.
- Track how often users fall back to phone mic instead of the dongle.

## Sensitivity and Risks

### Biggest cost sensitivities

| Variable | Effect if worse than expected | Mitigation |
|---|---|---|
| Assembly price | Direct unit cost rises quickly at low volume | Keep PCB simple; avoid custom battery/charger path |
| Phone compatibility | Support burden rises and pilot becomes noisy | Limit the supported phone matrix |
| Inference performance | Higher-end phones may be required | Publish minimum phone spec and test sustained load |
| Support load | OPEX can dominate small pilots | Use BYOD and a narrow use case first |
| Certification scope | Compliance cost can jump | Avoid radios, batteries, and charging complexity in v1 |

### Main risks

| Risk | Impact | Response |
|---|---|---|
| Overbuilding the dongle | BOM and support explode | Keep it USB audio first |
| Overpromising offline universality | Failed adoption and credibility loss | Publish exact supported language and phone list |
| Adding cloud fallback too early | Privacy and cost story weakens | Keep cloud out of v1 unless there is a separate product reason |
| Treating NRE as if it were unit cost | Bad pricing decisions | Separate NRE from per-unit economics in every deck |

## Sources

### Hardware pricing and component classes
- [STUSB4500 product page, STMicroelectronics](https://www.st.com/en/interfaces-and-transceivers/stusb4500.html)
- [STUSB4500QTR price listing, Mouser Europe](https://eu.mouser.com/ProductDetail/STMicroelectronics/STUSB4500QTR?qs=wUXugUrL1qyQbYMSzG1ujg%3D%3D)
- [STUSB4500QTR price listing, Newark](https://www.newark.com/stmicroelectronics/stusb4500qtr/usb-type-c-pd-ctrl-40-to-105deg/dp/84AC2944)
- [STM32U575CIT6 pricing, Mouser](https://www.mouser.com/en/ProductDetail/STMicroelectronics/STM32U575CIT6?qs=DRkmTr78QATSUD6hn9a2SA%3D%3D&srsltid=AfmBOorWLOXfFvF6bA97WP2VJvHgwqdn6juiOJV4meumTkccjQsU7VbV)
- [STM32U575/585 product family, STMicroelectronics](https://www.st.com/en/microcontrollers-microprocessors/stm32u575-585/products.html)
- [TLV320AIC3263 product page and price, Texas Instruments](https://www.ti.com/product/TLV320AIC3263)
- [SPH0655LM4H-1-8 price listing, DigiKey](https://www.digikey.com/en/products/detail/syntiant/SPH0655LM4H-1-8/11506911)
- [SPH0690LM4H-1 price listing, DigiKey](https://www.digikey.com/en/products/detail/syntiant/SPH0690LM4H-1/11506912)

### Android / USB / app stack
- [Android USB host and accessory overview](https://developer.android.com/develop/connectivity/usb)
- [USB accessory overview](https://developer.android.com/develop/connectivity/usb/accessory)
- [USB digital audio](https://source.android.com/docs/core/audio/usb)
- [Build audio accessories](https://source.android.com/docs/core/interaction/accessories/audio)
- [Foreground service types required in Android 14](https://developer.android.com/about/versions/14/changes/fgs-types-required)
- [LiteRT GPU delegate for Android](https://ai.google.dev/edge/litert/android/gpu)
- [LiteRT NPU delegate overview](https://ai.google.dev/edge/litert/android/npu/overview)
- [NNAPI NDK guide](https://developer.android.com/ndk/guides/neuralnetworks)

### Labor and distribution fees
- [Interpreters and Translators, BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/media-and-communication/interpreters-and-translators.htm)
- [Software Developers, BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)
- [Electrical Engineers, BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/architecture-and-engineering/electrical-and-electronics-engineers.htm)
- [Software Quality Assurance Analysts and Testers, BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/computer-and-information-technology/software-quality-assurance-analysts-and-testers.htm)
- [Google Play Console registration fee](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)

## Unresolved Questions

- Will the pilot ship BYOD only, or are loaner phones required?
- Is passive CC enough for the dongle, or does the electrical design need a real Type-C/PD controller?
- What is the minimum phone class that still gives acceptable sustained offline inference?
- Does the product need push-to-talk only, or always-on capture?
- Which certification path applies after the pilot: pre-scan only, or a formal compliance program?
