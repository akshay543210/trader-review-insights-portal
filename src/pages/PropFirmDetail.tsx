
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Copy, Star, Shield, DollarSign, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropFirm } from "../types";

const PropFirmDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const propFirms = location.state?.propFirms || [];
  const firm = propFirms.find((f: PropFirm) => f.id === parseInt(id || '0'));
  
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl text-white">Prop Firm Not Found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const copyCode = () => {
    navigator.clipboard.writeText(firm.couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const categoryColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    pro: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-slate-800/50 rounded-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-white">{firm.name}</h1>
                <Badge className={categoryColors[firm.category]}>
                  {firm.category}
                </Badge>
              </div>
              
              <p className="text-xl text-gray-300 mb-6">{firm.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-2xl font-bold text-white">{firm.reviewScore}</span>
                  </div>
                  <p className="text-sm text-gray-400">Review Score</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-green-400 mr-1" />
                    <span className="text-2xl font-bold text-white">{firm.trustRating}/10</span>
                  </div>
                  <p className="text-sm text-gray-400">Trust Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-blue-400 mr-1" />
                    <span className="text-2xl font-bold text-white">{firm.profitSplit}%</span>
                  </div>
                  <p className="text-sm text-gray-400">Profit Split</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-400 mr-1" />
                    <span className="text-2xl font-bold text-white">{firm.payoutRate}%</span>
                  </div>
                  <p className="text-sm text-gray-400">Payout Rate</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card className="bg-slate-700/50 border-blue-500/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white">Pricing</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-blue-400">${firm.price}</span>
                      <span className="text-lg text-gray-400 line-through">${firm.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-400">Funding: {firm.fundingAmount}</p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-400 font-medium">Coupon Code</p>
                        <p className="text-lg font-bold text-white">{firm.couponCode}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyCode}
                        className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                      >
                        <Copy className="h-4 w-4" />
                        {copiedCode ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(firm.affiliateUrl, '_blank')}
                    >
                      Get Started Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                      onClick={() => window.location.href = `/reviews/${firm.id}`}
                    >
                      View Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <h3 className="text-xl font-bold text-white">Key Features</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {firm.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <h3 className="text-xl font-bold text-white">Reviews Summary</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {firm.reviewScore}/5.0
                </div>
                <p className="text-gray-400">Based on {firm.userReviewCount} reviews</p>
              </div>
              
              <Button 
                variant="outline"
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                onClick={() => window.location.href = `/reviews/${firm.id}`}
              >
                Read All Reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropFirmDetail;
