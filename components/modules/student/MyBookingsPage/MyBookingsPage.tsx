"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bookingService, Booking } from "@/services/booking/booking.service";
import { authClient } from "@/lib/auth-client";
import BookingsTable from "./BookingsTable/BookingsTable";
import { FiCalendar } from "react-icons/fi";

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;
  const loading = sessionQuery?.isPending || !session;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        toast.error("Please login to view bookings");
        return;
      }

      try {
        const data = await bookingService.getMyBookings(token);
        setBookings(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to fetch bookings");
        } else {
          toast.error("Failed to fetch bookings");
        }
      }
    };

    if (token) fetchBookings();
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiCalendar
            className="text-yellow-600 dark:text-yellow-400"
            size={20}
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            My Bookings
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your tutoring sessions
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      ) : (
        <BookingsTable bookings={bookings} />
      )}
    </div>
  );
};

export default MyBookingsPage;
