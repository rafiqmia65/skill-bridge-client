"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bookingService, Booking } from "@/services/booking/booking.service";
import { authClient } from "@/lib/auth-client";
import BookingsTable from "./BookingsTable/BookingsTable";

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;
  const loading = sessionQuery?.isPending || !session;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        toast.error("You must be logged in to view bookings");
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {loading ? (
        <p>Loading your bookings...</p>
      ) : (
        <BookingsTable bookings={bookings} />
      )}
    </div>
  );
};

export default MyBookingsPage;
