import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, Plus, Layers, ChevronDown, Info, ChevronsUpDown, Eye } from "lucide-react";
import { Search } from "@/components/ui/search";
import { SelectInput } from "@/components/ui/select-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import PaginationDefault from "@/components/ui/pagination";

export const Route = createFileRoute("/_authenticated/master-data/equipment")({
  component: MasterDataEquipmentPage,
});

const initialData = [
  { id: 1, equipmentName: "Compound", standardType: "Compound Mixer" },
  { id: 2, equipmentName: "Compound Batch No.", standardType: "Numeric" },
  { id: 3, equipmentName: "Yarn", standardType: "Numeric" },
  { id: 4, equipmentName: "Warp Yarn", standardType: "Numeric" },
  { id: 5, equipmentName: "Nipple", standardType: "Dropdown" },
  { id: 6, equipmentName: "Die", standardType: "Dropdown" },
  { id: 7, equipmentName: "Vacum Die", standardType: "Numeric" },
  { id: 8, equipmentName: "Head", standardType: "Numeric" },
  { id: 9, equipmentName: "Cylinder 1", standardType: "Dropdown" },
  { id: 10, equipmentName: "Hose Thickness (8 Point)", standardType: "Hose Thickness Point 1-8 (mm)" },
];

const standardTypeOptions = [
  { label: 'Free Text', value: 'Free Text' },
  { label: 'Dropdown', value: 'Dropdown' },
  { label: 'Numeric', value: 'Numeric' },
  { label: 'Compound Mixer', value: 'Compound Mixer' },
  { label: 'Cutting Machine', value: 'Cutting Machine' },
  { label: 'Hose Thickness Point 1-8 (mm)', value: 'Hose Thickness Point 1-8 (mm)' }
];

