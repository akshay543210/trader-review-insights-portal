
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import AdminPanel from "../components/AdminPanel";
import Footer from "../components/Footer";
import { PropFirm } from "../types";

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [propFirms, setPropFirms] = useState<PropFirm[]>([
    {
      id: 1,
      name: "FTMO",
      category: "beginner",
      price: 155,
      originalPrice: 200,
      couponCode: "SAVE20",
      reviewScore: 4.8,
      trustRating: 9.2,
      description: "Leading prop firm with excellent support for beginners",
      features: ["$10K - $200K accounts", "10% profit target", "5% daily loss limit", "1:100 leverage"],
      image: "/placeholder.svg",
      profitSplit: 80,
      payoutRate: 95,
      fundingAmount: "$10K - $200K",
      userReviewCount: 1542,
      pros: ["Excellent customer support", "Fast payouts", "Beginner-friendly", "Great educational resources"],
      cons: ["Strict rules", "High fees for some accounts", "Limited trading hours"],
      affiliateUrl: "https://ftmo.com",
      brand: "FTMO"
    },
    {
      id: 2,
      name: "The5%ers",
      category: "intermediate",
      price: 299,
      originalPrice: 399,
      couponCode: "INTER25",
      reviewScore: 4.6,
      trustRating: 8.8,
      description: "Perfect for intermediate traders seeking growth",
      features: ["$20K - $500K accounts", "8% profit target", "4% daily loss limit", "1:30 leverage"],
      image: "/placeholder.svg",
      profitSplit: 50,
      payoutRate: 92,
      fundingAmount: "$20K - $500K",
      userReviewCount: 987,
      pros: ["Flexible trading rules", "Multiple account sizes", "Good profit splits", "Regular promotions"],
      cons: ["Lower profit split initially", "Complex evaluation process", "Customer support can be slow"],
      affiliateUrl: "https://the5ers.com",
      brand: "The5%ers"
    },
    {
      id: 3,
      name: "TopStep",
      category: "pro",
      price: 599,
      originalPrice: 799,
      couponCode: "PRO30",
      reviewScore: 4.9,
      trustRating: 9.5,
      description: "Elite platform for professional traders",
      features: ["$50K - $1M accounts", "6% profit target", "3% daily loss limit", "Professional tools"],
      image: "/placeholder.svg",
      profitSplit: 90,
      payoutRate: 98,
      fundingAmount: "$50K - $1M",
      userReviewCount: 2341,
      pros: ["High profit splits", "Professional platform", "Excellent reputation", "Fast verification"],
      cons: ["Expensive entry fees", "Very strict rules", "Not suitable for beginners"],
      affiliateUrl: "https://topstep.com",
      brand: "TopStep"
    },
    {
      id: 4,
      name: "MyForexFunds",
      category: "intermediate",
      price: 199,
      originalPrice: 299,
      couponCode: "MFF20",
      reviewScore: 4.4,
      trustRating: 8.5,
      description: "Growing prop firm with competitive rates",
      features: ["$10K - $300K accounts", "12% profit target", "5% daily loss limit", "1:100 leverage"],
      image: "/placeholder.svg",
      profitSplit: 75,
      payoutRate: 88,
      fundingAmount: "$10K - $300K",
      userReviewCount: 634,
      pros: ["Competitive pricing", "Multiple challenge types", "Good customer service", "Weekly payouts"],
      cons: ["Newer company", "Limited track record", "Higher profit targets"],
      affiliateUrl: "https://myforexfunds.com",
      brand: "MyForexFunds"
    },
    {
      id: 5,
      name: "FundedNext",
      category: "beginner",
      price: 89,
      originalPrice: 129,
      couponCode: "NEXT30",
      reviewScore: 4.3,
      trustRating: 8.2,
      description: "Affordable option for new traders",
      features: ["$6K - $200K accounts", "8% profit target", "4% daily loss limit", "1:100 leverage"],
      image: "/placeholder.svg",
      profitSplit: 80,
      payoutRate: 90,
      fundingAmount: "$6K - $200K",
      userReviewCount: 423,
      pros: ["Very affordable", "Quick evaluation", "Good for beginners", "Flexible rules"],
      cons: ["Lower funding amounts", "Newer platform", "Limited advanced features"],
      affiliateUrl: "https://fundednext.com",
      brand: "FundedNext"
    }
  ]);

  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');

  const addPropFirm = (newFirm: Omit<PropFirm, 'id'>) => {
    const id = Math.max(...propFirms.map(f => f.id)) + 1;
    setPropFirms([...propFirms, { ...newFirm, id }]);
  };

  const updatePropFirm = (id: number, updatedFirm: Partial<PropFirm>) => {
    setPropFirms(propFirms.map(firm => 
      firm.id === id ? { ...firm, ...updatedFirm } : firm
    ));
  };

  const deletePropFirm = (id: number) => {
    setPropFirms(propFirms.filter(firm => firm.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      {!isAdminMode ? (
        <>
          <Hero />
          <PropFirmSection 
            propFirms={propFirms}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <Footer />
        </>
      ) : (
        <AdminPanel 
          propFirms={propFirms}
          onAdd={addPropFirm}
          onUpdate={updatePropFirm}
          onDelete={deletePropFirm}
        />
      )}
    </div>
  );
};

export default Index;
