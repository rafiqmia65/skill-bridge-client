"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { adminCategoryService } from "@/services/admin/adminCategory.service";
import { toast } from "react-hot-toast";
import { Category } from "@/types/admin";
import CategoryTable from "./CategoryTable/CategoryTable";

export default function AdminCategoriesPage() {
  const session = authClient.useSession();
  const token = session?.data?.session?.token;

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await adminCategoryService.getAll({ token });
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleCreate = async () => {
    if (!name.trim() || !token) return;

    try {
      setSubmitting(true);
      const newCategory = await adminCategoryService.create(name, { token });
      setCategories((prev) => [...prev, newCategory]);
      setName("");
      toast.success("Category added");
    } catch {
      toast.error("Failed to add category");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Manage Categories</h1>

      {/* Create */}
      <div className="flex gap-3 max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="flex-1 rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          onClick={handleCreate}
          disabled={submitting}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* List */}
      <CategoryTable categories={categories} />
    </div>
  );
}
