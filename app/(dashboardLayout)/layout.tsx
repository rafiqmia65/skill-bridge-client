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
  const { data: sessionData } = authClient.useSession(); // Auth session
  const user = sessionData?.user as AuthUser; // Cast to UserWithRole

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        <header className="flex h-16 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger />

          <div className="flex items-center justify-between gap-5">
            <ModeToggle />{" "}
            <Link
              href="/"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              Skill<span className="text-yellow-400">Bridge</span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
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
