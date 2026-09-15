import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { PROCESSES, type ProcessName } from "./pcrs";

type Sb = any;

async function hasRole(supabase: Sb, userId: string, role: "leader" | "admin") {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", role)
    .maybeSingle();
  return Boolean(data);
}

async function recomputeTotals(supabase: Sb, recordId: string) {
  const { data: steps } = await supabase
    .from("process_steps")
    .select("id, quantity_checked")
    .eq("record_id", recordId);

  const stepIds = (steps ?? []).map((s: any) => s.id);
  let totalNg = 0;
  if (stepIds.length) {
    const { data: findings } = await supabase
      .from("ng_findings")
      .select("quantity")
      .in("step_id", stepIds);
    totalNg = (findings ?? []).reduce((sum: number, f: any) => sum + (f.quantity ?? 0), 0);
  }
  const processed = (steps ?? []).reduce(
    (max: number, s: any) => Math.max(max, s.quantity_checked ?? 0),
    0,
  );
  const totalGood = Math.max(processed - totalNg, 0);

  await supabase
    .from("progress_records")
    .update({ total_ng: totalNg, total_good: totalGood })
    .eq("id", recordId);

  return { totalNg, totalGood, processed };
}

/** Create a new record with its three locked/active process steps. */
export const createRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        product_id: z.string().uuid(),
        lot_no: z.string().min(1),
        line_no: z.string().optional(),
        autoclave_no: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const supabase = context.supabase as Sb;

    const { data: template, error: templateError } = await supabase
      .from("checklist_templates")
      .select("id")
      .eq("product_id", data.product_id)
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (templateError) throw new Error(templateError.message);
    if (!template) throw new Error("Produk ini belum punya template checklist aktif.");

    const { data: record, error } = await supabase
      .from("progress_records")
      .insert({
        product_id: data.product_id,
        template_id: template.id,
        lot_no: data.lot_no,
        line_no: data.line_no || null,
        autoclave_no: data.autoclave_no || null,
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    const steps = PROCESSES.map((p) => ({
      record_id: record.id,
      process_name: p.key,
      sequence: p.sequence,
      status: p.sequence === 1 ? "active" : "locked",
    }));
    const { error: stepError } = await supabase.from("process_steps").insert(steps);
    if (stepError) throw new Error(stepError.message);

    return { id: record.id as string };
  });

/** Server-side completeness validation + lock current step + unlock the next one. */
export const completeStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ step_id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const supabase = context.supabase as Sb;

    const { data: step, error } = await supabase
      .from("process_steps")
      .select("id, record_id, process_name, sequence, status, work_date, operator_name, quantity_checked")
      .eq("id", data.step_id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!step) throw new Error("Proses tidak ditemukan.");
    if (step.status !== "active") throw new Error("Proses ini tidak sedang aktif.");

    const { data: record } = await supabase
      .from("progress_records")
      .select("id, template_id, status")
      .eq("id", step.record_id)
      .maybeSingle();
    if (!record) throw new Error("Record tidak ditemukan.");

    // previous steps must be completed (server-side stepper guard)
    const { data: siblings } = await supabase
      .from("process_steps")
      .select("sequence, status")
      .eq("record_id", step.record_id);
    const unfinishedBefore = (siblings ?? []).filter(
      (s: any) => s.sequence < step.sequence && s.status !== "completed",
    );
    if (unfinishedBefore.length)
      throw new Error("Proses sebelumnya belum selesai, tidak bisa lanjut.");

    const missing: string[] = [];
    if (!step.work_date) missing.push("Tanggal");
    if (!step.operator_name) missing.push("Operator");
    if (step.quantity_checked == null) missing.push("Jumlah diperiksa");

    const { data: items } = await supabase
      .from("checklist_template_items")
      .select("id, item_label, requires_awal_akhir")
      .eq("template_id", record.template_id)
      .eq("process_name", step.process_name as ProcessName);

    const { data: entries } = await supabase
      .from("checklist_entries")
      .select("template_item_id, value_awal, value_akhir")
      .eq("step_id", step.id);

    const byItem = new Map<string, any>();
    (entries ?? []).forEach((e: any) => byItem.set(e.template_item_id, e));

    const missingItemIds: string[] = [];
    (items ?? []).forEach((item: any) => {
      const entry = byItem.get(item.id);
      const awalEmpty = !entry?.value_awal || String(entry.value_awal).trim() === "";
      const akhirEmpty = !entry?.value_akhir || String(entry.value_akhir).trim() === "";
      if (awalEmpty || (item.requires_awal_akhir && akhirEmpty)) {
        missing.push(item.item_label);
        missingItemIds.push(item.id);
      }
    });

    if (missing.length) {
      return { ok: false as const, missing, missingItemIds };
    }

    const { error: updateError } = await supabase
      .from("process_steps")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", step.id)
      .eq("status", "active");
    if (updateError) throw new Error(updateError.message);

    const next = (siblings ?? []).find((s: any) => s.sequence === step.sequence + 1);
    if (next) {
      await supabase
        .from("process_steps")
        .update({ status: "active" })
        .eq("record_id", step.record_id)
        .eq("sequence", step.sequence + 1)
        .eq("status", "locked");
    }

    const totals = await recomputeTotals(supabase, step.record_id);
    return { ok: true as const, missing: [], missingItemIds: [], ...totals };
  });

