import { Github, Mail } from "lucide-react";

const FooterSection = () => (
  <footer className="py-10 border-t border-border">
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <div className="font-display text-xl font-bold">
          <span className="gradient-text">Voice</span>
          <span className="text-foreground">Key</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">AI Translator Dongle — OneVoice AI Challenge 2026</p>
        <p className="text-xs text-muted-foreground mt-1">hiep.cbla5@gmail.com</p>
      </div>
      <div className="flex items-center gap-4">
        <a href="https://github.com/SIReal3103/VoiceKey" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[var(--shadow-indigo)] transition-shadow">
          <Github size={16} />
          GitHub
        </a>
        <a href="mailto:hiep.cbla5@gmail.com"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors">
          <Mail size={16} />
          Email
        </a>
      </div>
    </div>
    <div className="mt-8 text-center text-xs text-muted-foreground">
      © 2026 VoiceKey. Break every language barrier.
    </div>
  </footer>
);

export default FooterSection;
