"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { adminCategoryService } from "@/services/admin/adminCategory.service";
import { toast } from "react-hot-toast";
import { Category } from "@/types/admin";
import CategoryTable from "./CategoryTable/CategoryTable";
import { FiFolder, FiPlus, FiActivity, FiTag } from "react-icons/fi";

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

  // Stats
  const totalCategories = categories.length;
  const recentCategories = categories.filter(
    (cat) =>
      new Date(cat.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 animate-pulse" />

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 mb-2" />
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-12" />
            </div>
          ))}
        </div>

        {/* Form Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-4" />
          <div className="flex gap-3 max-w-md">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="w-20 h-10 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-4" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 dark:bg-gray-800 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiFolder
            className="text-yellow-600 dark:text-yellow-400"
            size={20}
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Category Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage subject categories for tutors
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={FiTag}
          color="blue"
        />
        <StatCard
          title="Added This Week"
          value={recentCategories}
          icon={FiActivity}
          color="green"
        />
      </div>

      {/* Create Category Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <FiPlus className="text-gray-500 dark:text-gray-400" size={16} />
            <h2 className="font-medium text-gray-900 dark:text-white">
              Add New Category
            </h2>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <FiTag
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Enter category name (e.g., Mathematics, Physics)"
                className="w-full pl-9 pr-4 py-2.5 text-sm
                         bg-gray-50 dark:bg-gray-900 
                         border border-gray-200 dark:border-gray-800
                         rounded-md
                         focus:outline-none focus:border-yellow-500 
                         focus:ring-1 focus:ring-yellow-500
                         transition-colors"
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={submitting || !name.trim()}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium
                       bg-yellow-500 hover:bg-yellow-600
                       text-white rounded-md
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors sm:w-auto w-full"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <FiPlus size={16} />
                  Add Category
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Categories help tutors showcase their expertise and help students
            find the right tutor
          </p>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiFolder
                className="text-gray-500 dark:text-gray-400"
                size={16}
              />
              <h2 className="font-medium text-gray-900 dark:text-white">
                All Categories
              </h2>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {totalCategories}{" "}
              {totalCategories === 1 ? "category" : "categories"}
            </span>
          </div>
        </div>

        <CategoryTable categories={categories} />
      </div>
    </div>
  );
}

// Local StatCard component
type StatCardColor = "blue" | "yellow" | "green" | "red" | "purple";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  color: StatCardColor;
}

const colorClasses: Record<StatCardColor, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 
                    hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-md ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
