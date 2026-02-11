"use client";

import { useState } from "react";
import { tutorService, Slot } from "@/services/tutor/tutor.service";
import { toast } from "react-hot-toast";
import { FiClock, FiPlus, FiSave, FiTrash2, FiCalendar } from "react-icons/fi";

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
      updated[index][field] = `2026-02-02T${value}:00.000Z`;
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
      toast.error("Please add at least one slot");
      return;
    }
    try {
      setSubmitting(true);
      await tutorService.updateAvailability(token, { slots });
      toast.success("Availability updated successfully!");
      setSlots([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update availability");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiClock className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Set Your Availability
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your teaching schedule and available time slots
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Header with Day Legend */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <div className="col-span-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Day
            </div>
            <div className="col-span-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Start Time
            </div>
            <div className="col-span-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              End Time
            </div>
            <div className="col-span-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Action
            </div>
          </div>

          {/* Slots List */}
          <div className="p-4 space-y-3">
            {slots.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <FiCalendar
                    className="text-gray-400 dark:text-gray-500"
                    size={24}
                  />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  No availability slots
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Add your first teaching slot to get started
                </p>
                <button
                  type="button"
                  onClick={addSlot}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                           bg-yellow-500 hover:bg-yellow-600
                           text-white rounded-md
                           transition-colors"
                >
                  <FiPlus size={14} />
                  Add First Slot
                </button>
              </div>
            ) : (
              <>
                {slots.map((slot, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 p-4
                             bg-gray-50 dark:bg-gray-800/50
                             rounded-md border border-gray-200 dark:border-gray-800
                             hover:border-yellow-500 transition-colors"
                  >
                    {/* Day - Mobile Label */}
                    <div className="sm:hidden col-span-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Day
                      </span>
                    </div>
                    {/* Day Select */}
                    <div className="sm:col-span-3">
                      <select
                        value={slot.day}
                        onChange={(e) =>
                          handleChange(index, "day", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm
                                 bg-white dark:bg-gray-900
                                 border border-gray-200 dark:border-gray-800
                                 rounded-md
                                 focus:outline-none focus:border-yellow-500 
                                 focus:ring-1 focus:ring-yellow-500
                                 transition-colors"
                      >
                        {DAYS.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Start Time - Mobile Label */}
                    <div className="sm:hidden col-span-1 mt-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Start Time
                      </span>
                    </div>
                    {/* Start Time Input */}
                    <div className="sm:col-span-3">
                      <input
                        type="time"
                        value={slot.startTime.slice(11, 16)}
                        onChange={(e) =>
                          handleChange(index, "startTime", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm
                                 bg-white dark:bg-gray-900
                                 border border-gray-200 dark:border-gray-800
                                 rounded-md
                                 focus:outline-none focus:border-yellow-500 
                                 focus:ring-1 focus:ring-yellow-500
                                 transition-colors"
                      />
                    </div>

                    {/* End Time - Mobile Label */}
                    <div className="sm:hidden col-span-1 mt-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        End Time
                      </span>
                    </div>
                    {/* End Time Input */}
                    <div className="sm:col-span-3">
                      <input
                        type="time"
                        value={slot.endTime.slice(11, 16)}
                        onChange={(e) =>
                          handleChange(index, "endTime", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm
                                 bg-white dark:bg-gray-900
                                 border border-gray-200 dark:border-gray-800
                                 rounded-md
                                 focus:outline-none focus:border-yellow-500 
                                 focus:ring-1 focus:ring-yellow-500
                                 transition-colors"
                      />
                    </div>

                    {/* Action Button */}
                    <div className="sm:col-span-3 flex sm:justify-end mt-2 sm:mt-0">
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm
                                 text-red-700 dark:text-red-400
                                 bg-red-100 dark:bg-red-900/30
                                 hover:bg-red-200 dark:hover:bg-red-900/50
                                 rounded-md transition-colors"
                      >
                        <FiTrash2 size={14} />
                        <span className="sm:hidden">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={addSlot}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium
                             text-gray-700 dark:text-gray-300
                             bg-gray-100 dark:bg-gray-800
                             hover:bg-gray-200 dark:hover:bg-gray-700
                             rounded-md transition-colors"
                  >
                    <FiPlus size={14} />
                    Add Another Slot
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium
                             bg-yellow-500 hover:bg-yellow-600
                             text-white rounded-md
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors sm:ml-auto"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave size={14} />
                        Save Availability
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>

      {/* Tips Card */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900 p-5">
        <div className="flex gap-3">
          <FiClock
            className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
            size={18}
          />
          <div>
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              Availability Tips
            </h3>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>
                • Add multiple slots for each day to maximize your availability
              </li>
              <li>• You can always come back to edit or add more slots</li>
              <li>• Students will only see future available slots</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Schedule Preview (Optional) */}
      {slots.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <FiCalendar
              className="text-gray-500 dark:text-gray-400"
              size={16}
            />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Schedule Preview
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs
                         bg-gray-100 dark:bg-gray-800
                         text-gray-700 dark:text-gray-300
                         rounded"
              >
                {slot.day}
                <span className="text-gray-400 mx-0.5">•</span>
                {slot.startTime.slice(11, 16)} - {slot.endTime.slice(11, 16)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
