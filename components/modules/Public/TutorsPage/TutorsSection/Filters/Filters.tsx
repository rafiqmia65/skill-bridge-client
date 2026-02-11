"use client";

import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor/tutor.service";
import { Category } from "@/types/admin";

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
    <div className="space-y-5">
      <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>

      {/* Search */}
      <div className="space-y-1.5">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Search
        </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Tutor name or subject"
          className="w-full px-3 py-1.5 text-sm
                   bg-gray-50 dark:bg-gray-900 
                   border border-gray-200 dark:border-gray-800
                   rounded-md
                   focus:outline-none focus:border-yellow-500 
                   focus:ring-1 focus:ring-yellow-500"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full px-3 py-1.5 text-sm
                   bg-gray-50 dark:bg-gray-900 
                   border border-gray-200 dark:border-gray-800
                   rounded-md
                   focus:outline-none focus:border-yellow-500 
                   focus:ring-1 focus:ring-yellow-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min $"
            className="w-full px-3 py-1.5 text-sm
                     bg-gray-50 dark:bg-gray-900 
                     border border-gray-200 dark:border-gray-800
                     rounded-md
                     focus:outline-none focus:border-yellow-500 
                     focus:ring-1 focus:ring-yellow-500"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max $"
            className="w-full px-3 py-1.5 text-sm
                     bg-gray-50 dark:bg-gray-900 
                     border border-gray-200 dark:border-gray-800
                     rounded-md
                     focus:outline-none focus:border-yellow-500 
                     focus:ring-1 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-1.5">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Rating
        </label>
        <select
          name="rating"
          value={filters.rating}
          onChange={handleChange}
          className="w-full px-3 py-1.5 text-sm
                   bg-gray-50 dark:bg-gray-900 
                   border border-gray-200 dark:border-gray-800
                   rounded-md
                   focus:outline-none focus:border-yellow-500 
                   focus:ring-1 focus:ring-yellow-500"
        >
          <option value="">Any Rating</option>
          <option value="5">5★</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>
    </div>
  );
}
