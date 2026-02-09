"use client";

import { useState } from "react";
import { tutorService, Tutor } from "@/services/tutor/tutor.service";
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
      setTutors(data?.tutors ?? []);
    }

    setLoading(false);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Search Box */}
      <div className="max-w-3xl mx-auto mb-12">
        <div
          className="relative flex items-center 
                     bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl 
                     border border-gray-200 dark:border-gray-700 
                     rounded-2xl shadow-xl px-4 py-3"
        >
          <FiSearch className="text-gray-400 ml-2" size={20} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tutor name or subject..."
            className="flex-1 bg-transparent px-4 py-2 outline-none 
                       text-gray-900 dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="ml-2 rounded-xl 
                       bg-yellow-400 hover:bg-yellow-500 
                       text-slate-900 px-6 py-2 
                       font-semibold shadow-lg transition 
                       disabled:opacity-70"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
        )}
      </div>

      {/* Tutor Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="group relative bg-white dark:bg-slate-900 
                       rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                       transition-all hover:-translate-y-1 
                       border border-transparent hover:border-yellow-400"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              {tutor.user.image ? (
                <Image
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border-2 border-yellow-400"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-full 
                             bg-gray-300 dark:bg-gray-700 
                             flex items-center justify-center"
                >
                  <FiUser
                    size={22}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tutor.user.name}
                </h3>

                <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <FiStar className="text-yellow-400" />
                  {tutor.rating.toFixed(1)} • ${tutor.pricePerHr}/hr
                </p>
              </div>
            </div>

            {/* Categories */}
            {(tutor.categories?.length ?? 0) > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tutor.categories?.map((cat) => (
                  <span
                    key={cat.id}
                    className="flex items-center gap-1 text-xs 
                               bg-yellow-100 text-yellow-800 
                               dark:bg-yellow-900/40 dark:text-yellow-300
                               px-2 py-1 rounded-full"
                  >
                    <FiBookOpen size={12} />
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <button
              className="mt-6 w-full rounded-lg 
                         bg-yellow-400 hover:bg-yellow-500 
                         text-slate-900 font-semibold py-2 
                         transition shadow-md"
            >
              View Profile
            </button>
          </div>
        ))}

        {!loading && tutors.length === 0 && !error && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">
            No tutors found
          </p>
        )}
      </div>
    </section>
  );
}
