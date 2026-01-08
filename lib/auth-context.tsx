import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, type User } from "./supabase";

interface AuthContextType {
  user: User | null;
  session: any | null;
  loading: boolean;
  signUpWithPhone: (phone: string) => Promise<{ error: any }>;
  verifyOTP: (phone: string, token: string) => Promise<{ error: any }>;
  completeSignUp: (data: {
    email: string;
    full_name: string;
    cnic: string;
    role: "driver" | "passenger";
  }) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setUser(data);
    }
  };

  const signUpWithPhone = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: "sms",
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const completeSignUp = async (data: {
    email: string;
    full_name: string;
    cnic: string;
    role: "driver" | "passenger";
  }) => {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user?.id) {
        return { error: "No authenticated user" };
      }

      const { error } = await supabase.from("users").insert({
        id: session.data.session.user.id,
        phone: session.data.session.user.phone,
        email: data.email,
        full_name: data.full_name,
        cnic: data.cnic,
        role: data.role,
        verification_status: "pending",
        rating: 5,
      });

      if (!error) {
        fetchUserProfile(session.data.session.user.id);
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUpWithPhone,
        verifyOTP,
        completeSignUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
