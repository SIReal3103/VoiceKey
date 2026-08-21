# Fresh Economics and Rubric Audit — VoiceKey

Audit date: 21 August 2026 (ICT)
Scope: proposal economics, commercial framing, rubric compliance, and the generated submission artifact. This is a review report only; no proposal, research, builder, or output file was changed.

## Code Review Summary

### Scope

- Reviewed: the 10-page challenge template; the 543-line proposal; the 340-line cost model; the 513-line research synthesis; both prior audits; `plan.md`; and `output/docx/voicekey-technical-proposal.docx`.
- Artifact check: the DOCX converts to a 26-page PDF and sampled pages 1, 7, 11–12, 18–21, and 26 render with embedded diagrams and no observed clipping. That temporary validation PDF is **not** a final output artifact.
- Git limitation: the repository has no commits, so `HEAD~1` does not exist. The review uses the specified documents rather than a diff baseline.
- Scout findings: followed the financial data flow from component block → assembled unit → spare/yield quantity → pilot cash → ROI, then traced the rubric requirements to the generated document. This exposed repeated cost buckets, inconsistent quantity bases, and formal-deliverable gaps not visible in any single table.

### Overall Assessment

The proposal is disciplined about evidence: competitor prices are date/region bounded, the product has no invented list price, and prototype/BOM/benefit figures are labelled planning estimates. The 239-word executive summary is within the template’s 200–300-word requirement, both diagrams are present, and the direct-pilot arithmetic itself is correct.

It is nevertheless **not ready for formal submission or for a procurement/ROI discussion**. The current economic model can double count pilot operating costs, the BOM rows do not have a single auditable inclusion boundary, and the high end of the pilot hardware reserve silently changes both yield and unit-cost assumptions. The template-required team/date/PDF fields also remain unresolved.

### Critical Issues

#### [BLOCKING — formal submission] Required filing fields and final PDF are absent

Evidence:

- The header says `VoiceKey (working project name)` rather than an actual team/project identification ([proposal lines 5–10](../voicekey-technical-proposal.md)).
- Every team member remains `Named submitting member (required)` ([lines 369–379](../voicekey-technical-proposal.md)); the timeline uses relative `T+` dates rather than the template’s requested target dates ([lines 381–390](../voicekey-technical-proposal.md)).
- The submission checklist truthfully marks identifiers and the demo pending ([lines 440–452](../voicekey-technical-proposal.md)).
- `output/` contains a DOCX only. The template’s checklist explicitly requires final export as PDF.

Impact: template checklist items 6–8 are not complete. The plan marks the DOCX/export phase complete, but that is not equivalent to a rubric-compliant final filing.

Required replacement data, supplied by the submitting team rather than invented in the document:

| Template field | Required final value |
|---|---|
| Team / Project Name | `<actual challenge team name> — VoiceKey` |
| Team Profile | Actual name, role, relevant expertise, and contribution for each actual member |
| Timeline target | Calendar target date derived from a declared start date, not `T+N weeks` |
| Demo status | A real evidence-demo URL, or `Not available at submission` only if the challenge permits no demo |
| Export status | Final proofread PDF saved beside the DOCX and checklist item 8 marked accurately |

Do not convert the existing `Pending` rows to `Done` until the underlying artifact/identity exists.

#### [BLOCKING for any pilot ROI claim] The formula can subtract pilot operating cost twice

The pilot-cash table includes packaging/shipping, field support/onboarding, and replacement/returns ([proposal lines 405–415](../voicekey-technical-proposal.md); [cost model lines 182–205](../research/hardware-software-cost-model.md)). The benefit formula then subtracts annual support, replacement, and distribution before subtracting the entire direct-pilot cash total again ([proposal lines 424–436](../voicekey-technical-proposal.md)). If the annual values are the same first-year/pilot-period costs, those costs are deducted twice.

The value side also has an unguarded overlap: avoided bilingual-assistance time and task time saved may be the same event counted under two labels.

