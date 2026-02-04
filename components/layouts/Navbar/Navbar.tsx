"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle/ModeToggle";

type Role = "STUDENT" | "TUTOR" | "ADMIN" | null;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // later: replace with real auth state
  const isLoggedIn = false;
  const userRole: Role = null;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Skill<span className="text-yellow-400">Bridge</span>
        </Link>

        {/* Center: Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/tutors">Tutors</NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink href="/login">Login</NavLink>

              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Register
              </Link>
            </>
          ) : (
            <UserMenu role={userRole} />
          )}
        </div>

        {/* Right: Mode toggle + Mobile button */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent md:hidden"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
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
      className="font-medium text-muted-foreground hover:text-foreground transition-colors"
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
      className="rounded-md px-2 py-2 font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}

/**
 * Logged-in user menu
 * Role-based dashboard routing
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
        className="font-medium text-muted-foreground hover:text-foreground"
      >
        Dashboard
      </Link>

      <button className="rounded-md border border-destructive/30 px-3 py-1 text-sm font-medium text-destructive hover:bg-destructive/10">
        Logout
      </button>
    </div>
  );
}
