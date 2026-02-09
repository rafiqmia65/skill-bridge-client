"use client";

import { useState } from "react";
import { tutorService, Slot } from "@/services/tutor/tutor.service";
import { toast } from "react-hot-toast";

interface Props {
  token: string;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TutorAvailabilityForm({ token }: Props) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    index: number,
    field: "day" | "startTime" | "endTime",
    value: string,
  ) => {
    const updated = [...slots];
    if (field === "startTime" || field === "endTime") {
      updated[index][field] = `2026-02-02T${value}:00.000Z`; // ISO format
    } else {
      updated[index][field] = value;
    }
    setSlots(updated);
  };

  const addSlot = () => {
    setSlots([
      ...slots,
      {
        day: "Monday",
        startTime: "2026-02-02T09:00:00.000Z",
        endTime: "2026-02-02T12:00:00.000Z",
      },
    ]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slots.length === 0) {
      toast.error("Please add at least one slot ❌");
      return;
    }
    try {
      setSubmitting(true);
      await tutorService.updateAvailability(token, { slots });
      toast.success("Availability updated successfully ✅");
      setSlots([]); // reset form after success
    } catch (err) {
      console.error(err);
      toast.error("Failed to update availability ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
        Set Your Availability
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-200"
          >
            {/* Day */}
            <select
              value={slot.day}
              onChange={(e) => handleChange(index, "day", e.target.value)}
              className="border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            {/* Start Time */}
            <input
              type="time"
              value={slot.startTime.slice(11, 16)}
              onChange={(e) => handleChange(index, "startTime", e.target.value)}
              className="border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            />

            {/* End Time */}
            <input
              type="time"
              value={slot.endTime.slice(11, 16)}
              onChange={(e) => handleChange(index, "endTime", e.target.value)}
              className="border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            />

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeSlot(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Buttons below slots */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            type="button"
            onClick={addSlot}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            + Add Slot
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </form>
    </div>
  );
}
