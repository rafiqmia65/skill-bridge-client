import Image from "next/image";
import { FiStar, FiBookOpen } from "react-icons/fi";
import { Tutor } from "@/services/booking/booking.service";
import BookingCTA from "../BookingCTA/BookingCTA";

interface Props {
  tutor: Tutor;
  token: string | null;
}

export default function TutorHeader({ tutor, token }: Props) {
  const firstChar = tutor.user.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
      <div className="shrink-0 w-36 h-36 relative flex items-center justify-center rounded-full border-4 border-yellow-400 bg-gray-200 dark:bg-gray-700 overflow-hidden text-4xl font-bold text-yellow-500">
        {tutor.user.image ? (
          <Image
            src={tutor.user.image}
            alt={tutor.user.name}
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <span>{firstChar}</span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-3">
        <h1 className="text-4xl font-bold">{tutor.user.name}</h1>
        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <FiStar className="text-yellow-400" />
          {tutor.rating.toFixed(1)} / 5 • ${tutor.pricePerHr ?? 0}/hr
        </p>

        {tutor.categories?.length ? (
          <div className="flex flex-wrap gap-2">
            {tutor.categories.map((cat) => (
              <span
                key={cat.id}
                className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800 px-3 py-1 rounded-full text-sm"
              >
                <FiBookOpen size={14} /> {cat.name}
              </span>
            ))}
          </div>
        ) : null}

        {tutor.bio && (
          <p className="text-gray-700 dark:text-gray-300">{tutor.bio}</p>
        )}

        <BookingCTA
          tutorId={tutor.id}
          token={token}
          availability={tutor.availability ?? []}
        />
      </div>
    </div>
  );
}
