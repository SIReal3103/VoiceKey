import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const micFlow = [
  { label: "MEMS Mic", sub: "Capture voice" },
  { label: "VAD", sub: "Detect speech" },
  { label: "Whisper INT8", sub: "Speech → Text" },
  { label: "NLLB-200", sub: "Translate" },
  { label: "Piper TTS", sub: "Text → Speech" },
  { label: "Speaker", sub: "Output" },
];

const sysFlow = [
  { label: "USB Audio Codec", sub: "Tap app audio" },
  { label: "Chunk VAD", sub: "2s windows" },
  { label: "Whisper INT8", sub: "Speech → Text" },
  { label: "NLLB-200", sub: "Translate" },
  { label: "TTS Mix-in", sub: "Inject translation" },
  { label: "Headphones", sub: "Hear in your language" },
];

const FlowStep = ({ label, sub, accent }: { label: string; sub: string; accent?: boolean }) => (
  <div className={`flex-1 min-w-0 rounded-lg px-3 py-3 border text-center
    ${accent
      ? "border-secondary/40 bg-secondary/8 text-secondary"
      : "border-primary/30 bg-primary/8 text-primary"}`}>
    <div className="font-semibold text-xs truncate">{label}</div>
    <div className="text-[10px] mt-1 opacity-60">{sub}</div>
  </div>
);

const HowItWorksSection = () => (
  <section id="tech" className="py-24 bg-card/30">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Technical Approach</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Two modes. One dongle. <span className="gradient-text">All on-device.</span>
        </h2>
      </motion.div>

      <div className="space-y-10">
        {/* Mic mode */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
            Mode 1 — Mic Translation
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {micFlow.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <FlowStep {...s} />
                {i < micFlow.length - 1 && <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* System audio mode */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="bg-card border border-secondary/20 rounded-2xl p-6 md:p-8 ring-1 ring-secondary/10">
          <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">
            Mode 2 — System Audio Translation ✦ (YouTube · Zoom · Phone Calls · Any App)
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {sysFlow.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <FlowStep {...s} accent />
                {i < sysFlow.length - 1 && <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Specs */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.3 }}
        className="mt-10 grid sm:grid-cols-3 gap-6">
        {[
          { label: "Chip", value: "ESP32-S3 / ARM Cortex-M55 + Ethos-U55 NPU" },
          { label: "Latency (Mic)", value: "< 1.5s end-to-end" },
          { label: "Latency (System Audio)", value: "< 2s (chunk pipeline)" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-2">{s.label}</div>
            <div className="text-primary font-bold text-sm">{s.value}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
