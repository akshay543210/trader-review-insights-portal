
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogOut, Shield } from "lucide-react";
import AdminPanel from "../components/AdminPanel";
import { usePropFirms } from "../hooks/useSupabaseData";
import { PropFirm } from "../types/supabase";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { propFirms } = usePropFirms();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleAddFirm = async (firmData: Partial<PropFirm>) => {
    // This will be handled by admin panel with Supabase
    console.log('Add firm:', firmData);
  };

  const handleUpdateFirm = async (id: string, updates: Partial<PropFirm>) => {
    // This will be handled by admin panel with Supabase
    console.log('Update firm:', id, updates);
  };

  const handleDeleteFirm = async (id: string) => {
    // This will be handled by admin panel with Supabase
    console.log('Delete firm:', id);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400">Manage PropFirmHub content and settings</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-slate-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        <AdminPanel 
          propFirms={propFirms}
          onAdd={handleAddFirm}
          onUpdate={handleUpdateFirm}
          onDelete={handleDeleteFirm}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
