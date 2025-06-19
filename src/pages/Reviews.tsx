
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";
import { useReviews } from "@/hooks/useSupabaseData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Reviews = () => {
  const { reviews, loading, error } = useReviews();
  const [displayCount, setDisplayCount] = useState(10);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-white">Loading reviews...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-red-400">Error loading reviews: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">PropFirm Reviews</h1>
          <p className="text-gray-300 text-lg">
            Read authentic reviews from real traders about their experiences
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {reviews.slice(0, displayCount).map((review) => (
            <Card key={review.id} className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Link 
                        to={`/firms/${review.prop_firms?.slug || review.firm_id}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold text-lg"
                      >
                        {review.prop_firms?.name || 'Unknown Firm'}
                      </Link>
                      {review.is_verified && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-gray-400 text-sm">
                        by {review.reviewer_name}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {review.title && (
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {review.title}
                  </h3>
                )}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {review.content}
                </p>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful_count})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reviews.length > displayCount && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setDisplayCount(prev => prev + 10)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Load More Reviews
            </Button>
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No reviews found.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Reviews;
