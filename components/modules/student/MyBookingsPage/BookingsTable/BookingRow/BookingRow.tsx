"use client";

import React from "react";
import Link from "next/link";
import { Booking } from "@/services/booking/booking.service";
import { FiChevronRight } from "react-icons/fi";

interface BookingRowProps {
  booking: Booking;
}

const statusColors = {
  pending:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  confirmed:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  completed: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const status = booking.status?.toLowerCase() || "pending";
  const statusColor =
    statusColors[status as keyof typeof statusColors] || statusColors.pending;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 px-4 py-4 sm:py-3 items-start sm:items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800 last:border-0">
      {/* Date - Full width on mobile, col-span-3 on desktop */}
      <div className="sm:col-span-3 flex sm:block justify-between items-center sm:items-start">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">
          Date & Time
        </span>
        <div className="text-right sm:text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date(booking.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(booking.date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* Tutor - Full width on mobile, col-span-2 on desktop */}
      <div className="sm:col-span-2 flex sm:block justify-between items-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">
          Tutor
        </span>
        <span className="text-sm text-gray-900 dark:text-white font-medium">
          {booking.tutorProfile?.user.name || "N/A"}
        </span>
      </div>

      {/* Subjects - Full width on mobile, col-span-3 on desktop */}
      <div className="sm:col-span-3 flex sm:block justify-between items-start sm:items-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">
          Subjects
        </span>
        {booking.tutorProfile?.categories?.length ? (
          <div className="flex flex-wrap gap-1 justify-end sm:justify-start">
            {booking.tutorProfile.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="px-2 py-0.5 text-xs
                         bg-gray-100 dark:bg-gray-800
                         text-gray-700 dark:text-gray-300
                         rounded whitespace-nowrap"
              >
                {cat.name}
              </span>
            ))}
            {booking.tutorProfile.categories.length > 2 && (
              <span className="px-2 py-0.5 text-xs text-gray-500 whitespace-nowrap">
                +{booking.tutorProfile.categories.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-500">N/A</span>
        )}
      </div>

      {/* Status - Full width on mobile, col-span-2 on desktop */}
      <div className="sm:col-span-2 flex sm:block justify-between items-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">
          Status
        </span>
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusColor}`}
        >
          {booking.status}
        </span>
      </div>

      {/* Action - Full width on mobile, col-span-2 on desktop */}
      <div className="sm:col-span-2 flex sm:block justify-between items-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:hidden">
          Action
        </span>
        <Link
          href={`/dashboard/bookings/${booking.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5
                   text-sm font-medium
                   text-gray-700 dark:text-gray-300
                   bg-gray-100 dark:bg-gray-800
                   hover:bg-gray-200 dark:hover:bg-gray-700
                   rounded-md transition-colors"
        >
          View
          <FiChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default BookingRow;
