
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import AdminPanel from "../components/AdminPanel";
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
