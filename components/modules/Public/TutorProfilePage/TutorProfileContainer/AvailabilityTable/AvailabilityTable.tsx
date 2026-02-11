import { TutorAvailability } from "@/services/booking/booking.service";

interface Props {
  availability: TutorAvailability[];
}

export default function AvailabilityTable({ availability }: Props) {
  if (!availability.length) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          No availability posted yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="font-medium text-gray-900 dark:text-white">
          Availability
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                Day
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                Start
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600 dark:text-gray-400">
                End
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {availability.map((slot, idx) => {
              const start = new Date(slot.startTime);
              const end = new Date(slot.endTime);
              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-4 py-2.5 text-gray-900 dark:text-white">
                    {slot.day}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    {start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    {end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
