
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PropFirm } from '@/types/propfirms';
import { useToast } from '@/hooks/use-toast';

export const usePropFirms = (category?: string) => {
  const [propFirms, setPropFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPropFirms = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from('propfirms').select('*').order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPropFirms(data || []);
    } catch (error) {
      console.error('Error fetching prop firms:', error);
      toast({
        title: "Error",
        description: "Failed to load prop firms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [category, toast]);

  const addPropFirm = async (firmData: Omit<PropFirm, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('propfirms')
        .insert(firmData)
        .select()
        .single();

      if (error) throw error;
      setPropFirms(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Prop firm added successfully",
      });
      return { success: true, data };
    } catch (error) {
      console.error('Error adding prop firm:', error);
      toast({
        title: "Error",
        description: "Failed to add prop firm",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updatePropFirm = async (id: string, updates: Partial<PropFirm>) => {
    try {
      const { data, error } = await supabase
        .from('propfirms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPropFirms(prev => prev.map(firm => firm.id === id ? data : firm));
      toast({
        title: "Success",
        description: "Prop firm updated successfully",
      });
      return { success: true, data };
    } catch (error) {
      console.error('Error updating prop firm:', error);
      toast({
        title: "Error",
        description: "Failed to update prop firm",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deletePropFirm = async (id: string) => {
    try {
      const { error } = await supabase
        .from('propfirms')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPropFirms(prev => prev.filter(firm => firm.id !== id));
      toast({
        title: "Success",
        description: "Prop firm deleted successfully",
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting prop firm:', error);
      toast({
        title: "Error",
        description: "Failed to delete prop firm",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchPropFirms();
  }, [fetchPropFirms]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('propfirms_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'propfirms',
          filter: category ? `category=eq.${category}` : undefined,
        },
        () => {
          fetchPropFirms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPropFirms, category]);

  return {
    propFirms,
    loading,
    addPropFirm,
    updatePropFirm,
    deletePropFirm,
    refetch: fetchPropFirms,
  };
};
