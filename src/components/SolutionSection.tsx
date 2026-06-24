import { motion } from "framer-motion";
import { Mic, Radio, DollarSign, WifiOff } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Mic Mode",
    desc: "Translate live two-way conversations in real-time. Speak — hear translated reply through the speaker instantly.",
    color: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
  },
  {
    icon: Radio,
    title: "System Audio Mode ✦",
    desc: "Translates audio from any app in real-time — YouTube, Zoom, phone calls, movies, podcasts. No app changes needed.",
    color: "text-secondary",
    border: "border-secondary/30",
    bg: "bg-secondary/5",
    highlight: true,
  },
  {
    icon: WifiOff,
    title: "Fully Offline",
    desc: "All AI runs on embedded NPU on the dongle. Works anywhere — no internet, no subscription, no data.",
    color: "text-accent",
    border: "border-accent/20",
    bg: "bg-accent/5",
  },
  {
    icon: DollarSign,
    title: "Under $10",
    desc: "10× cheaper than any existing hardware translator. Designed for the mass market in Southeast Asia.",
    color: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
  },
];

const SolutionSection = () => (
  <section id="solution" className="py-24">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">The Solution</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">VoiceKey</span> — Plug. Speak. Understand.
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A USB-C dongle the size of a thumb drive. Plug into any smartphone. Translate conversations <em>and</em> any app audio — offline, instantly.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-xl p-6 border ${f.border} ${f.bg} card-glow transition-all ${f.highlight ? "ring-1 ring-secondary/30" : ""}`}>
              <Icon size={28} className={`${f.color} mb-4`} />
              <h3 className={`font-bold text-base mb-2 ${f.highlight ? f.color : "text-foreground"}`}>{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 flex flex-wrap justify-center gap-4">
        {["USB-C OTG", "Android + iPhone 15+", "No app install", "Open-source AI stack", "< 1.5s latency"].map((tag) => (
          <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground font-mono">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SolutionSection;
