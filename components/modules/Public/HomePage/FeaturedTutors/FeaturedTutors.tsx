import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { tutorService, Tutor } from "@/services/tutor/tutor.service";

const truncate = (text: string, limit = 80) =>
  text.length > limit ? text.slice(0, limit) + "…" : text;

async function getFeaturedTutors(): Promise<Tutor[]> {
  const { data, error } = await tutorService.getTutors({ limit: "6" });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data?.tutors ?? [];
}

export default async function FeaturedTutors() {
  const tutors = await getFeaturedTutors();

  if (!tutors.length) return null;

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-2">
            Featured{" "}
            <span className="text-yellow-600 dark:text-yellow-500">Tutors</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn from experienced educators
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="p-5 bg-white dark:bg-gray-900 
                       rounded-lg border border-gray-200 dark:border-gray-800
                       hover:border-yellow-300 dark:hover:border-yellow-800
                       transition-colors flex flex-col h-full"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-3 mb-4">
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
                    <span className="text-lg font-medium text-yellow-700 dark:text-yellow-400">
                      {tutor.user.name[0]}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h3 className="font-medium text-yellow-700 dark:text-yellow-500 truncate">
                      {tutor.user.name}
                    </h3>
                    <span className="flex items-center gap-0.5 text-xs text-gray-600 dark:text-gray-400 shrink-0">
                      <FiStar className="text-yellow-500" size={12} />
                      {tutor.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    ${tutor.pricePerHr}/hr
                  </p>
                </div>
              </div>

              {/* Bio - fixed height for consistency */}
              {tutor.bio ? (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 h-10">
                  {truncate(tutor.bio)}
                </p>
              ) : (
                <div className="h-10 mb-4"></div> // Placeholder for consistent height
              )}

              {/* Categories - fixed min height */}
              {tutor.categories && tutor.categories.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mb-4 min-h-8">
                  {tutor.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat.id}
                      className="px-2 py-1 text-xs
                               bg-gray-100 dark:bg-gray-800 
                               text-gray-700 dark:text-gray-300
                               rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                  {tutor.categories.length > 2 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{tutor.categories.length - 2}
                    </span>
                  )}
                </div>
              ) : (
                <div className="min-h-8 mb-4"></div> // Placeholder for consistent height
              )}

              {/* CTA - always at bottom */}
              <div className="mt-auto">
                <Link
                  href={`/tutors/${tutor.id}`}
                  className="block w-full py-2.5 text-sm font-medium text-center
                           bg-yellow-500 hover:bg-yellow-600 
                           text-white rounded
                           transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-1.5 px-5 py-2.5
                     text-sm font-medium
                     text-white
                     bg-yellow-500 hover:bg-yellow-600
                     rounded transition-colors"
          >
            View All Tutors
            <span className="text-lg leading-none">→</span>
          </Link>
          <p className="text-xs text-gray-500 mt-3">
            100+ qualified tutors available
          </p>
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
      </div>
    </section>
  );
}
