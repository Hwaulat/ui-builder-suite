import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Calendar, ChevronDown, Check, Clock, X, ListChecks } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/")({
  component: DashboardPage,
});

const data = [
  { name: "01/06/2026", total: 400 },
  { name: "02/06/2026", total: 450 },
  { name: "03/06/2026", total: 480 },
  { name: "04/06/2026", total: 420 },
  { name: "05/06/2026", total: 850 },
  { name: "06/06/2026", total: 750 },
  { name: "07/06/2026", total: 680 },
  { name: "08/06/2026", total: 780 },
  { name: "09/06/2026", total: 500 },
  { name: "10/06/2026", total: 350 },
];

function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2 shrink-0">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          <LayoutDashboard className="w-5 h-5" />
          <h2>Dashboard</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>Process :</span>
            <Button variant="outline" className="h-9 px-3 bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 shadow-sm border-slate-200 dark:border-slate-700 transition-colors">
              Marking <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </Button>
          </div>
          <Button variant="outline" className="h-9 px-3 bg-white dark:bg-slate-800 flex items-center gap-2 shadow-sm border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            15/09/2026 - 24/09/2026
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 shrink-0">
        {/* Total Inspection */}
        <Card className="shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Inspection</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 transition-colors">
              <ListChecks className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">200</div>
            <p className="text-xs text-blue-500 dark:text-blue-400 font-medium mt-1">+12.1%</p>
          </CardContent>
        </Card>

        {/* Total OK */}
        <Card className="shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total (OK)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0 transition-colors">
              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">150</div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">93.4%</p>
          </CardContent>
        </Card>

        {/* Total Waiting */}
        <Card className="shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total (Waiting)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shrink-0 transition-colors">
              <Clock className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">20</div>
            <p className="text-xs text-orange-400 dark:text-orange-400 font-medium mt-1">Needs Attention</p>
          </CardContent>
        </Card>

        {/* Total NG */}
        <Card className="shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total (NG)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center shrink-0 transition-colors">
              <X className="h-4 w-4 text-red-500 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">30</div>
            <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1">Critical</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 flex-1 min-h-[400px]">
        <Card className="md:col-span-2 shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl flex flex-col bg-white dark:bg-slate-800 transition-colors">
          <CardHeader className="shrink-0">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Inspection Trends</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-6 flex-1 relative">
            <div className="absolute inset-0 px-2 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl flex flex-col bg-white dark:bg-slate-800 transition-colors">
          <CardHeader className="text-center pb-2 shrink-0">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Inspection Status</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current Period Status Distribution</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-slate-800 dark:text-slate-100">160 <span className="text-2xl font-semibold">(96%)</span></div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Status OK</span>
                  <span className="text-slate-800 dark:text-slate-100 font-bold">100 (90%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Status NG</span>
                  <span className="text-slate-800 dark:text-slate-100 font-bold">20 (2%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-red-500 dark:bg-red-400 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Waiting</span>
                  <span className="text-slate-800 dark:text-slate-100 font-bold">40 (8%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden transition-colors">
                  <div className="h-full bg-orange-500 dark:bg-orange-400 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
