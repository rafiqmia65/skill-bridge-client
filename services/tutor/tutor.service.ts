import { env } from "@/env";
import { Category } from "@/types/admin";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL!;

export interface Tutor {
  id: string;
  bio?: string | null;
  rating: number;
  pricePerHr: number;
  user: { name: string; image?: string | null };
  categories: { id: string; name: string }[];
}

export interface Tutor {
  id: string;
  bio?: string | null;
  rating: number;
  pricePerHr: number;
  user: { name: string; image?: string | null };
  categories: { id: string; name: string }[];
  availability?: {
    id: string;
    tutorId: string;
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export const tutorService = {
  getTutors: async (params?: Record<string, string>) => {
    try {
      const url = new URL(`${API_URL}/api/tutors`);
      if (params) {
        Object.entries(params).forEach(
          ([k, v]) => v && url.searchParams.append(k, v),
        );
      }
      const res = await fetch(url.toString());
      const data = await res.json();
      return res.ok
        ? { data, error: null }
        : {
            data: null,
            error: { message: data.message || "Failed to fetch tutors" },
          };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getTutorById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tutors/${id}`);
      const data = await res.json();
      return res.ok
        ? { data: data.data, error: null } // single tutor data
        : {
            data: null,
            error: { message: data.message || "Failed to fetch tutor" },
          };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  updateTutorProfile: async (
    token: string,
    payload: { bio: string; pricePerHr: number; categoryIds: string[] },
  ) => {
    const res = await fetch(`${API_URL}/api/tutor/profile`, {
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
    return data;
  },
};
