import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "@/components/ui/search";
import { Eye, Edit2, Trash2, Plus, ListTodo, ChevronDown, CheckCircle2, XCircle, Asterisk, CalendarDays, X } from "lucide-react";
import { Tabs } from "@/components/ui/tablist";
import PaginationDefault from "@/components/ui/pagination";

export const Route = createFileRoute("/_authenticated/daily-progress")({
  component: DailyProgressPage,
});

// Helper to generate 40 rows of mock data matching the design
function generateMockData() {
  const statuses: Array<{ checked: string; approved: string }> = [
    { checked: "ok", approved: "ok" },
    { checked: "ok", approved: "ok" },
    { checked: "ok", approved: "ok" },
    { checked: "ok", approved: "ng" },
    { checked: "ng", approved: "ng" },
    { checked: "ng", approved: "ng" },
    { checked: "waiting", approved: "waiting" },
    { checked: "waiting", approved: "waiting" },
    { checked: "waiting", approved: "waiting" },
    { checked: "waiting", approved: "waiting" },
  ];

  const data = [];
  for (let i = 0; i < 40; i++) {
    const statusIdx = i % statuses.length;
    data.push({
      id: i + 1,
      date: "10 August 2026, 10:00",
      process: ["Mark", "CA", "Imp & Pack"],
      activeProcess: 0,
      productNo: "IDC-935B (01-272B)",
      lotNo: "S702",
      lineNo: "-",
      autoValveNo: "-",
      inspectedBy: "Hasan",
      checked: statuses[statusIdx]?.checked ?? "",
      approved: statuses[statusIdx]?.approved ?? "",
    });
  }
  return data;
}

const mockData = generateMockData();

function generateMockDataOther() {
  const statuses: Array<{ engChecked: string; engApproved: string; manChecked: string; manApproved: string }> = [
    { engChecked: "ok", engApproved: "ok", manChecked: "ok", manApproved: "ok" },
    { engChecked: "ng", engApproved: "ng", manChecked: "ng", manApproved: "ng" },
    { engChecked: "ok", engApproved: "ng", manChecked: "waiting", manApproved: "waiting" },
    { engChecked: "waiting", engApproved: "waiting", manChecked: "waiting", manApproved: "waiting" },
  ];

  const data = [];
  for (let i = 0; i < 40; i++) {
    const st = statuses[i % statuses.length];
    data.push({
      id: i + 1,
      date: "10 August 2026, 10:00",
      partNoName: "00912 - Part Name",
      lotNo: "S702",
      inspectedBy: "Hasan",
      engChecked: st?.engChecked ?? "",
      engApproved: st?.engApproved ?? "",
      manChecked: st?.manChecked ?? "",
      manApproved: st?.manApproved ?? "",
    });
  }
  return data;
}

const mockDataOther = generateMockDataOther();

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") return <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />;
  if (status === "ng") return <X className="w-6 h-6 text-red-500 mx-auto" />;
  return (
    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill="#f59e0b" />
      <line x1="12" y1="2" x2="12" y2="6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="6" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="12" x2="22" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProcessPill({ label, isActive }: { label: string; isActive: boolean }) {
  // "Mark" is always green with a check icon; others get a settings/gear icon
  const isMark = label === "Mark";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${
        isActive
          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50"
          : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
      }`}
    >
      {label}
      {isMark ? (
        <CheckCircle2 className={`w-3 h-3 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`} />
      ) : (
        <svg className={`w-3 h-3 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )}
    </span>
  );
}

function DailyProgressPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [processFilter, setProcessFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("TSC Extruder");

  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      const matchesSearch = row.productNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            row.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            row.lineNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            row.autoValveNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const otherFilteredData = useMemo(() => {
    return mockDataOther.filter((row) => {
      return row.partNoName.toLowerCase().includes(searchQuery.toLowerCase()) || 
             row.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
             row.inspectedBy.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const otherTotalPages = Math.ceil(otherFilteredData.length / itemsPerPage);
  const otherPaginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return otherFilteredData.slice(start, start + itemsPerPage);
  }, [otherFilteredData, currentPage, itemsPerPage]);

  const assemblyContent = (
    <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl overflow-hidden bg-white dark:bg-slate-800 transition-colors">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col lg:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 shrink-0">
          <div className="w-full flex-1">
            <Search 
              placeholder="Search by product no, lot no, line no, auto valve no & insp..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
            {/* Process Done filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Process Done :</span>
              <Select value={processFilter} onValueChange={(val) => { setProcessFilter(val); setCurrentPage(1); }}>
                <SelectTrigger className="w-[140px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-9">
                  <SelectValue placeholder="All Process" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="all">All Process</SelectItem>
                  <SelectItem value="mark">Marking</SelectItem>
                  <SelectItem value="ca">Clamp Assy</SelectItem>
                  <SelectItem value="insp">Insp & Pack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <button className="flex items-center gap-2 px-3 h-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              <span className="whitespace-nowrap font-medium">10 Aug 2026 - 15 Aug 2026</span>
            </button>

            {/* Create New Checksheet */}
            {activeTab === "Assembly/Finishing" ? (
              <Link to="/daily-progress/create" className="w-full sm:w-auto">
                <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto justify-start sm:justify-center font-medium rounded-lg shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Checksheet
                </Button>
              </Link>
            ) : (
              <Link to="/daily-progress/create-tsc" search={{ type: activeTab }} className="w-full sm:w-auto">
                <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto justify-start sm:justify-center font-medium rounded-lg shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Checksheet
                </Button>
              </Link>
            )}
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
                    Inspection Date <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Process <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Product No. <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Lot No. <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Line No. <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  Auto Valve No.
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    Inspected By <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                  <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                    Checked <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                  <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                    Approved <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
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
                      <Link to="/daily-progress/$id/edit" params={{ id: row.id.toString() }}>
                        <Button variant="iconEdit" title="Edit"><Edit2 /></Button>
                      </Link>
                      <Button variant="iconDelete" title="Delete"><Trash2 /></Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px] whitespace-nowrap">{row.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5 w-fit">
                      {row.process.map((p, i) => (
                        <ProcessPill key={i} label={p} isActive={i === row.activeProcess} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-semibold text-[13px] whitespace-nowrap">{row.productNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.lotNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.lineNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">{row.autoValveNo}</TableCell>
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
        <PaginationDefault 
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          spacing="gap-4"
        />
      </Card>
  );

  const renderOtherContent = (type: string) => (
    <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl overflow-hidden bg-white dark:bg-slate-800 transition-colors">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col lg:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 shrink-0">
          <div className="w-full flex-1">
            <Search 
              placeholder="Search by part no, name, lot no & inspected by" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
            {/* Date Range */}
            <button className="flex items-center gap-2 px-3 h-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              <span className="whitespace-nowrap font-medium">10 Aug 2026 - 15 Aug 2026</span>
            </button>

            {/* Create New Checksheet */}
            <Link to="/daily-progress/create-tsc" search={{ type }} className="w-full sm:w-auto">
              <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto justify-start sm:justify-center font-medium rounded-lg shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Create New Checksheet
              </Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9] dark:shadow-[0_1px_0_0_#334155]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead rowSpan={2} className="w-[140px] font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center align-middle border-b border-slate-100 dark:border-slate-700/50">
                  ACTION
                </TableHead>
                <TableHead rowSpan={2} className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 align-middle border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    INSPECTION DATE <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead rowSpan={2} className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 align-middle border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    PART NO - NAME <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead rowSpan={2} className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 align-middle border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    LOT NO. <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead rowSpan={2} className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 align-middle border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                    INSPECTED BY <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead colSpan={2} className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center border-b border-slate-100 dark:border-slate-700/50">
                  DEPT. ENGINEERING
                </TableHead>
                <TableHead colSpan={2} className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center border-b border-slate-100 dark:border-slate-700/50">
                  DEPT. MANUFACTURE
                </TableHead>
              </TableRow>
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                    CHECKED BY <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                    APPROVED BY <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                    CHECKED BY <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-2 text-center border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                    APPROVED BY <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {otherPaginatedData.length > 0 ? otherPaginatedData.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-50 dark:border-slate-700/30 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 group transition-colors">
                  <TableCell className="py-3 px-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link to="/daily-progress/$id" params={{ id: row.id.toString() }}>
                        <Button variant="iconView" title="View"><Eye /></Button>
                      </Link>
                      <Link to="/daily-progress/$id/edit" params={{ id: row.id.toString() }}>
                        <Button variant="iconEdit" title="Edit"><Edit2 /></Button>
                      </Link>
                      <Button variant="iconDelete" title="Delete"><Trash2 /></Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px] whitespace-nowrap">{row.date}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-[13px]">{row.partNoName}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-[13px]">{row.lotNo}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-[13px]">{row.inspectedBy}</TableCell>
                  <TableCell className="text-center border-l border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-center"><StatusIcon status={row.engChecked} /></div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center"><StatusIcon status={row.engApproved} /></div>
                  </TableCell>
                  <TableCell className="text-center border-l border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-center"><StatusIcon status={row.manChecked} /></div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center"><StatusIcon status={row.manApproved} /></div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={9} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No records found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Pagination */}
        <PaginationDefault 
          currentPage={currentPage}
          totalPages={otherTotalPages}
          rowsPerPage={itemsPerPage}
          totalItems={otherFilteredData.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          spacing="gap-4"
        />
      </Card>
  );

  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6 bg-[#f8fafc] dark:bg-slate-900 h-full min-h-screen">
      <Tabs 
        variant="primary"
        value={activeTab}
        onValueChange={setActiveTab}
        leftHeader={
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 pb-2">
            <ListTodo className="w-5 h-5 text-slate-800 dark:text-slate-100" />
            <h2 className="text-slate-800 dark:text-slate-100">Daily Progress</h2>
          </div>
        }
        items={[
          { value: "Assembly/Finishing", label: "Assembly/Finishing", content: assemblyContent },
          { value: "TSC Extruder", label: "TSC Extruder", content: renderOtherContent("tsc") },
          { value: "V3", label: "V3", content: renderOtherContent("v3") },
          { value: "V4", label: "V4", content: renderOtherContent("v4") },
        ]}
      />
    </div>
  );
}
