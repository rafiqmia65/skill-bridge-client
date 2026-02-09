"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { adminBookingService } from "@/services/admin/adminBookingService";
import type { Booking } from "@/types/admin";
import BookingTable from "./BookingTable/BookingTable";

export default function AdminBookingsPage() {
  const session = authClient.useSession();
  const token = session?.data?.session?.token;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await adminBookingService.getAllBookings({ token });

        // safety
        setBookings(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch bookings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return <p className="text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <BookingTable bookings={bookings} />
    </div>
  );
}
