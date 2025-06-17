
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Trophy, ChevronRight, Calendar, User } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropFirm } from "../types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Reviews = () => {
  const { id } = useParams();
  const location = useLocation();
  const propFirms = location.state?.propFirms || [];
  const firm = propFirms.find((f: PropFirm) => f.id === parseInt(id || '0'));
  
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Dummy reviews data
  const dummyReviews = [
    {
      id: 1,
      userName: "TradingPro23",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent Experience with Payouts",
      content: "I've been trading with this prop firm for 8 months now and have received 6 successful payouts. The rules are clear, customer support is responsive, and the platform is reliable. Highly recommended for serious traders.",
      helpful: 23,
      verified: true
    },
    {
      id: 2,
      userName: "ForexMaster",
      rating: 4,
      date: "2024-01-10",
      title: "Good Firm with Minor Issues",
      content: "Overall a solid prop firm. The evaluation process was fair and the profit splits are competitive. Only complaint is that customer service can be slow during peak hours. Still recommend it.",
      helpful: 15,
      verified: true
    },
    {
      id: 3,
      userName: "DayTrader99",
      rating: 5,
      date: "2024-01-08",
      title: "Fast Payouts and Great Support",
      content: "Passed my evaluation in 3 weeks and got my first payout within 5 business days. The team is professional and the trading conditions are exactly as advertised. Will definitely continue trading with them.",
      helpful: 31,
      verified: false
    },
    {
      id: 4,
      userName: "SwingTraderX",
      rating: 3,
      date: "2024-01-05",
      title: "Average Experience",
      content: "The firm is okay but nothing special. Rules are standard, payouts take a bit longer than expected. Platform works fine but could use some improvements. It's not bad but there are better options.",
      helpful: 8,
      verified: true
    },
    {
      id: 5,
      userName: "AlgoTrader2024",
      rating: 5,
      date: "2024-01-02",
      title: "Perfect for Algorithm Trading",
      content: "As an algorithmic trader, I appreciate that they allow EAs and have no restrictions on trading styles. The servers are fast and I've never experienced slippage issues. Excellent prop firm!",
      helpful: 19,
      verified: true
    }
  ];

  // Sort prop firms by review score for leaderboard
  const rankedFirms = [...propFirms].sort((a, b) => b.reviewScore - a.reviewScore);
  const firmRank = rankedFirms.findIndex(f => f.id === firm?.id) + 1;

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
              <BreadcrumbPage className="text-gray-300">Reviews</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-300">{firm.name} Review</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{firm.name} Reviews</h1>
          <p className="text-xl text-gray-300">Detailed reviews and analysis</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Ranked #{firmRank} out of {rankedFirms.length} prop firms</span>
          </div>
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

        {/* Leaderboard */}
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-400" />
              Prop Firms Leaderboard
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rankedFirms.slice(0, 5).map((rankedFirm, index) => (
                <div 
                  key={rankedFirm.id} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    rankedFirm.id === firm.id 
                      ? 'bg-blue-500/20 border border-blue-500/30' 
                      : 'bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-600 text-black' :
                      'bg-slate-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{rankedFirm.name}</h4>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400">{rankedFirm.reviewScore}</span>
                        <span className="text-gray-400">• Trust: {rankedFirm.trustRating}/10</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/reviews/${rankedFirm.id}`}
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                  >
                    View Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Reviews Section */}
        <Card className="bg-slate-800/50 border-blue-500/20 mb-8">
          <CardHeader>
            <h3 className="text-xl font-bold text-white">User Reviews</h3>
            <p className="text-gray-400">Read what real traders are saying about {firm.name}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dummyReviews.map((review) => (
                <div key={review.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white">{review.userName}</span>
                        {review.verified && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            Verified
                          </Badge>
                        )}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Calendar className="h-3 w-3" />
                          {review.date}
                        </div>
                      </div>
                      <h4 className="font-semibold text-white mb-2">{review.title}</h4>
                      <p className="text-gray-300 mb-3">{review.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            className="bg-green-600 hover:bg-green-700 mr-4"
            onClick={() => window.location.href = `/propfirm/${firm.id}`}
          >
            Buy Now - {firm.name}
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
