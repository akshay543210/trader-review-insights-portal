import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropFirm } from "../types";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  propFirms: PropFirm[];
  onAdd: (firm: Omit<PropFirm, 'id'>) => void;
  onUpdate: (id: number, firm: Partial<PropFirm>) => void;
  onDelete: (id: number) => void;
}

const AdminPanel = ({ propFirms, onAdd, onUpdate, onDelete }: AdminPanelProps) => {
  const { toast } = useToast();
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'beginner' as 'beginner' | 'intermediate' | 'pro',
    price: 0,
    originalPrice: 0,
    couponCode: '',
    reviewScore: 0,
    trustRating: 0,
    description: '',
    features: '',
    image: '/placeholder.svg'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'beginner',
      price: 0,
      originalPrice: 0,
      couponCode: '',
      reviewScore: 0,
      trustRating: 0,
      description: '',
      features: '',
      image: '/placeholder.svg'
    });
    setEditingFirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const firmData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim())
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
      category: firm.category,
      price: firm.price,
      originalPrice: firm.originalPrice,
      couponCode: firm.couponCode,
      reviewScore: firm.reviewScore,
      trustRating: firm.trustRating,
      description: firm.description,
      features: firm.features.join(', '),
      image: firm.image
    });
    setEditingFirm(firm);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this prop firm?')) {
      onDelete(id);
      toast({
        title: "Success",
        description: "Prop firm deleted successfully!",
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">Manage prop firms, add new ones, and update existing information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">
                {editingFirm ? 'Edit Prop Firm' : 'Add New Prop Firm'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="category" className="text-gray-300">Category</Label>
                  <Select value={formData.category} onValueChange={(value: 'beginner' | 'intermediate' | 'pro') => setFormData({...formData, category: value})}>
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
                    <Label htmlFor="originalPrice" className="text-gray-300">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                      className="bg-slate-700 border-blue-500/20 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="couponCode" className="text-gray-300">Coupon Code</Label>
                  <Input
                    id="couponCode"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({...formData, couponCode: e.target.value})}
                    className="bg-slate-700 border-blue-500/20 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewScore" className="text-gray-300">Review Score (1-5)</Label>
                    <Input
                      id="reviewScore"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.reviewScore}
                      onChange={(e) => setFormData({...formData, reviewScore: Number(e.target.value)})}
                      className="bg-slate-700 border-blue-500/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="trustRating" className="text-gray-300">Trust Rating (1-10)</Label>
                    <Input
                      id="trustRating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.trustRating}
                      onChange={(e) => setFormData({...formData, trustRating: Number(e.target.value)})}
                      className="bg-slate-700 border-blue-500/20 text-white"
                      required
                    />
                  </div>
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

          {/* Existing Firms List */}
          <Card className="bg-slate-800/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Existing Prop Firms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {propFirms.map((firm) => (
                  <div key={firm.id} className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{firm.name}</h4>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded capitalize">
                        {firm.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{firm.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-300">
                        ${firm.price} • ⭐ {firm.reviewScore} • Trust: {firm.trustRating}/10
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(firm)}
                          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(firm.id)}
                          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
