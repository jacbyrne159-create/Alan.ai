import StudyPlanner from "@/components/StudyPlanner";
import ActiveRecall from "@/components/ActiveRecall";
import ProgressDashboard from "@/components/ProgressDashboard";

const StudyPlan = () => {
  return (
    <div>
      <StudyPlanner />
      <ActiveRecall />
      <ProgressDashboard />
    </div>
  );
};

export default StudyPlan;
