
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, DollarSign, TrendingUp, Settings, Shield } from "lucide-react";
import { usePropFirms } from "@/hooks/useSupabaseData";
import { PropFirm } from "@/types/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Comparison = () => {
  const { propFirms, loading } = usePropFirms();
  const [selectedFirms, setSelectedFirms] = useState<(PropFirm | null)[]>([null, null, null]);

  const handleFirmSelect = (firmId: string, index: number) => {
    const firm = propFirms.find(f => f.id === firmId) || null;
    const newSelected = [...selectedFirms];
    newSelected[index] = firm;
    setSelectedFirms(newSelected);
  };

  const clearSelection = (index: number) => {
    const newSelected = [...selectedFirms];
    newSelected[index] = null;
    setSelectedFirms(newSelected);
  };

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

  const ComparisonCard = ({ firm, index }: { firm: PropFirm | null; index: number }) => {
    return (
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Firm {index + 1}
            </CardTitle>
            {firm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearSelection(index)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                ×
              </Button>
            )}
          </div>
          
          <Select value={firm?.id || ""} onValueChange={(value) => handleFirmSelect(value, index)}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-300">
              <SelectValue placeholder="Select a prop firm" />
            </SelectTrigger>
            <SelectContent>
              {propFirms.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          {firm ? (
            <div className="space-y-4">
              {/* Firm Name & Rating */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{firm.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex">{renderStars(Math.round(firm.review_score))}</div>
                  <span className="text-gray-600 text-sm">({firm.user_review_count})</span>
                </div>
                {firm.brand && (
                  <Badge className="bg-blue-100 text-blue-800">{firm.brand}</Badge>
                )}
              </div>

              {/* Key Metrics */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Max Funding</div>
                    <div className="text-gray-600">{firm.max_funding || firm.funding_amount}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Profit Split</div>
                    <div className="text-gray-600">{firm.profit_split}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Evaluation Model</div>
                    <div className="text-gray-600">{firm.evaluation_model || 'Standard'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Starting Fee</div>
                    <div className="text-gray-600">${firm.price}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Regulation</div>
                    <div className="text-gray-600">{firm.regulation || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <div className="flex flex-wrap gap-1">
                  {firm.features.slice(0, 4).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {firm.features.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{firm.features.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => firm.affiliate_url && window.open(firm.affiliate_url, '_blank')}
              >
                Get Started
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a prop firm to compare
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading comparison tool...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compare PropFirms
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Compare up to 3 prop firms side by side to find the perfect match for your trading needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {selectedFirms.map((firm, index) => (
            <ComparisonCard key={index} firm={firm} index={index} />
          ))}
        </div>

        {selectedFirms.some(firm => firm !== null) && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setSelectedFirms([null, null, null])}
              className="border-gray-400 text-gray-600 hover:bg-gray-100"
            >
              Clear All Selections
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Comparison;
