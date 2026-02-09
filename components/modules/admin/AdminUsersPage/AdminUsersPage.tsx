"use client";

import { useEffect, useState } from "react";
import type { AdminUser } from "@/types/admin";
import UserTable from "./UserTable/UserTable";
import { adminUserService } from "@/services/admin/adminUser.service";
import { authClient } from "@/lib/auth-client";

export default function AdminUsersPage() {
  const session = authClient.useSession();
  const token = session?.data?.session?.token;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("You are not authorized to view this page.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await adminUserService.getAllUsers({ token });

        // map isBanned boolean to frontend status
        const mappedUsers = data.map((u) => ({
          ...u,
          status: u.isBanned ? "BANNED" : "ACTIVE",
        }));

        setUsers(mappedUsers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const toggleStatus = async (userId: string) => {
    if (!token) return;

    try {
      const updated = await adminUserService.updateUserStatus(userId, {
        token,
      });

      // updated.status is "ACTIVE" | "BANNED"
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? {
                ...u,
                status: updated.status,
                isBanned: updated.status === "BANNED",
              }
            : u,
        ),
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="text-gray-500 dark:text-gray-400">Loading users...</div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Admin Users
      </h1>
      <UserTable users={users} onToggleStatus={toggleStatus} />
    </div>
  );
}
