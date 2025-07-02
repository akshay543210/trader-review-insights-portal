
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PropFirm } from "@/types/supabase";

interface PropFirmSectionProps {
  propFirms: PropFirm[];
  loading?: boolean;
  sortBy: 'price' | 'review' | 'trust';
  setSortBy: (sortBy: 'price' | 'review' | 'trust') => void;
}

const PropFirmSection = ({ propFirms, loading, sortBy, setSortBy }: PropFirmSectionProps) => {
  // Sort firms based on sortBy criteria
  const sortedFirms = [...propFirms].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'trust') return (b.trust_rating ?? 0) - (a.trust_rating ?? 0);
    // Default: review
    return (b.review_score ?? 0) - (a.review_score ?? 0);
  });
  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white text-lg">Loading prop firms...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prop Trading Firms
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect prop firm based on your experience level and trading goals
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-center mb-8">
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="review">Top Rated</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
              <SelectItem value="trust">Trust Score</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prop Firm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFirms.slice(0, 6).map((firm, index) => (
            <Card 
              key={firm.id} 
              className="bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{firm.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-400">${firm.price}</span>
                    <span className="text-lg text-gray-400 line-through">${firm.original_price}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Review Score</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-white font-semibold">{firm.review_score}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Trust Rating</span>
                    <span className="text-green-400 font-semibold">{firm.trust_rating}/10</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Profit Split</span>
                    <span className="text-blue-400 font-semibold">{firm.profit_split}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Payout Rate</span>
                    <span className="text-purple-400 font-semibold">{firm.payout_rate}%</span>
                  </div>

                  {firm.platform && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Platform</span>
                      <span className="text-gray-300 font-semibold">{firm.platform}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="gap-2 flex-col">
                <div className="flex gap-2 w-full">
                  <Link to={`/firms/${firm.slug}`} className="flex-1">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No prop firms found.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/propfirms">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              View All Prop Firms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropFirmSection;
