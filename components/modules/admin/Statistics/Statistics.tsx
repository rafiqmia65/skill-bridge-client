"use client";

import { useEffect, useState } from "react";
import { adminOverviewService } from "@/services/admin/adminOverview.service";
import StatCard from "./StatCard/StatCard";
import RecentBookings from "./RecentBookings/RecentBookings";
import { authClient } from "@/lib/auth-client";
import type { AdminOverviewResponse } from "@/types/admin";
import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiCalendar,
  FiFolder,
  FiActivity,
} from "react-icons/fi";
import { IconType } from "react-icons";

// Define proper type for stat card color
type StatCardColor = "blue" | "yellow" | "green" | "purple" | "orange";

export default function Statistics() {
  const session = authClient.useSession();

  const [data, setData] = useState<AdminOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.data?.session?.token) {
      setTimeout(() => {
        setError("You are not authorized to view this page.");
        setLoading(false);
      }, 0);
      return;
    }

    const fetchData = async () => {
      try {
        const token = session?.data?.session.token;
        const result = await adminOverviewService.getAdminOverview({ token });
        if (result.error) setError(result.error.message);
        else setData(result.data ?? null);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

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
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 animate-pulse"
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
                className="h-10 bg-gray-200 dark:bg-gray-800 rounded"
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

  if (!data) return null;

  const { stats, recentBookings } = data;

  const statCards: Array<{
    title: string;
    value: number;
    icon: React.ComponentType<{ size?: number }>;
    color: StatCardColor;
  }> = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      color: "blue",
    },
    {
      title: "Tutors",
      value: stats.totalTutors,
      icon: FiUserCheck,
      color: "yellow",
    },
    {
      title: "Students",
      value: stats.totalStudents,
      icon: FiUserPlus,
      color: "green",
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: FiCalendar,
      color: "purple",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: FiFolder,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiActivity
            className="text-yellow-600 dark:text-yellow-400"
            size={20}
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Overview of your platform&apos;s performance and activities
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
            icon={stat.icon as IconType}
            color={stat.color} // No 'as any' needed now
          />
        ))}
      </div>

      {/* Recent Bookings */}
      <RecentBookings bookings={recentBookings} />
    </div>
  );
}
