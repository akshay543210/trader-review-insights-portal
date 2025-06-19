
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PropFirm, Review } from '@/types/supabase';

export const usePropFirms = () => {
  const [propFirms, setPropFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropFirms = async () => {
      try {
        const { data, error } = await supabase
          .from('prop_firms')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPropFirms(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPropFirms();
  }, []);

  return { propFirms, loading, error };
};

export const useReviews = (firmId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let query = supabase
          .from('reviews')
          .select(`
            *,
            prop_firms:firm_id (
              id,
              name,
              slug
            )
          `)
          .order('created_at', { ascending: false });

        if (firmId) {
          query = query.eq('firm_id', firmId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [firmId]);

  return { reviews, loading, error };
};

export const getCheapestFirms = async (limit: number = 10): Promise<PropFirm[]> => {
  const { data, error } = await supabase
    .from('prop_firms')
    .select('*')
    .order('price', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

export const getTopRatedFirms = async (limit: number = 5): Promise<PropFirm[]> => {
  const { data, error } = await supabase
    .from('prop_firms')
    .select('*')
    .order('review_score', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};
