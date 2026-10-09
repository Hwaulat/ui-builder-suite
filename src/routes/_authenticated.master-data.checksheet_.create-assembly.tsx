import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/ui/select-input";
import { Tabs } from "@/components/ui/tablist";

export const Route = createFileRoute("/_authenticated/master-data/checksheet_/create-assembly")({
  component: CreateAssemblyChecksheetPage,
});

function CreateAssemblyChecksheetPage() {
  const navigate = useNavigate();

  const mockInstrumentOptions = [
    { label: "OK/NG", value: "OK/NG" },
    { label: "Numeric", value: "Numeric" },
    { label: "Dropdown", value: "Dropdown" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-700 rounded-lg font-medium px-4 h-10"
            icon={<ChevronLeft className="w-4 h-4" />}
            label="Back"
            onClick={() => navigate({ to: "/master-data/checksheet" })}
          />
          <div className="h-6 w-[1px] bg-gray-200"></div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Plus className="w-6 h-6 text-gray-800" />
            Create Checksheet{" "}
            <span className="text-[#2b5a9e] italic font-semibold text-lg ml-1">
              (Asembly/Finishing)
            </span>
          </h1>
        </div>
        <Button
          variant="primary"
          className="bg-[#2b5a9e] hover:bg-[#22487e] text-white px-8 rounded-lg font-medium h-10"
          label="Submit"
        />
      </div>

      <div className="p-6 max-w-[1200px] w-full mx-auto space-y-6 pb-20">
        {/* Top Form */}
        <div className="grid grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Product No.</label>
            <Input value="IDC-935B (01-272B)" readOnly className="bg-white border-gray-200 h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Lot No.</label>
            <Input value="S870" readOnly className="bg-white border-gray-200 h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Line No.</label>
            <Input value="-" readOnly className="bg-white border-gray-200 h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Auto Valve No.</label>
            <Input value="-" readOnly className="bg-white border-gray-200 h-10" />
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-2">
          <Tabs
            variant="primary"
            defaultValue="marking"
            items={[
              { value: "marking", label: "Marking", content: null },
              { value: "clamp", label: "Clamp Assy", content: null },
              { value: "inspection", label: "Inspection & Packing", content: null },
            ]}
          />
        </div>

        {/* Checksheet Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Checksheet</h2>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_40px_1fr_250px] gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">
                IMPORTANT
                <br />
                RANK
              </div>
              <div></div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider flex items-end uppercase">
                INSPECTION ITEM
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider flex items-end uppercase pl-2">
                INSPECTION INSTRUMENT
              </div>
            </div>

            {/* Group 1 */}
            <div className="grid grid-cols-[100px_40px_1fr_250px] gap-4 px-6 py-6 border-b border-gray-100 items-start relative group">
              <div className="flex justify-center pt-2">
                <div className="w-14 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 bg-gray-50/50">
                  -
                </div>
              </div>
              <div className="flex items-center justify-center"></div>

              <div className="col-span-2 space-y-3">
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Marking Jig"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="OK/NG"
                    containerClassName="bg-white"
                  />
                </div>
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Tidak ada kerusakan (baut longgar, engsel rusak, burr, retak atau cacat pada jig"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="OK/NG"
                    containerClassName="bg-white"
                  />
                </div>
                <Button
                  variant="outline"
                  className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white"
                  icon={<Plus className="w-4 h-4" />}
                  label="Add New"
                />
              </div>
            </div>

            {/* Group 2 */}
            <div className="grid grid-cols-[100px_40px_1fr_250px] gap-4 px-6 py-6 border-b border-gray-100 items-center relative group">
              <div className="flex justify-center absolute left-6 top-1/2 -translate-y-1/2 w-[100px]">
                <div className="w-14 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 bg-gray-50/50">
                  -
                </div>
              </div>
              <div className="flex items-center justify-center relative w-[40px] col-start-2 min-h-[160px]">
                <span className="transform -rotate-90 whitespace-nowrap text-[11px] font-bold text-gray-400 tracking-[0.2em] absolute">
                  VISE SIDE
                </span>
              </div>

              <div className="col-span-2 space-y-3 py-2">
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Warna marking persegi panjang - blue (biru)"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="OK/NG"
                    containerClassName="bg-white"
                  />
                </div>
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Ukuran marking 10+3x3"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="Numeric"
                    containerClassName="bg-white"
                  />
                </div>
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Psosi marking (dengan jig inspection)"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="Numeric"
                    containerClassName="bg-white"
                  />
                </div>
                <Button
                  variant="outline"
                  className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white"
                  icon={<Plus className="w-4 h-4" />}
                  label="Add New"
                />
              </div>
            </div>

            {/* Group 3 */}
            <div className="grid grid-cols-[100px_40px_1fr_250px] gap-4 px-6 py-6 items-center relative group">
              <div className="flex justify-center absolute left-6 top-1/2 -translate-y-1/2 w-[100px]">
                <div className="w-14 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 bg-gray-50/50">
                  -
                </div>
              </div>
              <div className="flex items-center justify-center relative w-[40px] col-start-2 min-h-[160px]">
                <span className="transform -rotate-90 whitespace-nowrap text-[11px] font-bold text-gray-400 tracking-[0.2em] absolute">
                  INSERTION SIDE
                </span>
              </div>

              <div className="col-span-2 space-y-3 py-2">
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Warna marking persegi panjang - blue (biru)"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="OK/NG"
                    containerClassName="bg-white"
                  />
                </div>
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Ukuran marking 10+3x3"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="Numeric"
                    containerClassName="bg-white"
                  />
                </div>
                <div className="grid grid-cols-[1fr_250px] gap-4">
                  <Input
                    value="Psosi marking (dengan jig inspection)"
                    className="bg-white border-gray-200 h-10 text-gray-700"
                  />
                  <SelectInput
                    isMulti={false}
                    datalist={mockInstrumentOptions}
                    defValue="Numeric"
                    containerClassName="bg-white"
                  />
                </div>
                <Button
                  variant="outline"
                  className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white"
                  icon={<Plus className="w-4 h-4" />}
                  label="Add New"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
