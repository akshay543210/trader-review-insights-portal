
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { LogOut, Search, DollarSign, Trophy, Shield } from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Explore Firms',
    url: '/admin/explore-firms',
    icon: Search,
    category: 'explore'
  },
  {
    title: 'Cheap Firms',
    url: '/admin/cheap-firms',
    icon: DollarSign,
    category: 'cheap'
  },
  {
    title: 'Top Firms',
    url: '/admin/top-firms',
    icon: Trophy,
    category: 'top'
  }
];

export const AdminSidebar = () => {
  const { signOut, profile } = useAuth();

  return (
    <Sidebar collapsible="icon" className="w-60">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="bg-slate-800 border-r border-blue-500/20">
        {/* Header */}
        <div className="p-4 border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-gray-400">{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Firm Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-blue-600 text-white font-medium" 
                          : "hover:bg-slate-700 text-gray-300"
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-4 border-t border-blue-500/20">
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
