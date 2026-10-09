import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs } from "@/components/ui/tablist";

type SearchParams = {
  type?: string
}

export const Route = createFileRoute("/_authenticated/daily-progress_/create-tsc")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      type: (search.type as string) || "TSC Extruder",
    }
  },
  component: CreateTscChecksheetPage,
});

function CompoundRowGroup({ label, results }: { label: string; results: { [key: string]: string } }) {
  // We mock the state just for presentation, ideally it's handled by a form library
  return (
    <>
      <tr className="border-b border-slate-100 dark:border-slate-700/50">
        <td rowSpan={2} className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px] font-medium w-[180px]">
          {label}
        </td>
        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px] font-medium w-[120px]">
          Inner
        </td>
        {[1, 2, 3].map((res) => (
          <td key={`inner-${res}`} className="px-3 py-3 align-middle border-r border-slate-200 dark:border-slate-700 min-w-[280px]">
            <div className="flex items-center gap-2 flex-wrap xl:flex-nowrap">
              <div className="flex items-center gap-1.5 flex-1 min-w-[80px]">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Compound:</span>
                <Input defaultValue={results.compound} placeholder="Input" className="h-8 text-xs px-2 w-full min-w-[50px] shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-center" />
              </div>
              <div className="flex items-center gap-1.5 flex-1 min-w-[60px]">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tag:</span>
                <Input defaultValue={results.tag} placeholder="Input" className="h-8 text-xs px-2 w-full min-w-[40px] shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-center" />
              </div>
              <div className="flex items-center gap-1.5 flex-1 min-w-[60px]">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pcs:</span>
                <Input defaultValue={results.pcs} placeholder="Input" className="h-8 text-xs px-2 w-full min-w-[40px] shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-center" />
              </div>
            </div>
          </td>
        ))}
      </tr>
      <tr className="border-b border-slate-100 dark:border-slate-700/50">
        <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px] font-medium">
          Outer
        </td>
        {[1, 2, 3].map((res) => (
          <td key={`outer-${res}`} className="px-3 py-3 align-middle border-r border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 flex-wrap xl:flex-nowrap">
              <div className="flex items-center gap-1.5 flex-1 min-w-[80px]">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Compound:</span>
                <Input defaultValue={results.compound} placeholder="Input" className="h-8 text-xs px-2 w-full min-w-[50px] shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-center" />
              </div>
              <div className="flex items-center gap-1.5 flex-1 min-w-[60px]">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tag:</span>
                <Input defaultValue={results.tag} placeholder="Input" className="h-8 text-xs px-2 w-full min-w-[40px] shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-center" />
              </div>
              <div className="flex items-center gap-1.5 flex-1 min-w-[60px]">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pcs:</span>
                <Input defaultValue={results.pcs} placeholder="Input" className="h-8 text-xs px-2 w-full min-w-[40px] shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-center" />
              </div>
            </div>
          </td>
        ))}
      </tr>
    </>
  );
}

function CreateTscChecksheetPage() {
  const { type } = Route.useSearch();
  const [partNo, setPartNo] = useState("");
  const navigate = useNavigate();

  const isFilled = partNo !== "";
  const mockResults = isFilled ? { compound: "2", tag: "2", pcs: "2", text: "tes" } : { compound: "", tag: "", pcs: "", text: "" };

  const tabs = [
    "Material Preparation", "Inner", "Spiral", "Outer", 
    "Condition Setting Extruder", "Extrusion Size", "Marking Size", 
    "Contraction Size", "Size After Curing"
  ];

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-y-auto transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-9 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm border-slate-200 dark:border-slate-700 transition-colors" asChild>
            <Link to="/daily-progress">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            <Plus className="w-5 h-5" />
            <h2>
              Create New Checksheet <span className="text-blue-600 dark:text-blue-400 italic font-bold">({type})</span>
            </h2>
          </div>
        </div>
        <Button 
          onClick={() => navigate({ to: "/daily-progress" })}
          disabled={!isFilled}
          className={`h-9 px-6 font-medium text-sm transition-colors ${
            isFilled 
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
              : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
          }`}
        >
          Submit
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Part No. - Name</Label>
            <Select value={partNo} onValueChange={setPartNo}>
              <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-10 shadow-sm">
                <SelectValue placeholder="Choose part no - name" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="1928934">1928934 - Part A</SelectItem>
                <SelectItem value="1928935">1928935 - Part B</SelectItem>
                <SelectItem value="1928936">1928936 - Part C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lot No.</Label>
            <Input 
              value={isFilled ? "S870" : ""} 
              readOnly 
              placeholder="Autofill by part no - name" 
              className="bg-slate-200/60 dark:bg-slate-800 border-transparent h-10 text-slate-700 dark:text-slate-300 font-medium placeholder:font-normal placeholder:text-slate-500" 
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-2">
          <Tabs 
            variant="primary"
            defaultValue={tabs[0]}
            items={tabs.map((tab) => ({
              value: tab,
              label: tab,
              content: (
                <>
                  {/* Checksheet Label */}
                  <div className="mb-3">
                    <Label className="text-base font-bold text-slate-800 dark:text-slate-100">Checksheet</Label>
                  </div>

                  <div className="overflow-x-auto border rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700">
                    Inspection Item
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700">
                    Inspection<br/>Instrument
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center">
                    Result 1
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-r border-slate-200 dark:border-slate-700 text-center">
                    Result 2
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700 text-center">
                    Result 3
                  </th>
                </tr>
              </thead>
              <tbody>
                <CompoundRowGroup label="Compound No." results={mockResults} />
                <CompoundRowGroup label="Compound Batch No." results={mockResults} />
                
                {/* Tipe Benang Row */}
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td rowSpan={2} className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px] font-medium w-[180px]">
                    Tipe Benang (Merk)
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px] font-medium w-[120px]">
                    Yarn
                  </td>
                  {[1, 2, 3].map((res) => (
                    <td key={`yarn-${res}`} className="px-3 py-3 align-middle border-r border-slate-200 dark:border-slate-700">
                      <Input defaultValue={mockResults.text} placeholder="Input" className="w-full shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm h-10 px-3" />
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <td className="px-4 py-3 align-middle border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[13px] font-medium">
                    Warp Yarn
                  </td>
                  {[1, 2, 3].map((res) => (
                    <td key={`warp-${res}`} className="px-3 py-3 align-middle border-r border-slate-200 dark:border-slate-700">
                      <Input defaultValue={mockResults.text} placeholder="Input" className="w-full shadow-none bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm h-10 px-3" />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

                </>
              ),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
