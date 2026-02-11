"use client";

import type { Booking } from "@/types/admin";
import { FiCalendar, FiUser, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface Props {
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

export default function RecentBookings({ bookings }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
            <FiCalendar
              className="text-gray-400 dark:text-gray-500"
              size={20}
            />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
            No recent bookings
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bookings will appear here when students schedule sessions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCalendar
              className="text-gray-500 dark:text-gray-400"
              size={16}
            />
            <h2 className="font-medium text-gray-900 dark:text-white">
              Recent Bookings
            </h2>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Last {bookings.length} bookings
          </span>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Student
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Tutor
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {bookings.slice(0, 5).map((booking) => {
              const status = booking.status?.toLowerCase() || "pending";
              const statusColor =
                statusColors[status as keyof typeof statusColors] ||
                statusColors.pending;
              const date = new Date(booking.date);

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-5 py-3 text-sm text-gray-900 dark:text-white">
                    {booking.student?.name || "N/A"}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-900 dark:text-white">
                    {booking.tutorProfile?.user?.name || "N/A"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusColor}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium
                               text-yellow-600 dark:text-yellow-400
                               hover:text-yellow-700 dark:hover:text-yellow-300
                               transition-colors"
                    >
                      View
                      <FiChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="sm:hidden p-4 space-y-3">
        {bookings.slice(0, 5).map((booking) => {
          const status = booking.status?.toLowerCase() || "pending";
          const statusColor =
            statusColors[status as keyof typeof statusColors] ||
            statusColors.pending;
          const date = new Date(booking.date);

          return (
            <div
              key={booking.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FiUser className="text-gray-400" size={14} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.student?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" size={14} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      with {booking.tutorProfile?.user?.name || "N/A"}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/admin/bookings/${booking.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium
                           text-yellow-600 dark:text-yellow-400"
                >
                  View Details
                  <FiChevronRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}

        {bookings.length > 5 && (
          <div className="pt-2 text-center">
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1 text-sm font-medium
                       text-yellow-600 dark:text-yellow-400
                       hover:text-yellow-700 dark:hover:text-yellow-300
                       transition-colors"
            >
              View all bookings
              <FiChevronRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* View All Link - Desktop */}
      {bookings.length > 5 && (
        <div className="hidden sm:block px-5 py-3 border-t border-gray-200 dark:border-gray-800 text-right">
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1 text-sm font-medium
                     text-yellow-600 dark:text-yellow-400
                     hover:text-yellow-700 dark:hover:text-yellow-300
                     transition-colors"
          >
            View all bookings
            <FiChevronRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