Replace the ROI block with separate pilot-period and ongoing definitions:

```text
Pilot-period gross benefit =
  (avoided interpreter hours x site-approved hourly value)
  + (non-overlapping task hours saved x loaded site labour rate)

12-month direct-pilot ROI =
  (pilot-period gross benefit - direct pilot cash) / direct pilot cash

Ongoing annual net benefit after the pilot =
  (avoided interpreter hours x site-approved hourly value)
  + (non-overlapping task hours saved x loaded site labour rate)
  - (ongoing support + replacement + distribution not already included in direct pilot cash)
```

Add this rule immediately below it: **“Each observed avoided minute is assigned to one benefit bucket only. The measurement ledger identifies whether a cost is pilot-period cash, later recurring OPEX, NRE, or capital; no row may appear in two buckets.”**

### High Priority

#### [BLOCKING for a defensible BOM/procurement budget] Component rows are not reconcilable and risk double counting

The proposal labels `USB-C pigtail, ESD, CC/protection` as $1.50–$4.00, then includes `passives` again in `Button, LED, PCB, passives`, and includes the `pigtail` again in `Enclosure, pigtail, low-volume assembly/test` ([proposal lines 255–262](../voicekey-technical-proposal.md)). The cost model has the same ambiguity in a different form: `USB-C receptacle, ESD, passives`, a separate Type-C attach/PD choice, and `Enclosure / pigtail / strain relief` ([cost model lines 67–77](../research/hardware-software-cost-model.md)). The selected product, however, specifies a male plug on a pigtail, not a receptacle.

The row arithmetic demonstrates why this cannot be treated as an auditable BOM:

| Recalculation | Result | Consequence |
|---|---:|---|
| Proposal’s six displayed BOM blocks | $30.13–$69.06 | Contains a pigtail and generic/USB passives more than once by label |
| Cost model’s nine selected blocks | $28.83–$67.28 | Has a different Type-C architecture and passives allocation |
| Difference | +$1.30–$1.78 | Not a documented configuration or volume change |

Replace the current component block labels with an exclusive-boundary table before using any subtotal:

| Cost bucket | Must include exactly once | Must exclude explicitly |
|---|---|---|
| USB connection | One cable/plug/pigtail, CC implementation, ESD, and connection-specific passives | Enclosure, general PCB passives, a second pigtail |
| Type-C control option | **Either** passive USB-device CC **or** a named PD/controller configuration required by the schematic | The unselected option |
| Controls and PCB | Button, LED, PCB, and non-USB passives | CC/ESD/cable/pigtail already in USB connection |
| Enclosure, assembly, and test | Enclosure, strain relief, low-volume assembly, test, rework | Cable/pigtail if included above |

Then recompute the per-unit ranges from the selected configuration and quote quantity. Do not repair the table by merely renaming a line or by guessing a new total.

#### [HIGH] Pilot dongle cash uses a hybrid reserve model that is not stated

The five non-phone direct-cash rows add correctly to $2.75k–$9.20k for 10 users and $5.40k–$18.00k for 30 users. The dongle line does not reconcile to the stated spare/yield policy:

| Case | Stated hardware cash | Current explicit quantity/cost basis | Recalculated basis |
|---|---:|---|---:|
| 10 users | $0.50k–$0.90k | 11 usable units (10 + 10% spare), EVT $45–$70 | $495–$770 without yield; `ceil(11 / 0.85) = 13` units = $585–$910 with 15% yield loss |
| 30 users | $1.30k–$2.70k | 33 usable units (30 + 10% spare), pilot $38–$60 | $1,254–$1,980 without yield; `ceil(33 / 0.85) = 39` units = $1,482–$2,340 with 15% yield loss |

The published lower end uses no yield reserve; the high end approximately uses a 15% yield reserve **and** the more expensive EVT $70 unit price. That may be intentionally conservative, but it is not what the row says and cannot be approved as a traceable pilot estimate.

