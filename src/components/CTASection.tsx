import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

const CTASection = () => (
  <section className="py-24 bg-card/30">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-6">Get Involved</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Language should never be a barrier<br />
          to <span className="gradient-text">healthcare, opportunity,</span><br />
          or human connection.
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
          VoiceKey — the USB-C port on every hotel phone, hospital kiosk, and border checkpoint in Southeast Asia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="https://github.com/SIReal3103/VoiceKey" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:shadow-[var(--shadow-indigo)] transition-all">
            <Github size={20} />
            Star on GitHub
          </a>
          <a href="mailto:hiep.cbla5@gmail.com"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary/40 text-primary font-semibold text-lg hover:bg-primary/10 transition-all">
            <Mail size={20} />
            Contact Us
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {["680M people in SEA", "$10 device", "Offline · No subscription", "Open-source AI"].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground font-mono">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
