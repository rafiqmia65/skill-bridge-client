"use client";

import React from "react";
import Link from "next/link";
import { Booking } from "@/services/booking/booking.service";
import { FiCalendar, FiUser, FiChevronRight } from "react-icons/fi";

interface BookingsTableProps {
  bookings: Booking[];
}

const statusColors = {
  pending:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  confirmed:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  completed: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
  if (!bookings.length) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
          <FiCalendar className="text-gray-400 dark:text-gray-500" size={20} />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          No bookings yet
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Find a tutor and book your first session
        </p>
        <Link
          href="/tutors"
          className="inline-flex px-4 py-2 text-sm font-medium
                   bg-yellow-500 hover:bg-yellow-600
                   text-white rounded-md
                   transition-colors"
        >
          Browse Tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => {
        const tutorProfile = booking.tutorProfile;
        const categories = tutorProfile?.categories ?? [];

        const status = booking.status?.toLowerCase() || "pending";
        const statusColor =
          statusColors[status as keyof typeof statusColors] ||
          statusColors.pending;
        const date = new Date(booking.date);

        return (
          <Link
            key={booking.id}
            href={`/dashboard/bookings/${booking.id}`}
            className="block group"
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4
                      bg-white dark:bg-gray-900 
                      rounded-lg border border-gray-200 dark:border-gray-800
                      hover:border-yellow-500 hover:shadow-sm
                      transition-all duration-200"
            >
              {/* Left */}
              <div className="flex items-start gap-3">
                <div
                  className="flex flex-col items-center justify-center w-12 h-12 
                          bg-gray-50 dark:bg-gray-800 rounded-md"
                >
                  <span className="text-xs text-gray-500">
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {tutorProfile?.user.name ?? "Tutor"}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${statusColor}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      {date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {categories.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FiUser size={12} />
                          {categories
                            .slice(0, 2)
                            .map((c) => c.name)
                            .join(", ")}
                          {categories.length > 2 &&
                            ` +${categories.length - 2}`}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">View details</span>
                <FiChevronRight size={16} />
              </div>
            </div>
          </Link>
        );
      })}

      {/* View All Link */}
      {bookings.length > 5 && (
        <div className="pt-2 text-center">
          <Link
            href="/dashboard/bookings"
            className="inline-flex items-center gap-1 text-sm font-medium
                     text-yellow-600 dark:text-yellow-400
                     hover:text-yellow-700 dark:hover:text-yellow-300
                     transition-colors"
          >
            View all bookings
            <FiChevronRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
