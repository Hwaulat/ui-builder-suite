import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/records/")({
  component: RecordsPage,
});

const mockRecords = [
  { id: "REC-001", title: "Monthly Report Jan", status: "Approved", date: "2026-01-15", author: "Budi" },
  { id: "REC-002", title: "Q1 Financials", status: "Pending", date: "2026-03-31", author: "Siti" },
  { id: "REC-003", title: "Project Alpha Plan", status: "Draft", date: "2026-04-10", author: "Agus" },
  { id: "REC-004", title: "Marketing Campaign", status: "Approved", date: "2026-05-01", author: "Dewi" },
  { id: "REC-005", title: "IT Asset Inventory", status: "Rejected", date: "2026-06-15", author: "Rudi" },
];

function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRecords = mockRecords.filter((record) => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) || record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daftar Record</h2>
          <p className="text-muted-foreground">Kelola dan filter semua record dalam sistem.</p>
        </div>
        <Button asChild>
          <Link to="/records/new">
            <Plus className="mr-2 h-4 w-4" /> Tambah Record
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-background p-4 rounded-lg border">
        <div className="flex flex-1 items-center space-x-2 w-full max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari ID atau Judul..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID Record</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Pembuat</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell>{record.author}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        record.status === "Approved" ? "default" :
                        record.status === "Pending" ? "secondary" :
                        record.status === "Rejected" ? "destructive" : "outline"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/records/$recordId/approval`} params={{ recordId: record.id }}>
                        Lihat Detail
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Tidak ada record yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
