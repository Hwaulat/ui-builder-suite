import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/ui/select-input";
import { Tabs } from "@/components/ui/tablist";

export const Route = createFileRoute("/_authenticated/master-data/checksheet_/create-tsc")({
  component: CreateTscChecksheetPage,
});

function CreateTscChecksheetPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: Route.id }) as { type?: string };
  
  // Determine title based on query param, default to TSC Extruder
  let titleType = "TSC Extruder";
  if (search.type === "v3") titleType = "V3";
  if (search.type === "v4") titleType = "V4";

  const mockPartOptions = [
    { label: "0091 - Part Name", value: "0091" },
  ];

  const mockInstrumentOptions = [
    { label: "Nipple", value: "Nipple" },
    { label: "Die", value: "Die" },
    { label: "Free Text", value: "Free Text" },
    { label: "Point Number", value: "Point Number" },
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
            className="border-gray-200 text-gray-700 rounded-lg font-medium px-4 h-10 bg-white"
            icon={<ChevronLeft className="w-4 h-4" />}
            label="Back"
            onClick={() => navigate({ to: "/master-data/checksheet" })}
          />
          <div className="h-6 w-[1px] bg-gray-200"></div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Plus className="w-6 h-6 text-gray-800" />
            Create Checksheet <span className="text-[#2b5a9e] italic font-semibold text-lg ml-1">({titleType})</span>
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
        <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Part No - Name</label>
            <SelectInput isMulti={false} datalist={mockPartOptions} defValue="0091" containerClassName="bg-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Lot No.</label>
            <Input value="S870" readOnly className="bg-white border-gray-200 h-10" />
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-2 overflow-x-auto pb-2 scrollbar-hide">
          <Tabs 
            variant="secondary"
            defaultValue="inner"
            items={[
              { value: "material", label: "Material Preparation", content: null },
              { value: "inner", label: "Inner", content: null },
              { value: "spiral", label: "Spiral", content: null },
              { value: "outer", label: "Outer", content: null },
              { value: "condition", label: "Condition Setting Extruder", content: null },
              { value: "extrusion", label: "Extrusion Size", content: null },
              { value: "marking", label: "Marking Size", content: null },
              { value: "contraction", label: "Contraction Size", content: null },
              { value: "sizeafter", label: "Size After Curing", content: null }
            ]}
          />
        </div>

        {/* Checksheet Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Checksheet</h2>
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="text-[11px] font-bold text-gray-500 tracking-wider flex items-center uppercase">INSPECTION ITEM</div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider flex items-center uppercase pl-2">INSPECTION INSTRUMENT</div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider flex items-center uppercase text-center pl-2">ACTION</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Ukuran & Kondisi Tool" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Nipple" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Die" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Ukuran & Kondisi Mesh" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Free Text" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Free Hose I.D (mm)" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Free Text" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Ketebalan Free Hose (mm)" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Free Text" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Ketebalan Hose yang tidak merata (8 point)" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Point Number" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Uneven (Tebal Max - Tebal Min)" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Numeric" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Row 7 */}
            <div className="grid grid-cols-[1fr_250px_60px] gap-4 px-6 py-4 border-b border-gray-100 items-start group hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-3 pr-8">
                <Input value="Inner & Outer Appearance" className="bg-white border-gray-200 h-10 text-gray-700" />
                <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <SelectInput isMulti={false} datalist={mockInstrumentOptions} defValue="Dropdown" containerClassName="bg-white flex-1" />
                  <Button variant="icon" className="shrink-0 !w-10 !h-10 border border-gray-200 bg-white hover:bg-gray-50" icon={<Trash2 className="w-4 h-4 text-gray-400" />} />
                </div>
                <Button variant="outline" className="h-9 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
              </div>
              <div></div>
            </div>

            {/* Footer Add New */}
            <div className="px-6 py-4">
              <Button variant="outline" className="h-10 border-gray-200 text-gray-600 rounded-lg font-medium px-4 bg-white" icon={<Plus className="w-4 h-4" />} label="Add New" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
