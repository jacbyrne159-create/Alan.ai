import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Get a feel for science-backed studying with core features.",
    features: [
      "3 AI-generated flashcard sets / month",
      "90-min focus block timer",
      "Basic progress dashboard",
      "Active recall quizzes",
      "Community discussions",
    ],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Student",
    price: "£8",
    period: "/ month",
    description: "Everything you need to study smarter throughout the term.",
    features: [
      "Unlimited AI flashcard generation",
      "PDF & textbook upload",
      "Spaced repetition engine",
      "NSDR consolidation sessions",
      "Mock exam builder",
      "Detailed retention analytics",
      "Priority AI responses",
    ],
    cta: "Get Student Plan",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "£18",
    period: "/ month",
    description: "For serious learners, researchers, and exam preppers.",
    features: [
      "Everything in Student",
      "Collaborative study groups",
      "Custom study planner exports",
      "Advanced analytics & insights",
      "Early access to new features",
      "Dedicated support",
    ],
    cta: "Go Pro",
    highlighted: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="relative py-24 bg-[hsl(230,25%,6%)] overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, hsl(310 70% 55% / 0.4), transparent 70%)",
        }}
      />

      <div className="container relative z-10 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-white/50">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Simple, Honest Pricing
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            No hidden fees, no dark patterns. Pay for what you use — upgrade or
            downgrade anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[hsl(270,80%,15%)] to-[hsl(310,70%,10%)] border-[hsl(270,80%,50%)] shadow-glow"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[hsl(270,80%,55%)] to-[hsl(310,70%,55%)] text-white">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-white/50">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlighted
                          ? "bg-[hsl(270,80%,50%)]"
                          : "bg-white/10"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/auth")}
                className={`w-full ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-[hsl(270,80%,55%)] to-[hsl(310,70%,55%)] hover:from-[hsl(270,80%,60%)] hover:to-[hsl(310,70%,60%)] text-white border-0"
                    : "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-white/30 mt-10">
          Student pricing available with a valid university email.{" "}
          <button className="underline hover:text-white/50 transition-colors">
            Contact us
          </button>{" "}
          for institutional licences.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
