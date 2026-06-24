import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const problems = [
  { name: "Google Translate", issues: ["Needs internet", "No hands-free", "Slow interface"] },
  { name: "AI Earbuds (AirPods, Pixel Buds)", issues: ["$200–$400", "Still needs internet", "Bluetooth lag"] },
  { name: "Dedicated translators", issues: ["$80–$299", "Single-purpose", "Clunky"] },
  { name: "Human interpreters", issues: ["$50–$150/hr", "Not scalable", "Unavailable 24/7"] },
];

const ProblemSection = () => (
  <section id="problem" className="py-24 bg-card/30">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">The Problem</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">1.5 billion people</span> hit a language wall every day
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Every existing solution is either too expensive, requires internet, or can't translate audio from apps. Nobody solved the mass-market offline case.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-card border border-border rounded-xl p-6 card-glow transition-all">
            <h3 className="font-semibold text-foreground mb-4 text-sm">{p.name}</h3>
            <ul className="space-y-2">
              {p.issues.map((issue) => (
                <li key={issue} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <XCircle size={14} className="text-destructive flex-shrink-0" />
                  {issue}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.5 }} className="mt-12 p-6 rounded-xl border border-primary/20 bg-primary/5 text-center">
        <p className="text-muted-foreground text-lg italic">
          "No affordable, offline, hands-free translation hardware exists for the 4B+ people in emerging markets."
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
