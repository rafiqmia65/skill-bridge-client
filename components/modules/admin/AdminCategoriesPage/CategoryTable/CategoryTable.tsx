"use client";

import { Category } from "@/types/admin";
import { FiTag, FiCalendar, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

interface Props {
  categories: Category[];
}

export default function CategoryTable({ categories }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (categories.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <FiTag className="text-gray-400 dark:text-gray-500" size={24} />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          No categories yet
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add your first category using the form above
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <FiTag className="text-yellow-500" size={16} />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {cat.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <FiCalendar size={14} className="text-gray-400" />
                    {new Date(cat.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  {deleteConfirm === cat.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Delete?
                      </span>
                      <button
                        onClick={() => {
                          setDeleteConfirm(null);
                        }}
                        className="px-2 py-1 text-xs font-medium
                                 bg-red-500 hover:bg-red-600
                                 text-white rounded
                                 transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-2 py-1 text-xs font-medium
                                 bg-gray-200 dark:bg-gray-700
                                 text-gray-700 dark:text-gray-300
                                 hover:bg-gray-300 dark:hover:bg-gray-600
                                 rounded transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(cat.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                               text-red-600 dark:text-red-400
                               bg-red-100 dark:bg-red-900/30
                               hover:bg-red-200 dark:hover:bg-red-900/50
                               rounded-md transition-colors"
                    >
                      <FiTrash2 size={12} />
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="sm:hidden p-4 space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiTag className="text-yellow-500" size={18} />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {cat.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {deleteConfirm === cat.id ? (
                  <>
                    <button
                      onClick={() => {
                        setDeleteConfirm(null);
                      }}
                      className="px-2 py-1 text-xs font-medium
                               bg-red-500 hover:bg-red-600
                               text-white rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-2 py-1 text-xs font-medium
                               bg-gray-200 dark:bg-gray-700
                               text-gray-700 dark:text-gray-300
                               rounded"
                    >
                      No
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(cat.id)}
                    className="p-1.5 text-red-600 dark:text-red-400
                             bg-red-100 dark:bg-red-900/30 rounded-md"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <FiCalendar size={12} className="text-gray-400" />
              Created:{" "}
              {new Date(cat.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-500">
        Showing {categories.length}{" "}
        {categories.length === 1 ? "category" : "categories"}
      </div>
    </div>
  );
}
