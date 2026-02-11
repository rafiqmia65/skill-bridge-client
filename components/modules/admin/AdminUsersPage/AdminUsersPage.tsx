"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { AdminUser } from "@/types/admin";
import UserTable from "./UserTable/UserTable";
import { adminUserService } from "@/services/admin/adminUser.service";
import { authClient } from "@/lib/auth-client";
import { FiUsers, FiUserCheck, FiUserX, FiActivity } from "react-icons/fi";

export default function AdminUsersPage() {
  const session = authClient.useSession();
  const token = session?.data?.session?.token;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await adminUserService.getAllUsers({ token });
        setUsers(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch users");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const toggleStatus = async (userId: string) => {
    if (!token) return;

    const currentUser = users.find((u) => u.id === userId);
    if (!currentUser) return;

    const newStatus = currentUser.isBanned ? "ACTIVE" : "BANNED";

    try {
      const res = await adminUserService.updateUserStatus(userId, {
        token,
        status: newStatus,
      });

      setUsers((prev) => prev.map((u) => (u.id === userId ? res : u)));
      toast.success(`User is now ${res.isBanned ? "BANNED" : "ACTIVE"}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to update user");
      }
    }
  };

  // Stats calculation
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => !u.isBanned).length;
  const bannedUsers = users.filter((u) => u.isBanned).length;
  const tutorsCount = users.filter((u) => u.role === "TUTOR").length;
  const studentsCount = users.filter((u) => u.role === "STUDENT").length;

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
                className="h-12 bg-gray-200 dark:bg-gray-800 rounded"
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
      title: "Total Users",
      value: totalUsers,
      icon: FiUsers,
      color: "blue" as const,
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: FiUserCheck,
      color: "green" as const,
    },
    {
      title: "Banned Users",
      value: bannedUsers,
      icon: FiUserX,
      color: "red" as const,
    },
    {
      title: "Tutors",
      value: tutorsCount,
      icon: FiUserCheck,
      color: "yellow" as const,
    },
    {
      title: "Students",
      value: studentsCount,
      icon: FiUsers,
      color: "purple" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
          <FiUsers className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage and monitor all platform users
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

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiActivity
                className="text-gray-500 dark:text-gray-400"
                size={16}
              />
              <h2 className="font-medium text-gray-900 dark:text-white">
                All Users
              </h2>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Total: {totalUsers} users
            </span>
          </div>
        </div>

        <UserTable users={users} onToggleStatus={toggleStatus} />
      </div>
    </div>
  );
}

// Local StatCard component with proper typing
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
