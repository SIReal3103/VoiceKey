import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <Zap size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground font-mono">OneVoice AI Challenge 2026</span>
          </div>

          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-3 font-light">
            Break every language barrier
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-4">
            <span className="gradient-text text-glow">Voice</span>
            <span className="text-foreground">Key</span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-3 font-light leading-snug">
            Real-Time AI Translation — Mic & Any App Audio
          </p>
          <p className="text-base md:text-lg text-accent font-semibold mb-10 font-mono">
            Offline · No App · Under $10 · USB-C Dongle
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-16 mb-12">
            {[
              { value: "$10", label: "Hardware cost" },
              { value: "<1.5s", label: "Translation latency" },
              { value: "680M", label: "People in Southeast Asia" },
            ].map((stat) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary text-glow">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#solution"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:shadow-[var(--shadow-indigo)] transition-all">
              See How It Works
            </a>
            <a href="https://github.com/SIReal3103/VoiceKey" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg border border-primary/40 text-primary font-semibold text-lg hover:bg-primary/10 transition-all">
              View on GitHub
            </a>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ArrowDown className="text-primary/40" size={28} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
