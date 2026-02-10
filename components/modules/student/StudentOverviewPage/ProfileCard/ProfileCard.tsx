import React from "react";
import { StudentProfile } from "@/services/student/StudentProfileService";
import Image from "next/image";

interface ProfileCardProps {
  profile: StudentProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const firstChar = profile.name.charAt(0).toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 flex items-center gap-4">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover"
          width={64}
          height={64}
        />
      ) : (
        <div className="w-16 h-16 rounded-full border-yellow-500 border-4 text-yellow-500 flex items-center justify-center text-xl font-bold">
          {firstChar}
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
        <p className="text-sm text-gray-400">
          Joined: {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
