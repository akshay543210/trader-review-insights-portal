
import { useState } from "react";
import AdminFormPanel from "./AdminFormPanel";
import AdminFirmsList from "./AdminFirmsList";
import { PropFirm } from "../types/supabase";

interface AdminPanelProps {
  propFirms: PropFirm[];
  onAdd: (firm: Partial<PropFirm>) => void;
  onUpdate: (id: string, firm: Partial<PropFirm>) => void;
  onDelete: (id: string) => void;
}

const AdminPanel = ({ propFirms, onAdd, onUpdate, onDelete }: AdminPanelProps) => {
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);

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
            onAdd={onAdd}
            onUpdate={onUpdate}
            editingFirm={editingFirm}
            setEditingFirm={setEditingFirm}
          />
          
          <AdminFirmsList 
            propFirms={propFirms}
            onEdit={handleEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
