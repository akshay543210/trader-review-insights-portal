
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropFirm } from "../types";

interface PropFirmCardProps {
  firm: PropFirm;
  index: number;
}

const PropFirmCard = ({ firm, index }: PropFirmCardProps) => {
  const location = useLocation();
  const propFirms = location.state?.propFirms || [];

  const categoryColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    pro: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  const discountPercentage = Math.round(((firm.originalPrice - firm.price) / firm.originalPrice) * 100);

  const handleGetStarted = () => {
    window.open(firm.affiliateUrl, '_blank');
  };

  const handleLearnMore = () => {
    window.location.href = `/propfirm/${firm.id}`;
  };

  const handleViewReviews = () => {
    window.location.href = `/reviews/${firm.id}`;
  };

  return (
    <Card 
      className="bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{firm.name}</h3>
          <Badge className={categoryColors[firm.category]}>
            {firm.category}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-400">${firm.price}</span>
            <span className="text-lg text-gray-400 line-through">${firm.originalPrice}</span>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              -{discountPercentage}%
            </Badge>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="text-sm text-blue-400 font-medium">Coupon Code</div>
            <div className="text-lg font-bold text-white">{firm.couponCode}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-300 mb-4">{firm.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Review Score</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white font-semibold">{firm.reviewScore}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Trust Rating</span>
            <span className="text-green-400 font-semibold">{firm.trustRating}/10</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Profit Split</span>
            <span className="text-blue-400 font-semibold">{firm.profitSplit}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payout Rate</span>
            <span className="text-purple-400 font-semibold">{firm.payoutRate}%</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {firm.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="text-sm text-gray-400 flex items-center">
                <span className="text-blue-400 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="gap-2 flex-col">
        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 transition-all"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>
        <Button 
          variant="outline"
          className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 transition-all"
          onClick={handleViewReviews}
        >
          View Reviews
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropFirmCard;
