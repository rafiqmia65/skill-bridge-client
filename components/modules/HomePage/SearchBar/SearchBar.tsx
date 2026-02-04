"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query:", query);
  };

  return (
    <div className="container mx-auto px-4 -mt-10 md:-mt-16">
      <div className="flex flex-col items-center md:flex-row gap-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4">
        <input
          type="text"
          placeholder="Search by subject or tutor name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
