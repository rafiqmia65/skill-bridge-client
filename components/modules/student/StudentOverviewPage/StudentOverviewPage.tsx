"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  studentProfileService,
  StudentProfile,
} from "@/services/student/StudentProfileService";
import { bookingService, Booking } from "@/services/booking/booking.service";
import ProfileCard from "./ProfileCard/ProfileCard";
import BookingsTable from "./BookingsTable/BookingsTable";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";

const StudentOverviewPage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const sessionQuery = authClient.useSession();
  const session = sessionQuery?.data;
  const token = session?.session?.token;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileData, bookingsData] = await Promise.all([
          studentProfileService.getProfile(token),
          bookingService.getMyBookings(token),
        ]);
        setProfile(profileData);
        setBookings(bookingsData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to load dashboard data");
        } else {
          toast.error("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!session) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to view your dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiUser className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Here&apos;s your learning overview
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-6">
          {/* Profile Skeleton */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              </div>
            </div>
          </div>

          {/* Bookings Skeleton */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/6 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 dark:bg-gray-800 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {profile && <ProfileCard profile={profile} />}

          {/* Recent Bookings Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <FiCalendar
                  className="text-gray-500 dark:text-gray-400"
                  size={16}
                />
                <h2 className="font-medium text-gray-900 dark:text-white">
                  Recent Bookings
                </h2>
              </div>
            </div>
            <div className="p-4">
              <BookingsTable bookings={bookings.slice(0, 5)} />
            </div>
          </div>

          {/* Stats Cards (Optional) */}
          {profile && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                    <FiCalendar
                      className="text-blue-600 dark:text-blue-400"
                      size={18}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Total Bookings
                    </p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">
                      {bookings.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
                    <FiClock
                      className="text-green-600 dark:text-green-400"
                      size={18}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Completed
                    </p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">
                      {
                        bookings.filter(
                          (b) => b.status?.toLowerCase() === "completed",
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
                    <FiUser
                      className="text-yellow-600 dark:text-yellow-400"
                      size={18}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Member Since
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(profile.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentOverviewPage;
