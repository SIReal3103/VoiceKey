---
title: Fresh Evidence Audit
date: 2026-08-20
scope: VoiceKey proposal evidence audit
status: complete
---

# Fresh Evidence Audit

## Summary

The proposal is mostly evidence-disciplined. The paper citations for PhoST, PhoWhisper, PhoMT, and PhoAudiobook are properly scoped, and the demo/video section correctly avoids turning marketing clips into performance proof.

The main weaknesses are provenance labeling and retail-term precision: Timekettle’s W4 Pro page is internally contradictory about subscription/offline-pack terms, the TikTok item is retail context not a demo, and Pocketalk device/app evidence should be split more explicitly.

## Sources Consulted

- Academic: [PhoST](https://arxiv.org/abs/2208.04243) published 2022-08-08; [PhoWhisper](https://arxiv.org/abs/2406.02555) published 2024-03-27; [PhoMT](https://aclanthology.org/2021.emnlp-main.369/); [PhoAudiobook](https://aclanthology.org/2025.acl-short.81/)
- Official product/manual pages: [Timekettle W4 Pro](https://www.timekettle.co/products/w4-pro-ai-interpreter-earbuds-2026), [Timekettle FAQ](https://www.timekettle.co/pages/products-faqs), [Vasco E1](https://vasco-translator.com/translators/vasco-translator-e1), [Vasco V4](https://vasco-translator.com/translators/vasco-translator-v4), [Pocketalk S2 Plus](https://pocketalk.com/product/pocketalk-s2-plus-5-year-esim-white), [Pocketalk S2 manual](https://manual.pocketalk.com/pts2/en/), [Pocketalk Enterprise App manual](https://manual.pocketalk.com/eap/en/index.html)
- Video/demo pages: [Pocketalk setup video](https://www.youtube.com/watch?v=j0k1PBEf8-o), [Pocketalk Enterprise App activation](https://www.youtube.com/watch?v=_ajeJX0qqOE), [Vasco E1 official demo](https://www.youtube.com/watch?v=C92rY4D9dAk), [Vasco V4 independent review](https://www.youtube.com/watch?v=797k4hed77w)
- Capture date for this audit pass: 2026-08-20

## Findings

| Severity | Finding | Evidence | Impact | Exact correction |
|---|---|---|---|---|
| High | W4 Pro pricing/terms are dynamic and internally inconsistent on the same official page. The proposal currently compresses that into a single market snapshot at [line 121-125](/Users/macbook/Documents/ChatGPT/OneVoice/plans/260820-0945-offline-mobile-translator-proposal/voicekey-technical-proposal.md#L121). | The official W4 Pro page shows $381.65 sale / $449 regular, says "no subscription required", and also says offline packs are free for two coupon pairs, then $10 per pair or paid subscription; the same page also shows an optional $14.99/month iOS audio-video plan. URL: https://www.timekettle.co/products/w4-pro-ai-interpreter-earbuds-2026 | If a reader treats the current wording as a stable pricing claim, they will miss the paid-offline-pack path and the page-level contradiction. | Replace the line-121 sentence and row-125 text with: `US-store snapshot only: W4 Pro showed $381.65 sale / $449 regular, but the same page also mixed "no subscription required" messaging with paid offline-pack terms after two free coupon pairs and an optional $14.99/mo iOS plan. Treat this as a dated page snapshot, not a stable global price.` |
| Medium | The "Social-Demo Lessons" section mixes demo videos with retail/social context; the TikTok item is a retail listing, not a video proof. See [line 113-115](/Users/macbook/Documents/ChatGPT/OneVoice/plans/260820-0945-offline-mobile-translator-proposal/voicekey-technical-proposal.md#L113). | The proposal already says the social links are low-confidence and non-performance evidence, but the evidence pack still groups Douyin/Facebook/TikTok together while the later video list is separate. The TikTok Shop source is a retail page, not a reproducible demo. URL: https://shop.tiktok.com/us/pdp/timekettle-w4-pro-ai-translation-earbuds-133-languages-wireless-headphones/1729671968857166344 | Current wording blurs provenance. That weakens reviewability and makes it look like retail text and actual videos were judged with the same evidentiary weight. | Change the section label and lead sentence to: `Public social and retail links are useful for discovering product formats but not for substantiating performance. M6-M9 are social/retail context only; M11-M16 are the reproducible video demos reviewed here.` Also relabel the TikTok row as `retail listing`, not `video`. |
| Low | Pocketalk evidence should be split more explicitly between the S2 Plus handheld and the separate enterprise-app workflow. The current row at [line 128](/Users/macbook/Documents/ChatGPT/OneVoice/plans/260820-0945-offline-mobile-translator-proposal/voicekey-technical-proposal.md#L128) is directionally correct but underspecified. | The Pocketalk S2 Plus product page explicitly states `Can I Use Pocketalk Offline? No. An internet connection is required...` and the manual shows separate network/history/Bluetooth controls. The Pocketalk Enterprise App has its own manual and managed-device flow. URLs: https://pocketalk.com/product/pocketalk-s2-plus-5-year-esim-white, https://manual.pocketalk.com/pts2/en/, https://manual.pocketalk.com/eap/en/index.html | Without the split, readers can misread `Pocketalk handheld / enterprise app` as one combined product family with one pricing model. That is a provenance gap, not a factual error. | Replace the row text with: `Pocketalk S2 Plus handheld: $349.95, complimentary 5-year data, and no offline mode on the public product page. Pocketalk Enterprise App / Ventana: separate managed-deployment docs, no public price.` |

## Ranked Recommendation

1. Fix the W4 Pro pricing sentence first. It is the only place where the proposal can be read as overstating a stable retail term.
2. Split social-retail context from video evidence. That improves provenance immediately with no product-scope change.
3. Clarify Pocketalk device vs app evidence. This is a cleanup item, but it helps avoid family-level ambiguity.

## Unresolved Questions

- None blocking. I did not find a factual problem in the PhoST, PhoWhisper, PhoMT, or PhoAudiobook citations themselves.
