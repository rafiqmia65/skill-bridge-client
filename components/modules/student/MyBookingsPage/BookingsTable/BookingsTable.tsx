"use client";

import React from "react";
import { Booking } from "@/services/booking/booking.service";
import BookingRow from "./BookingRow/BookingRow";
import { FiInbox } from "react-icons/fi";
import Link from "next/link";

interface BookingsTableProps {
  bookings: Booking[];
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <FiInbox className="text-gray-400 dark:text-gray-500" size={24} />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
            No bookings yet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Find a tutor and book your first session
          </p>
          <Link
            href="/tutors"
            className="px-4 py-2 text-sm font-medium
                     bg-yellow-500 hover:bg-yellow-600
                     text-white rounded-md
                     transition-colors"
          >
            Browse Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
        <div className="col-span-3">Date & Time</div>
        <div className="col-span-2">Tutor</div>
        <div className="col-span-3">Subjects</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Action</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {bookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingsTable;
