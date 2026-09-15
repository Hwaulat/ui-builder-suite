import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tablist";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListTodo, Calendar as CalendarIcon, ChevronDown, ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/daily-progress_/create")({
  component: CreateInspectionPage,
});

function CreateInspectionPage() {
  const [productNo, setProductNo] = useState("IDC-935B (02-272B)");
  const [lineNo, setLineNo] = useState("");
  const [lotNo, setLotNo] = useState("S702");
  const [claveNo, setClaveNo] = useState("");

  const [date, setDate] = useState("15 September 2026");
  const [operator, setOperator] = useState("hasan");
  const [time, setTime] = useState("");

  const [markingJigStart, setMarkingJigStart] = useState("ok");
  const [markingJigEnd, setMarkingJigEnd] = useState("ok");
  const [markingJigTotal, setMarkingJigTotal] = useState("40");
  const [markingJigNgDesc, setMarkingJigNgDesc] = useState("H - Pendek");
  const [markingJigTotalNg, setMarkingJigTotalNg] = useState("2");

  const [viseColorStart, setViseColorStart] = useState("ok");
  const [viseColorEnd, setViseColorEnd] = useState("ok");
  const [viseColorNgDesc, setViseColorNgDesc] = useState("");

  const [viseSizeStart, setViseSizeStart] = useState("9.98 x 4.71");
  const [viseSizeEnd, setViseSizeEnd] = useState("9.98 x 4.71");
  const [viseSizeNgDesc, setViseSizeNgDesc] = useState("");

  const [visePosStart, setVisePosStart] = useState("ok");
  const [visePosEnd, setVisePosEnd] = useState("ok");
  const [visePosNgDesc, setVisePosNgDesc] = useState("");

  const handleSubmit = () => {
    console.log("Form Submitted", {
      productNo, lineNo, lotNo, claveNo, date, operator, time,
      markingJig: { start: markingJigStart, end: markingJigEnd, total: markingJigTotal, ngDesc: markingJigNgDesc, totalNg: markingJigTotalNg },
      viseColor: { start: viseColorStart, end: viseColorEnd, ngDesc: viseColorNgDesc },
      viseSize: { start: viseSizeStart, end: viseSizeEnd, ngDesc: viseSizeNgDesc },
      visePos: { start: visePosStart, end: visePosEnd, ngDesc: visePosNgDesc },
    });
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-y-auto transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2 shrink-0">
        <div className="flex items-center gap-4 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          <Button variant="outline" className="h-9 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm border-slate-200 dark:border-slate-700 hidden sm:flex transition-colors" asChild>
            <Link to="/daily-progress">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5" />
            <h2>Daily Progress - Create New Inspection</h2>
          </div>
        </div>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-10 rounded-lg shadow-sm">
          Submit
        </Button>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 p-6 gap-6 transition-colors">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Product No."
            required
            value={productNo}
            onChange={(e) => setProductNo(e.target.value)}
          />
          <Input
            label="Line No."
            placeholder="Input line no"
            value={lineNo}
            onChange={(e) => setLineNo(e.target.value)}
          />
          <Input
            label="Lot No."
            required
            value={lotNo}
            onChange={(e) => setLotNo(e.target.value)}
          />
          <Input
            label="Auto Clave No."
            placeholder="Input auto clave no"
            value={claveNo}
            onChange={(e) => setClaveNo(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* Checksheet Tabs Section */}
          <div className="space-y-1">
            <Label className="text-base font-semibold text-slate-800 dark:text-slate-100">Checksheet</Label>
            <Tabs
              variant="default"
              defaultValue="marking"
              className="w-fit"
              items={[
                { value: "marking", label: "Marking", content: null },
                { value: "clamp", label: "Clamp Assy", content: null },
                { value: "inspection", label: "Inspection & Packing", content: null }
              ]}
            />
          </div>
  
          {/* Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              icon={CalendarIcon}
            />
            <div className="flex flex-col gap-2 w-full">
              <Label className="dark:text-slate-300">Operator<sup className="text-red-500">*</sup></Label>
              <Select value={operator} onValueChange={setOperator}>
                <SelectTrigger className="h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 w-full text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="hasan">Hasan</SelectItem>
                  <SelectItem value="joko">Joko</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              label="Time/hour"
              placeholder="ex. 15:20"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold" rowSpan={2}>IMPORTANT RANK</th>
                <th className="px-4 py-3 font-semibold" rowSpan={2}>ITEM</th>
                <th className="px-4 py-3 font-semibold text-center border-b border-slate-200 dark:border-slate-700" colSpan={2}>NOTES</th>
                <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>TOTAL</th>
                <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>ITEM NG / SAMPLE</th>
                <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>TOTAL NG</th>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-900">
                <th className="px-4 py-2 font-semibold text-center border-r border-slate-200 dark:border-slate-700">START</th>
                <th className="px-4 py-2 font-semibold text-center">END</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">

              {/* Marking Jig Row */}
              <tr className="group transition-colors">
                <td className="px-4 py-3 align-top border-r border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/30"></td>
                <td className="px-4 py-3 align-top min-w-[250px]">
                  <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">Marking Jig</div>
                  <div className="text-slate-500 dark:text-slate-400">Tidak ada kerusakan (baut longgar, engsel rusak, bur, retak, atau cacat) pada jig</div>
                </td>
                <td className="px-2 py-3 align-top min-w-[120px] border-r border-slate-100 dark:border-slate-700/50">
                  <Select value={markingJigStart} onValueChange={setMarkingJigStart}>
                    <SelectTrigger className={`h-9 border-transparent rounded-lg ${markingJigStart === 'ok' ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ok">OK</SelectItem>
                      <SelectItem value="ng">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3 align-top min-w-[120px]">
                  <Select value={markingJigEnd} onValueChange={setMarkingJigEnd}>
                    <SelectTrigger className={`h-9 border-transparent rounded-lg ${markingJigEnd === 'ok' ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ok">OK</SelectItem>
                      <SelectItem value="ng">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3 align-top min-w-[100px]">
                  <Input value={markingJigTotal} onChange={e => setMarkingJigTotal(e.target.value)} fieldClassName="h-9 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" className="text-center" />
                </td>
                <td className="px-2 py-3 align-top min-w-[150px]">
                  <Input value={markingJigNgDesc} onChange={e => setMarkingJigNgDesc(e.target.value)} fieldClassName="h-9 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />
                </td>
                <td className="px-2 py-3 align-top min-w-[100px]">
                  <Input value={markingJigTotalNg} onChange={e => setMarkingJigTotalNg(e.target.value)} fieldClassName="h-9 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" className="text-center" />
                </td>
              </tr>

              {/* Vise Side Rows */}
              <tr className="group transition-colors">
                <td rowSpan={3} className="px-1 py-3 align-middle border-r border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/30 text-center relative w-12">
                  <span className="inline-block transform -rotate-90 whitespace-nowrap text-xs font-semibold text-slate-500 dark:text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Vise Side
                  </span>
                </td>
                <td className="px-4 py-3 align-middle min-w-[250px] text-slate-600 dark:text-slate-300">
                  Warna marking Persegi Panjang - Blue (Biru)
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                  <Select value={viseColorStart} onValueChange={setViseColorStart}>
                    <SelectTrigger className={`h-9 border-transparent rounded-lg ${viseColorStart === 'ok' ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ok">OK</SelectItem>
                      <SelectItem value="ng">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Select value={viseColorEnd} onValueChange={setViseColorEnd}>
                    <SelectTrigger className={`h-9 border-transparent rounded-lg ${viseColorEnd === 'ok' ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ok">OK</SelectItem>
                      <SelectItem value="ng">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input disabled placeholder="ex. 10" fieldClassName="h-9 bg-transparent border-transparent dark:text-slate-500" className="text-center" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input value={viseColorNgDesc} onChange={e => setViseColorNgDesc(e.target.value)} placeholder="Input" fieldClassName="h-9 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input disabled placeholder="ex. 10" fieldClassName="h-9 bg-transparent border-transparent dark:text-slate-500" className="text-center" />
                </td>
              </tr>
              <tr className="group transition-colors">
                <td className="px-4 py-3 align-middle min-w-[250px] text-slate-600 dark:text-slate-300">
                  Ukuran marking 10 + 3x3
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                  <Input value={viseSizeStart} onChange={e => setViseSizeStart(e.target.value)} fieldClassName="h-9 text-center dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" className="text-center" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input value={viseSizeEnd} onChange={e => setViseSizeEnd(e.target.value)} fieldClassName="h-9 text-center dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" className="text-center" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input disabled placeholder="ex. 10" fieldClassName="h-9 bg-transparent border-transparent dark:text-slate-500" className="text-center" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input value={viseSizeNgDesc} onChange={e => setViseSizeNgDesc(e.target.value)} placeholder="Input" fieldClassName="h-9 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input disabled placeholder="ex. 10" fieldClassName="h-9 bg-transparent border-transparent dark:text-slate-500" className="text-center" />
                </td>
              </tr>
              <tr className="group transition-colors">
                <td className="px-4 py-3 align-middle min-w-[250px] text-slate-600 dark:text-slate-300">
                  Posisi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50">
                  <Select value={visePosStart} onValueChange={setVisePosStart}>
                    <SelectTrigger className={`h-9 border-transparent rounded-lg ${visePosStart === 'ok' ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ok">OK</SelectItem>
                      <SelectItem value="ng">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Select value={visePosEnd} onValueChange={setVisePosEnd}>
                    <SelectTrigger className={`h-9 border-transparent rounded-lg ${visePosEnd === 'ok' ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ok">OK</SelectItem>
                      <SelectItem value="ng">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input disabled placeholder="ex. 10" fieldClassName="h-9 bg-transparent border-transparent dark:text-slate-500" className="text-center" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input value={visePosNgDesc} onChange={e => setVisePosNgDesc(e.target.value)} placeholder="Input" fieldClassName="h-9 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100" />
                </td>
                <td className="px-2 py-3 align-middle">
                  <Input disabled placeholder="ex. 10" fieldClassName="h-9 bg-transparent border-transparent dark:text-slate-500" className="text-center" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </Card>
    </div>
  );
}
