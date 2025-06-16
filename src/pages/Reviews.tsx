
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropFirm } from "../types";

const Reviews = () => {
  const { id } = useParams();
  const location = useLocation();
  const propFirms = location.state?.propFirms || [];
  const firm = propFirms.find((f: PropFirm) => f.id === parseInt(id || '0'));
  
  const [isAdminMode, setIsAdminMode] = useState(false);

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl text-white">Reviews Not Found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{firm.name} Reviews</h1>
          <p className="text-xl text-gray-300">Detailed reviews and analysis</p>
        </div>

        {/* Overall Rating */}
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold text-white">Overall Rating</h2>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {firm.reviewScore}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.floor(firm.reviewScore)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400">Out of 5 stars</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {firm.trustRating}/10
                </div>
                <p className="text-gray-400">Trust Rating</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {firm.userReviewCount}
                </div>
                <p className="text-gray-400">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-green-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Advantages</h3>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {firm.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-red-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-6 w-6 text-red-400" />
                <h3 className="text-xl font-bold text-white">Disadvantages</h3>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {firm.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <h3 className="text-xl font-bold text-white">Key Performance Metrics</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {firm.profitSplit}%
                </div>
                <p className="text-sm text-gray-400">Profit Split</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {firm.payoutRate}%
                </div>
                <p className="text-sm text-gray-400">Payout Rate</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {firm.fundingAmount}
                </div>
                <p className="text-sm text-gray-400">Funding Range</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  ${firm.price}
                </div>
                <p className="text-sm text-gray-400">Entry Fee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 mr-4"
            onClick={() => window.open(firm.affiliateUrl, '_blank')}
          >
            Start Trading with {firm.name}
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
            onClick={() => window.location.href = `/propfirm/${firm.id}`}
          >
            View Full Details
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reviews;
