"use client";

import type { Booking } from "@/types/admin";
import {
  FiUser,
  FiDollarSign,
  FiCalendar,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

interface Props {
  bookings?: Booking[];
}

const statusColors = {
  PENDING:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  CONFIRMED:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  COMPLETED: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  CANCELLED: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

export default function BookingTable({ bookings = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tutorProfile.user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.tutorProfile.categories.some((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  if (bookings.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <FiCalendar className="text-gray-400 dark:text-gray-500" size={24} />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          No bookings found
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Bookings will appear here once students schedule sessions
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative max-w-xs">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-9 text-sm
                     bg-gray-50 dark:bg-gray-900 
                     border border-gray-200 dark:border-gray-800
                     rounded-md
                     focus:outline-none focus:border-yellow-500 
                     focus:ring-1 focus:ring-yellow-500
                     transition-colors"
          />
          <FiCalendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
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
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredBookings.map((booking) => {
              return (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          {booking.student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.student.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {booking.student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {booking.tutorProfile.user.name
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {booking.tutorProfile.user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {booking.tutorProfile.categories
                        .slice(0, 2)
                        .map((cat) => (
                          <span
                            key={cat.id}
                            className="px-2 py-0.5 text-xs
                                   bg-gray-100 dark:bg-gray-800
                                   text-gray-700 dark:text-gray-300
                                   rounded"
                          >
                            {cat.name}
                          </span>
                        ))}
                      {booking.tutorProfile.categories.length > 2 && (
                        <span className="px-2 py-0.5 text-xs text-gray-500">
                          +{booking.tutorProfile.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                      <FiDollarSign size={14} className="text-gray-400" />
                      {booking.tutorProfile.pricePerHr}/hr
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        statusColors[
                          booking.status as keyof typeof statusColors
                        ] || "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
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
        {filteredBookings.map((booking) => {
          return (
            <div
              key={booking.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-800"
            >
              {/* Header with Status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {booking.student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {booking.student.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {booking.student.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    statusColors[booking.status as keyof typeof statusColors] ||
                    "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Tutor Info */}
              <div className="flex items-center gap-2 mb-2">
                <FiUser className="text-gray-400" size={14} />
                <span className="text-sm text-gray-900 dark:text-white">
                  {booking.tutorProfile.user.name}
                </span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1 mb-2">
                {booking.tutorProfile.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-2 py-0.5 text-xs
                             bg-gray-100 dark:bg-gray-800
                             text-gray-700 dark:text-gray-300
                             rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                  <FiDollarSign size={14} className="text-gray-400" />$
                  {booking.tutorProfile.pricePerHr}/hr
                </div>
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

        {filteredBookings.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No bookings matching {searchTerm}
            </p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-500">
        Showing {filteredBookings.length} of {bookings.length} bookings
        {searchTerm && ` (filtered)`}
      </div>
    </div>
  );
}
