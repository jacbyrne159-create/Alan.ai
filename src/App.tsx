import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import StudyPlan from "./pages/StudyPlan";
import GameCenter from "./pages/GameCenter";
import Discussions from "./pages/Discussions";
import Lessons from "./pages/Lessons";
import Flashcards from "./pages/Flashcards";
import Practice from "./pages/Practice";
import MockExams from "./pages/MockExams";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/games" element={<GameCenter />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/mock-exams" element={<MockExams />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
