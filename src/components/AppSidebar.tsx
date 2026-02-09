import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Gamepad2, MessageSquare, BookOpen, Layers, ClipboardList, FileText, Search, Brain } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
const navItems = [{
  title: "Home",
  icon: Home,
  path: "/"
}, {
  title: "Study Plan",
  icon: CalendarDays,
  path: "/study-plan"
}, {
  title: "Game Center",
  icon: Gamepad2,
  path: "/games"
}, {
  title: "Discussions",
  icon: MessageSquare,
  path: "/discussions"
}, {
  title: "Lessons",
  icon: BookOpen,
  path: "/lessons"
}, {
  title: "Flashcards",
  icon: Layers,
  path: "/flashcards"
}, {
  title: "Practice",
  icon: ClipboardList,
  path: "/practice"
}, {
  title: "Mock Exams",
  icon: FileText,
  path: "/mock-exams"
}];
const AppSidebar = () => {
  const location = useLocation();
  return <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-7 h-7 text-primary" />
          <span className="font-bold text-lg text-foreground">Alan.ai</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path} tooltip={item.title}>
                    <Link to={item.path}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};
export default AppSidebar;