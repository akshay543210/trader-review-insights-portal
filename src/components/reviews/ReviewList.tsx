import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "./ReviewCard";
import { useToast } from "@/hooks/use-toast";
import type { Review } from "@/types/supabase";
import { Loader2 } from "lucide-react";

interface ReviewListProps {
  firmId?: string;
  showFirmName?: boolean;
  className?: string;
}

export const ReviewList = ({ firmId, showFirmName = false, className }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(prev => prev.filter(review => review.id !== reviewId));
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [firmId]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
          ...(firmId && { filter: `firm_id=eq.${firmId}` })
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [firmId]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading reviews...</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">
          {firmId ? "No reviews yet. Be the first to review this firm!" : "No reviews found."}
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={handleDeleteReview}
          showFirmName={showFirmName}
        />
      ))}
    </div>
  );
};