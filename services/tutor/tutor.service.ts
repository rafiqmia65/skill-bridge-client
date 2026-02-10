import { env } from "@/env";
import { Category } from "@/types/admin";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL!;

// Tutor type representing a tutor's basic profile
export interface Tutor {
  id: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  rating: number;
  pricePerHr: number;
  categories?: { id: string; name: string }[];
  bio?: string;
}

// Availability slot structure
export interface Slot {
  day: string;
  startTime: string;
  endTime: string;
}

// Response type for availability update
export interface AvailabilityResponse {
  slots: Slot[];
}

export const tutorService = {
  // Fetch list of tutors, optional query parameters
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

  // Fetch a single tutor by ID
  getTutorById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tutors/${id}`);
      const data = await res.json();
      return res.ok
        ? { data: data.data, error: null } // return tutor data
        : {
            data: null,
            error: { message: data.message || "Failed to fetch tutor" },
          };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // Fetch all categories
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

  // Update tutor profile: bio, hourly price, categories
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

  // Update tutor availability slots
  updateAvailability: async (
    token: string,
    payload: { slots: Slot[] },
  ): Promise<AvailabilityResponse> => {
    try {
      const res = await fetch(`${API_URL}/api/tutor/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update availability");
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // Fetch tutor dashboard data (profile, stats, sessions, reviews)
  getDashboard: async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tutor/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard");

      return data.data; // structured dashboard data
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
