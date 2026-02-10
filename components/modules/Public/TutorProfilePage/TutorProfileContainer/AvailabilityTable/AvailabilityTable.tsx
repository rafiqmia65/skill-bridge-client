import { TutorAvailability } from "@/services/booking/booking.service";

interface Props {
  availability: TutorAvailability[];
}

export default function AvailabilityTable({ availability }: Props) {
  if (!availability.length) return <p>No availability provided.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((slot, idx) => {
            const start = new Date(slot.startTime);
            const end = new Date(slot.endTime);
            return (
              <tr
                key={idx}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{slot.day}</td>
                <td className="px-4 py-2">
                  {start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-2">
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
  );
}
