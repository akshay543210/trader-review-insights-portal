
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropFirmCard from "./PropFirmCard";
import { PropFirm } from "@/types/supabase";

interface PropFirmSectionProps {
  propFirms: PropFirm[];
  sortBy: 'price' | 'review' | 'trust';
  setSortBy: (sort: 'price' | 'review' | 'trust') => void;
  loading?: boolean;
}

const PropFirmSection = ({ propFirms, sortBy, setSortBy, loading }: PropFirmSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'intermediate' | 'pro'>('all');

  // For now, we'll filter by category name matching - later we can join with categories table
  const filteredFirms = selectedCategory === 'all' 
    ? propFirms 
    : propFirms; // TODO: Add category filtering once we have category joins

  const sortedFirms = [...filteredFirms].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'review':
        return b.review_score - a.review_score;
      case 'trust':
        return b.trust_rating - a.trust_rating;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <section id="firms" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white text-lg">Loading prop firms...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="firms" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Trading Level
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect prop firm based on your experience level and trading goals
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'beginner', 'intermediate', 'pro'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-6 py-2 capitalize transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
              }`}
            >
              {category === 'all' ? 'All Levels' : `${category} Traders`}
            </Button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Sort by:</span>
            <Select value={sortBy} onValueChange={(value: 'price' | 'review' | 'trust') => setSortBy(value)}>
              <SelectTrigger className="w-48 bg-slate-800 border-blue-500/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-500/20">
                <SelectItem value="price" className="text-white hover:bg-slate-700">Price (Low to High)</SelectItem>
                <SelectItem value="review" className="text-white hover:bg-slate-700">Review Score</SelectItem>
                <SelectItem value="trust" className="text-white hover:bg-slate-700">Trust Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prop Firm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFirms.map((firm, index) => (
            <PropFirmCard 
              key={firm.id} 
              firm={firm} 
              index={index}
            />
          ))}
        </div>

        {sortedFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No prop firms found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropFirmSection;
