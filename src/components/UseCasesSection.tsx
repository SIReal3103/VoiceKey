import { motion } from "framer-motion";
import { Hotel, Heart, GraduationCap, ShoppingCart, Video, Users } from "lucide-react";

const cases = [
  { icon: Hotel, title: "Tourism & Hospitality", desc: "Translate hotel TV, foreign tour guides, local radio in real-time. Plug in and explore anywhere." },
  { icon: Heart, title: "Healthcare", desc: "Doctors translate consultations and medical instruction videos for international patients instantly." },
  { icon: GraduationCap, title: "Education", desc: "Students translate YouTube lectures, online courses, and tutorials in any language without changing apps." },
  { icon: ShoppingCart, title: "Cross-Border Trade", desc: "Vietnam–China, Thailand–Myanmar border traders communicate in real-time without an interpreter." },
  { icon: Video, title: "Remote Work & Meetings", desc: "Translate Zoom and Teams calls without a subscription service. Works entirely offline." },
  { icon: Users, title: "Labor Migration", desc: "Migrant workers translate government announcements, workplace safety audio, and daily conversations." },
];

const UseCasesSection = () => (
  <section id="usecases" className="py-24 bg-card/30">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Use Cases</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Every place where <span className="gradient-text">language blocks people</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          System audio mode is the game-changer — it translates what any app says, not just what you say.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-6 card-glow transition-all">
              <Icon size={24} className="text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
