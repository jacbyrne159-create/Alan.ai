import { Upload, Brain, FlaskConical, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Materials",
    description:
      "Drop in your lecture slides, textbooks, or notes. Alan accepts PDFs and plain text — anything you study from.",
    detail:
      "Our AI instantly parses and understands the structure of your content, identifying key concepts and relationships between topics.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Alan Builds Your Study Plan",
    description:
      "Based on neuroscience research, Alan structures your material into focus blocks with built-in gap effects.",
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
      "Review your retention graphs, streak data, and plan your revision schedule to lock in long-term memory.",
    detail:
      "Alan tracks what you know, what you're shaky on, and what needs revisiting — giving you a live map of your knowledge.",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-white/20 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-5">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
            <Icon className="w-6 h-6 text-[hsl(270,80%,65%)]" />
          </div>
          <span className="text-xs font-mono text-white/30">
            Step {step.number}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
        <p className="text-white/60 leading-relaxed mb-3">{step.description}</p>
        <p className="text-sm text-white/35 leading-relaxed border-t border-white/10 pt-3 mt-auto">
          {step.detail}
        </p>
      </div>
    </div>
  );
}

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-[hsl(230,25%,8%)] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(270 80% 50% / 0.3), transparent 70%)",
        }}
      />

      <div className="container relative z-10 px-4 max-w-6xl mx-auto">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
