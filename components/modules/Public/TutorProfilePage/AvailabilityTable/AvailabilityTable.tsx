interface Availability {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface Props {
  availability: Availability[];
}

export default function AvailabilityTable({ availability }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Availability
      </h2>
      {availability.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 text-gray-700 dark:text-gray-300">Day</th>
                <th className="py-3 text-gray-700 dark:text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((slot) => (
                <tr
                  key={slot.id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-3 text-gray-800 dark:text-gray-200">
                    {slot.day}
                  </td>
                  <td className="py-3 text-gray-800 dark:text-gray-200">
                    {new Date(slot.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(slot.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No availability found.
        </p>
      )}
    </div>
  );
}
