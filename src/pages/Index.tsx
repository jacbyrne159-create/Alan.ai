import Hero from "@/components/Hero";
import StudyPlanner from "@/components/StudyPlanner";
import ActiveRecall from "@/components/ActiveRecall";
import ProgressDashboard from "@/components/ProgressDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <StudyPlanner />
      <ActiveRecall />
      <ProgressDashboard />
      <Footer />
    </div>
  );
};

export default Index;
