import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[hsl(230,25%,6%)]">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-7 h-7 text-[hsl(270,80%,65%)]" />
              <span className="font-bold text-lg text-white">Alan.ai</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              Your AI-powered personal study assistant. Plan deep work sessions, 
              generate flashcards, connect your calendar, and learn smarter with 
              neuroscience-backed protocols.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Science</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Spaced Repetition</li>
              <li>Active Recall</li>
              <li>90-Min Focus Blocks</li>
              <li>NSDR Consolidation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>AI Flashcard Generation</li>
              <li>Deep Work Planner</li>
              <li>Calendar Integration</li>
              <li>Progress Analytics</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">© 2026 Alan.ai. Built with science-backed learning protocols.

          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Research</a>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;