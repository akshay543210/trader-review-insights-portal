
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
                    <span className="text-2xl font-bold text-blue-400">${firm.cost}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cost</span>
                    <span className="text-blue-400 font-semibold">${firm.cost}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Payout</span>
                    <span className="text-green-400 font-semibold">{firm.payout}%</span>
                  </div>

                  {firm.platform && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Platform</span>
                      <span className="text-gray-300 font-semibold">{firm.platform}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Category</span>
                    <span className="text-purple-400 font-semibold capitalize">{firm.category}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="gap-2 flex-col">
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-105"
                  >
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
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
