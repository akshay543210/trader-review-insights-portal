
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropFirm } from "../types/supabase";
import { Loader2 } from "lucide-react";

interface AdminFirmsListProps {
  propFirms: PropFirm[];
  onEdit: (firm: PropFirm) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const AdminFirmsList = ({ propFirms, onEdit, onDelete, loading = false }: AdminFirmsListProps) => {
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white">
          Existing Prop Firms ({propFirms.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            <span className="ml-2 text-gray-300">Loading firms...</span>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {propFirms.map((firm) => (
              <div key={firm.id} className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold">{firm.name}</h4>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded capitalize">
                    {firm.brand}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{firm.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-300">
                    ${firm.price} • ⭐ {firm.review_score} • Trust: {firm.trust_rating}/10
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(firm)}
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(firm.id, firm.name)}
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {propFirms.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No prop firms found.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminFirmsList;
