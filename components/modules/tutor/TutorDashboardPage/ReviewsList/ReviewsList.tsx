import { Review } from "@/types/tutor";
import { FiStar, FiUser } from "react-icons/fi";

interface Props {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No reviews yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <FiUser
                  className="text-gray-600 dark:text-gray-400"
                  size={14}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {review.studentName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-500" size={14} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {review.rating}/5
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
