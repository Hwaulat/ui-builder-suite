import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tablist";
import { Eye, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/records_/$id")({
  component: DetailsApprovalPage,
});

function DetailsApprovalPage() {
  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-[#f8fafc] h-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-9 px-3 bg-white hover:bg-gray-50 text-gray-700 shadow-sm border-gray-200" asChild>
            <Link to="/records">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-800">
            <Eye className="w-5 h-5" />
            <h2>Details Approval</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-6 h-10 rounded-lg shadow-sm">
            Reject
          </Button>
          <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 h-10 rounded-lg shadow-sm">
            Approve
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-gray-100 rounded-xl bg-white p-6 gap-4">

        {/* Info Box */}
        <div className="bg-[#F8FAFC] rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Inspection Date</p>
            <p className="font-semibold text-gray-900 text-sm">15 September 2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Product No.</p>
            <p className="font-semibold text-gray-900 text-sm">IDC-935B (02-272B)</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Lot No.</p>
            <p className="font-semibold text-gray-900 text-sm">S702</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Line No</p>
            <p className="font-semibold text-gray-900 text-sm">-</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Auto Clave No.</p>
            <p className="font-semibold text-gray-900 text-sm">-</p>
          </div>
        </div>

        {/* Checksheet Header */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">Checksheet</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            <div className="bg-[#F1F5F9] text-gray-700 text-xs px-4 py-2 rounded-lg font-medium tracking-wide shrink-0">
              15 September 2026 | Hasan | -
            </div>
          </div>
        </div>

        {/* Table Section (Read Only) */}
        <div className="overflow-x-auto border rounded-xl border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-500 uppercase bg-[#F8FAFC] border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold" rowSpan={2}>IMPORTANT RANK</th>
                <th className="px-4 py-3 font-semibold" rowSpan={2}>ITEM</th>
                <th className="px-4 py-3 font-semibold text-center" colSpan={2}>NOTES</th>
                <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>TOTAL</th>
                <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>ITEM NG / SAMPLE</th>
                <th className="px-4 py-3 font-semibold text-center" rowSpan={2}>TOTAL NG</th>
              </tr>
              <tr className="bg-[#F8FAFC]">
                <th className="px-4 py-2 font-semibold text-center border-t border-gray-100">START</th>
                <th className="px-4 py-2 font-semibold text-center border-t border-gray-100">END</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">

              {/* Marking Jig Row */}
              <tr>
                <td className="px-4 py-4 align-top border-r border-gray-100 bg-[#FAFAFA]"></td>
                <td className="px-4 py-4 align-top min-w-[250px]">
                  <div className="font-medium text-gray-800 mb-1">Marking Jig</div>
                  <div className="text-gray-500 text-[13px]">Tidak ada kerusakan (baut longgar, engsel rusak, bur, retak, atau cacat) pada jig</div>
                </td>
                <td className="px-2 py-4 align-top text-center min-w-[80px]">
                  <span className="inline-block px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-4 align-top text-center min-w-[80px]">
                  <span className="inline-block px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-4 align-top text-center text-gray-700 min-w-[60px]">40</td>
                <td className="px-2 py-4 align-top text-gray-700 min-w-[120px] text-center">H - Pendek</td>
                <td className="px-2 py-4 align-top text-center text-gray-700 min-w-[60px]">2</td>
              </tr>

              {/* Vise Side Rows */}
              <tr>
                <td rowSpan={3} className="px-1 py-4 align-middle border-r border-gray-100 bg-[#FAFAFA] text-center relative w-12">
                  <span className="inline-block transform -rotate-90 whitespace-nowrap text-xs font-semibold text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Vise Side
                  </span>
                </td>
                <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                  Warna marking Persegi Panjang - Blue (Biru)
                </td>
                <td className="px-2 py-3 align-middle text-center">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-3 align-middle text-center">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                  Ukuran marking 10 + 3x3
                </td>
                <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">9.98 x 4.71</td>
                <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">9.98 x 4.71</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                  Posisi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle text-center">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-3 align-middle text-center">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
              </tr>

              {/* Insertion Side Rows */}
              <tr>
                <td rowSpan={3} className="px-1 py-4 align-middle border-r border-t border-gray-100 bg-[#FAFAFA] text-center relative w-12">
                  <span className="inline-block transform -rotate-90 whitespace-nowrap text-xs font-semibold text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Insertion Side
                  </span>
                </td>
                <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px] border-t border-gray-100">
                  Warna marking Persegi Panjang - Blue (Biru)
                </td>
                <td className="px-2 py-3 align-middle text-center border-t border-gray-100">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-3 align-middle text-center border-t border-gray-100">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold rounded-md">OK</span>
                </td>
                <td className="px-2 py-3 align-middle text-center text-gray-400 border-t border-gray-100">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400 border-t border-gray-100">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400 border-t border-gray-100">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                  Ukuran marking 10 + 3x3
                </td>
                <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">9.98 x 4.71</td>
                <td className="px-2 py-3 align-middle text-center text-gray-700 text-[13px]">9.98 x 4.71</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-middle min-w-[250px] text-gray-700 text-[13px]">
                  Posisi marking (dengan jig inspection)
                </td>
                <td className="px-2 py-3 align-middle text-center">
                  <span className="inline-block px-3 py-1 bg-[#FFEBEE] text-[#C62828] text-xs font-semibold rounded-md">NG</span>
                </td>
                <td className="px-2 py-3 align-middle text-center">
                  <span className="inline-block px-3 py-1 bg-[#FFEBEE] text-[#C62828] text-xs font-semibold rounded-md">NG</span>
                </td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
                <td className="px-2 py-3 align-middle text-center text-gray-400">-</td>
              </tr>
            </tbody>
          </table>
        </div>

      </Card>
    </div>
  );
}
