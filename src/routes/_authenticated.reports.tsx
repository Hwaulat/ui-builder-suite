import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Eye,
  ChevronDown,
  Calendar as CalendarIcon,
  CheckCircle2,
  X,
  Loader,
  Download,
} from "lucide-react";
import { cn } from "@/utils/cn";
import PaginationDefault from "@/components/ui/pagination";
import { Tabs } from "@/components/ui/tablist";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
});

const mockData = [
  {
    id: 1,
    date: "10 August 2026, 10:00",
    machine: "Area 1",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "ok",
    approved: "ok",
  },
  {
    id: 2,
    date: "10 August 2026, 10:00",
    machine: "Area 2",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "ok",
    approved: "ok",
  },
  {
    id: 3,
    date: "10 August 2026, 10:00",
    machine: "Area 1",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "ok",
    approved: "ok",
  },
  {
    id: 4,
    date: "10 August 2026, 10:00",
    machine: "Area 3",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "ng",
    approved: "ng",
  },
  {
    id: 5,
    date: "10 August 2026, 10:00",
    machine: "Area 2",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "ng",
    approved: "ng",
  },
  {
    id: 6,
    date: "10 August 2026, 10:00",
    machine: "Area 1",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "loading",
    approved: "loading",
  },
  {
    id: 7,
    date: "10 August 2026, 10:00",
    machine: "Area 1",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "loading",
    approved: "loading",
  },
  {
    id: 8,
    date: "10 August 2026, 10:00",
    machine: "Area 2",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "loading",
    approved: "loading",
  },
  {
    id: 9,
    date: "10 August 2026, 10:00",
    machine: "Area 3",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "loading",
    approved: "loading",
  },
  {
    id: 10,
    date: "10 August 2026, 10:00",
    machine: "Area 1",
    activeProcess: 0,
    productNo: "IDC-935B (01-272B)",
    lineNo: "-",
    lotNo: "S702",
    autoValveNo: "-",
    inspector: "Hasan",
    checked: "loading",
    approved: "loading",
  },
];

function ProcessPill({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-2 py-0.5 rounded-full text-[10px] font-medium w-[90px]",
        isActive
          ? "bg-green-100/50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
      )}
    >
      <span>{label}</span>
      {isActive ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
      ) : (
        <Loader className="w-3.5 h-3.5 text-slate-400" />
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") return <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />;
  if (status === "ng") return <X className="w-5 h-5 text-red-500 mx-auto" />;
  if (status === "loading") return <Loader className="w-5 h-5 text-orange-400 mx-auto" />;
  return null;
}

