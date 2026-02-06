import Link from "next/link";
import { FiSearch, FiBookOpen, FiStar, FiUsers } from "react-icons/fi";

export default function TutorsBanner() {
  return (
    <section
      className="relative overflow-hidden 
                 bg-linear-to-br from-yellow-50 via-white to-yellow-100 
                 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      {/* Decorative blur shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 
                       bg-yellow-100 text-yellow-800 
                       dark:bg-yellow-900/40 dark:text-yellow-300
                       px-4 py-1 rounded-full text-sm font-semibold mb-6"
          >
            <FiStar /> Trusted by Hundreds of Students
          </span>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight 
                       text-gray-900 dark:text-white"
          >
            Find the <span className="text-yellow-500">Perfect Tutor</span>{" "}
            <br />
            for Your Learning Journey
          </h1>

          {/* Description */}
          <p
            className="mt-6 text-lg 
                       text-gray-600 dark:text-gray-400"
          >
            Learn from experienced tutors across multiple subjects. Personalized
            lessons, flexible schedules, and affordable pricing — all in one
            place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#search"
              className="inline-flex items-center justify-center gap-2 
                         rounded-xl bg-yellow-400 hover:bg-yellow-500 
                         text-slate-900 font-semibold 
                         px-8 py-3 transition shadow-lg"
            >
              <FiSearch /> Search Tutors
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 
                         rounded-xl border border-gray-300 dark:border-gray-700 
                         text-gray-800 dark:text-gray-200 
                         hover:bg-gray-100 dark:hover:bg-slate-800 
                         px-8 py-3 transition"
            >
              <FiBookOpen /> How It Works
            </Link>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 
                       text-center"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md">
              <FiUsers className="mx-auto text-yellow-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                500+
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Tutors
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md">
              <FiBookOpen className="mx-auto text-yellow-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                120+
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Subjects
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md">
              <FiStar className="mx-auto text-yellow-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                4.8/5
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average Rating
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md">
              <FiSearch className="mx-auto text-yellow-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                10k+
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Lessons Booked
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
