import { Button } from "@/components/ui/button";
import { Brain, Zap, Target } from "lucide-react";
import heroBrain from "@/assets/hero-brain.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBrain} alt="Neural network visualization" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-accent" />
            <span className="font-medium text-accent text-3xl">Science-Based Learning Protocol</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Master Learning with
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">Hugo is the AI-powered study planner you customise for your learning goals, built on scientific protocols. 
Optimise your focus, retention, and memory consolidation with proven neuroscience techniques.
          </span>
          </h1>

          {/* Description */}
          <p className="text-xl max-w-3xl mx-auto leading-relaxed md:text-3xl text-center font-serif text-popover-foreground bg-primary-foreground px-px py-px font-semibold">Hugo is the AI-powered study planner built on scientific protocols. Optimise your focus, retention, and memory consolidation with proven neuroscience techniques.</p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border shadow-card">
              <Brain className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">90-Min Focus Blocks</h3>
              <p className="text-sm text-muted-foreground">Optimized study sessions with gap effects for 10-20% faster learning</p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border shadow-card">
              <Target className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Active Recall Testing</h3>
              <p className="text-sm text-muted-foreground">Reduce forgetting by 50% with evidence-based retrieval practice</p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border shadow-card">
              <Zap className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">NSDR Consolidation</h3>
              <p className="text-sm text-muted-foreground">Accelerate memory formation with guided rest protocols</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="xl" className="min-w-[200px]">
              Start Learning Smarter
            </Button>
            <Button variant="outline" size="xl" className="min-w-[200px] bg-background/50 backdrop-blur-sm">
              View Science
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm">
            <div>
              <div className="text-3xl font-bold text-accent">50%</div>
              <div className="text-muted-foreground">Less Forgetting</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">90</div>
              <div className="text-muted-foreground">Minute Blocks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">200%</div>
              <div className="text-muted-foreground">Better Retention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
    </section>;
};
export default Hero;