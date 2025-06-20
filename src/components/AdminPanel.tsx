
import { useState } from "react";
import AdminFormPanel from "./AdminFormPanel";
import AdminFirmsList from "./AdminFirmsList";
import { PropFirm } from "../types/supabase";
import { useAdminOperations } from "../hooks/useAdminOperations";
import { usePropFirms } from "../hooks/useSupabaseData";

const AdminPanel = () => {
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);
  const { propFirms, loading: dataLoading, refetch } = usePropFirms();
  const { addFirm, updateFirm, deleteFirm, loading: operationLoading } = useAdminOperations();

  const handleAdd = async (firmData: Partial<PropFirm>) => {
    const result = await addFirm(firmData);
    if (result.success) {
      refetch();
    }
  };

  const handleUpdate = async (id: string, updates: Partial<PropFirm>) => {
    const result = await updateFirm(id, updates);
    if (result.success) {
      setEditingFirm(null);
      refetch();
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteFirm(id);
    if (result.success) {
      refetch();
    }
  };

  const handleEdit = (firm: PropFirm) => {
    setEditingFirm(firm);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">Manage prop firms, add new ones, and update existing information</p>
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
