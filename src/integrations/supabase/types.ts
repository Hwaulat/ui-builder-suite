export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      checklist_entries: {
        Row: {
          id: string
          is_out_of_tolerance: boolean
          step_id: string
          template_item_id: string
          updated_at: string
          value_akhir: string | null
          value_awal: string | null
        }
        Insert: {
          id?: string
          is_out_of_tolerance?: boolean
          step_id: string
          template_item_id: string
          updated_at?: string
          value_akhir?: string | null
          value_awal?: string | null
        }
        Update: {
          id?: string
          is_out_of_tolerance?: boolean
          step_id?: string
          template_item_id?: string
          updated_at?: string
          value_akhir?: string | null
          value_awal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_entries_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "process_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_entries_template_item_id_fkey"
            columns: ["template_item_id"]
            isOneToOne: false
            referencedRelation: "checklist_template_items"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_template_items: {
        Row: {
          answer_type: Database["public"]["Enums"]["answer_type"]
          id: string
          important_rank: string | null
          item_label: string
          process_name: Database["public"]["Enums"]["process_name"]
          requires_awal_akhir: boolean
          section: string
          sort_order: number
          template_id: string
          tolerance_max: number | null
          tolerance_min: number | null
          tolerance_spec: string | null
        }
        Insert: {
          answer_type?: Database["public"]["Enums"]["answer_type"]
          id?: string
          important_rank?: string | null
          item_label: string
          process_name: Database["public"]["Enums"]["process_name"]
          requires_awal_akhir?: boolean
          section?: string
          sort_order?: number
          template_id: string
          tolerance_max?: number | null
          tolerance_min?: number | null
          tolerance_spec?: string | null
        }
        Update: {
          answer_type?: Database["public"]["Enums"]["answer_type"]
          id?: string
          important_rank?: string | null
          item_label?: string
          process_name?: Database["public"]["Enums"]["process_name"]
          requires_awal_akhir?: boolean
          section?: string
          sort_order?: number
          template_id?: string
          tolerance_max?: number | null
          tolerance_min?: number | null
          tolerance_spec?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          created_at: string
          doc_no: string | null
          doc_rev: string | null
          id: string
          is_active: boolean
          issued_at: string | null
          product_id: string
          version: number
        }
        Insert: {
          created_at?: string
          doc_no?: string | null
          doc_rev?: string | null
          id?: string
          is_active?: boolean
          issued_at?: string | null
          product_id: string
          version?: number
        }
        Update: {
          created_at?: string
          doc_no?: string | null
          doc_rev?: string | null
          id?: string
          is_active?: boolean
          issued_at?: string | null
          product_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "checklist_templates_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      ng_findings: {
        Row: {
          created_at: string
          id: string
          ng_type: string
          note: string | null
          quantity: number
          step_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ng_type: string
          note?: string | null
          quantity?: number
          step_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ng_type?: string
          note?: string | null
          quantity?: number
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ng_findings_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "process_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      ng_types: {
        Row: {
          description: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          completed_at: string | null
          id: string
          operator_name: string | null
          process_name: Database["public"]["Enums"]["process_name"]
          quantity_checked: number | null
          record_id: string
          sequence: number
          status: Database["public"]["Enums"]["step_status"]
          time_end: string | null
          time_start: string | null
          work_date: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          operator_name?: string | null
          process_name: Database["public"]["Enums"]["process_name"]
          quantity_checked?: number | null
          record_id: string
          sequence: number
          status?: Database["public"]["Enums"]["step_status"]
          time_end?: string | null
          time_start?: string | null
          work_date?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          operator_name?: string | null
          process_name?: Database["public"]["Enums"]["process_name"]
          quantity_checked?: number | null
          record_id?: string
          sequence?: number
          status?: Database["public"]["Enums"]["step_status"]
          time_end?: string | null
          time_start?: string | null
          work_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "process_steps_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "progress_records"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          product_no: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          product_no: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          product_no?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          employee_no: string | null
          full_name: string
          id: string
        }
        Insert: {
          created_at?: string
          employee_no?: string | null
          full_name?: string
          id: string
        }
        Update: {
          created_at?: string
          employee_no?: string | null
          full_name?: string
          id?: string
        }
        Relationships: []
      }
      progress_records: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          autoclave_no: string | null
          created_at: string
          created_by: string
          id: string
          line_no: string | null
          lot_no: string
          product_id: string
          review_note: string | null
          status: Database["public"]["Enums"]["record_status"]
          submitted_at: string | null
          template_id: string
          total_good: number
          total_ng: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          autoclave_no?: string | null
          created_at?: string
          created_by?: string
          id?: string
          line_no?: string | null
          lot_no: string
          product_id: string
          review_note?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          submitted_at?: string | null
          template_id: string
          total_good?: number
          total_ng?: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          autoclave_no?: string | null
          created_at?: string
          created_by?: string
          id?: string
          line_no?: string | null
          lot_no?: string
          product_id?: string
          review_note?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          submitted_at?: string | null
          template_id?: string
          total_good?: number
          total_ng?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_records_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_records_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      step_audit_logs: {
        Row: {
          action: string
          actor_id: string
          actor_name: string | null
          created_at: string
          id: string
          reason: string | null
          step_id: string
        }
        Insert: {
          action: string
          actor_id?: string
          actor_name?: string | null
          created_at?: string
          id?: string
          reason?: string | null
          step_id: string
        }
        Update: {
          action?: string
          actor_id?: string
          actor_name?: string | null
          created_at?: string
          id?: string
          reason?: string | null
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_audit_logs_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "process_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      answer_type: "ok_ng" | "actual_value" | "text"
      app_role: "operator" | "leader" | "admin"
      process_name: "marking" | "clamp_assy" | "inspection_packing"
      record_status:
        | "in_progress"
        | "waiting_approval"
        | "approved"
        | "returned"
      step_status: "locked" | "active" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      answer_type: ["ok_ng", "actual_value", "text"],
      app_role: ["operator", "leader", "admin"],
      process_name: ["marking", "clamp_assy", "inspection_packing"],
      record_status: [
        "in_progress",
        "waiting_approval",
        "approved",
        "returned",
      ],
      step_status: ["locked", "active", "completed"],
    },
  },
} as const
