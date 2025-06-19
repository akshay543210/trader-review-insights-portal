
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropFirm } from "../types/supabase";
import { useToast } from "@/hooks/use-toast";

interface AdminFirmsListProps {
  propFirms: PropFirm[];
  onEdit: (firm: PropFirm) => void;
  onDelete: (id: string) => void;
}

const AdminFirmsList = ({ propFirms, onEdit, onDelete }: AdminFirmsListProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prop firm?')) {
      onDelete(id);
      toast({
        title: "Success",
        description: "Prop firm deleted successfully!",
      });
    }
  };

  return (
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
                  {firm.brand}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{firm.description}</p>
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
  );
};

export default AdminFirmsList;
