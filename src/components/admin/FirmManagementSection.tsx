
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdminOperations } from '@/hooks/useAdminOperations';
import { PropFirm } from '@/types/supabase';
import { Edit, Trash2, Plus } from 'lucide-react';
import AdminFormPanel from '../AdminFormPanel';

interface FirmManagementSectionProps {
  title: string;
  firms: PropFirm[];
  onRefresh: () => void;
  filterFn?: (firm: PropFirm) => boolean;
}

export const FirmManagementSection: React.FC<FirmManagementSectionProps> = ({
  title,
  firms,
  onRefresh,
  filterFn
}) => {
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { addFirm, updateFirm, deleteFirm, loading } = useAdminOperations();

  const filteredFirms = filterFn ? firms.filter(filterFn) : firms;

  const handleEdit = (firm: PropFirm) => {
    setEditingFirm(firm);
    setShowAddForm(false);
  };

  const handleDelete = async (firmId: string) => {
    if (window.confirm('Are you sure you want to delete this firm?')) {
      const result = await deleteFirm(firmId);
      if (result.success) {
        onRefresh();
      }
    }
  };

  const handleAddNew = () => {
    setEditingFirm(null);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setEditingFirm(null);
    setShowAddForm(false);
    onRefresh();
  };

  const handleAdd = async (firmData: Partial<PropFirm>) => {
    const result = await addFirm(firmData);
    if (result.success) {
      handleFormClose();
    }
    return result;
  };

  const handleUpdate = async (id: string, updates: Partial<PropFirm>) => {
    const result = await updateFirm(id, updates);
    if (result.success) {
      handleFormClose();
    }
    return result;
  };

  return (
    <Card className="bg-slate-800/50 border-blue-500/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">{title}</CardTitle>
          <Button
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {(editingFirm || showAddForm) && (
          <div className="mb-6">
            <AdminFormPanel
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              editingFirm={editingFirm}
              setEditingFirm={setEditingFirm}
              loading={loading}
            />
          </div>
        )}

        <div className="grid gap-4">
          {filteredFirms.map((firm) => (
            <Card key={firm.id} className="bg-slate-700/50 border-slate-600">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{firm.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        ${firm.price}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {firm.funding_amount}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      Profit Split: {firm.profit_split}% | Payout: {firm.payout_rate}%
                    </p>
                    <p className="text-gray-400 text-sm">
                      Score: {firm.review_score} | Trust: {firm.trust_rating}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(firm)}
                      variant="outline"
                      size="sm"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(firm.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-slate-900"
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredFirms.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No firms found in this category.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
