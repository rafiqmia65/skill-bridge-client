"use client";

import { useState, useEffect, useRef } from "react";
import { tutorService, Tutor } from "@/services/tutor/tutor.service";
import Image from "next/image";
import {
  FiSearch,
  FiStar,
  FiBookOpen,
  FiUser,
  FiClock,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

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
      setError("An unexpected error occurred");
      setTutors([]);
    }

    setLoading(false);
  };

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect <span className="text-yellow-500">Tutor</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with expert tutors for personalized learning experiences
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FiSearch className="text-gray-400" size={22} />
                </div>
                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by tutor name or expertise..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl 
                             bg-gray-50 dark:bg-gray-700 
                             border-2 border-gray-200 dark:border-gray-600
                             text-gray-900 dark:text-white 
                             placeholder-gray-500 dark:placeholder-gray-400
                             focus:outline-none focus:border-yellow-500 
                             focus:ring-2 focus:ring-yellow-500/20
                             transition-all duration-300"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-8 py-4 rounded-xl 
                           bg-linear-to-r from-yellow-500 to-orange-500 
                           hover:from-yellow-600 hover:to-orange-600
                           text-white font-bold 
                           shadow-lg hover:shadow-xl 
                           disabled:opacity-70 disabled:cursor-not-allowed
                           transition-all duration-300
                           flex items-center gap-2 min-w-30 justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FiSearch size={20} />
                    Search
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 font-medium text-center">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Available Tutors
            {tutors.length > 0 && (
              <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                ({tutors.length} found)
              </span>
            )}
          </h2>

          {tutors.length > 0 && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <IoMdTrendingUp className="text-green-500" />
              <span className="text-sm">Sorted by rating</span>
            </div>
          )}
        </div>

        {/* Tutor Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="group relative bg-white dark:bg-gray-800 
                         rounded-2xl overflow-hidden shadow-lg 
                         hover:shadow-2xl transition-all duration-500 
                         hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute top-4 right-4 z-10">
                <div
                  className="flex items-center gap-1 px-3 py-1 rounded-full 
                             bg-green-100 dark:bg-green-900/40 
                             text-green-800 dark:text-green-300 text-xs font-semibold"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </div>
              </div>

              <div className="relative p-6 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  {tutor.user.image ? (
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                        <Image
                          src={tutor.user.image}
                          alt={tutor.user.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-white dark:border-gray-800">
                        <FiCheckCircle className="text-white" size={14} />
                      </div>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <FiUser size={32} className="text-white" />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {tutor.user.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {tutor.experience || "Experienced Tutor"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-500" size={18} />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {tutor.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {tutor.totalReviews || 0} reviews
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${tutor.pricePerHr}
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                        /hr
                      </span>
                    </div>
                  </div>
                </div>

                {(tutor.categories?.length ?? 0) > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Expertise:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.categories?.slice(0, 3).map((cat) => (
                        <span
                          key={cat.id}
                          className="inline-flex items-center gap-1 px-3 py-1 
                                     rounded-full bg-yellow-50 dark:bg-yellow-900/20 
                                     text-yellow-700 dark:text-yellow-300 
                                     text-xs font-medium"
                        >
                          <FiBookOpen size={12} />
                          {cat.name}
                        </span>
                      ))}
                      {(tutor.categories?.length ?? 0) > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2">
                          +{tutor.categories!.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiClock className="text-blue-500" />
                    <span className="text-sm">Flexible hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiMapPin className="text-red-500" />
                    <span className="text-sm">Remote/In-person</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 bg-linear-to-t from-gray-50 to-transparent dark:from-gray-900/50">
                <button className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  View Full Profile
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty / Loading States */}
        {!loading && tutors.length === 0 && !error && search && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <FiSearch
                  size={40}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No tutors found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search to find more results
              </p>
              <button
                onClick={() => setSearch("")}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl mt-6" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
