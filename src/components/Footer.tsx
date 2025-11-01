import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">NeuroPlan</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Science-based AI study planner built on cutting-edge neuroscience research. 
              Optimize your learning with proven protocols from Andrew Huberman and leading researchers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Research</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Neuroplasticity Protocols</li>
              <li>Spaced Repetition</li>
              <li>Active Recall Studies</li>
              <li>Sleep & Learning</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>90-Min Focus Blocks</li>
              <li>NSDR Sessions</li>
              <li>Progress Analytics</li>
              <li>Habit Tracking</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 NeuroPlan. Built with science-backed learning protocols.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Research</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
