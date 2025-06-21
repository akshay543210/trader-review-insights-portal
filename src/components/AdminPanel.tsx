
import { useState } from "react";
import AdminFormPanel from "./AdminFormPanel";
import AdminFirmsList from "./AdminFirmsList";
import { PropFirm } from "../types/supabase";
import { useAdminOperations } from "../hooks/useAdminOperations";
import { usePropFirms } from "../hooks/useSupabaseData";
import { useCategories } from "../hooks/useCategories";

const AdminPanel = () => {
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);
  const { propFirms, loading: dataLoading, refetch } = usePropFirms();
  const { addFirm, updateFirm, deleteFirm, loading: operationLoading } = useAdminOperations();
  const { categories } = useCategories();

  const handleAdd = async (firmData: Partial<PropFirm>) => {
    console.log('Adding firm with data:', firmData);
    const result = await addFirm(firmData);
    if (result.success) {
      await refetch();
    }
    return result;
  };

  const handleUpdate = async (id: string, updates: Partial<PropFirm>) => {
    console.log('Updating firm with id:', id, 'and data:', updates);
    const result = await updateFirm(id, updates);
    if (result.success) {
      setEditingFirm(null);
      await refetch();
    }
    return result;
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting firm with id:', id);
    const result = await deleteFirm(id);
    if (result.success) {
      await refetch();
    }
    return result;
  };

  const handleEdit = (firm: PropFirm) => {
    console.log('Editing firm:', firm);
    setEditingFirm(firm);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">
            Manage prop firms, add new ones, and update existing information
          </p>
          <div className="text-sm text-gray-400 mt-2">
            Categories loaded: {categories.length} | Prop firms: {propFirms.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminFormPanel 
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editingFirm={editingFirm}
            setEditingFirm={setEditingFirm}
            loading={operationLoading}
          />
          
          <AdminFirmsList 
            propFirms={propFirms}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={dataLoading || operationLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
