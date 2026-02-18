import { Upload, Brain, FlaskConical, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Materials",
    description:
      "Drop in your lecture slides, textbooks, or notes. Alan accepts PDFs, and plain text — anything you study from.",
    detail:
      "Our AI instantly parses and understands the structure of your content, identifying key concepts and relationships between topics.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Alan Builds Your Study Plan",
    description:
      "Based on neuroscience research, Alan structures your material into 90-minute focus blocks with built-in gap effects.",
    detail:
      "Each session is calibrated to your cognitive load, ensuring you're always studying at peak efficiency — not grinding through fatigue.",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Active Recall & Flashcards",
    description:
      "Alan generates smart flashcards and quizzes using retrieval practice — the most evidence-backed learning method.",
    detail:
      "Cards are weighted by difficulty using spaced repetition algorithms. The more you struggle with something, the more Alan surfaces it.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track & Consolidate",
    description:
      "Review your retention graphs, streak data, and NSDR rest protocols to lock in long-term memory formation.",
    detail:
      "Alan tracks what you know, what you're shaky on, and what needs revisiting — giving you a live map of your knowledge.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-[hsl(230,25%,8%)] overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(270 80% 50% / 0.3), transparent 70%)",
        }}
      />

      <div className="container relative z-10 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-white/50">
            The Science
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            How Alan Works
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every step is grounded in peer-reviewed neuroscience. No fluff — just
            the methods that actually move the needle.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className="flex-1 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                        <Icon className="w-6 h-6 text-[hsl(270,80%,65%)]" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-white/30 mb-1">
                          Step {step.number}
                        </p>
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/60 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <p className="text-sm text-white/35 leading-relaxed border-t border-white/10 pt-3">
                      {step.detail}
                    </p>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex w-14 h-14 rounded-full bg-[hsl(270,80%,25%)] border-2 border-[hsl(270,80%,50%)] items-center justify-center flex-shrink-0 z-10 shadow-glow">
                    <span className="text-xs font-bold text-[hsl(270,80%,80%)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
