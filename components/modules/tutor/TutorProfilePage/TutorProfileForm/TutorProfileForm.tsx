"use client";

import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor/tutor.service";
import { Category } from "@/types/admin";
import { toast } from "react-hot-toast";

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
      toast.success("Tutor profile updated successfully ✅");

      // ✅ Reset form after success
      setBio("");
      setPricePerHr(0);
      setSelectedCategories([]);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message || "Failed to update profile ❌");
      } else {
        toast.error("Failed to update profile ❌");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  if (loading)
    return <p className="text-gray-500 text-center mt-20">Loading form...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Edit Tutor Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BIO */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Bio
          </label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Price Per Hour ($)
          </label>
          <input
            type="number"
            className="w-1/3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={pricePerHr}
            onChange={(e) => setPricePerHr(Number(e.target.value))}
            required
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-200">
            Categories
          </label>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                <span className="text-gray-900 dark:text-gray-100">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
