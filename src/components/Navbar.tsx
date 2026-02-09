import { Brain, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(230,25%,8%)]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Brain className="w-8 h-8 text-[hsl(270,80%,65%)] group-hover:text-[hsl(310,70%,60%)] transition-colors" />
          <span className="text-lg font-bold text-white tracking-tight">​Alan.ai</span>
        </Link>

        {/* Center links */}
        <div className="hidden sm:flex items-center gap-8">
          <button onClick={() => scrollTo("how-it-works")} className="text-sm text-white/60 hover:text-white transition-colors">
            How it Works
          </button>
          <button onClick={() => scrollTo("pricing")} className="text-sm text-white/60 hover:text-white transition-colors">
            Pricing
          </button>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? <>
              <Link to="/study-plan">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <User className="w-4 h-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="text-white/50 hover:text-white hover:bg-white/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </> : <Button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-[hsl(270,80%,55%)] to-[hsl(310,70%,55%)] hover:from-[hsl(270,80%,60%)] hover:to-[hsl(310,70%,60%)] text-white border-0" size="sm">
              <LogIn className="w-4 h-4 mr-1" />
              Log In
            </Button>}
        </div>
      </div>
    </nav>;
};
export default Navbar;