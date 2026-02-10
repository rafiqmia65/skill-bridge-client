"use client";

import React from "react";
import { Booking } from "@/services/booking/booking.service";
import BookingRow from "./BookingRow/BookingRow";

interface BookingsTableProps {
  bookings: Booking[];
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
  if (bookings.length === 0)
    return <p className="text-gray-500">You have no bookings yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">
              Date
            </th>
            <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">
              Tutor
            </th>
            <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">
              Subjects
            </th>
            <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">
              Status
            </th>
            <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
