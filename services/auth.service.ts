import { env } from "@/env";
import { RegisterPayload, AuthResponse } from "@/types/auth";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL;

export const authService = {
  /* ---------------- Register ---------------- */
  async register(payload: RegisterPayload) {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: data.message || "Registration failed" };
      }

      return { data: data as AuthResponse, error: null };
    } catch {
      return { data: null, error: "Something went wrong" };
    }
  },
};
