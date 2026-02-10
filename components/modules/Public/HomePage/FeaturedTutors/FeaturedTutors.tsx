import Image from "next/image";
import Link from "next/link";
import {
  FiStar,
  FiBookOpen,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";
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
    <section className="relative overflow-hidden py-20 px-4 md:px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                         bg-linear-to-r from-yellow-100 to-orange-100 
                         dark:from-yellow-900/30 dark:to-orange-900/30 
                         border border-yellow-200 dark:border-yellow-800 mb-6"
          >
            <IoMdTrendingUp className="text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
              TOP RATED TUTORS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500">
              Expert Tutors
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Carefully selected educators with proven track records of student
            success
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor, index) => (
            <div
              key={tutor.id}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl 
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
                       border border-gray-100 dark:border-gray-800 overflow-hidden
                       before:absolute before:inset-0 before:bg-linear-to-br 
                       before:from-yellow-500/0 before:to-orange-500/0 
                       hover:before:from-yellow-500/5 hover:before:to-orange-500/5 
                       before:transition-all before:duration-500"
            >
              {/* Popular Badge */}
              {index < 3 && (
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className="px-3 py-1 rounded-full 
                                bg-linear-to-r from-yellow-500 to-orange-500 
                                text-white text-xs font-bold shadow-lg flex items-center gap-1"
                  >
                    <FiStar size={10} />
                    TOP {index + 1}
                  </div>
                </div>
              )}

              {/* Online Status */}
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

              {/* Tutor Image & Info */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-6">
                  {tutor.user.image ? (
                    <div className="relative">
                      <div
                        className="w-20 h-20 rounded-full overflow-hidden 
                                    border-4 border-white dark:border-gray-800 
                                    shadow-lg"
                      >
                        <Image
                          src={tutor.user.image}
                          alt={tutor.user.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 w-8 h-8 
                                    rounded-full bg-linear-to-r from-yellow-500 to-orange-500 
                                    flex items-center justify-center 
                                    border-2 border-white dark:border-gray-800"
                      >
                        <FiCheckCircle className="text-white" size={12} />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full 
                                  bg-linear-to-br from-yellow-400 to-orange-500 
                                  flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl font-bold text-white">
                        {tutor.user.name[0]}
                      </span>
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                      {tutor.user.name}
                    </h3>
                  </div>
                </div>

                {/* Bio */}
                {tutor.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                    {truncate(tutor.bio)}
                  </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 
                                  flex items-center justify-center"
                    >
                      <FiClock
                        className="text-blue-600 dark:text-blue-400"
                        size={16}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        From
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${tutor.pricePerHr}
                        <span className="text-sm text-gray-500">/hr</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 
                                  flex items-center justify-center"
                    >
                      <FiMapPin
                        className="text-purple-600 dark:text-purple-400"
                        size={16}
                      />
                    </div>
                  </div>
                </div>

                {/* Categories */}
                {(tutor.categories?.length ?? 0) > 0 && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-semibold">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.categories?.slice(0, 3).map((cat) => (
                        <span
                          key={cat.id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 
                                   rounded-full bg-linear-to-r from-yellow-50 to-orange-50 
                                   dark:from-yellow-900/20 dark:to-orange-900/20 
                                   text-yellow-700 dark:text-yellow-300 
                                   text-xs font-medium border border-yellow-100 dark:border-yellow-800/30"
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
              </div>

              {/* CTA */}
              <div
                className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-800 
                            bg-linear-to-t from-gray-50/50 to-transparent dark:from-gray-900/50"
              >
                <Link
                  href={`/tutors/${tutor.id}`}
                  className="block w-full group/btn"
                >
                  <button
                    className="w-full py-3 rounded-xl 
                             bg-linear-to-r from-yellow-500 to-orange-500 
                             hover:from-yellow-600 hover:to-orange-600
                             text-white font-bold 
                             shadow-lg hover:shadow-xl 
                             transition-all duration-300
                             transform group-hover/btn:scale-[1.02]
                             flex items-center justify-center gap-2"
                  >
                    View Full Profile
                    <FiArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link href="/tutors">
            <button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl 
                             bg-linear-to-r from-gray-900 to-gray-800 
                             hover:from-gray-800 hover:to-gray-700
                             dark:from-gray-800 dark:to-gray-900 
                             dark:hover:from-gray-700 dark:hover:to-gray-800
                             text-white font-bold 
                             shadow-lg hover:shadow-xl 
                             transition-all duration-300
                             group/cta"
            >
              <span>View All Tutors</span>
              <svg
                className="w-5 h-5 transform group-hover/cta:translate-x-1 transition-transform"
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
          </Link>

          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
            Browse through 100+ qualified tutors across various subjects
          </p>
        </div>

        {/* Stats Banner */}
        <div
          className="mt-20 bg-linear-to-r from-gray-50 to-blue-50 
                      dark:from-gray-800 dark:to-blue-900/20 
                      rounded-2xl p-8 shadow-inner"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                100+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Qualified Tutors
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                4.9
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                95%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
