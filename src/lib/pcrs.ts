export type ProcessName = "marking" | "clamp_assy" | "inspection_packing";
export type AnswerType = "ok_ng" | "actual_value" | "text";
export type RecordStatus = "in_progress" | "waiting_approval" | "approved" | "returned";
export type StepStatus = "locked" | "active" | "completed";

export const PROCESSES: { key: ProcessName; label: string; sequence: number }[] = [
  { key: "marking", label: "Marking", sequence: 1 },
  { key: "clamp_assy", label: "Clamp Assy", sequence: 2 },
  { key: "inspection_packing", label: "Inspection & Packing", sequence: 3 },
];

export const processLabel = (name: ProcessName) =>
  PROCESSES.find((p) => p.key === name)?.label ?? name;

export const RECORD_STATUS_LABEL: Record<RecordStatus, string> = {
  in_progress: "Sedang Diisi",
  waiting_approval: "Menunggu Approval",
  approved: "Disetujui",
  returned: "Dikembalikan",
};

export const RECORD_STATUS_COLOR: Record<RecordStatus, "blue" | "amber" | "green" | "red"> = {
  in_progress: "blue",
  waiting_approval: "amber",
  approved: "green",
  returned: "red",
};

export const ANSWER_TYPE_LABEL: Record<AnswerType, string> = {
  ok_ng: "OK / NG",
  actual_value: "Nilai Aktual",
  text: "Teks Bebas",
};

export function isOutOfTolerance(
  value: string | null | undefined,
  min: number | null | undefined,
  max: number | null | undefined,
) {
  if (!value) return false;
  const num = Number(String(value).replace(",", "."));
  if (Number.isNaN(num)) return false;
  if (min != null && num < min) return true;
  if (max != null && num > max) return true;
  return false;
}

export function formatDate(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export const todayISO = () => new Date().toISOString().slice(0, 10);
