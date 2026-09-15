import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, ChevronLeft, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/records/$recordId/approval")({
  component: ApprovalPage,
});

function ApprovalPage() {
  const { recordId } = Route.useParams();
  const router = useRouter();
  const [comments, setComments] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for the record
  const mockRecord = {
    id: recordId,
    title: "Laporan Bulanan Q1",
    status: "Pending",
    category: "Keuangan",
    value: "Rp 150.000.000",
    description: "Laporan keuangan kuartal pertama mencakup semua operasional dan marketing.",
    author: "Budi",
    date: "2026-03-31",
  };

  const handleAction = async (action: 'approve' | 'reject') => {
    setIsProcessing(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
    
    if (action === 'approve') {
      toast.success("Record Disetujui", {
        description: `Record ${recordId} telah berhasil disetujui.`,
      });
    } else {
      toast.error("Record Ditolak", {
        description: `Record ${recordId} telah ditolak.`,
      });
    }
    
    router.navigate({ to: "/records" });
  };

  return (
    <div className="flex-1 space-y-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/records">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Review Record {mockRecord.id}</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {mockRecord.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">Silakan periksa detail di bawah sebelum memberikan approval.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Informasi</CardTitle>
              <CardDescription>Detail data yang telah disubmit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b pb-4">
                <div className="text-sm font-medium text-muted-foreground">Judul</div>
                <div className="col-span-2 text-sm font-medium">{mockRecord.title}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b pb-4">
                <div className="text-sm font-medium text-muted-foreground">Kategori</div>
                <div className="col-span-2 text-sm">{mockRecord.category}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b pb-4">
                <div className="text-sm font-medium text-muted-foreground">Nilai / Metrik</div>
                <div className="col-span-2 text-sm">{mockRecord.value}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b pb-4">
                <div className="text-sm font-medium text-muted-foreground">Deskripsi</div>
                <div className="col-span-2 text-sm">{mockRecord.description}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm font-medium text-muted-foreground">Pembuat</div>
                <div className="col-span-2 text-sm">
                  {mockRecord.author} <span className="text-muted-foreground">({mockRecord.date})</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aksi Approval</CardTitle>
              <CardDescription>Berikan persetujuan atau penolakan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comments">Komentar / Alasan</Label>
                <Textarea 
                  id="comments" 
                  placeholder="Tambahkan komentar (wajib jika ditolak)..." 
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white" 
                onClick={() => handleAction('approve')}
                disabled={isProcessing}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {isProcessing ? "Memproses..." : "Approve Record"}
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => handleAction('reject')}
                disabled={isProcessing || comments.length < 5}
              >
                <XCircle className="mr-2 h-4 w-4" />
                {isProcessing ? "Memproses..." : "Reject Record"}
              </Button>
              {comments.length < 5 && (
                <p className="text-xs text-muted-foreground text-center">
                  * Komentar wajib diisi untuk penolakan
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