Replace the dongle row with this quantity table, then drive pilot cash from it:

| Pilot | Active users | Usable spares | Yield/rework assumption | Production units | Unit-cost source | Hardware cash |
|---|---:|---:|---:|---:|---|---:|
| 10-user | 10 | 1 | Select one documented policy | Formula shown | EVT quote/range | Formula shown |
| 30-user | 30 | 3 | Select one documented policy | Formula shown | Pilot quote/range | Formula shown |

If the 10–15% figure is a dollar rework contingency rather than manufacturing yield loss, say so and add it as a single named cash reserve instead of modifying quantity at only one end of the range.

#### [HIGH] Hardware section does not meet several literal template prompts

The current Section 5 comparison is a valid **product-architecture** decision (phone-only vs USB companion vs autonomous device), but it is not the template’s requested comparison of at least two SoC/compute-platform options. It also supplies accessory power only, not a complete phone-plus-accessory operational budget; and it gives no explicit environmental/IP-rating status.

These are scoring risks in the 25% Hardware & Device Concept criterion. They should be made honest and explicit rather than filled with invented TOPS, TDP, battery, or IP values.

Add immediately after the architecture-selection table:

| Compute reference | Pixel 8 / Tensor G3 (current reference) | `<selected Samsung exact model>` | `<selected Snapdragon exact model>` |
|---|---|---|---|
| Runtime path evaluated | CPU baseline; GPU only if measured | Actual selected path | Actual selected path |
| RAM / storage available to app | Published device value and measured free-memory criterion | Published device value and measured free-memory criterion | Published device value and measured free-memory criterion |
| NPU/TOPS decision relevance | Do not rely on unpublished or USB-accessible NPU capability | Same | Same |
| Evidence required | USB route, pack load, P50/P95, 30-minute thermal/battery result | Same | Same |
| Selection status | Reference only | Compatibility comparison pending | Compatibility comparison pending |

Add these two explicit rows to the power/form-factor material:

| Requirement | Current truthful position |
|---|---|
| Total system power / operational duration | Accessory target is `<350 mW average`. Phone display, audio, and inference drain are measured on the reference handset in the 30-minute soak; no standalone or 8-hour battery-life claim is made before that measurement. |
| Environmental rating | No IP, drop, temperature, or other environmental certification/rating is claimed for v1. Pilot use is limited to the validated indoor conditions until mechanical/environmental evidence exists. |

#### [HIGH] NRE scenarios are not tied to the displayed work breakdown

The six WBS rows total $64.7k–$144.6k, while the published scenario bands are $65k–$95k and $95k–$140k ([cost model lines 150–165](../research/hardware-software-cost-model.md)). The $4.6k high-end difference is small, but more importantly no scope/hours map explains which work is removed, reduced, or deferred in the lean versus first-release scenario. The compliance row also includes pre-scan/advisory while formal lab work is separately “quote-required”; that distinction needs a hard boundary.

Use this replacement note and scenario table:

> **NRE scenario rule.** The scenario totals are not additive to each other. Each scenario identifies included workstreams, approved hours, loaded rates, and excluded formal compliance work. At the displayed high inputs, the all-workstream total is $144.6k; publish it as $145k or reduce a named workstream before retaining a $140k cap.

| Scenario | Included workstreams/hours | Formal compliance lab | Total rule |
|---|---|---|---|
| Lean MVP | Named subset and hour caps that sum to $65k–$95k | Excluded; quote required | Sum only listed hours |
| First release | Named full/reduced workstream plan | Pre-scan included only if named; certification excluded unless quoted | Sum only listed hours |

### Medium Priority

#### [NONBLOCKING for the rubric; blocking for a real commercial quote] Pricing structure needs an owner/TCO boundary

The comparator treatment is appropriately cautious. Official pages still support the regular $449 Timekettle W4 Pro price and $389/$449 Vasco E1/V4 price anchors; the $381.65 Timekettle price is a date-bound campaign price. The proposal correctly says these are not equivalent BOMs and should not become a OneVoice list price.

