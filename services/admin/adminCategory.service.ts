import { env } from "@/env";
import { Category } from "@/types/admin";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL;

interface Options {
  token: string;
}

export const adminCategoryService = {
  // GET all categories
  async getAll(options: Options): Promise<Category[]> {
    const res = await fetch(`${API_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const json = await res.json();
    return json?.data ?? [];
  },

  // CREATE category
  async create(name: string, options: Options): Promise<Category> {
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      throw new Error("Failed to create category");
    }

    const json = await res.json();
    return json.data;
  },
};
