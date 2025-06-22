
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropFirmCard from './PropFirmCard';
import { PropFirm } from '@/types/supabase';

interface FilteredFirmsListProps {
  firms: PropFirm[];
  sortBy: 'price' | 'review' | 'trust';
  setSortBy: (sort: 'price' | 'review' | 'trust') => void;
  loading: boolean;
}

const FilteredFirmsList = ({ firms, sortBy, setSortBy, loading }: FilteredFirmsListProps) => {
  const sortedFirms = [...firms].sort((a, b) => {
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
      <div className="text-center py-12">
        <div className="text-gray-400">Loading firms...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {firms.length} Firms Found
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-300">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: 'price' | 'review' | 'trust') => setSortBy(value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="price" className="text-white hover:bg-slate-700">Price (Low to High)</SelectItem>
              <SelectItem value="review" className="text-white hover:bg-slate-700">Review Score</SelectItem>
              <SelectItem value="trust" className="text-white hover:bg-slate-700">Trust Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Firms Grid */}
      {sortedFirms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFirms.map((firm, index) => (
            <PropFirmCard key={firm.id} firm={firm} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No firms found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FilteredFirmsList;
