"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { role } from "@/constants/roles";
import type { AuthUser } from "@/types/auth";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBookmark,
  FiUser,
  FiPieChart,
  FiFolder,
} from "react-icons/fi";

interface Props {
  user: AuthUser;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export function AppSidebar({ user }: Props) {
  const pathname = usePathname();

  const getNavItems = (): NavItem[] => {
    const commonItems: NavItem[] = [{ href: "/", label: "Home", icon: FiHome }];

    if (user?.role === role.ADMIN) {
      return [
        ...commonItems,
        { href: "/admin", label: "Dashboard", icon: FiPieChart },
        { href: "/admin/users", label: "Users", icon: FiUsers },
        { href: "/admin/bookings", label: "Bookings", icon: FiCalendar },
        { href: "/admin/categories", label: "Categories", icon: FiFolder },
      ];
    }

    if (user?.role === role.TUTOR) {
      return [
        ...commonItems,
        { href: "/tutor/dashboard", label: "Dashboard", icon: FiPieChart },
        {
          href: "/tutor/availability",
          label: "Availability",
          icon: FiCalendar,
        },
        { href: "/tutor/profile", label: "Profile", icon: FiUser },
      ];
    }

    // Student
    return [
      ...commonItems,
      { href: "/dashboard", label: "Dashboard", icon: FiPieChart },
      { href: "/dashboard/bookings", label: "My Bookings", icon: FiBookmark },
      { href: "/dashboard/profile", label: "Profile", icon: FiUser },
    ];
  };

  const navItems = getNavItems();

  return (
    <Sidebar className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* Header */}
      <SidebarHeader className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {user?.role
              ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
              : "Dashboard"}
          </span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 text-sm rounded-md
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-yellow-500"
                      : "text-gray-500 dark:text-gray-400"
                  }
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {user && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
