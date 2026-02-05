"use client";

import { useState } from "react";
import { tutorService, Tutor } from "@/services/tutor.service";
import Image from "next/image";
import { FiSearch, FiStar, FiBookOpen, FiUser } from "react-icons/fi";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

    const { data, error } = await tutorService.getTutors({
      search: search.trim(),
    });

    if (error) {
      setError(error.message);
      setTutors([]);
    } else {
      setTutors(data.data || []);
    }

    setLoading(false);
  };

  return (
    <section className="container mx-auto px-4 -mt-10 md:-mt-20">
      {/* Search Box */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-2xl p-6 flex flex-col md:flex-row gap-4 items-center md:items-end transition-all duration-300">
        <div className="flex-1 w-full relative">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Search Tutors
          </label>

          <input
            id="search"
            type="text"
            placeholder="Type tutor name or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full md:w-auto rounded-xl bg-linear-to-r from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-400 text-slate-900 dark:text-slate-900 px-8 py-3 font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            "Searching..."
          ) : (
            <>
              <FiSearch /> Search
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-center text-red-500 dark:text-red-400 font-medium">
          {error}
        </p>
      )}

      {/* Results */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="relative rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-yellow-400"
          >
            <div className="flex items-center gap-4">
              {tutor.user.image ? (
                <Image
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                  <FiUser size={20} />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tutor.user.name}
                </h3>
                <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FiStar className="text-yellow-400" />{" "}
                  {tutor.rating.toFixed(1)} • ${tutor.pricePerHr}/hr
                </p>
              </div>
            </div>

            {tutor.categories && tutor.categories.length > 0 && (
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <FiBookOpen className="text-gray-500 dark:text-gray-400" />{" "}
                Subjects:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {tutor.categories.map((c) => c.name).join(", ")}
                </span>
              </p>
            )}

            <button className="mt-6 w-full rounded-lg bg-yellow-400 dark:bg-yellow-300 text-slate-900 dark:text-slate-900 font-semibold py-2 hover:bg-yellow-500 dark:hover:bg-yellow-400 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              View Profile
            </button>
          </div>
        ))}

        {!loading && tutors.length === 0 && !error && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg font-medium mt-6">
            No tutors found.
          </p>
        )}
      </div>
    </section>
  );
}
