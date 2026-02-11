import React from "react";
import { StudentProfile } from "@/services/student/StudentProfileService";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
import Link from "next/link";

interface ProfileCardProps {
  profile: StudentProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const firstChar = profile.name.charAt(0).toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <div className="shrink-0">
          {profile.image ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center border-2 border-yellow-500">
              <span className="text-2xl font-medium text-white">
                {firstChar}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">
              {profile.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <FiMail className="text-gray-400" size={14} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Active Student
              </span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Joined{" "}
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Quick Action */}
        <div className="shrink-0 self-center sm:self-auto">
          <Link
            href="/dashboard/profile"
            className="px-4 py-2 text-sm font-medium
                           text-gray-700 dark:text-gray-300
                           bg-gray-100 dark:bg-gray-800
                           hover:bg-gray-200 dark:hover:bg-gray-700
                           rounded-md transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
