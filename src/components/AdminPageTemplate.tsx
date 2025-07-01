
import { useState } from 'react';
import { PropFirm } from '@/types/propfirms';
import { usePropFirms } from '@/hooks/usePropFirms';
import PropFirmForm from './PropFirmForm';
import PropFirmList from './PropFirmList';

interface AdminPageTemplateProps {
  category: 'explore' | 'cheap' | 'top';
  title: string;
}

const AdminPageTemplate = ({ category, title }: AdminPageTemplateProps) => {
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);
  const { propFirms, loading, addPropFirm, updatePropFirm, deletePropFirm } = usePropFirms(category);

  const handleAddFirm = async (firmData: Omit<PropFirm, 'id' | 'created_at' | 'user_id'>) => {
    const result = await addPropFirm(firmData);
    return result;
  };

  const handleUpdateFirm = async (firmData: Omit<PropFirm, 'id' | 'created_at' | 'user_id'>) => {
    if (!editingFirm) return;
    const result = await updatePropFirm(editingFirm.id, firmData);
    if (result.success) {
      setEditingFirm(null);
    }
    return result;
  };

  const handleEditFirm = (firm: PropFirm) => {
    setEditingFirm(firm);
  };

  const handleCancelEdit = () => {
    setEditingFirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">Manage prop firms in the {category} category</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PropFirmForm
              onSubmit={editingFirm ? handleUpdateFirm : handleAddFirm}
              editingFirm={editingFirm}
              onCancel={handleCancelEdit}
              loading={loading}
              category={category}
            />
          </div>

          <div>
            <PropFirmList
              propFirms={propFirms}
              onEdit={handleEditFirm}
              onDelete={deletePropFirm}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageTemplate;