What remains missing is the purchaser boundary. “Reuses the user’s Android phone” is a cost allocation, not a free input. A business customer needs to know whether a supported handset is customer-provided, loaned, or included; who owns device compatibility, MDM/admin, firmware support, warranty/RMA, tax/import/shipping, and return/refurbishment exposure.

Add this sentence to Section 3.5:

> **Comparator boundary.** Comparator retail prices are category anchors, not a OneVoice deployed-TCO or price comparison. They exclude or bundle different handset, connectivity, warranty, language-pack, support, tax, and channel terms. OneVoice’s base case assumes a customer-provided handset from the supported-device matrix; any loaner/managed-phone offer is separately scoped and priced.

Then add this gate table without inventing a retail price:

| Commercial decision | Evidence required before decision | Current status |
|---|---|---|
| Hardware-kit price | Two comparable CM quotes, selected BOM/configuration, MOQ/lead time, yield, packaging, freight, tax/channel assumptions | Open |
| Warranty and RMA | Warranty duration, failure/replacement reserve, return shipping, repair/refurbish owner, support response boundary | Open |
| BYOD vs managed phone | Exact supported handset policy, owner of handset/MDM/loss/damage/OEM warranty | Open |
| Deployment fee | Site acceptance scope, training, glossary/pack setup, travel/site-access assumptions | Open |
| Optional managed service | Included pack/update/governance/admin/support scope, billing unit, service level; confirm zero cloud-inference dependency | Open |

No OneVoice list price is required by this rubric. Do not add one merely to look commercially complete.

#### [MEDIUM] Pilot, NRE, and lab boundaries still use overlapping language

The documents say NRE pilot setup is separate from field-period support, which is correct, but both buckets use “training/support/onboarding” language. The phone/lab model also alternates between two phones and two-to-three phones while the technical matrix calls for Pixel, Samsung, and Snapdragon coverage.

Before approval, add a one-page financial boundary table that assigns every planned cost to exactly one owner/bucket and resolves the phone count:

| Cost | One allowed bucket | Decision still required |
|---|---|---|
| Pre-deployment build, scripts, pack setup, rehearsal | NRE | Named hours and exit date |
| On-site training, help desk, field replacement during pilot | Direct pilot cash | Pilot duration, travel/site-access inclusion, staffing cap |
| Engineering phones and permanent bench | Capital | Exact SKU/count; whether the Samsung is also the Snapdragon test device |
| Customer/loaner phones | Direct pilot cash only in loaner variant | Ownership, MDM, loss/damage, warranty route |
| Formal compliance, tax/import, insurance, legal/privacy review | Explicitly included with quote, site-funded, or excluded | No hidden support contingency |

#### [LOW] Cost-model executive summary and BLS developer anchor are stale/inconsistent

- The cost-model summary says EVT is “high-$30s to low-$60s,” but its own unit table—and the proposal—say $45–$70. Replace the summary with the three exact bands already displayed: EVT $45–$70; pilot $38–$60; 100-unit preproduction $30–$45.
- The software-developer row uses an older $132,270/$63.59 BLS value. The current BLS Occupational Outlook Handbook lists $133,080 annually for software developers in May 2024 (about $63.98/hour); QA $102,610, electrical engineer $111,910, and interpreter/translator $59,440/$28.58 remain consistent. This does not change the already broad $85–$115 planning rate, but update the source date/value or label the table as a historical snapshot.

### Rubric and Deliverable Matrix

