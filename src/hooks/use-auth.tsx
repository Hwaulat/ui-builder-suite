import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "operator" | "leader" | "admin";

type AuthState = {
  session: Session | null;
  user: User | null;
  roles: AppRole[];
  fullName: string;
  loading: boolean;
  isLeader: boolean;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    const [{ data: roleRows }, { data: profile }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
    ]);
    setRoles(((roleRows ?? []) as { role: AppRole }[]).map((r) => r.role));
    setFullName(profile?.full_name ?? "");
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next?.user) {
        void loadProfile(next.user.id);
      } else {
        setRoles([]);
        setFullName("");
      }
    });

    void supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) await loadProfile(data.session.user.id);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value: AuthState = {
    session,
    user: session?.user ?? null,
    roles,
    fullName,
    loading,
    isLeader: roles.includes("leader") || roles.includes("admin"),
    isAdmin: roles.includes("admin"),
    refresh: async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session?.user) await loadProfile(data.session.user.id);
    },
    signOut: async () => {
      await supabase.auth.signOut();
      setSession(null);
      setRoles([]);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