function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Assembly/Finishing");
  const [searchQuery, setSearchQuery] = useState("");
  const [machineFilter, setMachineFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(""); // simple string match for demo
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      const matchesSearch =
        row.productNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.inspector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMachine =
        machineFilter === "all" ||
        row.machine.toLowerCase().replace(" ", "") === machineFilter.toLowerCase().replace(" ", "");
      const matchesDate = dateFilter === "" || row.date.includes(dateFilter);
      return matchesSearch && matchesMachine && matchesDate;
    });
  }, [searchQuery, machineFilter, dateFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-hidden transition-colors">
      {/* Header */}
      <Tabs
        variant="primary"
        value={activeTab}
        onValueChange={(val) => {
          setActiveTab(val);
          setCurrentPage(1);
        }}
        className="shrink-0"
        leftHeader={
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            <FileText className="w-5 h-5" />
            <h2>Reports</h2>
          </div>
        }
        items={[
          { value: "Assembly/Finishing", label: "Assembly/Finishing", content: null },
          { value: "TSC Extruder", label: "TSC Extruder", content: null },
          { value: "V3", label: "V3", content: null },
          { value: "V4", label: "V4", content: null },
        ]}
      />

      <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl overflow-hidden bg-white dark:bg-slate-800 transition-colors">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 shrink-0">
          <div className="w-full flex-1">
            <Search
              placeholder={
                activeTab === "Assembly/Finishing"
                  ? "Search by product no, lot no, line no, auto valve no & inspected by"
                  : "Search by part no, name, lot no & inspected by"
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="dark:bg-slate-900 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {/* Process Done Filter */}
            {activeTab === "Assembly/Finishing" && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-slate-700 dark:text-slate-300">Process Done :</span>
                <Select
                  value={machineFilter}
                  onValueChange={(val) => {
                    setMachineFilter(val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[140px] bg-white dark:bg-slate-900 h-10 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="All Process" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem value="all">All Process</SelectItem>
                    <SelectItem value="area1">Process 1</SelectItem>
                    <SelectItem value="area2">Process 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Simple date filter simulation */}
            <div className="relative shrink-0">
              <CalendarIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="10 Aug 2026 - 15 Aug 2026"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-3 h-10 w-[220px] text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            {activeTab === "Assembly/Finishing" ? (
              <TableHeader className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9] dark:shadow-[0_1px_0_0_#334155]">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="w-[80px] font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                    Action
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Inspection Date{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Process{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Product No.{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Lot No.{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Line No.{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Auto Valve No.{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4">
                    <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer w-fit">
                      Inspected By{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                    <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                      Checked{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                    <div className="flex items-center justify-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer">
                      Approved{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
            ) : (
              <TableHeader className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9] dark:shadow-[0_1px_0_0_#334155]">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead
                    rowSpan={2}
                    className="w-[80px] font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-3 text-center align-bottom pb-4"
                  >
                    Action
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-3 align-bottom pb-4"
                  >
                    <div className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-fit">
                      Inspection Date <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-3 align-bottom pb-4"
                  >
                    <div className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-fit">
                      Part No - Name <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-3 align-bottom pb-4"
                  >
                    <div className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-fit">
                      Lot No. <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-3 align-bottom pb-4"
                  >
                    <div className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-fit">
                      Inspected By <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead
                    colSpan={2}
                    className="font-semibold text-[11px] text-slate-500 dark:text-slate-400 uppercase py-3 text-center border-b border-slate-100"
                  >
                    Dept. Engineering
                  </TableHead>
                  <TableHead
                    colSpan={2}
                    className="font-semibold text-[11px] text-slate-500 dark:text-slate-400 uppercase py-3 text-center border-b border-slate-100"
                  >
                    Dept. Manufacture
                  </TableHead>
                </TableRow>
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="font-semibold text-[11px] text-slate-500 dark:text-slate-400 uppercase py-3 text-center">
                    <div className="flex items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-full">
                      Checked By <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[11px] text-slate-500 dark:text-slate-400 uppercase py-3 text-center">
                    <div className="flex items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-full">
                      Approved By <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[11px] text-slate-500 dark:text-slate-400 uppercase py-3 text-center">
                    <div className="flex items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-full">
                      Checked By <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[11px] text-slate-500 dark:text-slate-400 uppercase py-3 text-center">
                    <div className="flex items-center justify-center gap-1 hover:text-slate-900 transition-colors cursor-pointer w-full">
                      Approved By <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-slate-50 dark:border-slate-700/30 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 group transition-colors"
                  >
                    <TableCell className="py-3 px-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          to="/reports/$id"
                          params={{ id: row.id.toString() }}
                          search={{ type: activeTab }}
                        >
                          <Button variant="iconView" title="View">
                            <Eye />
                          </Button>
                        </Link>
                        <Button variant="iconView" title="Download">
                          <Download className="w-4 h-4 text-slate-500" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">
                      {row.date}
                    </TableCell>
                    {activeTab === "Assembly/Finishing" ? (
                      <>
                        <TableCell>
                          <div className="flex flex-col gap-1.5 w-fit">
                            <ProcessPill label="Mark" isActive={row.activeProcess === 0} />
                            <ProcessPill label="CA" isActive={row.activeProcess === 1} />
                            <ProcessPill label="Insp & Pack" isActive={row.activeProcess === 2} />
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300 font-semibold text-[13px]">
                          {row.productNo}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">
                          {row.lotNo}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">
                          {row.lineNo}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">
                          {row.autoValveNo}
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">
                          {row.inspector}
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusIcon status={row.checked} />
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusIcon status={row.approved} />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-slate-700 dark:text-slate-300 font-semibold text-[13px]">
                          00912 - Part Name
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400 font-medium text-[13px]">
                          {row.lotNo}
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300 font-medium text-[13px]">
                          {row.inspector}
                        </TableCell>
                        <TableCell className="text-center align-middle">
                          <StatusIcon
                            status={row.id % 3 === 0 ? "ok" : row.id % 2 === 0 ? "ng" : "loading"}
                          />
                        </TableCell>
                        <TableCell className="text-center align-middle">
                          <StatusIcon
                            status={row.id % 4 === 0 ? "ok" : row.id % 3 === 0 ? "ng" : "loading"}
                          />
                        </TableCell>
                        <TableCell className="text-center align-middle">
                          <StatusIcon
                            status={row.id % 2 === 0 ? "loading" : row.id % 5 === 0 ? "ng" : "ok"}
                          />
                        </TableCell>
                        <TableCell className="text-center align-middle">
                          <StatusIcon
                            status={row.id % 3 === 0 ? "loading" : row.id % 2 === 0 ? "ng" : "ok"}
                          />
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-8 text-center text-slate-500 dark:text-slate-400"
                  >
                    No reports found matching your filters.
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
          onRowsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
          spacing="gap-4"
        />
      </Card>
    </div>
  );
}
