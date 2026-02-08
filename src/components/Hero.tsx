import { Button } from "@/components/ui/button";
import { Brain, Zap, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(230,25%,8%)]">
      {/* Animated Aurora Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Blob 1 - Purple/Blue */}
        <div
          className="absolute w-[800px] h-[600px] rounded-full opacity-60 blur-[120px]"
          style={{
            background: "radial-gradient(circle, hsl(270 80% 50% / 0.8), hsl(237 68% 35% / 0.4), transparent 70%)",
            top: "-10%",
            left: "10%",
            animation: "aurora-drift-1 12s ease-in-out infinite",
          }}
        />
        {/* Blob 2 - Pink/Magenta */}
        <div
          className="absolute w-[700px] h-[500px] rounded-full opacity-50 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(310 70% 55% / 0.8), hsl(330 60% 45% / 0.3), transparent 70%)",
            top: "5%",
            right: "5%",
            animation: "aurora-drift-2 15s ease-in-out infinite",
          }}
        />
        {/* Blob 3 - Cyan/Teal */}
        <div
          className="absolute w-[600px] h-[500px] rounded-full opacity-40 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(186 75% 50% / 0.7), hsl(200 60% 40% / 0.3), transparent 70%)",
            top: "-5%",
            left: "40%",
            animation: "aurora-drift-3 10s ease-in-out infinite",
          }}
        />
        {/* Blob 4 - Soft warm accent */}
        <div
          className="absolute w-[500px] h-[400px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: "radial-gradient(circle, hsl(280 60% 60% / 0.6), hsl(320 50% 50% / 0.2), transparent 70%)",
            bottom: "20%",
            left: "20%",
            animation: "aurora-drift-2 18s ease-in-out infinite reverse",
          }}
        />
        {/* Dark overlay to ground the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(230,25%,8%)]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-accent" />
            <span className="font-medium text-accent text-sm">Science-Based Learning Protocol</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Master Learning with
            <span className="block mt-2 bg-gradient-to-r from-[hsl(270,80%,65%)] via-[hsl(310,70%,60%)] to-[hsl(186,75%,55%)] bg-clip-text text-transparent">
              Neuroplasticity Science
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            AI-powered study planner built on Andrew Huberman's protocols. Optimize focus, retention,
            and memory consolidation with proven neuroscience techniques.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Brain className="w-8 h-8 text-[hsl(270,80%,65%)] mb-3 mx-auto" />
              <h3 className="font-semibold mb-2 text-white">90-Min Focus Blocks</h3>
              <p className="text-sm text-white/50">Optimized study sessions with gap effects for 10-20% faster learning</p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Target className="w-8 h-8 text-[hsl(310,70%,60%)] mb-3 mx-auto" />
              <h3 className="font-semibold mb-2 text-white">Active Recall Testing</h3>
              <p className="text-sm text-white/50">Reduce forgetting by 50% with evidence-based retrieval practice</p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Zap className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2 text-white">NSDR Consolidation</h3>
              <p className="text-sm text-white/50">Accelerate memory formation with guided rest protocols</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="xl" className="min-w-[200px]">
              Start Learning Smarter
            </Button>
            <Button variant="outline" size="xl" className="min-w-[200px] bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              View Science
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm">
            <div>
              <div className="text-3xl font-bold text-[hsl(270,80%,65%)]">50%</div>
              <div className="text-white/50">Less Forgetting</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[hsl(310,70%,60%)]">90</div>
              <div className="text-white/50">Minute Blocks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">200%</div>
              <div className="text-white/50">Better Retention</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;