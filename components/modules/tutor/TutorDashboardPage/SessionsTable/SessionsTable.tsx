import { Session } from "@/types/tutor";
import { FiCalendar, FiStar } from "react-icons/fi";

interface Props {
  sessions: Session[];
}

const statusColors = {
  upcoming:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  completed:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

export default function SessionsTable({ sessions }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No sessions found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const status = session.status?.toLowerCase() || "upcoming";
        const statusColor =
          statusColors[status as keyof typeof statusColors] ||
          statusColors.upcoming;
        const date = new Date(session.date);

        return (
          <div
            key={session.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3
                     bg-gray-50 dark:bg-gray-800/50
                     rounded-md hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Date Badge */}
              <div
                className="flex flex-col items-center justify-center w-10 h-10 
                            bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
              >
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {date.toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {date.getDate()}
                </span>
              </div>

              {/* Session Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {session.studentName}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${statusColor}`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {session.review && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiStar className="text-yellow-500" size={12} />
                        {session.review.rating}/5
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Review Preview */}
            {session.review?.comment && (
              <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-right truncate max-w-50">
                {session.review.comment}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
