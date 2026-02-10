"use client";

import React from "react";
import { Booking } from "@/services/booking/booking.service";

interface BookingRowProps {
  booking: Booking;
}

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="border border-gray-300 dark:border-gray-600 p-3">
        {new Date(booking.date).toLocaleString()}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-3">
        {booking.tutorProfile?.user.name || "N/A"}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-3">
        {booking.tutorProfile?.categories?.map((c) => c.name).join(", ") ||
          "N/A"}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-3">
        {booking.status}
      </td>
      <td className="border border-gray-300 dark:border-gray-600 p-3">
        <a
          href={`/dashboard/bookings/${booking.id}`}
          className="text-yellow-500 hover:underline"
        >
          View
        </a>
      </td>
    </tr>
  );
};

export default BookingRow;
