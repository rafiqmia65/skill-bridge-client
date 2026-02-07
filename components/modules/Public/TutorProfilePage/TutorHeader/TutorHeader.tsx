import Image from "next/image";
import { FiStar, FiBookOpen } from "react-icons/fi";
import { Tutor } from "@/services/tutor.service";

interface Props {
  tutor: Tutor;
}

export default function TutorHeader({ tutor }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
      {tutor.user.image ? (
        <Image
          src={tutor.user.image}
          alt={tutor.user.name}
          width={140}
          height={140}
          className="rounded-full border-4 border-yellow-400 object-cover"
        />
      ) : (
        <div className="w-36 h-36 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-bold text-4xl">
          {tutor.user.name[0]}
        </div>
      )}

      <div className="flex-1 space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {tutor.user.name}
        </h1>

        <div className="flex items-center gap-4">
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiStar className="text-yellow-400" /> {tutor.rating.toFixed(1)} / 5
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            • ${tutor.pricePerHr}/hr
          </p>
        </div>

        {tutor.categories && tutor.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tutor.categories.map((cat) => (
              <span
                key={cat.id}
                className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm font-medium px-3 py-1 rounded-full"
              >
                <FiBookOpen size={16} /> {cat.name}
              </span>
            ))}
          </div>
        )}

        {tutor.bio && (
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
            {tutor.bio}
          </p>
        )}

        <button className="mt-6 bg-yellow-400 dark:bg-yellow-300 text-slate-900 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-500 dark:hover:bg-yellow-400 transition shadow-lg hover:shadow-xl">
          Book Now
        </button>
      </div>
    </div>
  );
}
