import { Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import type { Review } from "@/types/supabase";

interface ReviewCardProps {
  review: Review;
  onDelete?: (reviewId: string) => void;
  showFirmName?: boolean;
}

export const ReviewCard = ({ review, onDelete, showFirmName = false }: ReviewCardProps) => {
  const { isAdmin } = useAuth();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-card/50 border-border hover:border-primary/20 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex">{renderStars(review.rating)}</div>
              <span className="text-sm text-muted-foreground">
                by {review.reviewer_name || 'Anonymous'}
              </span>
              {review.is_verified && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Verified
                </Badge>
              )}
            </div>
            
            {showFirmName && review.prop_firms && (
              <div className="text-sm text-primary font-medium mb-2">
                {review.prop_firms.name}
              </div>
            )}
            
            {review.title && (
              <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {formatDate(review.created_at)}
            </span>
            {isAdmin && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(review.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">{review.content}</p>
        
        {review.helpful_count > 0 && (
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <span>{review.helpful_count} people found this helpful</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};