"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { AdminUser } from "@/types/admin";
import UserTable from "./UserTable/UserTable";
import { adminUserService } from "@/services/admin/adminUser.service";
import { authClient } from "@/lib/auth-client";

export default function AdminUsersPage() {
  const session = authClient.useSession();
  const token = session?.data?.session?.token ?? "";

  // IMPORTANT: default empty array
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

        // extra safety
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

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Admin Users
      </h1>

      {/* users ALWAYS array */}
      <UserTable users={users} onToggleStatus={toggleStatus} />
    </div>
  );
}
