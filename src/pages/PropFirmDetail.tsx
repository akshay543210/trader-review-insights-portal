
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Copy, Star, Shield, DollarSign, TrendingUp, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropFirm } from "../types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-blue-400 hover:text-blue-300">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/propfirms" className="text-blue-400 hover:text-blue-300">
                Prop Firms
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-300">{firm.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <div className="bg-slate-800/50 rounded-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {firm.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{firm.name}</h1>
                  <Badge className={categoryColors[firm.category]}>
                    {firm.category}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 mb-6">{firm.description}</p>
              
              {/* Rating and Trust Score */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(firm.reviewScore)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{firm.reviewScore}</span>
                  <span className="text-gray-400">({firm.userReviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Trust: {firm.trustRating}/10</span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{firm.profitSplit}%</div>
                  <p className="text-sm text-gray-400">Profit Split</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">${firm.price}</div>
                  <p className="text-sm text-gray-400">Fee</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{firm.trustRating}/10</div>
                  <p className="text-sm text-gray-400">Trust Rating</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{firm.fundingAmount}</div>
                  <p className="text-sm text-gray-400">Funding</p>
                </div>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="lg:w-80">
              <Card className="bg-slate-700/50 border-blue-500/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white">Get Started</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-blue-400">${firm.price}</span>
                      <span className="text-lg text-gray-400 line-through">${firm.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-400">One-time fee</p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-400 font-medium">Affiliate Code</p>
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
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(firm.affiliateUrl, '_blank')}
                    >
                      Buy Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                      onClick={() => window.location.href = `/reviews/${firm.id}`}
                    >
                      View Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Card className="bg-slate-800/50 border-blue-500/20">
          <CardHeader>
            <h3 className="text-xl font-bold text-white">Key Features</h3>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {firm.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropFirmDetail;
