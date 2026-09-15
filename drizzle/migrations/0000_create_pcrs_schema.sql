-- ENUMS
CREATE TYPE public.app_role AS ENUM ('operator','leader','admin');
CREATE TYPE public.process_name AS ENUM ('marking','clamp_assy','inspection_packing');
CREATE TYPE public.answer_type AS ENUM ('ok_ng','actual_value','text');
CREATE TYPE public.record_status AS ENUM ('in_progress','waiting_approval','approved','returned');
CREATE TYPE public.step_status AS ENUM ('locked','active','completed');

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  employee_no text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles readable by authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roles readable by authenticated" ON public.user_roles FOR SELECT TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;

  -- first ever user becomes admin, everyone else operator
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'leader') ON CONFLICT DO NOTHING;
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'operator') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- MASTER: PRODUCTS
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_no text NOT NULL UNIQUE,
  name text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products readable" ON public.products FOR SELECT TO authenticated USING (true);
CREATE POLICY "products admin write" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- MASTER: TEMPLATES (versioned)
CREATE TABLE public.checklist_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  version int NOT NULL DEFAULT 1,
  doc_no text,
  doc_rev text,
  issued_at date,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, version)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.checklist_templates TO authenticated;
GRANT ALL ON public.checklist_templates TO service_role;
ALTER TABLE public.checklist_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "templates readable" ON public.checklist_templates FOR SELECT TO authenticated USING (true);
CREATE POLICY "templates admin write" ON public.checklist_templates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.checklist_template_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES public.checklist_templates(id) ON DELETE CASCADE,
  process_name public.process_name NOT NULL,
  section text NOT NULL DEFAULT '',
  item_label text NOT NULL,
  answer_type public.answer_type NOT NULL DEFAULT 'ok_ng',
  tolerance_spec text,
  tolerance_min numeric,
  tolerance_max numeric,
  requires_awal_akhir boolean NOT NULL DEFAULT true,
  important_rank text,
  sort_order int NOT NULL DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.checklist_template_items TO authenticated;
