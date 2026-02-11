import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { Tutor } from "@/services/booking/booking.service";
import BookingCTA from "../BookingCTA/BookingCTA";

interface Props {
  tutor: Tutor;
  token: string | null;
}

export default function TutorHeader({ tutor, token }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          {tutor.user.image ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500">
              <Image
                src={tutor.user.image}
                alt={tutor.user.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 flex items-center justify-center">
              <span className="text-2xl font-medium text-yellow-700 dark:text-yellow-400">
                {tutor.user.name[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-1">
              {tutor.user.name}
            </h1>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-500" size={16} />
                <span className="font-medium text-gray-900 dark:text-white">
                  {tutor.rating.toFixed(1)}
                </span>
                <span className="text-gray-500">/ 5</span>
              </div>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-gray-900 dark:text-white font-medium">
                ${tutor.pricePerHr}/hr
              </span>
            </div>
          </div>

          {/* Categories */}
          {tutor.categories && tutor.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tutor.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-2.5 py-1 text-xs
                           bg-gray-100 dark:bg-gray-800
                           text-gray-700 dark:text-gray-300
                           rounded"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Bio */}
          {tutor.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tutor.bio}
            </p>
          )}

          {/* Booking CTA */}
          <div className="pt-2">
            <BookingCTA
              tutorId={tutor.id}
              token={token}
              availability={tutor.availability ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
