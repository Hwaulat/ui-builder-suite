import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, Plus, Server, ChevronDown, Info } from "lucide-react";
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
  { id: 1, equipmentName: "Extruder Machine A", standardType: "Numeric" },
  { id: 2, equipmentName: "Molding Press B", standardType: "Free Text" },
  { id: 3, equipmentName: "Assembly Line C", standardType: "Dropdown" },
  { id: 4, equipmentName: "Testing Rig D", standardType: "Input Compound" },
  { id: 5, equipmentName: "Packaging Unit E", standardType: "P/N & Length" },
  { id: 6, equipmentName: "CNC Milling Machine F", standardType: "8 Point Number" },
  { id: 7, equipmentName: "Laser Cutter G", standardType: "Numeric" },
  { id: 8, equipmentName: "Welding Robot H", standardType: "Dropdown" },
];

const standardTypeOptions = [
  { label: 'Free Text', value: 'Free Text' },
  { label: 'Dropdown', value: 'Dropdown' },
  { label: 'Numeric', value: 'Numeric' },
  { label: 'Input Compound', value: 'Input Compound' },
  { label: 'P/N & Length', value: 'P/N & Length' },
  { label: '8 Point Number', value: '8 Point Number' }
];

function MasterDataEquipmentPage() {
  const [equipments, setEquipments] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const renderStandardTypePreview = (type: string) => {
    switch (type) {
      case "Free Text":
        return (
          <div className="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <Label className="text-xs text-gray-500 mb-2 block">Preview: Free Text</Label>
            <Input placeholder="Free text input..." disabled className="bg-white" />
          </div>
        );
      case "Dropdown":
        return (
          <div className="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <Label className="text-xs text-gray-500 mb-2 block">Preview: Dropdown (OK/NG)</Label>
            <SelectInput 
              isMulti={false}
              datalist={[{label: 'OK', value: 'OK'}, {label: 'NG', value: 'NG'}]}
              placeholder="Select OK/NG..."
              disabled
              containerClassName="bg-white"
            />
          </div>
        );
      case "Numeric":
        return (
          <div className="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <Label className="text-xs text-gray-500 mb-2 block">Preview: Numeric</Label>
            <Input type="number" placeholder="0.00" disabled className="bg-white" />
          </div>
        );
      case "Input Compound":
        return (
          <div className="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <Label className="text-xs text-gray-500 mb-2 block">Preview: Input Compound</Label>
            <div className="flex gap-2">
              <Input placeholder="Input 1" disabled className="bg-white" />
              <Input placeholder="Input 2" disabled className="bg-white" />
            </div>
          </div>
        );
      case "P/N & Length":
        return (
          <div className="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <Label className="text-xs text-gray-500 mb-2 block">Preview: P/N & Length</Label>
            <div className="flex gap-2">
              <Input placeholder="Part Number" disabled className="bg-white w-2/3" />
              <Input placeholder="Length" disabled className="bg-white w-1/3" />
            </div>
          </div>
        );
      case "8 Point Number":
        return (
          <div className="mt-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <Label className="text-xs text-gray-500 mb-2 block">Preview: 8 Point Number</Label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({length: 8}).map((_, i) => (
                <Input key={i} placeholder={`Pt ${i+1}`} disabled className="bg-white text-center px-2" />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Add State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newStandardType, setNewStandardType] = useState("");

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
    setNewStandardType("");
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
          <Server className="w-6 h-6 text-gray-800" />
          <h2 className="text-xl font-bold tracking-tight text-gray-800">Master Data - Equipment</h2>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-transparent">
          <div className="w-full">
            <Search 
              placeholder="Search by equipment name or standard type..." 
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
            <DialogContent className="max-w-[1000px] w-[90vw] h-auto p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">Add New Equipment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="equipmentName">Equipment Name</Label>
                  <Input 
                    id="equipmentName" 
                    placeholder="Enter equipment name" 
                    className="h-10 border-gray-200" 
                    value={newEquipmentName}
                    onChange={(e) => setNewEquipmentName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 z-50">
                  <Label htmlFor="standardType">Standard Type</Label>
                  <SelectInput 
                    isMulti={false}
                    datalist={standardTypeOptions}
                    defValue={newStandardType}
                    onChange={(val) => setNewStandardType(val || "")}
                    formatOptionLabel={(option: any) => (
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  />
                  {renderStandardTypePreview(newStandardType)}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" className="px-6 rounded-lg font-medium border-gray-200" label="Cancel" onClick={() => setIsAddOpen(false)} />
                <Button variant="primary" className="px-6 rounded-lg font-medium bg-[#2b5a9e] hover:bg-[#22487e] text-white" label="Save Equipment" onClick={handleAddSave} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-[1000px] w-[90vw] h-auto p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">Edit Equipment</DialogTitle>
            </DialogHeader>
            {editEquipment && (
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editEquipmentName">Equipment Name</Label>
                  <Input 
                    id="editEquipmentName" 
                    placeholder="Enter equipment name" 
                    className="h-10 border-gray-200" 
                    value={editEquipment.equipmentName}
                    onChange={(e) => setEditEquipment({ ...editEquipment, equipmentName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 z-50">
                  <Label htmlFor="editStandardType">Standard Type</Label>
                  <SelectInput 
                    isMulti={false}
                    datalist={standardTypeOptions}
                    defValue={editEquipment.standardType}
                    onChange={(val) => setEditEquipment({ ...editEquipment, standardType: val || "" })}
                    formatOptionLabel={(option: any) => (
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  />
                  {renderStandardTypePreview(editEquipment.standardType)}
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
                  <div className="flex items-center gap-1">EQUIPMENT NAME <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
                </TableHead>
                <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                  <div className="flex items-center gap-1">STANDARD TYPE <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
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
                        className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-500" 
                        icon={<Trash2 className="!w-[17px] !h-[17px] text-red-500" />} 
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
