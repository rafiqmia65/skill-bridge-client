"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { RoleType, role } from "@/constants/roles";
import { NavLink, MobileLink, UserMenu } from "@/helper/navbarHelpers";
import {
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaBars,
} from "react-icons/fa";
import { ModeToggle } from "../ModeToggle/ModeToggle";

// User type with optional role and image
type UserWithRole = {
  id: string;
  name: string;
  email: string;
  role?: RoleType;
  image?: string | null;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state
  const pathname = usePathname(); // Current route for active link highlight

  const { data: sessionData, isPending } = authClient.useSession(); // Auth session
  const user = sessionData?.user as UserWithRole | undefined; // Cast to UserWithRole

  // Logout handler
  const handleLogout = async () => await authClient.signOut();

  // Role-based dashboard link
  const dashboardLink =
    user?.role === role.ADMIN
      ? "/admin"
      : user?.role === role.TUTOR
        ? "/tutor/dashboard"
        : "/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-slate-900 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-slate-900 dark:text-white"
        >
          Skill<span className="text-yellow-400">Bridge</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/tutors" active={pathname === "/tutors"}>
            Tutors
          </NavLink>

          {/* Dashboard NavLink for logged-in users */}
          {user && (
            <NavLink
              href={dashboardLink}
              active={pathname.startsWith(dashboardLink)}
            >
              <FaTachometerAlt className="inline mr-1" /> Dashboard
            </NavLink>
          )}

          {/* Auth buttons */}
          {isPending ? (
            <span className="text-sm text-slate-500">Loading...</span>
          ) : !user ? (
            <>
              <NavLink href="/login" active={pathname === "/login"}>
                <FaSignInAlt className="inline mr-1" /> Login
              </NavLink>
              <Link
                href="/register"
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 rounded-lg font-semibold text-slate-900"
              >
                <FaUserPlus /> Register
              </Link>
            </>
          ) : (
            <UserMenu
              name={user.name}
              image={user.image}
              role={user.role || role.STUDENT}
              onLogout={handleLogout}
              dashboardLink={dashboardLink}
            />
          )}

          {/* Mode toggle for desktop */}
          <ModeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mode toggle for mobile */}
          <ModeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 p-2 text-2xl text-slate-700 dark:text-slate-200 hover:text-yellow-400 transition rounded-md"
            aria-label="Toggle mobile menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-4 border-t flex flex-col gap-2 bg-white dark:bg-slate-900">
          <MobileLink
            href="/"
            onClick={() => setIsOpen(false)}
            active={pathname === "/"}
          >
            Home
          </MobileLink>
          <MobileLink
            href="/tutors"
            onClick={() => setIsOpen(false)}
            active={pathname === "/tutors"}
          >
            Tutors
          </MobileLink>

          {/* Dashboard link for mobile */}
          {user && (
            <MobileLink
              href={dashboardLink}
              onClick={() => setIsOpen(false)}
              active={pathname.startsWith(dashboardLink)}
            >
              <FaTachometerAlt className="inline mr-1" /> Dashboard
            </MobileLink>
          )}

          {/* Auth buttons for mobile */}
          {!user ? (
            <>
              <MobileLink
                href="/login"
                onClick={() => setIsOpen(false)}
                active={pathname === "/login"}
              >
                <FaSignInAlt className="inline mr-1" /> Login
              </MobileLink>
              <MobileLink href="/register" onClick={() => setIsOpen(false)}>
                <FaUserPlus className="inline mr-1" /> Register
              </MobileLink>
            </>
          ) : (
            <UserMenu
              name={user.name}
              image={user.image}
              role={user.role || role.STUDENT}
              onLogout={handleLogout}
              mobile
              dashboardLink={dashboardLink}
              onClickClose={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </nav>
  );
}
