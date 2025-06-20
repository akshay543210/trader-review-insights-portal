
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PropFirm } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAdminOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addFirm = async (firmData: Partial<PropFirm>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('prop_firms')
        .insert([firmData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prop firm added successfully!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding firm:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add prop firm",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateFirm = async (id: string, updates: Partial<PropFirm>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('prop_firms')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prop firm updated successfully!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating firm:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update prop firm",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const deleteFirm = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('prop_firms')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prop firm deleted successfully!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting firm:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete prop firm",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    addFirm,
    updateFirm,
    deleteFirm,
    loading
  };
};
