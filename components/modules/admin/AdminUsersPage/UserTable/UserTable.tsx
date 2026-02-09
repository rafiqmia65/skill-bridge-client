"use client";

import type { AdminUser } from "@/types/admin";

interface Props {
  users: AdminUser[];
  onToggleStatus: (userId: string) => void;
}

export default function UserTable({ users, onToggleStatus }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              {/* Status badge */}
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.isBanned
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {user.isBanned ? "BANNED" : "ACTIVE"}
                </span>
              </td>
              {/* Action button */}
              <td className="py-2 px-4">
                <button
                  onClick={() => onToggleStatus(user._id)}
                  className={`px-3 py-1 rounded transition hover:brightness-110 ${
                    user.isBanned
                      ? "bg-green-500 text-white dark:bg-green-600" // banned → show "Unban"
                      : "bg-red-500 text-white dark:bg-red-600" // active → show "Ban"
                  }`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
