"use client";

import { useEffect, useState } from "react";
import { adminOverviewService } from "@/services/adminOverview.service";
import StatCard from "./StatCard/StatCard";
import RecentBookings from "./RecentBookings/RecentBookings";
import { authClient } from "@/lib/auth-client";
import type { AdminOverviewResponse } from "@/types/admin";

export default function Statistics() {
  const session = authClient.useSession();

  const [data, setData] = useState<AdminOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.data?.session?.token) {
      //  setTimeout to avoid synchronous setState in effect
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return null;

  const { stats, recentBookings } = data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Users" value={stats.totalUsers} />
        <StatCard title="Tutors" value={stats.totalTutors} />
        <StatCard title="Students" value={stats.totalStudents} />
        <StatCard title="Bookings" value={stats.totalBookings} />
        <StatCard title="Categories" value={stats.totalCategories} />
      </div>

      <RecentBookings bookings={recentBookings} />
    </div>
  );
}
