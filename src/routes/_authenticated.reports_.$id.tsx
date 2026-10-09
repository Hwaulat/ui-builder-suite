import { createFileRoute, Link, useParams, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tablist";
import { Eye, ChevronLeft, Check, Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/reports_/$id")({
  validateSearch: z.object({
    type: z.string().optional().catch("Assembly/Finishing"),
  }),
  component: DetailsReportsPage,
});

function DetailsReportsPage() {
  const { id } = Route.useParams();
  const { type } = Route.useSearch();

  const isAssembly = type === "Assembly/Finishing";

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-[#f8fafc] h-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-9 px-3 bg-white hover:bg-gray-50 text-gray-700 shadow-sm border-gray-200"
            asChild
          >
            <Link to="/reports">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-800">
            <Eye className="w-6 h-6" />
            <h2>
              Details{" "}
              <span className="text-[#1F5AA6] italic font-semibold">
                ({isAssembly ? "Assembly/Finishing" : type} )
              </span>
            </h2>
          </div>
        </div>

        <Button className="bg-[#1F5AA6] hover:bg-[#1a4b8c] text-white flex items-center gap-2 px-6 h-10 rounded-lg shadow-sm">
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-gray-100 rounded-xl bg-white p-6 gap-4">
        {/* Stepper Status */}
        {isAssembly ? (
          <div className="flex items-start justify-center max-w-lg mx-auto w-full pt-8 pb-4 relative">
            <div className="absolute top-[28px] left-[20%] right-[20%] h-[1px] bg-gray-200 -z-10"></div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#52C488] flex items-center justify-center text-white ring-[6px] ring-white mb-2">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Checked by</p>
                <p className="text-xs text-gray-900">
                  <span className="font-bold">Hasan Waulat</span> |{" "}
                  <span className="font-semibold">10 October 2026, 10:00</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#52C488] flex items-center justify-center text-white ring-[6px] ring-white mb-2">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Approved by</p>
                <p className="text-xs text-gray-900">
                  <span className="font-bold">Andre</span> |{" "}
                  <span className="font-semibold">10 October 2026, 10:00</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between w-full pt-8 pb-4 relative">
            <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gray-200 -z-10"></div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#52C488] flex items-center justify-center text-white ring-[6px] ring-white mb-2">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-900 font-bold mb-0.5">Dept. Engineering</p>
                <p className="text-[13px] text-gray-600 mb-1">Checked by</p>
                <p className="text-xs text-gray-900 font-semibold">
                  Hasan Waulat | 10 October 2026, 10:00
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#52C488] flex items-center justify-center text-white ring-[6px] ring-white mb-2">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-900 font-bold mb-0.5">Dept. Engineering</p>
                <p className="text-[13px] text-gray-600 mb-1">Approved by</p>
                <p className="text-xs text-gray-900 font-semibold">
                  Hasan Waulat | 10 October 2026, 10:00
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center text-white ring-[6px] ring-white mb-2">
                <Loader className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-900 font-bold mb-0.5">Dept. Manufacture</p>
                <p className="text-[13px] text-gray-600 mb-1">Checked by</p>
                <p className="text-xs text-gray-900 font-semibold">
                  Hasan Waulat | 10 October 2026, 10:00
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center text-white ring-[6px] ring-white mb-2">
                <Loader className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-900 font-bold mb-0.5">Dept. Manufacture</p>
                <p className="text-[13px] text-gray-600 mb-1">Approved by</p>
                <p className="text-xs text-gray-900 font-semibold">
                  Hasan Waulat | 10 October 2026, 10:00
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Row */}
        {isAssembly ? (
          <div className="grid grid-cols-5 gap-4 pt-4 pb-2">
            <div>
              <p className="text-[13px] font-semibold text-gray-700 mb-1">Product No.</p>
              <p className="text-sm text-gray-600">IDC-935B (01-272B)</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-700 mb-1">Lot No.</p>
              <p className="text-sm text-gray-600">S870</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-700 mb-1">Line No.</p>
              <p className="text-sm text-gray-600">-</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-700 mb-1">Auto Valve No.</p>
              <p className="text-sm text-gray-600">-</p>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-700 mb-1">Inspection by</p>
              <p className="text-sm text-gray-600">Hasan Waulat</p>
            </div>
          </div>
        ) : (
          <div className="pt-2 pb-2">
            <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[13px] font-semibold text-gray-700 mb-1">Part No. - Name</p>
                <p className="text-sm text-gray-600">1928934 - Part A</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-700 mb-1">Lot No.</p>
                <p className="text-sm text-gray-600">S870</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-700 mb-1">Inspection by</p>
                <p className="text-sm text-gray-600">Hasan Waulat</p>
              </div>
            </div>
          </div>
        )}

        {/* Checksheet Header */}
        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-bold text-gray-800">Checksheet</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
            {isAssembly ? (
              <>
                <Tabs
                  variant="primary"
                  defaultValue="marking"
                  className="w-fit"
                  items={[
                    { value: "marking", label: "Marking", content: null },
                    { value: "clamp", label: "Clamp Assy", content: null },
                    { value: "inspection", label: "Inspection & Packing", content: null },
                  ]}
                />
                <div className="text-xs text-gray-700 flex items-center gap-4">
                  <span>
                    Date & Time :{" "}
                    <span className="font-bold text-gray-900">05 October 2026, 10:00</span>
                  </span>
                  <span>
                    Operator: <span className="font-bold text-gray-900">Hasan Waulat</span>
                  </span>
                </div>
              </>
            ) : (
              <Tabs
                variant="primary"
                defaultValue="inner"
                className="w-full flex-wrap"
                items={[
                  { value: "material", label: "Material Preparation", content: null },
                  { value: "inner", label: "Inner", content: null },
                  { value: "spiral", label: "Spiral", content: null },
                  { value: "outer", label: "Outer", content: null },
                  { value: "condition", label: "Condition Setting Extruder", content: null },
                  { value: "extrusion", label: "Extrusion Size", content: null },
                  { value: "marking", label: "Marking Size", content: null },
                  { value: "contraction", label: "Contraction Size", content: null },
                  { value: "after", label: "Size After Curing", content: null },
                ]}
              />
            )}
          </div>
        </div>

        {/* Table Section (Read Only) */}
        {isAssembly ? (
          <div className="overflow-x-auto border rounded-xl border-gray-100">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-500 uppercase bg-[#F8FAFC] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold" rowSpan={2}>
                    IMPORTANT RANK
                  </th>
                  <th className="px-4 py-3 font-semibold" rowSpan={2}>
                    ITEM
                  </th>
                  <th className="px-4 py-3 font-semibold text-center" colSpan={2}>
                    NOTES
                  </th>
                  <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>
                    TOTAL
                  </th>
                  <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>
                    ITEM NG / SAMPLE
                  </th>
                  <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>
                    TOTAL NG
                  </th>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <th className="px-4 py-2 font-semibold text-center border-t border-gray-100">
                    START
                  </th>
                  <th className="px-4 py-2 font-semibold text-center border-t border-gray-100">
                    END
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Marking Jig Row */}
                <tr>
                  <td className="px-4 py-4 align-top border-r border-gray-100 bg-[#FAFAFA]"></td>
                  <td className="px-4 py-4 align-top min-w-[250px]">
                    <div className="font-medium text-gray-800 mb-1">Marking Jig</div>
                    <div className="text-gray-500 text-[13px]">
                      Tidak ada kerusakan (baut longgar, engsel rusak, bur, retak, atau cacat) pada
                      jig
                    </div>
                  </td>
                  <td className="px-2 py-4 align-top text-center min-w-[80px]">
                    <span className="inline-block px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-4 align-top text-center min-w-[80px]">
                    <span className="inline-block px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-4 align-top text-center text-gray-700 min-w-[60px]">40</td>
                  <td className="px-2 py-4 align-top text-gray-700 min-w-[120px] text-center">
                    H - Pendek
                  </td>
                  <td className="px-2 py-4 align-top text-center text-gray-700 min-w-[60px]">2</td>
                </tr>

                {/* Vise Side Rows */}
                <tr>
                  <td
                    rowSpan={3}
                    className="px-1 py-4 align-middle border-r border-gray-100 bg-[#FAFAFA] text-center relative w-12"
                  >
                    <span className="inline-block transform -rotate-90 whitespace-nowrap text-xs font-semibold text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      Vise Side
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                    Warna marking Persegi Panjang - Blue (Biru)
                  </td>
                  <td className="px-2 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                    Ukuran marking 10 + 3x3
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">
                    9.98 x 4.71
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">
                    9.98 x 4.71
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                    Posisi marking (dengan jig inspection)
                  </td>
                  <td className="px-2 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                </tr>

                {/* Insertion Side Rows */}
                <tr>
                  <td
                    rowSpan={3}
                    className="px-1 py-4 align-middle border-r border-t border-gray-100 bg-[#FAFAFA] text-center relative w-12"
                  >
                    <span className="inline-block transform -rotate-90 whitespace-nowrap text-xs font-semibold text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      Insertion Side
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px] border-t border-gray-100">
                    Warna marking Persegi Panjang - Blue (Biru)
                  </td>
                  <td className="px-2 py-3 align-middle text-center border-t border-gray-100">
                    <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center border-t border-gray-100">
                    <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">
                      OK
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400 border-t border-gray-100">
                    -
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400 border-t border-gray-100">
                    -
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400 border-t border-gray-100">
                    -
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                    Ukuran marking 10 + 3x3
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">
                    9.98 x 4.71
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">
                    9.98 x 4.71
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                    Posisi marking (dengan jig inspection)
                  </td>
                  <td className="px-2 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 bg-[#FFEBEE] text-[#C62828] text-xs font-semibold rounded-md">
                      NG
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center">
                    <span className="inline-block px-3 py-1 bg-[#FFEBEE] text-[#C62828] text-xs font-semibold rounded-md">
                      NG
                    </span>
                  </td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                  <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-xl border-gray-100">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-500 uppercase bg-[#F8FAFC] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center border-r border-gray-100">
                    INSPECTION ITEM
                  </th>
                  <th className="px-4 py-3 font-semibold text-center border-r border-gray-100">
                    INSPECTION INSTRUMENT
                  </th>
                  <th className="px-4 py-3 font-semibold text-center border-r border-gray-100">
                    RESULT 1
                  </th>
                  <th className="px-4 py-3 font-semibold text-center border-r border-gray-100">
                    RESULT 2
                  </th>
                  <th className="px-4 py-3 font-semibold text-center">RESULT 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Row 1 */}
                <tr>
                  <td className="px-4 py-3 align-middle border-r border-gray-100" rowSpan={2}>
                    <div className="text-gray-800">Ukuran & Kondisi Tool</div>
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-b border-gray-100 text-gray-700">
                    Nipple
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-b border-gray-100 text-gray-700">
                    tes
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-b border-gray-100 text-gray-700">
                    tes
                  </td>
                  <td className="px-4 py-3 align-middle border-b border-gray-100 text-gray-700">
                    tes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    Die
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    tes
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    tes
                  </td>
                  <td className="px-4 py-3 align-middle text-gray-700">tes</td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="px-4 py-3 align-middle border-r border-gray-100">
                    <div className="text-gray-800">Ketebalan Hose yang tidak merata</div>
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    Hose Thickness
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100">
                    <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-xs text-gray-600">
                      <div>
                        1 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        2 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        3 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        4 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        5 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        6 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        7 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        8 : <span className="font-bold text-gray-900">2</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100">
                    <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-xs text-gray-600">
                      <div>
                        1 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        2 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        3 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        4 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        5 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        6 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        7 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        8 : <span className="font-bold text-gray-900">2</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-gray-700">
                    <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-xs text-gray-600">
                      <div>
                        1 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        2 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        3 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        4 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        5 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        6 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        7 : <span className="font-bold text-gray-900">2</span>
                      </div>
                      <div>
                        8 : <span className="font-bold text-gray-900">2</span>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="px-4 py-3 align-middle border-r border-gray-100">
                    <div className="text-gray-800">Uneven (Tebal Max - Tebal Min)</div>
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    -
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    tes
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-gray-100 text-gray-700">
                    tes
                  </td>
                  <td className="px-4 py-3 align-middle text-gray-700">tes</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
