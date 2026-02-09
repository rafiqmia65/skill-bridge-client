import { env } from "@/env";
import type { AdminUser } from "@/types/admin";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL;

interface Options {
  token: string;
}

export const adminUserService = {
  getAllUsers: async (options: Options): Promise<AdminUser[]> => {
    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return data.data;
  },

  updateUserStatus: async (
    userId: string,
    options: Options,
  ): Promise<{ status: "ACTIVE" | "BANNED" }> => {
    const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },
};
