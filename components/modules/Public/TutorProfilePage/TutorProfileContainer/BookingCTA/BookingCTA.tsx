"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  bookingService,
  Booking,
  TutorAvailability,
} from "@/services/booking/booking.service";

interface Props {
  tutorId: string;
  token: string | null;
  availability: TutorAvailability[];
}

export default function BookingCTA({ tutorId, token, availability }: Props) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [slotOptions, setSlotOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const now = new Date();
    const slots = availability
      .map((slot) => {
        if (!slot.startTime) return null;
        const start = new Date(slot.startTime);
        if (start <= now) start.setDate(start.getDate() + 7);
        return {
          label: `${slot.day} • ${start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
          value: start.toISOString(),
        };
      })
      .filter((s): s is { label: string; value: string } => s !== null);

    setSlotOptions(slots);
  }, [availability]);

  const handleBooking = async () => {
    if (!token) return toast.error("Please login to book");
    if (!selectedSlot) return toast.error("Select a time slot");

    try {
      setLoading(true);
      const data = await bookingService.createBooking(
        token,
        tutorId,
        selectedSlot,
      );
      setBooking(data);
      toast.success("Booking confirmed!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (booking) {
    return (
      <Link
        href="/dashboard/bookings"
        className="inline-block px-5 py-2 text-sm font-medium
                 bg-green-500 hover:bg-green-600
                 text-white rounded-md
                 transition-colors"
      >
        View Booking →
      </Link>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        className="px-3 py-2 text-sm
                 bg-gray-50 dark:bg-gray-900
                 border border-gray-200 dark:border-gray-800
                 rounded-md
                 focus:outline-none focus:border-yellow-500 
                 focus:ring-1 focus:ring-yellow-500
                 min-w-50"
      >
        <option value="">Select a slot</option>
        {slotOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleBooking}
        disabled={loading || !selectedSlot}
        className="px-5 py-2 text-sm font-medium
                 bg-yellow-500 hover:bg-yellow-600
                 text-white rounded-md
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}
