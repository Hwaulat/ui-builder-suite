import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListTodo, Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs } from "@/components/ui/tablist";

export const Route = createFileRoute("/_authenticated/daily-progress_/create")({
  component: CreateChecksheetPage,
});

// OK/NG dropdown with green/red styling based on value
function OkNgSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const getStyle = () => {
    if (value === "ok")
      return "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400";
    if (value === "ng")
      return "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 text-red-600 dark:text-red-400";
    return "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300";
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`h-9 w-[90px] rounded-lg text-sm font-medium ${getStyle()}`}>
        <SelectValue placeholder="ok/ng" />
      </SelectTrigger>
      <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
        <SelectItem value="ok">OK</SelectItem>
        <SelectItem value="ng">NG</SelectItem>
      </SelectContent>
    </Select>
  );
}

function CreateChecksheetPage() {
  // Top fields — pre-filled for active state
  const [productNo, setProductNo] = useState("IDC-935B (01-272B)");
  const [lotNo, setLotNo] = useState("S870");
  const [lineNo, setLineNo] = useState("-");
  const [autoValveNo, setAutoValveNo] = useState("-");
  const [dateTime, setDateTime] = useState("05 October 2026, 10:00");
  const [activeTab, setActiveTab] = useState("marking");

  // Marking Jig row
  const [mjStart, setMjStart] = useState("ok");
  const [mjEnd, setMjEnd] = useState("ok");
  const [mjTotal, setMjTotal] = useState("37 + 3");
  const [mjNgItem, setMjNgItem] = useState("");
  const [mjTotalNg, setMjTotalNg] = useState("");

  // Tidak ada kerusakan row
  const [takStart, setTakStart] = useState("ok");
  const [takEnd, setTakEnd] = useState("ok");
  const [takNgItem, setTakNgItem] = useState("");
  const [takTotalNg, setTakTotalNg] = useState("");

  // Vise Side — Warna marking
  const [vsColorStart, setVsColorStart] = useState("ok");
  const [vsColorEnd, setVsColorEnd] = useState("ok");
  const [vsColorNg, setVsColorNg] = useState("");
  const [vsColorTotalNg, setVsColorTotalNg] = useState("");

  // Vise Side — Ukuran marking
  const [vsSizeStart, setVsSizeStart] = useState("9,98 x 4,71");
  const [vsSizeEnd, setVsSizeEnd] = useState("9,98 x 4,71");
  const [vsSizeTotal, setVsSizeTotal] = useState("-");
  const [vsSizeNg, setVsSizeNg] = useState("");
  const [vsSizeTotalNg, setVsSizeTotalNg] = useState("");

  // Vise Side — Psosi marking
  const [vsPosStart, setVsPosStart] = useState("ok");
  const [vsPosEnd, setVsPosEnd] = useState("ok");
  const [vsPosNg, setVsPosNg] = useState("");
  const [vsPosTotalNg, setVsPosTotalNg] = useState("2");

  // Insertion Side — Warna marking
  const [isColorStart, setIsColorStart] = useState("ng");
  const [isColorEnd, setIsColorEnd] = useState("ng");
  const [isColorNg, setIsColorNg] = useState("");
  const [isColorTotalNg, setIsColorTotalNg] = useState("");

  // Insertion Side — Ukuran marking
  const [isSizeStart, setIsSizeStart] = useState("2,63");
  const [isSizeEnd, setIsSizeEnd] = useState("2,50");
  const [isSizeTotal, setIsSizeTotal] = useState("-");
  const [isSizeNg, setIsSizeNg] = useState("");
  const [isSizeTotalNg, setIsSizeTotalNg] = useState("");

  // Insertion Side — Psosi marking
  const [isPosStart, setIsPosStart] = useState("ok");
  const [isPosEnd, setIsPosEnd] = useState("ok");
  const [isPosNg, setIsPosNg] = useState("");
  const [isPosTotalNg, setIsPosTotalNg] = useState("");

  const handleSubmit = () => {
    console.log("Checksheet Submitted");
  };

  const tabItems = [
    { value: "marking", label: "Marking" },
    { value: "clamp", label: "Clamp Assy" },
    { value: "inspection", label: "Inspection & Packing" },
  ];

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-y-auto transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2 shrink-0">
        <div className="flex items-center gap-4 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          <Button
            variant="outline"
            className="h-9 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm border-slate-200 dark:border-slate-700 hidden sm:flex transition-colors"
            asChild
          >
            <Link to="/daily-progress">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5" />
            <h2>Daily Progress - Create New Checksheet</h2>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-10 rounded-lg shadow-sm"
        >
          Submit
        </Button>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 p-6 gap-6 transition-colors">
        {/* Top Fields: Product No, Lot No, Line No, Auto Valve No */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Product No.
            </Label>
            <Select value={productNo} onValueChange={setProductNo}>
              <SelectTrigger className="h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-full text-slate-900 dark:text-slate-100">
                <SelectValue placeholder="Choose product no" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="IDC-935B (01-272B)">IDC-935B (01-272B)</SelectItem>
                <SelectItem value="IDC-935B (02-272B)">IDC-935B (02-272B)</SelectItem>
                <SelectItem value="IDC-950A (03-150A)">IDC-950A (03-150A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            label="Lot No."
            value={lotNo}
            onChange={(e) => setLotNo(e.target.value)}
            fieldClassName="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          />
          <Input
            label="Line No."
            value={lineNo}
            onChange={(e) => setLineNo(e.target.value)}
            fieldClassName="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          />
          <Input
            label="Auto Valve No."
            value={autoValveNo}
            onChange={(e) => setAutoValveNo(e.target.value)}
            fieldClassName="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          />
        </div>

        {/* Tabs */}
        <Tabs
          variant="primary"
          value={activeTab}
          onValueChange={setActiveTab}
          rightHeader={
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Date & Time :
              </span>
              <div className="relative">
                <Input
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  placeholder="dd mm yyyy, 00:00"
                  icon={CalendarIcon}
                  fieldClassName="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-[220px]"
                  className="text-sm"
                />
              </div>
            </div>
          }
          items={tabItems.map((tab) => ({
            value: tab.value,
            label: tab.label,
            content: (
              <>
                {/* Checksheet Label */}
                <div className="mb-3">
                  <Label className="text-base font-bold text-slate-800 dark:text-slate-100">
                    Checksheet
                  </Label>
                </div>

                <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                        <th
                          className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 whitespace-nowrap text-center"
                          rowSpan={2}
                          style={{ width: "90px" }}
                        >
                          Important
                          <br />
                          Rank
                        </th>
                        <th
                          className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700"
                          rowSpan={2}
                          style={{ minWidth: "280px" }}
                        >
                          Inspection Item
                        </th>
                        <th
                          className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center"
                          colSpan={2}
                        >
                          Notes
                        </th>
                        <th
                          className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center"
                          rowSpan={2}
                          style={{ width: "120px" }}
                        >
                          Total
                        </th>
                        <th
                          className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center"
                          rowSpan={2}
                          style={{ width: "160px" }}
                        >
                          Item NG/ Sample
                        </th>
                        <th
                          className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700 text-center"
                          rowSpan={2}
                          style={{ width: "90px" }}
                        >
                          Total NG
                        </th>
                      </tr>
                      <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                        <th
                          className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center"
                          style={{ width: "100px" }}
                        >
                          Start
                        </th>
                        <th
                          className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center"
                          style={{ width: "100px" }}
                        >
                          End
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1: Marking Jig */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td
                          rowSpan={2}
                          className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400 font-medium"
                        >
                          -
                        </td>
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium">
                          Marking Jig
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={mjStart} onChange={setMjStart} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={mjEnd} onChange={setMjEnd} />
                        </td>
                        <td
                          rowSpan={2}
                          className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50"
                        >
                          <Input
                            value={mjTotal}
                            onChange={(e) => setMjTotal(e.target.value)}
                            placeholder="Input total"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={mjNgItem}
                            onChange={(e) => setMjNgItem(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>

                      {/* Row 2: Tidak ada kerusakan */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px] leading-snug">
                          Tidak ada kerusakan (baut longgar, engsel rusak, burr, retak atau cacat
                          pada jig
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={takStart} onChange={setTakStart} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={takEnd} onChange={setTakEnd} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={takNgItem}
                            onChange={(e) => setTakNgItem(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>

                      {/* VISE SIDE — Row 1: Warna marking */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td
                          rowSpan={3}
                          className="px-1 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-center relative"
                          style={{ width: "90px" }}
                        >
                          <span className="text-slate-500 dark:text-slate-400 font-medium">-</span>
                          <span
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Vise Side
                          </span>
                        </td>
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px] leading-snug">
                          Warna marking persegi panjang - blue (biru)Psosi marking (dengan jig
                          inspection)
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={vsColorStart} onChange={setVsColorStart} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={vsColorEnd} onChange={setVsColorEnd} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50"></td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={vsColorNg}
                            onChange={(e) => setVsColorNg(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>

                      {/* VISE SIDE — Row 2: Ukuran marking */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px]">
                          Ukuran marking 10+3x3
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={vsSizeStart}
                            onChange={(e) => setVsSizeStart(e.target.value)}
                            placeholder="00.00"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-[100px]"
                            className="text-center"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={vsSizeEnd}
                            onChange={(e) => setVsSizeEnd(e.target.value)}
                            placeholder="00.00"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-[100px]"
                            className="text-center"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={vsSizeTotal}
                            onChange={(e) => setVsSizeTotal(e.target.value)}
                            placeholder="Input total"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={vsSizeNg}
                            onChange={(e) => setVsSizeNg(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>

                      {/* VISE SIDE — Row 3: Psosi marking */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px]">
                          Psosi marking (dengan jig inspection)
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={vsPosStart} onChange={setVsPosStart} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={vsPosEnd} onChange={setVsPosEnd} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50"></td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={vsPosNg}
                            onChange={(e) => setVsPosNg(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center">
                          <Input
                            value={vsPosTotalNg}
                            onChange={(e) => setVsPosTotalNg(e.target.value)}
                            placeholder="ex.2"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-[60px]"
                            className="text-center text-xs"
                          />
                        </td>
                      </tr>

                      {/* INSERTION SIDE — Row 1: Warna marking */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td
                          rowSpan={3}
                          className="px-1 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-center relative"
                          style={{ width: "90px" }}
                        >
                          <span className="text-slate-500 dark:text-slate-400 font-medium">-</span>
                          <span
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Insertion Side
                          </span>
                        </td>
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px] leading-snug">
                          Warna marking persegi panjang - blue (biru)Psosi marking (dengan jig
                          inspection)
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={isColorStart} onChange={setIsColorStart} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={isColorEnd} onChange={setIsColorEnd} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50"></td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={isColorNg}
                            onChange={(e) => setIsColorNg(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>

                      {/* INSERTION SIDE — Row 2: Ukuran marking */}
                      <tr className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px]">
                          Ukuran marking 10+3x3
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={isSizeStart}
                            onChange={(e) => setIsSizeStart(e.target.value)}
                            placeholder="00.00"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-[100px]"
                            className="text-center"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={isSizeEnd}
                            onChange={(e) => setIsSizeEnd(e.target.value)}
                            placeholder="00.00"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-[100px]"
                            className="text-center"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={isSizeTotal}
                            onChange={(e) => setIsSizeTotal(e.target.value)}
                            placeholder="Input total"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={isSizeNg}
                            onChange={(e) => setIsSizeNg(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>

                      {/* INSERTION SIDE — Row 3: Psosi marking */}
                      <tr className="hover:bg-slate-50/30 dark:hover:bg-slate-700/10 transition-colors">
                        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[13px]">
                          Psosi marking (dengan jig inspection)
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={isPosStart} onChange={setIsPosStart} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <OkNgSelect value={isPosEnd} onChange={setIsPosEnd} />
                        </td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50"></td>
                        <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                          <Input
                            value={isPosNg}
                            onChange={(e) => setIsPosNg(e.target.value)}
                            placeholder="OK/NG"
                            fieldClassName="h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-2 py-3 align-middle text-center text-slate-400 dark:text-slate-500 text-xs">
                          ex.2
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ),
          }))}
        />
      </Card>
    </div>
  );
}
