
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropFirm } from '@/types/propfirms';
import { Edit, Trash2, Loader2 } from 'lucide-react';

interface PropFirmListProps {
  propFirms: PropFirm[];
  onEdit: (firm: PropFirm) => void;
  onDelete: (id: string) => Promise<any>;
  loading?: boolean;
}

const PropFirmList = ({ propFirms, onEdit, onDelete, loading = false }: PropFirmListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white">
          Prop Firms ({propFirms.length})
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
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{firm.name}</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-300">
                      <div>
                        <span className="text-gray-400">Cost:</span> ${firm.cost}
                      </div>
                      <div>
                        <span className="text-gray-400">Payout:</span> {firm.payout}%
                      </div>
                      {firm.platform && (
                        <div className="col-span-2">
                          <span className="text-gray-400">Platform:</span> {firm.platform}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Created: {new Date(firm.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(firm)}
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                      disabled={loading}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(firm.id, firm.name)}
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                      disabled={loading || deletingId === firm.id}
                    >
                      {deletingId === firm.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3 mr-1" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {propFirms.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No prop firms found.</p>
                <p className="text-gray-500 text-sm mt-1">Add your first prop firm using the form above.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropFirmList;
