import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit2, Trash2, Plus, Layers, ChevronLeft, ChevronRight, ChevronDown, RotateCw } from "lucide-react";
import { Search } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tablist";
import { useState } from "react";
import PaginationDefault from "@/components/ui/pagination";

export const Route = createFileRoute("/_authenticated/master-data/checksheet")({
  component: MasterDataChecksheetPage,
});

const mockData = Array(10).fill({
  productNo: "IDC-935B (01-272B)",
  version: "V1",
  lotNo: "S702",
  lineNo: "-",
  autoValveNo: "-",
});

function MasterDataChecksheetPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 40; // Mock total items for display
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const mainContent = (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-transparent">
        <div className="w-full">
          <Search 
            placeholder="Search by product no, lot no, line no, auto valve no" 
            className="bg-white"
          />
        </div>
        <Button 
          variant="primary" 
          icon={<Plus className="h-4 w-4" />} 
          label="Add New Checksheet"
          className="w-full sm:w-auto bg-[#2b5a9e] hover:bg-[#22487e] text-white rounded-lg px-6 h-10 shrink-0 font-medium"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-[#f8fafc]">
            <TableRow className="hover:bg-transparent border-y border-gray-100">
              <TableHead className="w-[180px] font-semibold text-gray-500 text-xs tracking-wider py-4 pl-6">ACTION</TableHead>
              <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                <div className="flex items-center gap-1">PRODUCT NO. <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
              </TableHead>
              <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                <div className="flex items-center gap-1">VERSION <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
              </TableHead>
              <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                <div className="flex items-center gap-1">LOT NO. <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
              </TableHead>
              <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                <div className="flex items-center gap-1">LINE NO. <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
              </TableHead>
              <TableHead className="font-semibold text-gray-500 text-xs tracking-wider py-4">
                <div className="flex items-center gap-1">AUTO VALVE NO. <ChevronDown className="h-3.5 w-3.5 text-blue-500" /></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50 last:border-0 transition-colors">
                <TableCell className="py-3 pl-6">
                  <div className="flex items-center gap-2">
                    <Button variant="icon" className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700" icon={<Eye className="!w-[17px] !h-[17px]" />} />
                    <Button variant="icon" className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700" icon={<Edit2 className="!w-[17px] !h-[17px]" />} />
                    <Button variant="icon" className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700" icon={<Trash2 className="!w-[17px] !h-[17px]" />} />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-700 text-sm py-3">{row.productNo}</TableCell>
                <TableCell className="text-gray-500 text-sm py-3">{row.version}</TableCell>
                <TableCell className="text-gray-500 text-sm py-3">{row.lotNo}</TableCell>
                <TableCell className="text-gray-500 text-sm py-3">{row.lineNo}</TableCell>
                <TableCell className="text-gray-500 text-sm py-3">{row.autoValveNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationDefault 
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
      />
    </div>
  );

  return (
    <div className="flex-1 space-y-4 bg-[#f8fafc] p-6 h-full min-h-screen">
      <Tabs 
        variant="primary"
        leftHeader={
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-gray-800" />
            <h2 className="text-xl font-bold tracking-tight text-gray-800">Master Data - Checksheet</h2>
          </div>
        }
        items={[
          { value: "assembly", label: "Asembly/Finishing", content: mainContent },
          { value: "tsc", label: "TSC Extruder", content: mainContent },
          { value: "single", label: "Single Layer", content: mainContent },
          { value: "double", label: "Double Layer", content: mainContent },
        ]}
      />
    </div>
  );
}
