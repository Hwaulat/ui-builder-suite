import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/records/new")({
  component: NewRecordPage,
});

const STEPS = [
  { id: 1, title: "Informasi Dasar" },
  { id: 2, title: "Detail & Metrik" },
  { id: 3, title: "Review & Submit" },
];

function NewRecordPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    value: "",
    notes: "",
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Record berhasil dibuat", {
      description: "Data record baru telah disimpan.",
    });
    router.navigate({ to: "/records" });
  };

  return (
    <div className="flex-1 space-y-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/records">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Buat Record Baru</h2>
          <p className="text-muted-foreground">Isi form berikut dalam 3 tahap.</p>
        </div>
      </div>

      {/* Stepper Progress */}
      <div className="relative flex justify-between">
        <div className="absolute top-1/2 left-0 h-0.5 w-full bg-muted -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300" 
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted ? "bg-primary border-primary text-primary-foreground" :
                  isCurrent ? "bg-background border-primary text-primary" :
                  "bg-background border-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <span className={`text-sm font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <Card className="mt-8 border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Masukkan informasi dasar untuk record ini."}
            {currentStep === 2 && "Lengkapi detail dan angka yang dibutuhkan."}
            {currentStep === 3 && "Periksa kembali data Anda sebelum disubmit."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Record</Label>
                <Input 
                  id="title" 
                  placeholder="Contoh: Laporan Bulanan Q1" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input 
                  id="category" 
                  placeholder="Keuangan, HR, dll." 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <Label htmlFor="value">Nilai / Metrik</Label>
                <Input 
                  id="value" 
                  type="number"
                  placeholder="0" 
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Jelaskan detail record ini..." 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="rounded-lg border p-4 space-y-3 bg-muted/20">
                <div className="grid grid-cols-3 gap-4 border-b pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Judul</div>
                  <div className="col-span-2 text-sm">{formData.title || "-"}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Kategori</div>
                  <div className="col-span-2 text-sm">{formData.category || "-"}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Nilai</div>
                  <div className="col-span-2 text-sm">{formData.value || "-"}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">Deskripsi</div>
                  <div className="col-span-2 text-sm">{formData.description || "-"}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Tambahkan catatan untuk approver..." 
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 1 || isSubmitting}
          >
            Kembali
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={handleNext}>
              Selanjutnya <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Submit Record"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