| Template requirement | Status | Evidence / gap |
|---|---|---|
| Cover fields | **Fail final** | Working project name, not actual team name; no final PDF artifact |
| Executive summary (200–300 words) | Pass | 239 words; problem, solution, users, and differentiator are present |
| Problem, impact, users, constraints | Pass | Sections 2.1–2.4 substantively cover all requested areas |
| Business solution and differentiation | Pass with commercial gate | Clear category differentiation and evidence boundaries; no own-price/TCO decision, which is acceptable for rubric but not procurement |
| AI pipeline, modules, optimization, robustness | Pass as proposed technical design | Targets and validation gates are labelled rather than misrepresented as measurements |
| Hardware platform, form factor, BOM, power | **Partial / scoring risk** | Architecture comparison is present; literal compute-platform comparison, full operational power boundary, environmental status, and reconciled BOM are missing |
| System architecture and offline principles | Pass | Both diagrams and offline/failure principles are present in rendered DOCX |
| Team profile and timeline | **Fail final** | Placeholder roster and relative dates cannot satisfy the final template table |
| Submission checklist / demo / PDF | **Fail final** | Identifiers and demo are pending; PDF output is absent |

### Edge Cases Found by Scout

- The ROI looks conservative at a glance but can double subtract the same pilot support/replacement/distribution costs.
- A 10% spare pool is not the same thing as 10–15% manufacturing yield loss; using one at the low end and both at the high end obscures the actual unit count.
- “No dedicated battery” does not eliminate the rubric need to discuss operational energy/thermal behavior, because the host phone is the system battery and compute source.
- Reusing a customer phone does not eliminate the commercial cost; it moves it into compatibility, warranty, MDM, and loss/damage ownership.
- A temporary locally converted PDF validates DOCX renderability but does not meet the template’s final-PDF deliverable.

### Positive Observations

- The proposal does not convert public component listings, competitor prices, or BLS proxies into supplier quotes, list price, or promised ROI.
- The pilot totals, loaner increments, lab-capital arithmetic, and illustrative 30-user/$10,289 gross-value multiplication are mathematically correct when read in isolation.
- Existing wording already prevents a common failure: treating raw BOM as a sell price or treating the pilot as NRE amortization.

### Recommended Actions

1. Resolve the formal-submission blockers: actual team/project details, actual roster, dated timeline, final demo status, and a proofread PDF.
2. Replace the pilot ROI formulas and add a mutually exclusive benefit/cost ledger before sharing any ROI or payback statement.
3. Rebuild the BOM around exclusive component boundaries; select passive-CC versus controller architecture and quote the resulting configuration.
4. Publish a single spare/yield/quantity policy and recalculate hardware cash for the 10- and 30-user cases from it.
5. Map NRE scenario totals to named WBS hours and explicitly separate pre-scan from formal certification expense.
6. Add a real handset-compute comparison, host-device energy/thermal acceptance boundary, and explicit no-rating environmental statement to Section 5.
7. Keep price references as dated category anchors; add the BYOD/warranty/TCO gate table rather than fabricating a retail price.

### Metrics

- Arithmetic checks: direct-pilot totals, loaner increments, test-lab capital, and illustrative benefit multiplication verified; BOM, pilot hardware reserve, NRE scenario, and ROI layer require correction.
- Render check: DOCX converts to 26 PDF pages; sampled high-risk table/diagram/checklist pages were legible.
- Type coverage / test coverage / linting: N/A — this review covers proposal and cost artifacts, not application code.

### Unresolved Questions

1. What actual team name, roster, start date, and submission/demo details may be used in the final filing?
2. Is the 10–15% figure an expected yield loss, a rework cash reserve, or both—and which production unit price applies at each pilot size?
3. Which exact Samsung and Snapdragon devices will be acquired/borrowed, and is the Samsung the intended Snapdragon representative?
4. Will the pilot be BYOD-only, loaner-phone, or managed-device; who owns MDM, warranty, loss/damage, and support?
5. Which costs are included versus site-funded/excluded for travel, site access, tax/import, insurance, formal compliance, and legal/privacy review?

## Plan Follow-up Recommendation

`plan.md` correctly records the research and DOCX-generation work as complete, and the 26-page DOCX render claim is reproducible. Its phase-5 “complete” status should not be treated as final submission readiness until the blocking rows above are resolved and the final PDF exists. No plan state was changed by this audit.
