
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { FirmManagementSection } from '@/components/admin/FirmManagementSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Shield, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PropFirm } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

const AdminPanelContent: React.FC = () => {
  const { signOut, user } = useAuth();
  const [firms, setFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFirms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('prop_firms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFirms(data || []);
    } catch (error) {
      console.error('Error fetching firms:', error);
      toast({
        title: "Error",
        description: "Failed to fetch firms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirms();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  // Filter functions for different sections
  const getCheapFirms = (firm: PropFirm) => {
    return firm.price <= 100; // Firms with price <= $100
  };

  const getTopFirms = (firm: PropFirm) => {
    // Sort by review score and trust rating, then take top 5
    const sortedFirms = [...firms].sort((a, b) => {
      const scoreA = (a.review_score || 0) + (a.trust_rating || 0);
      const scoreB = (b.review_score || 0) + (b.trust_rating || 0);
      return scoreB - scoreA;
    });
    
    const topFirms = sortedFirms.slice(0, 5);
    return topFirms.some(topFirm => topFirm.id === firm.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Admin Panel</CardTitle>
                  <p className="text-gray-400">Manage PropFirmHub content - {user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={fetchFirms}
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-slate-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Content Management Sections */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-blue-500/20">
            <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
              All Firms ({firms.length})
            </TabsTrigger>
            <TabsTrigger value="cheap" className="text-gray-300 data-[state=active]:text-white">
              Cheap Firms ({firms.filter(getCheapFirms).length})
            </TabsTrigger>
            <TabsTrigger value="top" className="text-gray-300 data-[state=active]:text-white">
              Top 5 Firms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <FirmManagementSection
              title="Explore All Firms"
              firms={firms}
              onRefresh={fetchFirms}
            />
          </TabsContent>

          <TabsContent value="cheap" className="mt-6">
            <FirmManagementSection
              title="Cheap Cost Firms (≤ $100)"
              firms={firms}
              onRefresh={fetchFirms}
              filterFn={getCheapFirms}
            />
          </TabsContent>

          <TabsContent value="top" className="mt-6">
            <FirmManagementSection
              title="Top 5 Prop Firms (by Score + Trust Rating)"
              firms={firms}
              onRefresh={fetchFirms}
              filterFn={getTopFirms}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AdminPanel: React.FC = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminPanelContent />
    </ProtectedRoute>
  );
};

export default AdminPanel;
