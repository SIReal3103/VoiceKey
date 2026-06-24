import { motion } from "framer-motion";

const stats = [
  { value: "$56B", label: "Global translation market (2024)" },
  { value: "$8.1B", label: "Translation hardware by 2030" },
  { value: "680M", label: "People in Southeast Asia" },
];

const comparison = [
  { name: "VoiceKey", price: "$10", offline: true, sysAudio: true, noApp: true, hardware: true, market: "Mass / EM" },
  { name: "Google Translate", price: "Free (app)", offline: false, sysAudio: false, noApp: false, hardware: false, market: "Global" },
  { name: "Timekettle M3", price: "$99", offline: false, sysAudio: false, noApp: false, hardware: true, market: "Mid" },
  { name: "POCKETALK W3", price: "$299", offline: false, sysAudio: false, noApp: false, hardware: true, market: "Premium" },
];

const Check = ({ val }: { val: boolean }) => (
  <span className={val ? "text-accent font-bold" : "text-muted-foreground/40"}>
    {val ? "✓" : "✗"}
  </span>
);

const MarketSection = () => (
  <section id="market" className="py-24">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Market Opportunity</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Massive market, <span className="gradient-text">underserved segment</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-card border border-primary/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-primary text-glow mb-2">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Comparison table */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase tracking-wider font-mono"></th>
              {comparison.map((c) => (
                <th key={c.name} className={`py-3 px-4 text-sm font-bold text-center
                  ${c.name === "VoiceKey" ? "text-primary" : "text-muted-foreground"}`}>
                  {c.name}
                  {c.name === "VoiceKey" && <span className="block text-xs font-normal font-mono text-primary/70">← us</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Price", key: "price" as const, render: (v: string | boolean) => <span className={typeof v === "string" && v.startsWith("$1") ? "text-accent font-bold" : "text-muted-foreground"}>{v as string}</span> },
              { label: "Works offline", key: "offline" as const, render: (v: string | boolean) => <Check val={v as boolean} /> },
              { label: "Translates system audio", key: "sysAudio" as const, render: (v: string | boolean) => <Check val={v as boolean} /> },
              { label: "No app required", key: "noApp" as const, render: (v: string | boolean) => <Check val={v as boolean} /> },
              { label: "Hardware device", key: "hardware" as const, render: (v: string | boolean) => <Check val={v as boolean} /> },
              { label: "Target market", key: "market" as const, render: (v: string | boolean) => <span className="text-sm">{v as string}</span> },
            ].map((row) => (
              <tr key={row.label} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{row.label}</td>
                {comparison.map((c) => (
                  <td key={c.name} className={`py-3 px-4 text-center text-sm
                    ${c.name === "VoiceKey" ? "bg-primary/5" : ""}`}>
                    {row.render(c[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  </section>
);

export default MarketSection;
