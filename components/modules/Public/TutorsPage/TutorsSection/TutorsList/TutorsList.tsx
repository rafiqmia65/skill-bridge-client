"use client";
import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { Tutor } from "@/services/tutor/tutor.service";

interface TutorsListProps {
  tutors: Tutor[];
}

export default function TutorsList({ tutors }: TutorsListProps) {
  if (!tutors.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No tutors found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          className="p-4 bg-white dark:bg-gray-900 
                   rounded-lg border border-gray-200 dark:border-gray-800
                   hover:border-yellow-500 transition-colors
                   flex flex-col h-full"
        >
          {/* Profile */}
          <div className="flex items-center gap-3 mb-3">
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
              <h3 className="font-medium text-yellow-700 dark:text-yellow-500 truncate">
                {tutor.user.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FiStar className="text-yellow-500" size={12} />
                <span>{tutor.rating.toFixed(1)}</span>
                <span>•</span>
                <span>${tutor.pricePerHr}/hr</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {tutor.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {tutor.bio}
            </p>
          )}

          {/* Categories */}
          {tutor.categories && tutor.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
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
          <div className="mt-auto">
            <Link
              href={`/tutors/${tutor.id}`}
              className="block w-full py-2 text-sm font-medium text-center
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
  );
}
