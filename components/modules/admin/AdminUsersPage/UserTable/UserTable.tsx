"use client";

import type { AdminUser } from "@/types/admin";
import {
  FiUser,
  FiToggleLeft,
  FiToggleRight,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

interface Props {
  users: AdminUser[];
  onToggleStatus: (userId: string) => void;
}

export default function UserTable({ users = [], onToggleStatus }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (users.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <FiUser className="text-gray-400 dark:text-gray-500" size={24} />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          No users found
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Users will appear here once they register
        </p>
      </div>
    );
  }

  const roleColors = {
    ADMIN:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    TUTOR:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    STUDENT: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  };

  return (
    <div>
      {/* Search Bar - Optional but useful for admin */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative max-w-xs">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-9 text-sm
                     bg-gray-50 dark:bg-gray-900 
                     border border-gray-200 dark:border-gray-800
                     rounded-md
                     focus:outline-none focus:border-yellow-500 
                     focus:ring-1 focus:ring-yellow-500
                     transition-colors"
          />
          <FiUser
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      roleColors[user.role as keyof typeof roleColors] ||
                      "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      user.isBanned
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    }`}
                  >
                    {user.isBanned ? "BANNED" : "ACTIVE"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onToggleStatus(user.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md
                        transition-colors ${
                          user.isBanned
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                        }`}
                    >
                      {user.isBanned ? (
                        <>
                          <FiToggleRight size={14} />
                          Unban
                        </>
                      ) : (
                        <>
                          <FiToggleLeft size={14} />
                          Ban
                        </>
                      )}
                    </button>

                    <Link
                      href={`/admin/users/${user.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium
                               text-gray-600 dark:text-gray-400
                               hover:text-yellow-600 dark:hover:text-yellow-400
                               transition-colors"
                    >
                      View
                      <FiChevronRight size={12} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="sm:hidden p-4 space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  user.isBanned
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                }`}
              >
                {user.isBanned ? "BANNED" : "ACTIVE"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    roleColors[user.role as keyof typeof roleColors] ||
                    "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleStatus(user.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md
                    ${
                      user.isBanned
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>

                <Link
                  href={`/admin/users/${user.id}`}
                  className="px-3 py-1.5 text-xs font-medium
                           bg-gray-100 dark:bg-gray-800
                           text-gray-700 dark:text-gray-300
                           rounded-md"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No users matching {searchTerm}
            </p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-500">
        Showing {filteredUsers.length} of {users.length} users
        {searchTerm && ` (filtered)`}
      </div>
    </div>
  );
}
