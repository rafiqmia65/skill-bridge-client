import Image from "next/image";
import { TutorProfile } from "@/types/tutor";
import { FiMail, FiClock } from "react-icons/fi";

interface Props {
  profile: TutorProfile;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          {profile.image ? (
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-yellow-500">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center border-2 border-yellow-500">
              <span className="text-2xl sm:text-3xl font-medium text-white">
                {profile.name[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
              {profile.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiMail size={14} />
              <span>{profile.email}</span>
            </div>
          </div>

          {profile.bio && (
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Categories */}
          {profile.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {profile.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 text-xs
                           bg-gray-100 dark:bg-gray-800
                           text-gray-700 dark:text-gray-300
                           rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Availability Preview */}
          {profile.availability.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-1.5 mb-2">
                <FiClock className="text-gray-500" size={14} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Availability
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.availability.slice(0, 3).map((slot, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-gray-600 dark:text-gray-400"
                  >
                    {slot.day}
                    <span className="text-gray-400 mx-1">•</span>
                    {new Date(slot.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ))}
                {profile.availability.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{profile.availability.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
