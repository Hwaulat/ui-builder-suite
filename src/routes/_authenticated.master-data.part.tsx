import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, Plus, Layers, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Search } from "@/components/ui/search";
import { SelectInput } from "@/components/ui/select-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import PaginationDefault from "@/components/ui/pagination";

export const Route = createFileRoute("/_authenticated/master-data/part")({
  component: MasterDataPartPage,
});

const initialData = [
  { id: 1, partNo: "918028", partName: "Hydraulic Hose" },
  { id: 2, partNo: "918028", partName: "Hose Connector" },
  { id: 3, partNo: "918028", partName: "Hose Clamp" },
  { id: 4, partNo: "918028", partName: "Rubber Seal" },
  { id: 5, partNo: "918028", partName: "O-Ring" },
  { id: 6, partNo: "918028", partName: "Coupling Assembly" },
  { id: 7, partNo: "918028", partName: "Steel Ferrule" },
  { id: 8, partNo: "918028", partName: "Adapter Fitting" },
  { id: 9, partNo: "918028", partName: "Elbow Fitting" },
  { id: 10, partNo: "918028", partName: "Protective Sleeve" },
];

function MasterDataPartPage() {
  const [parts, setParts] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  // Add State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPartNo, setNewPartNo] = useState("");
  const [newPartName, setNewPartName] = useState("");

  // Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPart, setEditPart] = useState<{ id: number; partNo: string; partName: string } | null>(null);



  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = parts.filter(item => 
    item.partNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.partName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddSave = () => {
    if (!newPartNo.trim() || !newPartName.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    const newId = parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1;
    setParts([{ id: newId, partNo: newPartNo, partName: newPartName }, ...parts]);
    toast.success("Part added successfully");
    setIsAddOpen(false);
    setNewPartNo("");
    setNewPartName("");
  };

  const openEdit = (part: typeof initialData[0]) => {
    setEditPart({ ...part });
    setIsEditOpen(true);
  };

  const handleEditSave = () => {
    if (!editPart) return;
    if (!editPart.partNo.trim() || !editPart.partName.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setParts(parts.map(p => p.id === editPart.id ? editPart : p));
    toast.success("Part updated successfully");
    setIsEditOpen(false);
  };

  const handleDelete = (id: number) => {
    setParts(parts.filter(p => p.id !== id));
    toast.success("Part deleted successfully");
  };

  return (
    <div className="flex-1 space-y-4 bg-[#f8fafc] p-6 h-full min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-gray-800" />
          <h2 className="text-xl font-bold tracking-tight text-gray-800">Master Data - Part</h2>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-transparent">
          <div className="w-full flex-1">
            <Search 
              placeholder="Search by part no & name" 
              className="bg-white"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 whitespace-nowrap">Part No. :</span>
              <Input 
                placeholder="Input part no" 
                className="h-10 w-[140px] border-gray-200 text-sm" 
                value={newPartNo}
                onChange={(e) => setNewPartNo(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 whitespace-nowrap">Part Name :</span>
              <Input 
                placeholder="Input part name" 
                className="h-10 w-[160px] border-gray-200 text-sm" 
                value={newPartName}
                onChange={(e) => setNewPartName(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              icon={<Plus className="h-4 w-4" />} 
              label="Add New"
              className="w-full sm:w-auto bg-[#F1F5F9] hover:bg-[#E2E8F0] border-transparent text-gray-600 rounded-lg px-4 h-10 shrink-0 font-medium"
              onClick={() => {
                if (!newPartNo.trim() || !newPartName.trim()) {
                  toast.error("Please fill both Part No and Part Name");
                  return;
                }
                handleAddSave();
              }}
            />
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-[1000px] w-[90vw] h-auto p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">Edit Part</DialogTitle>
            </DialogHeader>
            {editPart && (
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editPartNo">Part No</Label>
                  <Input 
                    id="editPartNo" 
                    placeholder="Enter part no" 
                    className="h-10 border-gray-200" 
                    value={editPart.partNo}
                    onChange={(e) => setEditPart({ ...editPart, partNo: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editPartName">Part Name</Label>
                  <Input 
                    id="editPartName" 
                    placeholder="Enter part name" 
                    className="h-10 border-gray-200" 
                    value={editPart.partName}
                    onChange={(e) => setEditPart({ ...editPart, partName: e.target.value })}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
              <Button variant="outline" className="px-6 rounded-lg font-medium border-gray-200" label="Cancel" onClick={() => setIsEditOpen(false)} />
              <Button variant="primary" className="px-6 rounded-lg font-medium bg-[#2b5a9e] hover:bg-[#22487e] text-white" label="Save Changes" onClick={handleEditSave} />
            </div>
          </DialogContent>
        </Dialog>



        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-[#f8fafc]">
              <TableRow className="hover:bg-transparent border-y border-gray-100">
                <TableHead className="w-[150px] font-semibold text-gray-500 text-xs tracking-wider py-4 pl-6">ACTION</TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                  <div className="flex items-center gap-1">PART NO. <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
                </TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                  <div className="flex items-center gap-1">PART NAME <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50/50 border-b border-gray-50 last:border-0 transition-colors">
                  <TableCell className="py-3 pl-6">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="icon" 
                        className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700" 
                        icon={<Edit2 className="!w-[17px] !h-[17px]" />} 
                        onClick={() => openEdit(row)}
                      />
                      <Button 
                        variant="icon" 
                        className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700" 
                        icon={<Trash2 className="!w-[17px] !h-[17px]" />} 
                        onClick={() => handleDelete(row.id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-700 text-sm py-3">{row.partNo}</TableCell>
                  <TableCell className="text-gray-500 text-sm py-3">{row.partName}</TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-gray-500">
                    No results found for "{searchQuery}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <PaginationDefault 
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
        />
      </div>
    </div>
  );
}
