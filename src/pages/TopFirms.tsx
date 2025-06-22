
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilteredFirmsList from "../components/FilteredFirmsList";
import Footer from "../components/Footer";
import { usePropFirms } from "../hooks/useSupabaseData";

const TopFirms = () => {
  const { propFirms, loading } = usePropFirms();
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');

  // Get top 5 firms based on combined review score and trust rating
  const topFirms = propFirms
    .sort((a, b) => {
      const scoreA = (a.review_score || 0) + (a.trust_rating || 0);
      const scoreB = (b.review_score || 0) + (b.trust_rating || 0);
      return scoreB - scoreA;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Top 5 Prop Firms</h1>
          <p className="text-gray-300 text-lg">
            The highest rated prop trading firms based on reviews and trust
          </p>
        </div>

        <FilteredFirmsList 
          firms={topFirms}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
        />
      </div>

      <Footer />
    </div>
  );
};

export default TopFirms;
