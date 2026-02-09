"use client";

import { useEffect, useState } from "react";
import { tutorService, Category } from "@/services/tutor/tutor.service";

interface FiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  useEffect(() => {
    tutorService.getCategories().then(setCategories);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="sticky top-20 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Filters
      </h3>

      {/* Search */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Search
        </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Tutor name or subject"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="px-3 py-2 lg:w-6 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white flex-1"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="px-3 py-2 lg:w-6 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white flex-1"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Rating
        </label>
        <select
          name="rating"
          value={filters.rating}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Any</option>
          <option value="5">5★</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>
    </div>
  );
}
