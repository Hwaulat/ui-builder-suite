import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Eye, ChevronLeft, Check, Loader2, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tablist";

export const Route = createFileRoute("/_authenticated/daily-progress_/$id")({
  component: DetailsInspectionPage,
});

function DetailsInspectionPage() {
  const { id } = Route.useParams();

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-y-auto transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-2 shrink-0">
        <Button variant="outline" className="h-9 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm border-slate-200 dark:border-slate-700 transition-colors" asChild>
          <Link to="/daily-progress">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          <Eye className="w-5 h-5" />
          <h2>
            Details <span className="text-blue-600 dark:text-blue-400 italic font-bold">(Asembly/Finishing)</span>
          </h2>
        </div>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 p-6 gap-6 transition-colors">
        
        {/* Stepper Status */}
        <div className="flex items-start justify-center max-w-xl mx-auto w-full pt-4 relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-[25%] right-[25%] h-[1px] bg-slate-200 dark:bg-slate-700 -z-10"></div>
          
          {/* Step 1: Checked by */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-emerald-400 dark:bg-emerald-500 flex items-center justify-center text-white ring-[6px] ring-white dark:ring-slate-800 mb-3 z-10">
              <Check className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">Checked by</p>
              <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Hasan Waulat | 10 October 2026, 10:00</p>
            </div>
          </div>
          
          {/* Step 2: Approved by */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-amber-400 dark:bg-amber-500 flex items-center justify-center text-white ring-[6px] ring-white dark:ring-slate-800 mb-3 z-10">
              <Sun className="w-6 h-6 animate-[spin_3s_linear_infinite]" />
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">Approved by</p>
              <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100">Andre | 10 October 2026, 10:00</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-4">
          <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-200 mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Product No.</p>
              <p className="text-sm text-slate-800 dark:text-slate-300">IDC-935B (01-272B)</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Lot No.</p>
              <p className="text-sm text-slate-800 dark:text-slate-300">S870</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Line No.</p>
              <p className="text-sm text-slate-800 dark:text-slate-300">-</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Auto Valve No.</p>
              <p className="text-sm text-slate-800 dark:text-slate-300">-</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Inspection by</p>
              <p className="text-sm text-slate-800 dark:text-slate-300">Hasan Waulat</p>
            </div>
          </div>
        </div>

        {/* Tabs & Date */}
        <Tabs 
          variant="primary"
          defaultValue="Marking"
          rightHeader={
            <div className="flex items-center gap-4 text-[13px]">
              <div><span className="text-slate-500 dark:text-slate-400 mr-1">Date & Time :</span> <span className="font-bold text-slate-800 dark:text-slate-200">05 October 2026, 10:00</span></div>
              <div><span className="text-slate-500 dark:text-slate-400 mr-1">Operator:</span> <span className="font-bold text-slate-800 dark:text-slate-200">Hasan Waulat</span></div>
            </div>
          }
          items={[
            { value: "Marking", label: "Marking", content: (
              <>
                {/* Checksheet Header */}
                <div className="mb-3">
                  <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">Checksheet</h3>
                </div>

        {/* Table Section (Read Only) */}
        <div className="overflow-x-auto border rounded-xl border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center w-[90px]" rowSpan={2}>
                  Important<br/>Rank
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 min-w-[280px]" rowSpan={2}>
                  Inspection Item
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center" colSpan={2}>
                  Notes
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center w-[120px]" rowSpan={2}>
                  Total
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center w-[160px]" rowSpan={2}>
                  Item NG/ Sample
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700 text-center w-[90px]" rowSpan={2}>
                  Total NG
                </th>
              </tr>
              <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center w-[100px]">Start</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center w-[100px]">End</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Marking Jig */}
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td rowSpan={2} className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400 font-medium">-</td>
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-[13px]">
                  Marking Jig
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td rowSpan={2} className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  37 + 3
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>

              {/* Row 2: Tidak ada kerusakan */}
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Tidak ada kerusakan (baut longgar, engsel rusak, burr, retak atau cacat pada jig
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>

              {/* VISE SIDE - 3 rows */}
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td rowSpan={3} className="px-1 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-center relative" style={{ width: "90px" }}>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">-</span>
                  <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.08em" }}
                  >
                    Vise Side
                  </span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Warna marking persegi panjang - blue (biru)Psosi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Ukuran marking 10+3x3
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  9,98 x 4,71
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  9,98 x 4,71
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Psosi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-900 dark:text-slate-100 text-[13px] font-medium">
                  2
                </td>
              </tr>

              {/* INSERTION SIDE - 3 rows */}
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td rowSpan={3} className="px-1 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-center relative" style={{ width: "90px" }}>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">-</span>
                  <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.08em" }}
                  >
                    Insertion Side
                  </span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Warna marking persegi panjang - blue (biru)Psosi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-red-500 dark:text-red-400 font-medium">NG</span>
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-red-500 dark:text-red-400 font-medium">NG</span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Ukuran marking 10+3x3
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  2,63
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  2,50
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px]">
                  Psosi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-2 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-center">
                  <span className="text-emerald-500 dark:text-emerald-400 font-medium">OK</span>
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  
                </td>
                <td className="px-4 py-3 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
                <td className="px-4 py-3 align-middle text-center text-slate-700 dark:text-slate-300 text-[13px]">
                  -
                </td>
              </tr>

              {/* Summary Row */}
              <tr>
                <td colSpan={4} className="px-4 py-4 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[13px] font-medium text-right">
                  Total Product OK
                </td>
                <td className="px-4 py-4 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 text-[13px]">
                  38
                </td>
                <td className="px-4 py-4 align-middle border-r border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 text-[13px] font-medium text-right">
                  Total Product OK
                </td>
                <td className="px-4 py-4 align-middle text-center text-slate-800 dark:text-slate-200 text-[13px]">
                  38
                </td>
              </tr>
            </tbody>
          </table>
        </div>

              </>
            )},
            { value: "Clamp Assy", label: "Clamp Assy", content: null },
            { value: "Inspection & Packing", label: "Inspection & Packing", content: null }
          ]}
        />
      </Card>
    </div>
  );
}
