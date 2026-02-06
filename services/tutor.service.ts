import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL!;

export interface Tutor {
  id: string;
  bio?: string | null;
  rating: number;
  pricePerHr: number;
  user: { name: string; image?: string | null };
  categories: { id: string; name: string }[];
}

export interface Category {
  id: string;
  name: string;
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
};