GRANT ALL ON public.checklist_template_items TO service_role;
ALTER TABLE public.checklist_template_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "template items readable" ON public.checklist_template_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "template items admin write" ON public.checklist_template_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- MASTER: NG TYPES
CREATE TABLE public.ng_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  is_active boolean NOT NULL DEFAULT true
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ng_types TO authenticated;
GRANT ALL ON public.ng_types TO service_role;
ALTER TABLE public.ng_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ng types readable" ON public.ng_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "ng types admin write" ON public.ng_types FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- RECORDS
CREATE TABLE public.progress_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id),
  template_id uuid NOT NULL REFERENCES public.checklist_templates(id),
  lot_no text NOT NULL,
  line_no text,
  autoclave_no text,
  status public.record_status NOT NULL DEFAULT 'in_progress',
  total_good int NOT NULL DEFAULT 0,
  total_ng int NOT NULL DEFAULT 0,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  approved_by uuid,
  approved_at timestamptz,
  review_note text
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress_records TO authenticated;
GRANT ALL ON public.progress_records TO service_role;
ALTER TABLE public.progress_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "records readable" ON public.progress_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "records insert" ON public.progress_records FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "records update" ON public.progress_records FOR UPDATE TO authenticated
  USING (auth.uid() = created_by OR public.has_role(auth.uid(),'leader') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "records delete admin" ON public.progress_records FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id uuid NOT NULL REFERENCES public.progress_records(id) ON DELETE CASCADE,
  process_name public.process_name NOT NULL,
  sequence int NOT NULL,
  status public.step_status NOT NULL DEFAULT 'locked',
  work_date date,
  operator_name text,
  time_start text,
  time_end text,
  quantity_checked int,
  completed_at timestamptz,
  UNIQUE (record_id, process_name)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.process_steps TO authenticated;
GRANT ALL ON public.process_steps TO service_role;
ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "steps readable" ON public.process_steps FOR SELECT TO authenticated USING (true);
CREATE POLICY "steps insert" ON public.process_steps FOR INSERT TO authenticated WITH CHECK (true);
-- operators may only edit steps that are currently active
CREATE POLICY "steps update active" ON public.process_steps FOR UPDATE TO authenticated
  USING (status = 'active' OR public.has_role(auth.uid(),'leader') OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.checklist_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid NOT NULL REFERENCES public.process_steps(id) ON DELETE CASCADE,
  template_item_id uuid NOT NULL REFERENCES public.checklist_template_items(id),
  value_awal text,
  value_akhir text,
  is_out_of_tolerance boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (step_id, template_item_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.checklist_entries TO authenticated;
GRANT ALL ON public.checklist_entries TO service_role;
ALTER TABLE public.checklist_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "entries readable" ON public.checklist_entries FOR SELECT TO authenticated USING (true);
CREATE POLICY "entries write on active step" ON public.checklist_entries FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.process_steps s WHERE s.id = step_id AND (s.status = 'active' OR public.has_role(auth.uid(),'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.process_steps s WHERE s.id = step_id AND (s.status = 'active' OR public.has_role(auth.uid(),'admin'))));

CREATE TABLE public.ng_findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid NOT NULL REFERENCES public.process_steps(id) ON DELETE CASCADE,
  ng_type text NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ng_findings TO authenticated;
GRANT ALL ON public.ng_findings TO service_role;
ALTER TABLE public.ng_findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ng findings readable" ON public.ng_findings FOR SELECT TO authenticated USING (true);
CREATE POLICY "ng findings write on active step" ON public.ng_findings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.process_steps s WHERE s.id = step_id AND (s.status = 'active' OR public.has_role(auth.uid(),'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.process_steps s WHERE s.id = step_id AND (s.status = 'active' OR public.has_role(auth.uid(),'admin'))));

CREATE TABLE public.step_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid NOT NULL REFERENCES public.process_steps(id) ON DELETE CASCADE,
  action text NOT NULL,
  reason text,
  actor_id uuid NOT NULL DEFAULT auth.uid(),
  actor_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.step_audit_logs TO authenticated;
GRANT ALL ON public.step_audit_logs TO service_role;
ALTER TABLE public.step_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit readable" ON public.step_audit_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "audit insert" ON public.step_audit_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = actor_id);

-- SEED MASTER DATA
INSERT INTO public.ng_types (name, description) VALUES
  ('H-Pendek','Hose terpotong lebih pendek dari standar'),
  ('Cacat Marking','Marking tidak terbaca / posisi salah'),
  ('Clamp Salah Posisi','Posisi clamp tidak sesuai standar'),
  ('Clamp Kurang Kencang','Torsi clamp di bawah standar'),
  ('Kotor / Oil','Terdapat kotoran atau oli pada produk'),
  ('Bocor','Kebocoran saat pengetesan');

INSERT INTO public.products (id, product_no, name) VALUES
  ('11111111-1111-4111-8111-111111111111','IDC-935B (02-272B)','Fuel Hose Assy IDC-935B'),
  ('22222222-2222-4222-8222-222222222222','IDC-940A (02-280A)','Brake Hose Assy IDC-940A');

INSERT INTO public.checklist_templates (id, product_id, version, doc_no, doc_rev, issued_at) VALUES
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',1,'PCRSRH.PR.02-3','0','2024-01-15'),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',1,'PCRSRH.PR.02-4','0','2024-02-01');

INSERT INTO public.checklist_template_items
  (template_id, process_name, section, item_label, answer_type, tolerance_spec, tolerance_min, tolerance_max, requires_awal_akhir, important_rank, sort_order) VALUES
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','marking','Vise Side','Tidak ada kerusakan pada jig','ok_ng',NULL,NULL,NULL,true,'Major',1),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','marking','Vise Side','Posisi marking sesuai standar','ok_ng',NULL,NULL,NULL,true,'Critical',2),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','marking','Vise Side','Ukuran marking 10 x 3 x 3','actual_value','10 x 3 x 3 (+2/-1 mm)',9,12,true,'Critical',3),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','marking','Insertion Side','Tidak ada kerusakan pada permukaan hose','ok_ng',NULL,NULL,NULL,true,'Major',4),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','marking','Insertion Side','Kondisi tinta marking (tidak blobor)','ok_ng',NULL,NULL,NULL,false,'Minor',5),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','clamp_assy','Clamp','Lot no Clamp yang dipakai','text',NULL,NULL,NULL,false,'Major',1),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','clamp_assy','Clamp','No. part clamp aktual','text',NULL,NULL,NULL,false,'Critical',2),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','clamp_assy','Clamp','Posisi clamp sesuai standar','ok_ng',NULL,NULL,NULL,true,'Critical',3),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','clamp_assy','Clamp','Jarak clamp dari ujung hose (mm)','actual_value','15 (+2/-2 mm)',13,17,true,'Major',4),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','clamp_assy','Clamp','Torsi pengencangan clamp (Nm)','actual_value','4.5 (+0.5/-0.5 Nm)',4,5,true,'Critical',5),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','inspection_packing','Inspection','Tidak ada kebocoran','ok_ng',NULL,NULL,NULL,true,'Critical',1),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','inspection_packing','Inspection','Kebersihan produk (bebas oli/kotoran)','ok_ng',NULL,NULL,NULL,true,'Major',2),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','inspection_packing','Inspection','Panjang total hose (mm)','actual_value','250 (+3/-3 mm)',247,253,true,'Critical',3),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','inspection_packing','Packing','No. Lot label packing','text',NULL,NULL,NULL,false,'Major',4),
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','inspection_packing','Packing','Kondisi kemasan (tidak rusak)','ok_ng',NULL,NULL,NULL,true,'Minor',5),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','marking','Vise Side','Tidak ada kerusakan pada jig','ok_ng',NULL,NULL,NULL,true,'Major',1),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','marking','Vise Side','Ukuran marking 8 x 3 x 3','actual_value','8 x 3 x 3 (+2/-1 mm)',7,10,true,'Critical',2),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','clamp_assy','Clamp','No. part clamp aktual','text',NULL,NULL,NULL,false,'Critical',1),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','clamp_assy','Clamp','Posisi clamp sesuai standar','ok_ng',NULL,NULL,NULL,true,'Critical',2),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','inspection_packing','Inspection','Tidak ada kebocoran','ok_ng',NULL,NULL,NULL,true,'Critical',1),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','inspection_packing','Packing','Kondisi kemasan (tidak rusak)','ok_ng',NULL,NULL,NULL,true,'Minor',2);
