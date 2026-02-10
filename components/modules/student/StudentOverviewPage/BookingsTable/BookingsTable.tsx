import React from "react";
import { Booking } from "@/services/booking/booking.service";

interface BookingsTableProps {
  bookings: Booking[];
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
  if (!bookings.length)
    return <p className="text-gray-500 dark:text-gray-400">No bookings yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
              Date
            </th>
            <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
              Tutor
            </th>
            <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
              Subjects
            </th>
            <th className="p-3 text-left border border-gray-300 dark:border-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="p-3 border border-gray-300 dark:border-gray-600">
                {new Date(b.date).toLocaleString()}
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-600">
                {b.tutorProfile?.user.name || "N/A"}
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-600">
                {b.tutorProfile?.categories?.map((c) => c.name).join(", ") ||
                  "N/A"}
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-600">
                {b.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
