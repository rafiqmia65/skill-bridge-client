import Image from "next/image";
import Link from "next/link";
import { FiStar, FiBookOpen } from "react-icons/fi";
import { tutorService, Tutor } from "@/services/tutor.service";

const truncate = (text: string, limit = 50) =>
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
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Featured Tutors
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 
                       border border-transparent hover:border-yellow-400 transition"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              {tutor.user.image ? (
                <Image
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border-2 border-yellow-400"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 
                                flex items-center justify-center text-gray-700 dark:text-gray-200 
                                font-bold text-xl"
                >
                  {tutor.user.name[0]}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {tutor.user.name}
                </h3>

                <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <FiStar className="text-yellow-400" />
                  {tutor.rating.toFixed(1)} • ${tutor.pricePerHr}/hr
                </p>
              </div>
            </div>

            {/* Bio */}
            {tutor.bio && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {truncate(tutor.bio)}
              </p>
            )}

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
            <Link href={`/tutors/${tutor.id}`} className="block mt-6">
              <button
                className="w-full bg-yellow-400 hover:bg-yellow-500 
                           text-slate-900 font-semibold py-2 
                           rounded-lg transition"
              >
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
