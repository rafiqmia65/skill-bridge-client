import { env } from "@/env";
import type {
  AdminOverviewResponse,
  AdminUser,
  Booking,
  Category,
} from "@/types/admin";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL;

interface Options {
  token?: string;
  revalidate?: number;
  cache?: RequestCache;
}

interface ServiceResult {
  data?: AdminOverviewResponse | null;
  error?: { message: string } | null;
}

export const adminOverviewService = {
  getAdminOverview: async (options?: Options): Promise<ServiceResult> => {
    try {
      const token = options?.token;

      if (!token) {
        return {
          data: null,
          error: { message: "Unauthorized: No token provided" },
        };
      }

      const fetchConfig: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };

      if (options?.cache) fetchConfig.cache = options.cache;
      if (options?.revalidate)
        fetchConfig.next = { revalidate: options.revalidate };

      const [usersRes, bookingsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/users`, fetchConfig),
        fetch(`${API_URL}/api/bookings/admin`, fetchConfig),
        fetch(`${API_URL}/api/categories`, {
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      if (!usersRes.ok || !bookingsRes.ok || !categoriesRes.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch admin overview data" },
        };
      }

      // Proper typing
      const usersData: { data: AdminUser[] } = await usersRes.json();
      const bookingsData: { data: Booking[] } = await bookingsRes.json();
      const categoriesData: { data: Category[] } = await categoriesRes.json();

      const data: AdminOverviewResponse = {
        stats: {
          totalUsers: usersData.data.length,
          totalTutors: usersData.data.filter((u) => u.role === "TUTOR").length,
          totalStudents: usersData.data.filter((u) => u.role === "STUDENT")
            .length,
          totalBookings: bookingsData.data.length,
          totalCategories: categoriesData.data.length,
        },
        recentBookings: bookingsData.data.slice(0, 5),
      };

      return { data, error: null };
    } catch (err) {
      console.error("Admin Overview error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
