import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#tech" },
  { label: "Market", href: "#market" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Roadmap", href: "#roadmap" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <a href="#" className="font-display font-bold leading-tight">
          <span className="text-xl gradient-text text-glow">VoiceKey</span>
          <span className="block text-xs text-muted-foreground font-mono">AI Translator Dongle</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
          <a href="https://github.com/SIReal3103/VoiceKey" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[var(--shadow-indigo)] transition-shadow">
            <Github size={16} />
            GitHub
          </a>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-glass overflow-hidden">
            <div className="flex flex-col gap-3 px-6 pb-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="https://github.com/SIReal3103/VoiceKey" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm mt-2">
                <Github size={16} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
