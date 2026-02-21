"use client";

import { useState, useEffect, useRef } from "react";
import { tutorService, Tutor } from "@/services/tutor/tutor.service";
import Image from "next/image";
import { FiSearch, FiStar, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true); // mark as searched
    try {
      const { data, error } = await tutorService.getTutors({
        search: search.trim(),
      });
      if (error) {
        setError(error.message);
        setTutors([]);
      } else {
        setTutors(data?.tutors ?? []);
      }
    } catch {
      setError("Something went wrong");
      setTutors([]);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setSearch("");
    setTutors([]);
    setHasSearched(false); // reset search state
    setError(null);
  };

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <section className=" bg-white dark:bg-gray-950 py-12 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-2">
            Find a <span className="text-yellow-500">Tutor</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with expert tutors
          </p>
        </div>

        {/* Minimal Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search tutors..."
                className="w-full pl-9 pr-4 py-2.5 text-sm
                         bg-gray-50 dark:bg-gray-900 
                         border border-gray-200 dark:border-gray-800
                         rounded-lg
                         focus:outline-none focus:border-yellow-500 
                         focus:ring-1 focus:ring-yellow-500
                         transition-colors"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !search.trim()}
              className="px-4 py-2.5 text-sm
                       bg-yellow-500 hover:bg-yellow-600 
                       text-white rounded-lg
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          )}
        </div>

        {/* Results Count - only show after search */}
        {hasSearched && tutors.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tutors.length} tutor{tutors.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Tutor Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="group p-4 bg-white dark:bg-gray-900 
                       rounded-lg border border-gray-200 dark:border-gray-800
                       hover:border-yellow-500 transition-colors"
            >
              {/* Profile */}
              <div className="flex items-start gap-3 mb-3">
                {tutor.user.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={tutor.user.image}
                      alt={tutor.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                    <FiUser
                      className="text-yellow-600 dark:text-yellow-400"
                      size={20}
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {tutor.user.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {tutor.experience || "Tutor"}
                  </p>
                </div>
              </div>

              {/* Rating & Price */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-500" size={14} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {tutor.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({tutor.totalReviews || 0})
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${tutor.pricePerHr}
                  </span>
                  <span className="text-xs text-gray-500">/hr</span>
                </div>
              </div>

              {/* Categories */}
              {tutor.categories && tutor.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tutor.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat.id}
                      className="px-2 py-0.5 text-xs
                               bg-gray-100 dark:bg-gray-800 
                               text-gray-700 dark:text-gray-300
                               rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                  {tutor.categories.length > 2 && (
                    <span className="px-2 py-0.5 text-xs text-gray-500">
                      +{tutor.categories.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* CTA */}
              <Link
                href={`/tutors/${tutor.id}`}
                className="block w-full py-2 text-sm font-medium text-center
                         bg-gray-900 dark:bg-white 
                         text-white dark:text-gray-900 
                         rounded hover:bg-gray-800 dark:hover:bg-gray-100
                         transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State - only show after actual search */}
        {hasSearched && !loading && tutors.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FiSearch className="text-gray-400" size={24} />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              No tutors found
            </h3>
            <p className="text-sm text-gray-500 mb-4">Try a different search</p>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                       bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 
                       dark:hover:bg-gray-700 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 animate-pulse"
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-1" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-3" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simple Stats */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div className="text-gray-600 dark:text-gray-400">
            <span className="block font-medium text-gray-900 dark:text-white text-base">
              100+
            </span>
            Tutors
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <span className="block font-medium text-gray-900 dark:text-white text-base">
              4.9
            </span>
            Rating
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <span className="block font-medium text-gray-900 dark:text-white text-base">
              95%
            </span>
            Success
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <span className="block font-medium text-gray-900 dark:text-white text-base">
              24/7
            </span>
            Support
          </div>
        </div>
      </div>
    </section>
  );
}
