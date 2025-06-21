
import { useState, useEffect } from "react";
import AdminFormPanel from "./AdminFormPanel";
import AdminFirmsList from "./AdminFirmsList";
import { PropFirm } from "../types/supabase";
import { useAdminOperations } from "../hooks/useAdminOperations";
import { usePropFirms } from "../hooks/useSupabaseData";
import { useCategories } from "../hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

const AdminPanel = () => {
  const [editingFirm, setEditingFirm] = useState<PropFirm | null>(null);
  const [operationStatus, setOperationStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const { propFirms, loading: dataLoading, refetch } = usePropFirms();
  const { addFirm, updateFirm, deleteFirm, loading: operationLoading } = useAdminOperations();
  const { categories, loading: categoriesLoading } = useCategories();

  // Clear status after 5 seconds
  useEffect(() => {
    if (operationStatus.type) {
      const timer = setTimeout(() => {
        setOperationStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [operationStatus]);

  const handleAdd = async (firmData: Partial<PropFirm>) => {
    console.log('Adding firm with data:', firmData);
    setOperationStatus({ type: null, message: '' });
    
    try {
      const result = await addFirm(firmData);
      if (result.success) {
        setOperationStatus({ 
          type: 'success', 
          message: `Successfully added "${firmData.name}"` 
        });
        await refetch();
      } else {
        setOperationStatus({ 
          type: 'error', 
          message: result.error?.message || 'Failed to add prop firm' 
        });
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setOperationStatus({ type: 'error', message: errorMessage });
      return { success: false, error };
    }
  };

  const handleUpdate = async (id: string, updates: Partial<PropFirm>) => {
    console.log('Updating firm with id:', id, 'and data:', updates);
    setOperationStatus({ type: null, message: '' });
    
    try {
      const result = await updateFirm(id, updates);
      if (result.success) {
        setEditingFirm(null);
        setOperationStatus({ 
          type: 'success', 
          message: `Successfully updated "${updates.name || 'prop firm'}"` 
        });
        await refetch();
      } else {
        setOperationStatus({ 
          type: 'error', 
          message: result.error?.message || 'Failed to update prop firm' 
        });
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setOperationStatus({ type: 'error', message: errorMessage });
      return { success: false, error };
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting firm with id:', id);
    setOperationStatus({ type: null, message: '' });
    
    try {
      const result = await deleteFirm(id);
      if (result.success) {
        setOperationStatus({ 
          type: 'success', 
          message: 'Successfully deleted prop firm' 
        });
        await refetch();
      } else {
        setOperationStatus({ 
          type: 'error', 
          message: result.error?.message || 'Failed to delete prop firm' 
        });
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setOperationStatus({ type: 'error', message: errorMessage });
      return { success: false, error };
    }
  };

  const handleEdit = (firm: PropFirm) => {
    console.log('Editing firm:', firm);
    setEditingFirm(firm);
    setOperationStatus({ type: null, message: '' });
  };

  const handleRefresh = async () => {
    setOperationStatus({ type: null, message: '' });
    await refetch();
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
            <p className="text-gray-300">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">
            Manage prop firms, add new ones, and update existing information
          </p>
          <div className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-4">
            <span>Categories loaded: {categories.length}</span>
            <span>•</span>
            <span>Prop firms: {propFirms.length}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="ml-2 text-blue-400 hover:text-blue-300"
              disabled={dataLoading}
            >
              <RefreshCw className={`h-4 w-4 ${dataLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Operation Status */}
        {operationStatus.type && (
          <Card className="mb-6 border-0">
            <CardContent className={`p-4 ${
              operationStatus.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-red-500/10 border-red-500/20'
            } rounded-lg border`}>
              <div className="flex items-center gap-2">
                {operationStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`${
                  operationStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                } font-medium`}>
                  {operationStatus.message}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

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
