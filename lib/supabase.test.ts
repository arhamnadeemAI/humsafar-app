import { describe, it, expect } from "vitest";

describe("Supabase Configuration", () => {
  it("should have valid Supabase credentials", () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();

    // Validate URL format
    expect(supabaseUrl).toMatch(/^https:\/\/.+\.supabase\.co$/);

    // Validate key format (JWT-like)
    expect(supabaseAnonKey).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
  });

  it("should be able to initialize Supabase client", async () => {
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });
});
