import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/master-data")({
  component: MasterDataPage,
});

const initialCategories = [
  { id: 1, name: "Keuangan", description: "Laporan terkait keuangan dan akuntansi" },
  { id: 2, name: "Operasional", description: "Laporan harian operasional perusahaan" },
  { id: 3, name: "Marketing", description: "Campaign dan aktivitas marketing" },
];

const initialRoles = [
  { id: 1, name: "Admin", accessLevel: "Full Access" },
  { id: 2, name: "Approver", accessLevel: "Review & Approve" },
  { id: 3, name: "Submitter", accessLevel: "Create Only" },
];

function MasterDataPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [roles, setRoles] = useState(initialRoles);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Master Data</h2>
          <p className="text-muted-foreground">Kelola data referensi dan pengaturan sistem.</p>
        </div>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Kategori Record</TabsTrigger>
          <TabsTrigger value="roles">Roles & Hak Akses</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan Sistem</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 w-full max-w-sm">
              <Input placeholder="Cari kategori..." />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
            </Button>
          </div>
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">{cat.id}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 w-full max-w-sm">
              <Input placeholder="Cari role..." />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tambah Role
            </Button>
          </div>
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Nama Role</TableHead>
                  <TableHead>Hak Akses</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.id}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.accessLevel}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="rounded-md border bg-background p-6">
            <h3 className="text-lg font-medium">Pengaturan Umum</h3>
            <p className="text-sm text-muted-foreground mb-4">Konfigurasi dasar aplikasi Anda.</p>
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Aplikasi</label>
                <Input defaultValue="UI Builder Suite" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Notifikasi Default</label>
                <Input defaultValue="admin@example.com" />
              </div>
              <Button>Simpan Pengaturan</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
