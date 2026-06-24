import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

const phases = [
  { date: "Q3 2026", title: "EVT Prototype", desc: "Working hardware with ESP32-S3, supporting EN↔VI. Validate latency < 1.5s.", done: false },
  { date: "Q4 2026", title: "100-User Beta", desc: "Deploy in HCMC and Bangkok. Collect feedback from migrant workers and tourists.", done: false },
  { date: "Q1 2027", title: "First Production Run", desc: "5,000 units sold via Shopee, Lazada, TikTok Shop. Prove $10 price point.", done: false },
  { date: "Q2 2027", title: "B2B Pilots", desc: "3 hotel chains signed. Hospital and airport OEM trials. Series A ready.", done: false },
  { date: "2028", title: "ASEAN Scale", desc: "10 ASEAN languages. OEM manufacturing partnership. Enter India (Hindi↔EN).", done: false },
];

const RoadmapSection = () => (
  <section id="roadmap" className="py-24">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Roadmap</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          From idea to <span className="gradient-text">ASEAN infrastructure</span>
        </h2>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border md:left-1/2" />

        {phases.map((p, i) => (
          <motion.div key={p.date} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`relative flex gap-6 mb-8 md:mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>

            <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-1 z-10">
              {p.done
                ? <CheckCircle size={18} className="text-accent" />
                : <Circle size={18} className="text-primary/40" />}
            </div>

            <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">{p.date}</span>
              <h3 className="font-bold text-foreground mt-1 mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.5 }}
        className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
        {[
          { val: "$500K", label: "Seed ask" },
          { val: "5,000", label: "Units — first run" },
          { val: "$10M", label: "Revenue target Year 3" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="text-3xl font-bold text-primary">{s.val}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default RoadmapSection;
