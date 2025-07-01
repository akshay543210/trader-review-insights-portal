
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropFirm } from '@/types/propfirms';
import { Loader2, Plus, Save, X } from 'lucide-react';

interface PropFirmFormProps {
  onSubmit: (data: Omit<PropFirm, 'id' | 'created_at' | 'user_id'>) => Promise<any>;
  editingFirm?: PropFirm | null;
  onCancel?: () => void;
  loading?: boolean;
  category: 'explore' | 'cheap' | 'top';
}

const PropFirmForm = ({ onSubmit, editingFirm, onCancel, loading = false, category }: PropFirmFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    cost: 0,
    payout: 0,
    platform: '',
    category: category
  });

  useEffect(() => {
    if (editingFirm) {
      setFormData({
        name: editingFirm.name,
        cost: editingFirm.cost,
        payout: editingFirm.payout,
        platform: editingFirm.platform || '',
        category: editingFirm.category
      });
    } else {
      setFormData({
        name: '',
        cost: 0,
        payout: 0,
        platform: '',
        category: category
      });
    }
  }, [editingFirm, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await onSubmit({
      ...formData,
      platform: formData.platform || null,
    });
    
    if (result?.success) {
      setFormData({
        name: '',
        cost: 0,
        payout: 0,
        platform: '',
        category: category
      });
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Firm Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Cost ($)"
                value={formData.cost}
                onChange={(e) => setFormData(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Payout (%)"
                value={formData.payout}
                onChange={(e) => setFormData(prev => ({ ...prev, payout: parseInt(e.target.value) || 0 }))}
                required
                min="0"
                max="100"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div>
            <Select
              value={formData.platform}
              onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MT4">MT4</SelectItem>
                <SelectItem value="MT5">MT5</SelectItem>
                <SelectItem value="MT4/MT5">MT4/MT5</SelectItem>
                <SelectItem value="cTrader">cTrader</SelectItem>
                <SelectItem value="DXTrade">DXTrade</SelectItem>
                <SelectItem value="WebTrader">WebTrader</SelectItem>
                <SelectItem value="Proprietary">Proprietary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
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
            {editingFirm && onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-gray-400 text-gray-400 hover:bg-gray-700"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropFirmForm;
