"use client";

import { authClient } from "@/lib/auth-client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { role } from "@/constants/roles";
import { AppSidebar } from "@/components/layouts/AppSidebar/AppSidebar";
import { ReactNode } from "react";
import { AuthUser } from "@/types/auth";
import Link from "next/link";
import { ModeToggle } from "@/components/layouts/ModeToggle/ModeToggle";

export default function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: ReactNode;
  tutor: ReactNode;
  student: ReactNode;
}) {
  const { data: sessionData } = authClient.useSession();
  const user = sessionData?.user as AuthUser;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        {/* Simple Header */}
        <header className="flex h-14 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 bg-white dark:bg-gray-950">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-gray-600 dark:text-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link
              href="/"
              className="text-lg font-medium text-gray-900 dark:text-white"
            >
              Skill<span className="text-yellow-500">Bridge</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          {user?.role === role.ADMIN
            ? admin
            : user?.role === role.TUTOR
              ? tutor
              : student}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
