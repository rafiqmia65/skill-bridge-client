import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL!;

// Student profile structure
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Payload for updating student profile
export interface StudentProfilePayload {
  name?: string;
  email?: string;
  image?: string | null;
}

export const studentProfileService = {
  /**
   * Fetch the student profile
   */
  getProfile: async (token: string): Promise<StudentProfile> => {
    const res = await fetch(`${API_URL}/api/student/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
    return data.data;
  },

  /**
   * Update the student profile
   */
  updateProfile: async (
    token: string,
    payload: StudentProfilePayload,
  ): Promise<StudentProfile> => {
    const res = await fetch(`${API_URL}/api/student/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update profile");
    return data.data;
  },
};
