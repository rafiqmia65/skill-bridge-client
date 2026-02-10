import Image from "next/image";
import { TutorProfile } from "@/types/tutor";

interface Props {
  profile: TutorProfile;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover"
          width={96}
          height={96}
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
          {profile.name[0]}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-500">{profile.email}</p>
        <p className="mt-2">{profile.bio}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.categories.map((cat) => (
            <span
              key={cat}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded"
            >
              {cat}
            </span>
          ))}
        </div>
        {/* Availability */}
        {profile.availability.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Availability</h4>
            <ul className="space-y-1">
              {profile.availability.map((slot, idx) => (
                <li key={idx}>
                  {slot.day}: {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                  {new Date(slot.endTime).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
