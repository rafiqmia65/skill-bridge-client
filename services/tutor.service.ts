import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL!;

export interface Tutor {
  id: string;
  bio?: string;
  pricePerHr: number;
  rating: number;
  user: {
    name: string;
    image?: string | null;
  };
  categories?: {
    id: string;
    name: string;
  }[];
}

interface TutorApiResponse {
  success: boolean;
  message: string;
  tutors: Tutor[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

      const res = await fetch(url.toString(), {
        cache: "no-store", // important
      });

      const data: TutorApiResponse = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch tutors" },
        };
      }

      return { data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
