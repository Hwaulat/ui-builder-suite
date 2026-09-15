import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckSquare, Eye, ChevronDown, Calendar as CalendarIcon, Check, X, Loader2, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/_authenticated/records")({
  component: ApprovalPage,
});

const mockData = [
  { id: 1, date: "24/06/2026", shift: "shift1", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "ok", approved: "ok" },
  { id: 2, date: "24/06/2026", shift: "shift2", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "ok", approved: "ok" },
  { id: 3, date: "24/06/2026", shift: "shift3", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "ok", approved: "ok" },
  { id: 4, date: "24/06/2026", shift: "shift1", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "ng", approved: "ng" },
  { id: 5, date: "24/06/2026", shift: "shift2", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "ng", approved: "ng" },
  { id: 6, date: "24/06/2026", shift: "shift3", processes: { mark: true, ca: true, insp: true }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "pending", approved: "pending" },
  { id: 7, date: "24/06/2026", shift: "shift1", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "pending", approved: "pending" },
  { id: 8, date: "24/06/2026", shift: "shift2", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "pending", approved: "pending" },
  { id: 9, date: "24/06/2026", shift: "shift3", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "pending", approved: "pending" },
  { id: 10, date: "24/06/2026", shift: "shift1", processes: { mark: true, ca: false, insp: false }, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", autoclaveNo: "-", inspector: "Hasan", checked: "pending", approved: "pending" },
];

function ProcessBadge({ label, active }: { label: string, active: boolean }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors",
      active ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
    )}>
      {label}
      <Check className={cn("w-3 h-3", active ? "text-green-700 dark:text-green-400" : "text-slate-400 dark:text-slate-500")} />
    </span>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") {
    return <CheckCircle2 className="w-5 h-5 text-green-500" />;
  }
  if (status === "ng") {
    return <X className="w-5 h-5 text-red-500 stroke-[3]" />;
  }
  return <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />;
}

function ApprovalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      const matchesSearch = row.productNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            row.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            row.inspector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesShift = shiftFilter === "all" || row.shift === shiftFilter;
      const matchesStatus = statusFilter === "all" || row.checked === statusFilter || row.approved === statusFilter;
      return matchesSearch && matchesShift && matchesStatus;
    });
  }, [searchQuery, shiftFilter, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-hidden transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 shrink-0">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          <CheckSquare className="w-5 h-5" />
          <h2>Approval</h2>
        </div>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl overflow-hidden bg-white dark:bg-slate-800 transition-colors">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 shrink-0">
          <div className="w-full sm:w-[320px]">
            <Search 
              placeholder="Search product, lot, or inspector..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm whitespace-nowrap">
              <CalendarIcon className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300">24/06/2026 - 25/06/2026</span>
            </div>
            <Select value={shiftFilter} onValueChange={(val) => { setShiftFilter(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-[120px] bg-white dark:bg-slate-900 h-10 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="All Shift" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="all">All Shift</SelectItem>
                <SelectItem value="shift1">Shift 1</SelectItem>
                <SelectItem value="shift2">Shift 2</SelectItem>
                <SelectItem value="shift3">Shift 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-[130px] bg-white dark:bg-slate-900 h-10 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ok">OK</SelectItem>
                <SelectItem value="ng">NG</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9] dark:shadow-[0_1px_0_0_#334155]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="w-[60px] font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                  Action
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Date <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  Process
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Product No <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  Line No
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  Lot No
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  Auto Clave
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  Inspector
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                  Checked
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                  Approved
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? paginatedData.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-50 dark:border-slate-700/30 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 group transition-colors">
                  <TableCell className="py-3 px-2">
                    <div className="flex items-center justify-center">
                      <Link to="/records/$id" params={{ id: row.id.toString() }}>
                        <Button variant="iconView" title="View">
                          <Eye />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">{row.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5 w-fit">
                      <ProcessBadge label="Marking" active={row.processes.mark} />
                      <ProcessBadge label="Clamp Assy" active={row.processes.ca} />
                      <ProcessBadge label="Inspection" active={row.processes.insp} />
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-semibold text-[13px]">{row.productNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.lineNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.lotNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.autoclaveNo}</TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">{row.inspector}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center"><StatusIcon status={row.checked} /></div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center"><StatusIcon status={row.approved} /></div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={10} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No approval records found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Rows per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1); }}>
                <SelectTrigger className="w-16 h-8 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 px-2 text-center text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {filteredData.length === 0 ? '0-0 of 0' : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredData.length)} of ${filteredData.length}`}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 p-0 rounded border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages || 1 }).map((_, i) => (
              <Button 
                key={i} 
                variant={currentPage === i + 1 ? "default" : "outline"} 
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 p-0 rounded ${
                  currentPage === i + 1 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-800"
                }`}
              >
                {i + 1}
              </Button>
            ))}
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 p-0 rounded border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </Card>
    </div>
  );
}
