import { useState } from "react";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

const Reviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState<string>("all");
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prop Firm Reviews
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Read authentic reviews from real traders and share your own experience to help the community make informed decisions.
            </p>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Select value={selectedFirm} onValueChange={setSelectedFirm}>
                <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Filter by firm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Firms</SelectItem>
                  {/* Add more firm options dynamically */}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm
                firmId="sample-firm-id" // This would be dynamic
                firmName="Sample Firm" // This would be dynamic
                onSuccess={() => setShowReviewForm(false)}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {/* Reviews List */}
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Latest Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewList
                firmId={selectedFirm === "all" ? undefined : selectedFirm}
                showFirmName={selectedFirm === "all"}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reviews;