/** Operator submits a fully completed record for leader approval. */
export const submitRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ record_id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const supabase = context.supabase as Sb;

    const { data: steps } = await supabase
      .from("process_steps")
      .select("status")
      .eq("record_id", data.record_id);
    const incomplete = (steps ?? []).filter((s: any) => s.status !== "completed");
    if (incomplete.length || (steps ?? []).length < PROCESSES.length)
      throw new Error("Semua proses harus selesai sebelum diajukan approval.");

    await recomputeTotals(supabase, data.record_id);
    const { error } = await supabase
      .from("progress_records")
      .update({ status: "waiting_approval", submitted_at: new Date().toISOString(), review_note: null })
      .eq("id", data.record_id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Leader approves or returns a record. */
export const reviewRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        record_id: z.string().uuid(),
        approve: z.boolean(),
        note: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const supabase = context.supabase as Sb;
    const allowed =
      (await hasRole(supabase, context.userId, "leader")) ||
      (await hasRole(supabase, context.userId, "admin"));
    if (!allowed) throw new Error("Hanya Leader/Admin yang boleh melakukan approval.");

    const { data: record } = await supabase
      .from("progress_records")
      .select("status")
      .eq("id", data.record_id)
      .maybeSingle();
    if (!record) throw new Error("Record tidak ditemukan.");
    if (record.status !== "waiting_approval")
      throw new Error("Record ini tidak sedang menunggu approval.");

    if (!data.approve && !data.note?.trim())
      throw new Error("Alasan wajib diisi saat mengembalikan record.");

    const { error } = await supabase
      .from("progress_records")
      .update(
        data.approve
          ? {
              status: "approved",
              approved_by: context.userId,
              approved_at: new Date().toISOString(),
              review_note: data.note || null,
            }
          : { status: "returned", review_note: data.note },
      )
      .eq("id", data.record_id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Leader/Admin reopens a locked step, with a mandatory reason written to the audit log. */
export const reopenStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ step_id: z.string().uuid(), reason: z.string().min(3) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const supabase = context.supabase as Sb;
    const allowed =
      (await hasRole(supabase, context.userId, "leader")) ||
      (await hasRole(supabase, context.userId, "admin"));
    if (!allowed) throw new Error("Hanya Leader/Admin yang boleh membuka kembali proses.");

    const { data: step } = await supabase
      .from("process_steps")
      .select("id, record_id, sequence, status")
      .eq("id", data.step_id)
      .maybeSingle();
    if (!step) throw new Error("Proses tidak ditemukan.");
    if (step.status !== "completed") throw new Error("Proses ini belum terkunci.");

    // reopening a step locks every later step again
    await supabase
      .from("process_steps")
      .update({ status: "locked", completed_at: null })
      .eq("record_id", step.record_id)
      .gt("sequence", step.sequence);

    await supabase
      .from("process_steps")
      .update({ status: "active", completed_at: null })
      .eq("id", step.id);

    await supabase
      .from("progress_records")
      .update({ status: "in_progress", approved_by: null, approved_at: null })
      .eq("id", step.record_id);

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", context.userId)
      .maybeSingle();

    await supabase.from("step_audit_logs").insert({
      step_id: step.id,
      action: "reopen",
      reason: data.reason,
      actor_id: context.userId,
      actor_name: profile?.full_name ?? null,
    });

    return { ok: true as const };
  });

/** Recalculate totals (used after NG findings change). */
export const refreshTotals = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ record_id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => recomputeTotals(context.supabase as Sb, data.record_id));
