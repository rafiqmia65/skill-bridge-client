"use client";

import type { Booking } from "@/types/admin";

interface Props {
  bookings?: Booking[];
}

export default function BookingTable({ bookings = [] }: Props) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Student</th>
            <th className="px-4 py-2">Tutor</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price/hr</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking, index) => (
              <tr key={booking.id} className="border-t dark:border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>

                <td className="px-4 py-2">
                  <p className="font-medium">{booking.student.name}</p>
                  <p className="text-xs text-gray-500">
                    {booking.student.email}
                  </p>
                </td>

                <td className="px-4 py-2">{booking.tutorProfile.user.name}</td>

                <td className="px-4 py-2">
                  {booking.tutorProfile.categories
                    .map((c) => c.name)
                    .join(", ")}
                </td>

                <td className="px-4 py-2">
                  ৳{booking.tutorProfile.pricePerHr}
                </td>

                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                    {booking.status}
                  </span>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
