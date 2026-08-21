# VoiceKey Fresh Architecture Feasibility Audit

**Scope:** technical feasibility and engineering completeness of the USB-C Android offline translator proposal  
**Primary sources used:** Android Developers, source.android.com, USB-IF, official model/repo pages

## Verdict

The core architecture is sound: Android as host/compute, a USB Audio Class peripheral for capture, and local speech/translation execution on the phone. The proposal is also correctly cautious about not claiming direct phone-NPU access over USB.

The remaining issues are not broad feasibility failures. They are a small number of concrete shipping risks and missing verification gates. One item is a true blocker for commercial credibility: the proposed main MT path uses NLLB-200, whose official model card says it is research-only and not released for production deployment.

## Ranked Findings

### High 1. The primary MT candidate is not production-safe as written

**Where:** [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L302-L304) and [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L303-L305)

**Issue:** The software stack names `Candidate NLLB native runner; OPUS-MT fallback` as the MT layer, but the official NLLB-200 distilled 600M model card says:
- License: `CC-BY-NC`
- primary intended use: research
- out-of-scope: production deployment

That makes NLLB a poor shipping default for a commercial/offline product unless the team secures explicit commercial rights or replaces it.

**Evidence:**
- NLLB-200 distilled 600M model card: research-only / not released for production deployment, license `CC-BY-NC` ([Hugging Face model card](https://huggingface.co/facebook/nllb-200-distilled-600M))
- OPUS-MT EN-VI model card: `apache-2.0` and EN-VI benchmarked ([Hugging Face model card](https://huggingface.co/Helsinki-NLP/opus-mt-en-vi))
- Whisper / whisper.cpp / Piper / sherpa-onnx are permissively licensed and not the problem here ([GitHub Whisper](https://github.com/openai/whisper), [whisper.cpp](https://github.com/ggml-org/whisper.cpp), [Piper](https://github.com/rhasspy/piper), [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx))

**Why it matters:** A research-only MT core undermines the proposal’s strongest promise: offline runtime that can ship to customers. It also creates a legal/commercial ambiguity the proposal otherwise avoids.

**Exact remediation wording to add/replace:**

```markdown
| MT | OPUS-MT EN-VI / VI-EN as the shipping baseline; NLLB-200 distilled 600M only as a research/evaluation pack pending explicit commercial-license clearance | EN-VI translation and future routing |
```

Add this note immediately below the table:

```markdown
NLLB-200 is research-only unless commercial rights are cleared. It must not be treated as the default production MT path.
```

### Medium 2. Android microphone capture lifecycle is under-specified

**Where:** [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L295-L317)

**Issue:** The stack names Android 13+, USB host, and the audio route, but it does not spell out the microphone foreground-service requirements for live capture or the background-start failure mode. Current Android docs require:
- `android:foregroundServiceType="microphone"`
- `FOREGROUND_SERVICE_MICROPHONE`
- `RECORD_AUDIO`
- no background start unless the app satisfies an allowed exception

If these are missing, `startForeground()` can throw and the capture path can fail on current Android targets.

**Evidence:**
- Android 14 foreground-service types and microphone requirements ([Android Developers](https://developer.android.com/about/versions/14/changes/fgs-types-required))
- Foreground-service microphone rules and while-in-use restriction ([Android Developers service types](https://developer.android.com/develop/background-work/services/fgs/service-types))
- USB host capture is done through the Android audio stack, not a custom driver ([Android USB host](https://developer.android.com/develop/connectivity/usb), [AOSP USB digital audio](https://source.android.com/docs/core/audio/usb))

**Why it matters:** This is a user-visible failure mode, not a cosmetic omission. It affects the ability to keep live capture running when the screen locks or the app is backgrounded.

**Exact remediation wording to add in Section 6.2:**

```markdown
- Live capture must run under a foreground service declared with `android:foregroundServiceType="microphone"`.
- The manifest must declare `FOREGROUND_SERVICE_MICROPHONE`, and the app must request `RECORD_AUDIO` before calling `startForeground()`.
- If the service cannot start from the current app state, fail closed and show an explicit "Microphone permission/service missing" state rather than silently dropping capture.
```

### Medium 3. The phone-compatibility plan is too loose for USB audio

**Where:** [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L225-L229), [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L270-L279), and [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L383-L390)

**Issue:** The proposal names a Pixel 8 reference handset and says a supported-phone matrix is required, but it does not yet define the actual pass/fail matrix for USB audio attach, route stability, reconnect behavior, or latency across the three intended device classes.

**Evidence:**
- Android host mode powers the bus and enumerates peripherals, but support varies by device ([Android USB host](https://developer.android.com/develop/connectivity/usb/host))
- USB audio over host mode is the recommended path; accessory mode is limited ([AOSP build audio accessories](https://source.android.com/docs/core/interaction/accessories/audio))
- CTS Verifier USB audio tests use loopback to measure latency and detect USB data-path issues ([CTS USB audio tests](https://source.android.com/docs/compatibility/cts/usb-audio))

**Why it matters:** Without a device matrix, “Android support” is still a marketing phrase. The proposal correctly avoids a universal claim, but it does not yet define the acceptance gate that makes the claim trustworthy.

**Exact remediation wording to add in Section 5.4 or 7.2:**

```markdown
Supported-phone validation is a release gate. Each candidate phone class must pass USB attach, detach, reattach, screen-lock, app-restart, Airplane Mode, permission-revoke, and 30-minute soak tests with the shipping dongle.

At minimum, run USB audio loopback/latency verification on one Pixel-class device, one Samsung device, and one Snapdragon mid/high-tier device before broad Android claims are made.
```

### Medium 4. The power story needs a hard current/brownout gate

**Where:** [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L233-L243) and [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L283-L287)

**Issue:** The proposal says the accessory stays in a low-power envelope and does not assume high USB-C power, which is correct. But it does not define a measured current ceiling or the failure mode if a host cannot sustain the load.

**Evidence:**
- Android host mode means the phone is the bus power source ([Android USB host](https://developer.android.com/develop/connectivity/usb/host))
- USB-C/PD exists specifically to support higher-power use cases, but that does not imply every phone will be a stable high-power source ([USB-IF Type-C](https://www.usb.org/usb-type-cr-cable-and-connector-specification), [USB-IF PD](https://www.usb.org/usb-charger-pd))

**Why it matters:** A low-power accessory can still fail in the field if it browns out, re-enumerates, or silently changes routing under load. That is a product reliability problem, not a lab-only issue.

**Exact remediation wording to add in Section 5.2/5.5:**

```markdown
The accessory must publish a measured peak and steady-state current profile for each supported phone class. Any brownout, repeated USB re-enumeration, or USB-audio route loss during the soak test is a release failure.
```

### Medium 5. Privacy and update integrity need explicit fail-closed gates

**Where:** [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L305-L317) and [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L349-L357)

**Issue:** The proposal already says packs are signed, history is opt-in, and runtime traffic is offline. What is missing is a concrete install-time and launch-time verification rule:
- what exact hash/signature must match
- when a pack is rejected
- what data is erased by Clear All
- how the app behaves if a pack is tampered with or downgraded

**Evidence:**
- The proposal’s own signed-pack language implies this control surface ([voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L305-L317), [voicekey-technical-proposal.md](../voicekey-technical-proposal.md#L349-L357))
- Android and USB docs make clear that the app is the policy boundary, not the dongle ([Android USB host](https://developer.android.com/develop/connectivity/usb/host), [AOSP USB digital audio](https://source.android.com/docs/core/audio/usb))

**Why it matters:** “Signed” is not enough unless the rejection path and the erased-data contract are spelled out. Otherwise the privacy claim is hard to audit.

**Exact remediation wording to add in Section 6.4/6.5:**

```markdown
- Each language pack must verify both signature and hash before install and again before first use after an update.
- Any verification failure must block model loading and show a user-visible offline error.
- Clear All must delete transcripts, raw-audio buffers, caches, and any derived indexes stored in app-private storage.
- Firmware and pack rollback must be explicit and tested.
```

## Optional Enhancements

These are not blockers, but they would improve auditability and demo quality.

### Low 6. Split latency into cold-start and warm-start measurements

The proposal already tracks P50/P95 end-to-end latency, which is good. Add a separate breakdown for:
- model load time
- first-turn cold start
- steady-state warm start
- text-to-audio latency when TTS is enabled

This makes thermal and caching regressions easier to diagnose.

**Suggested wording:**

```markdown
Report latency as cold-start load time, warm-start endpoint-to-text time, and optional text-to-audio time separately. Do not collapse them into a single E2E figure.
```

### Low 7. Make TTS pack licensing explicit per voice

`Piper` itself is permissive, but voice packs are not automatically equivalent. The proposal should require a per-voice license manifest before any voice is shippable.

**Suggested wording:**

```markdown
Each TTS voice pack must carry source, license, and redistribution status. If that data is missing, the voice remains evaluation-only.
```

## Overall Assessment

The proposal is already technically disciplined where it matters most:
- Android host mode and UAC2 are the right fit
- local inference is a coherent product choice
- the offline boundary is stated clearly
- the hardware BOM is correctly kept simple

What remains is mostly completion work:
- replace the MT default with a production-safe model path
- add the missing Android microphone lifecycle rules
- define the phone-compatibility and USB-audio acceptance matrix
- formalize power, integrity, and wipe/rollback tests

## Limitations

- I did not re-audit the DOCX builder or the generated artifact.
- I did not run a device-level Android/USB test on physical phones.
- I did not verify every cited paper or dataset claim in the proposal, only the claims that affect feasibility and shipping risk.

## Sources

- [Android USB host overview](https://developer.android.com/develop/connectivity/usb/host)
- [Android USB and accessory overview](https://developer.android.com/develop/connectivity/usb)
- [Android foreground service types](https://developer.android.com/about/versions/14/changes/fgs-types-required)
- [Android foreground service types details](https://developer.android.com/develop/background-work/services/fgs/service-types)
- [AOSP USB digital audio](https://source.android.com/docs/core/audio/usb)
- [AOSP build audio accessories](https://source.android.com/docs/core/interaction/accessories/audio)
- [CTS Verifier USB audio tests](https://source.android.com/docs/compatibility/cts/usb-audio)
- [USB Type-C specification landing page](https://www.usb.org/usb-type-cr-cable-and-connector-specification)
- [USB Power Delivery landing page](https://www.usb.org/usb-charger-pd)
- [NLLB-200 distilled 600M model card](https://huggingface.co/facebook/nllb-200-distilled-600M)
- [OPUS-MT EN-VI model card](https://huggingface.co/Helsinki-NLP/opus-mt-en-vi)
- [Whisper repository](https://github.com/openai/whisper)
- [whisper.cpp repository](https://github.com/ggml-org/whisper.cpp)
- [Piper repository](https://github.com/rhasspy/piper)
- [sherpa-onnx repository](https://github.com/k2-fsa/sherpa-onnx)
