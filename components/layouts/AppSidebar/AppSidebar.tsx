import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { role } from "@/constants/roles";
import type { AuthUser } from "@/types/auth";

interface Props {
  user: AuthUser;
}

export function AppSidebar({ user }: Props) {
  return (
    <Sidebar className="w-64 border-r border-gray-200">
      <SidebarHeader className="px-4 py-3 font-bold text-lg border-b border-gray-300">
        Dashboard
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2 mt-2 px-4">
          {/* Always show Home */}
          <Link href="/">Back to Home</Link>

          {/* Role-based links */}
          {user?.role === role.ADMIN && (
            <>
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/users">Users</Link>
              <Link href="/admin/bookings">Bookings</Link>
              <Link href="/admin/categories">Categories</Link>
            </>
          )}

          {user?.role === role.TUTOR && (
            <>
              <Link href="/tutor/dashboard">Dashboard</Link>
              <Link href="/tutor/availability">Availability</Link>
              <Link href="/tutor/profile">Profile</Link>
            </>
          )}

          {user?.role === role.STUDENT && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/bookings">My Bookings</Link>
              <Link href="/dashboard/profile">Profile</Link>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
