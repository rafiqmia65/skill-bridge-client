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
  tutorId: string; // backend tutorProfileId
  token: string | null;
  availability: TutorAvailability[];
}

export default function BookingCTA({ tutorId, token, availability }: Props) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const [slotOptions, setSlotOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const now = new Date();
    const slots = availability
      .map((slot) => {
        if (!slot.startTime) return null;
        const start = new Date(slot.startTime);

        // shift past slots to next week
        if (start <= now) start.setDate(start.getDate() + 7);

        return {
          label: `${slot.day} ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
          value: start.toISOString(),
        };
      })
      .filter((s): s is { label: string; value: string } => s !== null);

    setSlotOptions(slots);
  }, [availability]);

  const handleBooking = async () => {
    if (!token) return toast.error("Please login to book this tutor");
    if (!selectedSlot) return toast.error("Please select a slot");

    try {
      setLoading(true);

      // Call booking service
      const data = await bookingService.createBooking(
        token,
        tutorId,
        selectedSlot,
      );

      setBooking(data);
      toast.success("Booking confirmed 🎉");
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

  return (
    <div className="mt-6 flex flex-col gap-4">
      {!booking && (
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full max-w-xs
            bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 shadow-sm"
        >
          <option value="">Select an available slot</option>
          {slotOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {booking ? (
        <Link
          href={`/dashboard/bookings`}
          className="inline-block bg-green-500 text-white px-8 py-3 rounded-xl font-semibold"
        >
          View Booking
        </Link>
      ) : (
        <button
          onClick={handleBooking}
          disabled={loading || !selectedSlot}
          className="bg-yellow-400 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition w-full max-w-xs"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      )}
    </div>
  );
}
