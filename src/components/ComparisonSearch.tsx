
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropFirm } from "../types";

interface ComparisonSearchProps {
  propFirms: PropFirm[];
  selectedFirms: PropFirm[];
  onAddFirm: (firm: PropFirm) => void;
}

const ComparisonSearch = ({ propFirms, selectedFirms, onAddFirm }: ComparisonSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredFirms = propFirms.filter(firm =>
    firm.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedFirms.find(f => f.id === firm.id)
  );

  return (
    <div className="mb-8">
      <Card className="bg-slate-800/50 border-blue-500/20">
        <CardContent className="p-6">
          <div className="relative">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search prop firms to compare..."
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(e.target.value.length > 0);
                }}
                onFocus={() => setShowDropdown(searchTerm.length > 0)}
              />
            </div>

            {showDropdown && filteredFirms.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredFirms.slice(0, 5).map((firm) => (
                  <div
                    key={firm.id}
                    className="p-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-b-0"
                    onClick={() => {
                      onAddFirm(firm);
                      setSearchTerm('');
                      setShowDropdown(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{firm.name}</h4>
                        <p className="text-sm text-gray-400">{firm.category} • ${firm.price}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-400">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Selected: {selectedFirms.length}/4 firms
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonSearch;
