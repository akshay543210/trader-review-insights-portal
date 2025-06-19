import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropFirm } from "../types/supabase";
import { useToast } from "@/hooks/use-toast";

interface AdminFormPanelProps {
  onAdd: (firm: Partial<PropFirm>) => void;
  onUpdate: (id: string, firm: Partial<PropFirm>) => void;
  editingFirm: PropFirm | null;
  setEditingFirm: (firm: PropFirm | null) => void;
}

const AdminFormPanel = ({ onAdd, onUpdate, editingFirm, setEditingFirm }: AdminFormPanelProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: 0,
    original_price: 0,
    coupon_code: '',
    review_score: 0,
    trust_rating: 0,
    description: '',
    features: '',
    logo_url: '/placeholder.svg',
    profit_split: 0,
    payout_rate: 0,
    funding_amount: '',
    user_review_count: 0,
    pros: '',
    cons: '',
    affiliate_url: '',
    brand: '',
    slug: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      price: 0,
      original_price: 0,
      coupon_code: '',
      review_score: 0,
      trust_rating: 0,
      description: '',
      features: '',
      logo_url: '/placeholder.svg',
      profit_split: 0,
      payout_rate: 0,
      funding_amount: '',
      user_review_count: 0,
      pros: '',
      cons: '',
      affiliate_url: '',
      brand: '',
      slug: ''
    });
    setEditingFirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const firmData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()),
      pros: formData.pros.split(',').map(f => f.trim()),
      cons: formData.cons.split(',').map(f => f.trim()),
      slug: formData.name.toLowerCase().replace(/\s+/g, '-')
    };

    if (editingFirm) {
      onUpdate(editingFirm.id, firmData);
      toast({
        title: "Success",
        description: "Prop firm updated successfully!",
      });
    } else {
      onAdd(firmData);
      toast({
        title: "Success", 
        description: "Prop firm added successfully!",
      });
    }

    resetForm();
  };

  const handleEdit = (firm: PropFirm) => {
    setFormData({
      name: firm.name,
      category_id: firm.category_id || '',
      price: firm.price,
      original_price: firm.original_price,
      coupon_code: firm.coupon_code || '',
      review_score: firm.review_score || 0,
      trust_rating: firm.trust_rating || 0,
      description: firm.description || '',
      features: firm.features?.join(', ') || '',
      logo_url: firm.logo_url || '/placeholder.svg',
      profit_split: firm.profit_split,
      payout_rate: firm.payout_rate,
      funding_amount: firm.funding_amount,
      user_review_count: firm.user_review_count || 0,
      pros: firm.pros?.join(', ') || '',
      cons: firm.cons?.join(', ') || '',
      affiliate_url: firm.affiliate_url || '',
      brand: firm.brand || '',
      slug: firm.slug
    });
    setEditingFirm(firm);
  };

  // Update form when editingFirm changes
  React.useEffect(() => {
    if (editingFirm) {
      handleEdit(editingFirm);
    }
  }, [editingFirm]);

  return (
    <Card className="bg-slate-800/50 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white">
          {editingFirm ? 'Edit Prop Firm' : 'Add New Prop Firm'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <Label htmlFor="name" className="text-gray-300">Firm Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="brand" className="text-gray-300">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="category_id" className="text-gray-300">Category</Label>
            <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
              <SelectTrigger className="bg-slate-700 border-blue-500/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-500/20">
                <SelectItem value="beginner" className="text-white hover:bg-slate-700">Beginner</SelectItem>
                <SelectItem value="intermediate" className="text-white hover:bg-slate-700">Intermediate</SelectItem>
                <SelectItem value="pro" className="text-white hover:bg-slate-700">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-gray-300">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="original_price" className="text-gray-300">Original Price ($)</Label>
              <Input
                id="original_price"
                type="number"
                value={formData.original_price}
                onChange={(e) => setFormData({...formData, original_price: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="coupon_code" className="text-gray-300">Coupon Code</Label>
            <Input
              id="coupon_code"
              value={formData.coupon_code}
              onChange={(e) => setFormData({...formData, coupon_code: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="profit_split" className="text-gray-300">Profit Split (%)</Label>
              <Input
                id="profit_split"
                type="number"
                min="0"
                max="100"
                value={formData.profit_split}
                onChange={(e) => setFormData({...formData, profit_split: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="payout_rate" className="text-gray-300">Payout Rate (%)</Label>
              <Input
                id="payout_rate"
                type="number"
                min="0"
                max="100"
                value={formData.payout_rate}
                onChange={(e) => setFormData({...formData, payout_rate: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="funding_amount" className="text-gray-300">Funding Amount</Label>
            <Input
              id="funding_amount"
              value={formData.funding_amount}
              onChange={(e) => setFormData({...formData, funding_amount: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              placeholder="e.g., $100,000"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="review_score" className="text-gray-300">Review Score (1-5)</Label>
              <Input
                id="review_score"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.review_score}
                onChange={(e) => setFormData({...formData, review_score: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="trust_rating" className="text-gray-300">Trust Rating (1-10)</Label>
              <Input
                id="trust_rating"
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.trust_rating}
                onChange={(e) => setFormData({...formData, trust_rating: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="user_review_count" className="text-gray-300">User Reviews</Label>
              <Input
                id="user_review_count"
                type="number"
                min="0"
                value={formData.user_review_count}
                onChange={(e) => setFormData({...formData, user_review_count: Number(e.target.value)})}
                className="bg-slate-700 border-blue-500/20 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="affiliate_url" className="text-gray-300">Affiliate URL</Label>
            <Input
              id="affiliate_url"
              type="url"
              value={formData.affiliate_url}
              onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="features" className="text-gray-300">Features (comma separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              placeholder="Feature 1, Feature 2, Feature 3"
              required
            />
          </div>

          <div>
            <Label htmlFor="pros" className="text-gray-300">Pros (comma separated)</Label>
            <Textarea
              id="pros"
              value={formData.pros}
              onChange={(e) => setFormData({...formData, pros: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              placeholder="Pro 1, Pro 2, Pro 3"
              required
            />
          </div>

          <div>
            <Label htmlFor="cons" className="text-gray-300">Cons (comma separated)</Label>
            <Textarea
              id="cons"
              value={formData.cons}
              onChange={(e) => setFormData({...formData, cons: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              placeholder="Con 1, Con 2, Con 3"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {editingFirm ? 'Update Firm' : 'Add Firm'}
            </Button>
            {editingFirm && (
              <Button type="button" variant="outline" onClick={resetForm} className="border-gray-400 text-gray-400">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminFormPanel;
