"use client";

import Link from "next/link";
import { useState } from "react";

type Role = "STUDENT" | "TUTOR" | "ADMIN" | null;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // later: replace with real auth state
  const isLoggedIn = false;
  const userRole: Role = null;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          Skill<span className="text-yellow-400">Bridge</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/tutors">Tutors</NavLink>

          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-medium text-slate-600 hover:text-slate-900"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Register
              </Link>
            </div>
          ) : (
            <UserMenu role={userRole} />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <MobileLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileLink>

            <MobileLink href="/tutors" onClick={() => setIsOpen(false)}>
              Tutors
            </MobileLink>

            {!isLoggedIn ? (
              <>
                <MobileLink href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </MobileLink>

                <MobileLink href="/register" onClick={() => setIsOpen(false)}>
                  Register
                </MobileLink>
              </>
            ) : (
              <UserMenu role={userRole} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------------- helpers ---------------- */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-slate-600 hover:text-slate-900"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-2 py-2 font-medium text-slate-700 hover:bg-slate-100"
    >
      {children}
    </Link>
  );
}

/**
 * Logged-in user menu
 * Role-based dashboard routing ready
 */
function UserMenu({ role }: { role: Role }) {
  const dashboardRoute =
    role === "ADMIN"
      ? "/admin"
      : role === "TUTOR"
        ? "/tutor/dashboard"
        : "/dashboard";

  return (
    <div className="flex items-center gap-4">
      <Link
        href={dashboardRoute}
        className="font-medium text-slate-600 hover:text-slate-900"
      >
        Dashboard
      </Link>

      <button className="rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50">
        Logout
      </button>
    </div>
  );
}
