
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import PropFirmCard from "./PropFirmCard";
import { PropFirm } from "@/types/propfirms";

interface PropFirmSectionProps {
  title: string;
  propFirms: PropFirm[];
  linkTo: string;
  loading?: boolean;
}

const PropFirmSection = ({ title, propFirms, linkTo, loading }: PropFirmSectionProps) => {
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
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect prop firm based on your experience level and trading goals
          </p>
        </div>

        {/* Prop Firm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propFirms.map((firm, index) => (
            <PropFirmCard 
              key={firm.id} 
              firm={firm} 
              index={index}
            />
          ))}
        </div>

        {propFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No prop firms found for this category.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to={linkTo}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              View All {title}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropFirmSection;
