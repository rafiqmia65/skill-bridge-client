import Image from "next/image";
import Link from "next/link";
import { FiStar, FiBookOpen } from "react-icons/fi";

interface Tutor {
  id: string;
  bio: string;
  pricePerHr: number;
  rating: number;
  user: {
    name: string;
    image: string | null;
  };
  categories: {
    id: string;
    name: string;
  }[];
}

/* 🔹 helper */
const truncate = (text: string, limit = 50) =>
  text.length > limit ? text.slice(0, limit) + "…" : text;

/* 🔹 data fetch */
async function getFeaturedTutors(): Promise<Tutor[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tutors?limit=6`,
    {
      next: { revalidate: 60 }, // ISR (60 sec cache)
    },
  );

  const json = await res.json();
  return json.data ?? [];
}

/* 🔹 Component */
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
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition border border-transparent hover:border-yellow-400"
          >
            {/* Image + Name */}
            <div className="flex items-center gap-4">
              {tutor.user.image ? (
                <Image
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
                  {tutor.user.name[0]}
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tutor.user.name}
                </h3>

                <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiStar className="text-yellow-400" />
                  {tutor.rating.toFixed(1)} • ${tutor.pricePerHr}/hr
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {truncate(tutor.bio)}
            </p>

            {/* Categories */}
            {tutor.categories?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tutor.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full"
                  >
                    <FiBookOpen size={13} />
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            {/* Profile link */}
            <Link
              href={`/tutors/${tutor.id}`}
              className="block mt-6 text-center"
            >
              <button className="w-full rounded-lg bg-yellow-400 text-slate-900 font-semibold py-2 hover:bg-yellow-500 transition">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
