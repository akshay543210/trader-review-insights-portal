
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
      // Ensure required fields are present
      const completeData = {
        name: firmData.name || '',
        slug: firmData.slug || firmData.name?.toLowerCase().replace(/\s+/g, '-') || '',
        funding_amount: firmData.funding_amount || '',
        price: firmData.price || 0,
        original_price: firmData.original_price || 0,
        profit_split: firmData.profit_split || 0,
        payout_rate: firmData.payout_rate || 0,
        category_id: firmData.category_id,
        coupon_code: firmData.coupon_code,
        review_score: firmData.review_score,
        trust_rating: firmData.trust_rating,
        description: firmData.description,
        features: firmData.features,
        logo_url: firmData.logo_url,
        user_review_count: firmData.user_review_count,
        pros: firmData.pros,
        cons: firmData.cons,
        affiliate_url: firmData.affiliate_url,
        brand: firmData.brand,
        platform: firmData.platform,
        max_funding: firmData.max_funding,
        evaluation_model: firmData.evaluation_model,
        starting_fee: firmData.starting_fee,
        regulation: firmData.regulation,
      };

      const { error } = await supabase
        .from('prop_firms')
        .insert(completeData);

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
