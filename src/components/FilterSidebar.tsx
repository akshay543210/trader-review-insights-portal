
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import { PropFirm } from "../types/supabase";

interface FilterSidebarProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    minReviewScore: number;
    maxReviewScore: number;
    minTrustRating: number;
    maxTrustRating: number;
    searchTerm: string;
  };
  setFilters: (filters: any) => void;
  propFirms: PropFirm[];
}

const FilterSidebar = ({ filters, setFilters, propFirms }: FilterSidebarProps) => {
  const updateFilters = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="bg-slate-800/50 border-blue-500/20">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Search</h3>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search prop firms..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400"
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-slate-800/50 border-blue-500/20">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Price Range</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                value={filters.minPrice}
                onChange={(e) => updateFilters({ 
                  minPrice: parseInt(e.target.value) || 0 
                })}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                value={filters.maxPrice}
                onChange={(e) => updateFilters({ 
                  maxPrice: parseInt(e.target.value) || 1000 
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="bg-slate-800/50 border-blue-500/20">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Review Score Range</h3>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Min"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              value={filters.minReviewScore}
              onChange={(e) => updateFilters({ 
                minReviewScore: parseFloat(e.target.value) || 0 
              })}
            />
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Max"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              value={filters.maxReviewScore}
              onChange={(e) => updateFilters({ 
                maxReviewScore: parseFloat(e.target.value) || 5 
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trust Rating Filter */}
      <Card className="bg-slate-800/50 border-blue-500/20">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Trust Rating Range</h3>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="5"
              placeholder="Min"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              value={filters.minTrustRating}
              onChange={(e) => updateFilters({ 
                minTrustRating: parseInt(e.target.value) || 0 
              })}
            />
            <input
              type="number"
              min="0"
              max="5"
              placeholder="Max"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              value={filters.maxTrustRating}
              onChange={(e) => updateFilters({ 
                maxTrustRating: parseInt(e.target.value) || 5 
              })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;
