"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { adminBookingService } from "@/services/admin/adminBookingService";
import type { Booking } from "@/types/admin";
import BookingTable from "./BookingTable/BookingTable";
import {
  FiCalendar,
  FiBookOpen,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";

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

  // Calculate stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "CANCELLED",
  ).length;

  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.tutorProfile?.pricePerHr || 0), 0);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 animate-pulse" />

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 mb-2" />
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-12" />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 dark:bg-gray-800 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: FiCalendar,
      color: "blue" as const,
    },
    {
      title: "Pending",
      value: pendingBookings,
      icon: FiActivity,
      color: "yellow" as const,
    },
    {
      title: "Confirmed",
      value: confirmedBookings,
      icon: FiBookOpen,
      color: "green" as const,
    },
    {
      title: "Completed",
      value: completedBookings,
      icon: FiCheckCircle,
      color: "purple" as const,
    },
    {
      title: "Cancelled",
      value: cancelledBookings,
      icon: FiXCircle,
      color: "red" as const,
    },
  ];

  return (
    <div className="space-y-8">
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
            Booking Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Monitor and manage all tutoring sessions
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg border border-yellow-200 dark:border-yellow-900 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500 rounded-md">
              <FiDollarSign className="text-white" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total Revenue (Completed)
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            From {completedBookings} completed sessions
          </span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiBookOpen
                className="text-gray-500 dark:text-gray-400"
                size={16}
              />
              <h2 className="font-medium text-gray-900 dark:text-white">
                All Bookings
              </h2>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Total: {totalBookings} bookings
            </span>
          </div>
        </div>

        <BookingTable bookings={bookings} />
      </div>
    </div>
  );
}

// Import icons
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

// Local StatCard component
type StatCardColor = "blue" | "yellow" | "green" | "red" | "purple" | "orange";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  color: StatCardColor;
}

const colorClasses: Record<StatCardColor, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  orange:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
};

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 
                    hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-md ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