function MasterDataEquipmentPage() {
  const [equipments, setEquipments] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const renderStandardTypePreview = (type: string) => {
    let content = null;
    switch (type) {
      case "Free Text":
        content = <Input placeholder="Input equipment name" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700" />;
        break;
      case "Dropdown":
        content = (
          <div className="flex gap-4 w-full">
            <div className="relative w-1/2 h-10 rounded-lg bg-[#e8f5e9] border border-[#c8e6c9] flex items-center px-4">
              <span className="text-sm text-[#2e7d32]">OK</span>
              <ChevronDown className="w-4 h-4 text-[#2e7d32] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="relative w-1/2 h-10 rounded-lg bg-[#ffebee] border border-[#ffcdd2] flex items-center px-4">
              <span className="text-sm text-[#c62828]">NG</span>
              <ChevronDown className="w-4 h-4 text-[#c62828] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        );
        break;
      case "Numeric":
        content = (
          <div className="relative">
            <Input type="number" placeholder="00.00" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 pr-8" />
            <ChevronsUpDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        );
        break;
      case "Compound Mixer":
        content = (
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-700 whitespace-nowrap">Compound :</span>
              <Input placeholder="Input compound" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full" />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-700 whitespace-nowrap">Tag :</span>
              <Input placeholder="Input tag" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full" />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-700 whitespace-nowrap">Pcs :</span>
              <Input placeholder="Input pcs" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full" />
            </div>
          </div>
        );
        break;
      case "Cutting Machine":
        content = (
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-700 whitespace-nowrap">Finishing P/N :</span>
              <div className="relative w-full">
                <Input type="number" placeholder="00.00" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full pr-8" />
                <ChevronsUpDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-700 whitespace-nowrap">Actual Length (mm) :</span>
              <div className="relative w-full">
                <Input type="number" placeholder="00.00" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full pr-8" />
                <ChevronsUpDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        );
        break;
      case "Hose Thickness Point 1-8 (mm)":
        content = (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-4">{num} :</span>
                  <div className="relative w-full">
                    <Input type="number" placeholder="00.00" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full pr-8" />
                    <ChevronsUpDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {[5, 6, 7, 8].map(num => (
                <div key={num} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-4">{num} :</span>
                  <div className="relative w-full">
                    <Input type="number" placeholder="00.00" disabled className="h-10 bg-[#cbd5e1]/50 border-transparent text-gray-700 w-full pr-8" />
                    <ChevronsUpDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      default:
        return null;
    }

    return (
      <div className="mt-2">
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Preview</Label>
        <div className="p-4 bg-[#f8fafc] rounded-xl border border-transparent">
          {content}
        </div>
      </div>
    );
  };

  // Add State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newStandardType, setNewStandardType] = useState(standardTypeOptions[0].value);

  // Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEquipment, setEditEquipment] = useState<{ id: number; equipmentName: string; standardType: string } | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = equipments.filter(item => 
    item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.standardType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddSave = () => {
    if (!newEquipmentName.trim() || !newStandardType.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    const newId = equipments.length > 0 ? Math.max(...equipments.map(e => e.id)) + 1 : 1;
    setEquipments([{ id: newId, equipmentName: newEquipmentName, standardType: newStandardType }, ...equipments]);
    toast.success("Equipment added successfully");
    setIsAddOpen(false);
    setNewEquipmentName("");
    setNewStandardType(standardTypeOptions[0].value);
  };

  const openEdit = (equipment: typeof initialData[0]) => {
    setEditEquipment({ ...equipment });
    setIsEditOpen(true);
  };

  const handleEditSave = () => {
    if (!editEquipment) return;
    if (!editEquipment.equipmentName.trim() || !editEquipment.standardType.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setEquipments(equipments.map(e => e.id === editEquipment.id ? editEquipment : e));
    toast.success("Equipment updated successfully");
    setIsEditOpen(false);
  };

  const handleDelete = (id: number) => {
    setEquipments(equipments.filter(e => e.id !== id));
    toast.success("Equipment deleted successfully");
  };

  return (
    <div className="flex-1 space-y-4 bg-[#f8fafc] p-6 h-full min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-gray-800" />
          <h2 className="text-xl font-bold tracking-tight text-gray-800">Master Data - Equipment</h2>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-transparent">
          <div className="w-full flex-1">
            <Search 
              placeholder="Search by measurement, toler" 
              className="bg-white"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="primary" 
                icon={<Plus className="h-4 w-4" />} 
                label="Add New Equipment"
                className="w-full sm:w-auto bg-[#2b5a9e] hover:bg-[#22487e] text-white rounded-lg px-6 h-10 shrink-0 font-medium"
              />
            </DialogTrigger>
            <DialogContent className="max-w-[800px] w-[90vw] h-auto p-6">
              <DialogHeader className="border-b border-gray-100 pb-4">
                <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Plus className="w-5 h-5" />
                  </div>
                  Add New Equipment
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="equipmentName" className="font-semibold text-gray-700">Equipment Name</Label>
                    <Input 
                      id="equipmentName" 
                      placeholder="Equipment A" 
                      className="h-10 border-gray-200" 
                      value={newEquipmentName}
                      onChange={(e) => setNewEquipmentName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2 z-50">
                    <Label htmlFor="standardType" className="font-semibold text-gray-700">Standar Type</Label>
                    <SelectInput 
                      isMulti={false}
                      datalist={standardTypeOptions}
                      defValue={newStandardType}
                      onChange={(val) => setNewStandardType(val || "")}
                    />
                  </div>
                </div>
                {renderStandardTypePreview(newStandardType)}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                <Button variant="outline" className="px-6 rounded-lg font-semibold border-gray-200 text-gray-700" label="Cancel" onClick={() => { setIsAddOpen(false); setNewEquipmentName(""); setNewStandardType(standardTypeOptions[0].value); }} />
                <Button variant="primary" className="px-6 rounded-lg font-semibold bg-[#2b5a9e] hover:bg-[#22487e] text-white" label="Save" onClick={handleAddSave} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-[800px] w-[90vw] h-auto p-6">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Edit2 className="w-5 h-5" />
                </div>
                Edit Equipment
              </DialogTitle>
            </DialogHeader>
            {editEquipment && (
              <div className="flex flex-col gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editEquipmentName" className="font-semibold text-gray-700">Equipment Name</Label>
                    <Input 
                      id="editEquipmentName" 
                      placeholder="Equipment A" 
                      className="h-10 border-gray-200" 
                      value={editEquipment.equipmentName}
                      onChange={(e) => setEditEquipment({ ...editEquipment, equipmentName: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2 z-50">
                    <Label htmlFor="editStandardType" className="font-semibold text-gray-700">Standar Type</Label>
                    <SelectInput 
                      isMulti={false}
                      datalist={standardTypeOptions}
                      defValue={editEquipment.standardType}
                      onChange={(val) => setEditEquipment({ ...editEquipment, standardType: val || "" })}
                    />
                  </div>
                </div>
                {renderStandardTypePreview(editEquipment.standardType)}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
              <Button variant="outline" className="px-6 rounded-lg font-semibold border-gray-200 text-gray-700" label="Cancel" onClick={() => setIsEditOpen(false)} />
              <Button variant="primary" className="px-6 rounded-lg font-semibold bg-[#2b5a9e] hover:bg-[#22487e] text-white" label="Save Changes" onClick={handleEditSave} />
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
                  <div className="flex items-center gap-1">EQUIPMENT NAME <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
                </TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                  <div className="flex items-center gap-1">STYANDAR TYPE <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
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
                        icon={<Eye className="!w-[17px] !h-[17px]" />} 
                      />
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
                  <TableCell className="font-medium text-gray-700 text-sm py-3">{row.equipmentName}</TableCell>
                  <TableCell className="text-gray-500 text-sm py-3">{row.standardType}</TableCell>
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
