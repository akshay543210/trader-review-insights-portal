import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropFirm } from "../types/supabase";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "../hooks/useCategories";
import { Loader2, AlertCircle, Save, Plus } from "lucide-react";

interface AdminFormPanelProps {
  onAdd: (firm: Partial<PropFirm>) => Promise<any>;
  onUpdate: (id: string, firm: Partial<PropFirm>) => Promise<any>;
  editingFirm: PropFirm | null;
  setEditingFirm: (firm: PropFirm | null) => void;
  loading?: boolean;
}

const AdminFormPanel = ({ onAdd, onUpdate, editingFirm, setEditingFirm, loading = false }: AdminFormPanelProps) => {
  const { toast } = useToast();
  const { categories, loading: categoriesLoading } = useCategories();
  
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
    slug: '',
    platform: '',
    max_funding: '',
    evaluation_model: '',
    starting_fee: 0,
    regulation: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      slug: '',
      platform: '',
      max_funding: '',
      evaluation_model: '',
      starting_fee: 0,
      regulation: ''
    });
    setEditingFirm(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Firm name is required';
    }
    if (!formData.funding_amount.trim()) {
      newErrors.funding_amount = 'Funding amount is required';
    }
    if (formData.price < 0) {
      newErrors.price = 'Price must be 0 or greater';
    }
    if (formData.original_price < 0) {
      newErrors.original_price = 'Original price must be 0 or greater';
    }
    if (formData.profit_split < 0 || formData.profit_split > 100) {
      newErrors.profit_split = 'Profit split must be between 0 and 100';
    }
    if (formData.payout_rate < 0 || formData.payout_rate > 100) {
      newErrors.payout_rate = 'Payout rate must be between 0 and 100';
    }
    if (formData.review_score < 0 || formData.review_score > 5) {
      newErrors.review_score = 'Review score must be between 0 and 5';
    }
    if (formData.trust_rating < 0 || formData.trust_rating > 10) {
      newErrors.trust_rating = 'Trust rating must be between 0 and 10';
    }
    if (formData.starting_fee < 0) {
      newErrors.starting_fee = 'Starting fee must be 0 or greater';
    }
    if (formData.affiliate_url && !formData.affiliate_url.startsWith('http')) {
      newErrors.affiliate_url = 'Affiliate URL must start with http:// or https://';
    }
    if (formData.logo_url && !formData.logo_url.startsWith('/') && !formData.logo_url.startsWith('http')) {
      newErrors.logo_url = 'Logo URL must be a valid path or URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      const firmData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        pros: formData.pros.split(',').map(f => f.trim()).filter(f => f),
        cons: formData.cons.split(',').map(f => f.trim()).filter(f => f),
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        category_id: formData.category_id || null,
        starting_fee: formData.starting_fee > 0 ? formData.starting_fee : null,
      };

      let result;
      if (editingFirm) {
        result = await onUpdate(editingFirm.id, firmData);
      } else {
        result = await onAdd(firmData);
      }

      if (result.success) {
        resetForm();
        toast({
          title: "Success",
          description: editingFirm ? "Prop firm updated successfully!" : "Prop firm added successfully!",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
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
      slug: firm.slug,
      platform: firm.platform || '',
      max_funding: firm.max_funding || '',
      evaluation_model: firm.evaluation_model || '',
      starting_fee: firm.starting_fee || 0,
      regulation: firm.regulation || ''
    });
    setEditingFirm(firm);
    setErrors({});
  };

  useEffect(() => {
    if (editingFirm) {
      handleEdit(editingFirm);
    }
  }, [editingFirm]);

  const inputClassName = (fieldName: string) => 
    `bg-slate-700 border-blue-500/20 text-white ${errors[fieldName] ? 'border-red-500' : ''}`;

  const isFormValid = formData.name.trim() && formData.funding_amount.trim();

  return (
    <Card className="bg-slate-800/50 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {editingFirm ? (
            <>
              <Save className="h-5 w-5" />
              Edit Prop Firm
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Add New Prop Firm
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <Label htmlFor="name" className="text-gray-300">Firm Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={inputClassName('name')}
              disabled={loading}
              placeholder="Enter firm name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="brand" className="text-gray-300">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              className={inputClassName('brand')}
              disabled={loading}
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-gray-300">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className={inputClassName('slug')}
              placeholder="auto-generated from name if empty"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="category_id" className="text-gray-300">Category</Label>
            {categoriesLoading ? (
              <div className="flex items-center gap-2 text-gray-400 p-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading categories...
              </div>
            ) : (
              <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})} disabled={loading}>
                <SelectTrigger className="bg-slate-700 border-blue-500/20 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-blue-500/20">
                  <SelectItem value="" className="text-white hover:bg-slate-700">No Category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-white hover:bg-slate-700">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-gray-300">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className={inputClassName('price')}
                disabled={loading}
              />
              {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <Label htmlFor="original_price" className="text-gray-300">Original Price ($)</Label>
              <Input
                id="original_price"
                type="number"
                min="0"
                step="0.01"
                value={formData.original_price}
                onChange={(e) => setFormData({...formData, original_price: Number(e.target.value)})}
                className={inputClassName('original_price')}
                disabled={loading}
              />
              {errors.original_price && <p className="text-red-400 text-sm mt-1">{errors.original_price}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="starting_fee" className="text-gray-300">Starting Fee ($)</Label>
              <Input
                id="starting_fee"
                type="number"
                value={formData.starting_fee}
                onChange={(e) => setFormData({...formData, starting_fee: Number(e.target.value)})}
                className={inputClassName('starting_fee')}
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="coupon_code" className="text-gray-300">Coupon Code</Label>
              <Input
                id="coupon_code"
                value={formData.coupon_code}
                onChange={(e) => setFormData({...formData, coupon_code: e.target.value})}
                className={inputClassName('coupon_code')}
                disabled={loading}
              />
            </div>
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
                className={inputClassName('profit_split')}
                disabled={loading}
              />
              {errors.profit_split && <p className="text-red-400 text-sm mt-1">{errors.profit_split}</p>}
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
                className={inputClassName('payout_rate')}
                disabled={loading}
              />
              {errors.payout_rate && <p className="text-red-400 text-sm mt-1">{errors.payout_rate}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="funding_amount" className="text-gray-300">Funding Amount *</Label>
            <Input
              id="funding_amount"
              value={formData.funding_amount}
              onChange={(e) => setFormData({...formData, funding_amount: e.target.value})}
              className={inputClassName('funding_amount')}
              placeholder="e.g., $100,000"
              disabled={loading}
            />
            {errors.funding_amount && <p className="text-red-400 text-sm mt-1">{errors.funding_amount}</p>}
          </div>

          <div>
            <Label htmlFor="max_funding" className="text-gray-300">Max Funding</Label>
            <Input
              id="max_funding"
              value={formData.max_funding}
              onChange={(e) => setFormData({...formData, max_funding: e.target.value})}
              className={inputClassName('max_funding')}
              placeholder="e.g., $500,000"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="review_score" className="text-gray-300">Review Score (0-5)</Label>
              <Input
                id="review_score"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.review_score}
                onChange={(e) => setFormData({...formData, review_score: Number(e.target.value)})}
                className={inputClassName('review_score')}
                disabled={loading}
              />
              {errors.review_score && <p className="text-red-400 text-sm mt-1">{errors.review_score}</p>}
            </div>
            <div>
              <Label htmlFor="trust_rating" className="text-gray-300">Trust Rating (0-10)</Label>
              <Input
                id="trust_rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.trust_rating}
                onChange={(e) => setFormData({...formData, trust_rating: Number(e.target.value)})}
                className={inputClassName('trust_rating')}
                disabled={loading}
              />
              {errors.trust_rating && <p className="text-red-400 text-sm mt-1">{errors.trust_rating}</p>}
            </div>
            <div>
              <Label htmlFor="user_review_count" className="text-gray-300">User Reviews</Label>
              <Input
                id="user_review_count"
                type="number"
                min="0"
                value={formData.user_review_count}
                onChange={(e) => setFormData({...formData, user_review_count: Number(e.target.value)})}
                className={inputClassName('user_review_count')}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="platform" className="text-gray-300">Platform</Label>
            <Input
              id="platform"
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className={inputClassName('platform')}
              placeholder="e.g., MetaTrader 4, cTrader"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="evaluation_model" className="text-gray-300">Evaluation Model</Label>
            <Input
              id="evaluation_model"
              value={formData.evaluation_model}
              onChange={(e) => setFormData({...formData, evaluation_model: e.target.value})}
              className={inputClassName('evaluation_model')}
              placeholder="e.g., Two-step, One-step"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="regulation" className="text-gray-300">Regulation</Label>
            <Input
              id="regulation"
              value={formData.regulation}
              onChange={(e) => setFormData({...formData, regulation: e.target.value})}
              className={inputClassName('regulation')}
              placeholder="e.g., ASIC, FCA, CYSEC"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="affiliate_url" className="text-gray-300">Affiliate URL</Label>
            <Input
              id="affiliate_url"
              type="url"
              value={formData.affiliate_url}
              onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})}
              className={inputClassName('affiliate_url')}
              placeholder="https://..."
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="logo_url" className="text-gray-300">Logo URL</Label>
            <Input
              id="logo_url"
              type="url"
              value={formData.logo_url}
              onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
              className={inputClassName('logo_url')}
              placeholder="https://... or /path/to/image"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-slate-700 border-blue-500/20 text-white"
              disabled={loading}
              rows={3}
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
              disabled={loading}
              rows={2}
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
              disabled={loading}
              rows={2}
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
              disabled={loading}
              rows={2}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingFirm ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {editingFirm ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Firm
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Firm
                    </>
                  )}
                </>
              )}
            </Button>
            {editingFirm && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm} 
                className="border-gray-400 text-gray-400 hover:bg-gray-700"
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Please fix the following errors:</span>
              </div>
              <ul className="list-disc list-inside text-red-400 text-sm mt-2">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminFormPanel;
