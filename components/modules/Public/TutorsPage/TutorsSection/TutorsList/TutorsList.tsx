"use client";
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiBookOpen } from "react-icons/fi";
import { Tutor } from "@/services/tutor.service";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TutorsListProps {
  tutors: Tutor[];
  meta: Meta;
}

export default function TutorsList({ tutors }: TutorsListProps) {
  if (!tutors.length)
    return <p className="text-center mt-10">No tutors found.</p>;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-yellow-400"
        >
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
              <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-bold text-xl">
                {tutor.user.name[0]}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {tutor.user.name}
              </h3>
              <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiStar className="text-yellow-400" /> {tutor.rating.toFixed(1)}{" "}
                • ${tutor.pricePerHr}/hr
              </p>
            </div>
          </div>

          {tutor.bio && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {tutor.bio.length > 50
                ? tutor.bio.slice(0, 50) + "..."
                : tutor.bio}
            </p>
          )}

          {tutor.categories && tutor.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tutor.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full"
                >
                  <FiBookOpen size={14} /> {cat.name}
                </span>
              ))}
            </div>
          )}

          <Link href={`/tutors/${tutor.id}`}>
            <button className="mt-6 w-full rounded-lg bg-yellow-400 dark:bg-yellow-300 text-slate-900 font-semibold py-2 hover:bg-yellow-500 dark:hover:bg-yellow-400 transition shadow-md hover:shadow-lg">
              View Profile
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
