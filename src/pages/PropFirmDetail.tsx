
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WriteReviewForm from "../components/WriteReviewForm";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, DollarSign, TrendingUp, Shield, Clock } from "lucide-react";
import { usePropFirms } from "../hooks/useSupabaseData";

const PropFirmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { propFirms } = usePropFirms();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const firm = propFirms.find(f => f.id === id);

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-white">Firm not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Firm Header */}
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={firm.logo_url || '/placeholder.svg'} 
                  alt={firm.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{firm.name}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300">{firm.review_score}</span>
                    </div>
                    <Badge variant="outline">{firm.trust_rating} Trust Rating</Badge>
                    <Badge variant="secondary">{firm.user_review_count} Reviews</Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  ${firm.price}
                  {firm.original_price > firm.price && (
                    <span className="text-lg text-gray-400 line-through ml-2">
                      ${firm.original_price}
                    </span>
                  )}
                </div>
                {firm.affiliate_url && (
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Site
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Funding</h3>
              <p className="text-gray-300">{firm.funding_amount}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Profit Split</h3>
              <p className="text-gray-300">{firm.profit_split}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Payout Rate</h3>
              <p className="text-gray-300">{firm.payout_rate}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Platform</h3>
              <p className="text-gray-300">{firm.platform || 'Not specified'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Description and Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">About {firm.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{firm.description}</p>
              
              {firm.features && firm.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {firm.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              {firm.pros && firm.pros.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-green-400 mb-2">Pros:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {firm.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {firm.cons && firm.cons.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Cons:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {firm.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Review Section */}
        <Card className="bg-slate-800/50 border-blue-500/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Reviews</CardTitle>
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Write a Review
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showReviewForm && (
              <div className="mb-6">
                <WriteReviewForm 
                  firmId={firm.id} 
                  firmName={firm.name}
                  onClose={() => setShowReviewForm(false)}
                />
              </div>
            )}
            
            <div className="text-center py-8 text-gray-400">
              No reviews yet. Be the first to review {firm.name}!
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PropFirmDetail;
