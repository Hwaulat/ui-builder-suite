import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "@/components/ui/search";
import { Eye, Edit2, Trash2, Plus, ListTodo, ChevronDown, CheckCircle2, XCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/daily-progress")({
  component: DailyProgressPage,
});

const mockData = [
  { id: 1, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "ok", approved: "ok" },
  { id: 2, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "ok", approved: "ok" },
  { id: 3, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "ok", approved: "ok" },
  { id: 4, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "ng", approved: "ng" },
  { id: 5, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "ng", approved: "ng" },
  { id: 6, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 2, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "waiting", approved: "waiting" },
  { id: 7, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "waiting", approved: "waiting" },
  { id: 8, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "waiting", approved: "waiting" },
  { id: 9, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "waiting", approved: "waiting" },
  { id: 10, date: "24/06/2026", process: ["Mark", "CA", "Insp & Pack"], activeProcess: 0, productNo: "IDC-935B (02-272B)", lineNo: "-", lotNo: "S702", claveNo: "-", inspectedBy: "Hasan", checked: "waiting", approved: "waiting" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") return <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />;
  if (status === "ng") return <XCircle className="w-5 h-5 text-red-500 mx-auto" />;
  return <Loader2 className="w-5 h-5 text-orange-400 mx-auto animate-spin" />;
}

function ProcessPill({ label, active }: { label: string, active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors ${
      active ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
    }`}>
      {label}
      <CheckCircle2 className={`w-3 h-3 ${active ? "text-green-700 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}`} />
    </span>
  );
}

function DailyProgressPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [processFilter, setProcessFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      const matchesSearch = row.productNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            row.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            row.inspectedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesProcess = true;
      if (processFilter !== "all") {
        if (processFilter === "mark") matchesProcess = row.activeProcess === 0;
        if (processFilter === "ca") matchesProcess = row.activeProcess === 1;
        if (processFilter === "insp") matchesProcess = row.activeProcess === 2;
      }
      
      return matchesSearch && matchesProcess;
    });
  }, [searchQuery, processFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full transition-colors">
      <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 pb-2 shrink-0">
        <ListTodo className="w-5 h-5" />
        <h2>Daily Progress</h2>
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
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={processFilter} onValueChange={(val) => { setProcessFilter(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-[140px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="All Process" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="all">All Process</SelectItem>
                <SelectItem value="mark">Marking</SelectItem>
                <SelectItem value="ca">Clamp Assy</SelectItem>
                <SelectItem value="insp">Insp & Pack</SelectItem>
              </SelectContent>
            </Select>
            <Link to="/daily-progress/create" className="w-full sm:w-auto">
              <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto justify-start sm:justify-center font-medium rounded-lg shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Create New Progress
              </Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9] dark:shadow-[0_1px_0_0_#334155]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="w-[140px] font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
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
                  Inspected By
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
                    <div className="flex items-center justify-center gap-1.5">
                      <Link to="/daily-progress/$id" params={{ id: row.id.toString() }}>
                        <Button variant="iconView" title="View"><Eye /></Button>
                      </Link>
                      <Button variant="iconEdit" title="Edit"><Edit2 /></Button>
                      <Button variant="iconDelete" title="Delete"><Trash2 /></Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">{row.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5 w-fit">
                      {row.process.map((p, i) => (
                        <ProcessPill key={i} label={p} active={i === row.activeProcess} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-semibold text-[13px]">{row.productNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.lineNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.lotNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.claveNo}</TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">{row.inspectedBy}</TableCell>
                  <TableCell className="text-center"><StatusIcon status={row.checked} /></TableCell>
                  <TableCell className="text-center"><StatusIcon status={row.approved} /></TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={10} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No daily progress records found matching your filters.
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
