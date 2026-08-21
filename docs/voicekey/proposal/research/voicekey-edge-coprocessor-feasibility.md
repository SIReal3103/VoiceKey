# VoiceKey Edge Coprocessor Feasibility

## Decision Summary

VoiceKey is feasible as a phone-attached offline translation system. A simple USB peripheral is not a credible place to run the full speech recognition, translation, text-to-speech, and language-model stack in the first release.

The recommended product path is:

1. Prove real-time English-Vietnamese translation on Android with local models on the phone.
2. Add a USB-C audio and interaction companion only if it improves real use over the phone microphone.
3. Build a separate Edge-compute module only if testing shows that phone compute, memory, privacy, or consistency is not sufficient.

This keeps the first product focused on translation. Summaries, order drafts, and product suggestions are later optional features, not reasons to weaken the translation plan.

## Why a USB Storage Device Is Not Enough

Storing model files on USB can help deploy a large language pack without a network. It does not improve inference speed, reduce phone heat, or make the conversation easier to use. The app must still be installed, load the model, and run the model on the phone.

A USB device earns its cost only when it adds one or more of the following:

- Better audio capture in the real target environment
- A physical control or recording state that users can trust
- A controlled local compute runtime across supported phones
- A signed hardware identity or controlled model-pack deployment process

The first two can fit in a small companion. The third requires a real embedded computer.

## Hardware Classes

| Hardware class | Can it run the full local AI stack? | Product fit |
|---|---|---|
| Storage stick or basic USB microcontroller | No | Useful only for offline pack transfer or simple audio control |
| USB audio companion | No | Good for microphone, button, LED, and local audio interaction |
| Embedded edge system-on-module | Possibly, after a measured model and thermal test | A future Edge product, not a simple thumb-sized accessory |

An Edge-compute module needs an application processor, AI accelerator, RAM, flash storage, firmware, power control, and thermal design. Qualcomm documents the QCS6490 with up to 12 dense TOPS and up to 16 GB LPDDR5. MediaTek documents the Genio 1200 with 4.8 TOPS and support for up to 16 GB LP4X. These are examples of a hardware class. They do not prove that any specific speech or translation model will run fast enough for VoiceKey. [Qualcomm QCS6490](https://www.qualcomm.com/internet-of-things/products/q6-series/qcs6490) [MediaTek Genio 1200](https://www.mediatek.com/products/iot/genio-iot/genio-1200)

## Translation Stack

The first real-time pipeline should stay short and observable:

```text
Microphone
  -> speech detection
  -> partial speech recognition
  -> final speech recognition after a pause
  -> English-Vietnamese translation
  -> bilingual text
  -> optional spoken playback
```

PhoST is a useful English-Vietnamese research anchor. It contains 508 hours of speech translation data and reported that a cascaded speech-recognition-plus-translation baseline outperformed an end-to-end baseline in that study. [PhoST](https://arxiv.org/abs/2208.04243)

PhoWhisper and PhoMT are useful for Vietnamese speech and translation evaluation. They are not product benchmarks and do not settle commercial rights for a shipping model. [PhoWhisper](https://arxiv.org/abs/2406.02555) [PhoMT](https://aclanthology.org/2021.emnlp-main.369/)

Whisper is a strong research baseline but its model card says the released models are not real-time out of the box. The team must therefore measure the selected model, quantization, runtime, phone, and language pack instead of treating a repository as a product-performance result. [Whisper model card](https://github.com/openai/whisper/blob/main/model-card.md)

## Android and iOS

Android is the practical first platform for a custom wired companion. Android documents USB host and accessory communication, USB audio, and microphone capture APIs. Actual device support still needs a phone matrix and runtime route verification. [Android USB](https://developer.android.com/develop/connectivity/usb) [Android USB audio](https://source.android.com/docs/core/audio/usb) [Android AudioRecord](https://developer.android.com/reference/android/media/AudioRecord)

iOS can first be evaluated as a phone-only app using the built-in microphone and speaker through [AVAudioSession](https://developer.apple.com/documentation/avfaudio/avaudiosession/category-swift.struct/playandrecord). Apple's [AccessoryAccess USB entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.accessory-access.usb?changes=__1) is for macOS USB access, not an iOS USB-accessory path. A custom wired iPhone accessory is out of scope until it is demonstrated on a current Apple-supported iOS framework and hardware.

The recommended plan is Android first. iOS begins as a phone-only app unless an Apple-supported accessory path is demonstrated.

## Go and No-Go Gates

### Go for a USB audio companion only if

- It shows a useful measured improvement over the phone microphone in the target noise condition.
- It stays connected through attach, detach, reconnect, screen lock, app restart, and a 30-minute session.
- The app shows the actual audio route and a visible fallback when the companion is unavailable.

### Go for an Edge-compute module only if

- A controlled power path and thermal design pass a 30-minute active session.
- The selected functions run faster or more consistently than the phone-only baseline.
- The module has enough memory and storage for the selected models without unstable behavior.
- Firmware and model packs are signed and their licences are cleared.
- The hardware quote supports a credible pilot cost.

### Do not proceed with Edge compute if

- The expected benefit is only model storage.
- The phone can already meet the translation target at lower cost and lower risk.
- The module overheats, browns out, disconnects, or creates a worse user experience.
- The project depends on untested iPhone custom-USB support.

## Safety Boundary for Future AI Features

Translation is the core value. A summary, order draft, or recommendation can only be considered after the transcript is reliable enough for users to review.

Any future business action must be a draft that a human checks and confirms. The system must not invent a price, SKU, tax value, stock level, or invoice number. This preserves the human oversight expected for AI-supported decisions. [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

## Sources

- [Android USB host overview](https://developer.android.com/develop/connectivity/usb/host)
- [Android USB host and accessory overview](https://developer.android.com/develop/connectivity/usb)
- [Android USB digital audio](https://source.android.com/docs/core/audio/usb)
- [Android microphone foreground service requirements](https://developer.android.com/about/versions/14/changes/fgs-types-required)
- [Whisper model card](https://github.com/openai/whisper/blob/main/model-card.md)
- [OPUS-MT model information](https://github.com/Helsinki-NLP/OPUS-MT-train/blob/master/models/README.md)
- [NLLB-200 model card](https://huggingface.co/facebook/nllb-200-distilled-600M)
- [sherpa-onnx documentation](https://k2-fsa.github.io/sherpa/onnx/)
- [Qualcomm QCS6490](https://www.qualcomm.com/internet-of-things/products/q6-series/qcs6490)
- [MediaTek Genio 1200](https://www.mediatek.com/products/iot/genio-iot/genio-1200)
