// services/tutor.service.ts
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL;

export interface Tutor {
  id: string;
  pricePerHr: number;
  rating: number;
  user: {
    name: string;
    image?: string;
  };
  categories?: { name: string }[];
}

export const tutorService = {
  getTutors: async (params?: Record<string, string>) => {
    try {
      const url = new URL(`${API_URL}/api/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) url.searchParams.append(key, value);
        });
      }

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch tutors" },
        };
      }

      return { data, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
