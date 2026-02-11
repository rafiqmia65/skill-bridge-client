"use client";

import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor/tutor.service";
import { Category } from "@/types/admin";
import { toast } from "react-hot-toast";
import {
  FiUser,
  FiDollarSign,
  FiBookOpen,
  FiSave,
  FiInfo,
} from "react-icons/fi";

interface Props {
  token: string;
}

export default function TutorProfileForm({ token }: Props) {
  const [bio, setBio] = useState("");
  const [pricePerHr, setPricePerHr] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load categories from backend
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await tutorService.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setSubmitting(true);
      await tutorService.updateTutorProfile(token, {
        bio,
        pricePerHr,
        categoryIds: selectedCategories,
      });
      toast.success("Tutor profile updated successfully!");

      // ✅ Reset form after success
      setBio("");
      setPricePerHr(0);
      setSelectedCategories([]);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message || "Failed to update profile");
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiUser className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Tutor Profile
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your professional information and teaching details
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Form Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <FiInfo className="text-gray-500 dark:text-gray-400" size={16} />
              <h2 className="font-medium text-gray-900 dark:text-white">
                Profile Information
              </h2>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-6">
            {/* Bio Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                <FiUser size={12} />
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                placeholder="Write something about yourself, your teaching experience, and expertise..."
                className="w-full px-3 py-2 text-sm
                         bg-gray-50 dark:bg-gray-900 
                         border border-gray-200 dark:border-gray-800
                         rounded-md
                         focus:outline-none focus:border-yellow-500 
                         focus:ring-1 focus:ring-yellow-500
                         transition-colors resize-none"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {bio.length}/500 characters
              </p>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                <FiDollarSign size={12} />
                Price Per Hour
              </label>
              <div className="relative max-w-xs">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <FiDollarSign className="text-gray-400" size={14} />
                </div>
                <input
                  type="number"
                  value={pricePerHr || ""}
                  onChange={(e) => setPricePerHr(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-9 pr-4 py-2 text-sm
                           bg-gray-50 dark:bg-gray-900 
                           border border-gray-200 dark:border-gray-800
                           rounded-md
                           focus:outline-none focus:border-yellow-500 
                           focus:ring-1 focus:ring-yellow-500
                           transition-colors"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                <FiBookOpen size={12} />
                Categories
              </label>

              {categories.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  No categories available
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className={`
                          flex items-center gap-2 p-3
                          border rounded-md cursor-pointer
                          transition-all duration-200
                          ${
                            selectedCategories.includes(cat.id)
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                              : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-yellow-500 
                                   border-gray-300 dark:border-gray-700
                                   rounded focus:ring-yellow-500 focus:ring-1
                                   transition-colors"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Selected Categories Summary */}
                  {selectedCategories.length > 0 && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Selected ({selectedCategories.length}):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCategories.map((id) => {
                          const cat = categories.find((c) => c.id === id);
                          return cat ? (
                            <span
                              key={id}
                              className="px-2 py-1 text-xs
                                       bg-yellow-100 dark:bg-yellow-900/30
                                       text-yellow-700 dark:text-yellow-400
                                       rounded"
                            >
                              {cat.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                         bg-yellow-500 hover:bg-yellow-600
                         text-white rounded-md
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={14} />
                    Save Changes
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setBio("");
                  setPricePerHr(0);
                  setSelectedCategories([]);
                }}
                className="px-4 py-2 text-sm font-medium
                         text-gray-700 dark:text-gray-300
                         bg-gray-100 dark:bg-gray-800
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         rounded-md transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tips Card */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900 p-5">
        <div className="flex gap-3">
          <FiInfo
            className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
            size={18}
          />
          <div>
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              Profile Tips
            </h3>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Write a detailed bio to help students know you better</li>
              <li>• Set a competitive price based on your expertise</li>
              <li>• Select relevant categories to appear in search results</li>
              <li>• You can always update this information later</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Card (Optional) */}
      {(bio || pricePerHr > 0 || selectedCategories.length > 0) && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FiUser className="text-gray-500 dark:text-gray-400" size={16} />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Profile Preview
            </h3>
          </div>

          <div className="space-y-3">
            {bio && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                  Bio
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {bio}
                </p>
              </div>
            )}

            {pricePerHr > 0 && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                  Hourly Rate
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ${pricePerHr}/hour
                </p>
              </div>
            )}

            {selectedCategories.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                  Categories
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategories.slice(0, 3).map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    return cat ? (
                      <span
                        key={id}
                        className="px-2 py-0.5 text-xs
                                 bg-gray-100 dark:bg-gray-800
                                 text-gray-700 dark:text-gray-300
                                 rounded"
                      >
                        {cat.name}
                      </span>
                    ) : null;
                  })}
                  {selectedCategories.length > 3 && (
                    <span className="px-2 py-0.5 text-xs text-gray-500">
                      +{selectedCategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
