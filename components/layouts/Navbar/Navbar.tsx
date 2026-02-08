"use client";

import { useState, useEffect } from "react";
import { NavLink, MobileLink, UserMenu } from "@/helper/navbarHelpers";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Role } from "@/types/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: Role } | null>(null);

  useEffect(() => {
    const session = authClient.getSession();
    if (session?.user)
      setUser({ name: session.user.name, role: session.user.role });
  }, []);

  const handleLogout = () => {
    authClient.signOut();
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-slate-900 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          Skill<span className="text-yellow-400">Bridge</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/tutors">Tutors</NavLink>
          {!user ? (
            <>
              <NavLink href="/login">Login</NavLink>
              <Link
                href="/register"
                className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold text-slate-900"
              >
                Register
              </Link>
            </>
          ) : (
            <UserMenu
              name={user.name}
              role={user.role}
              onLogout={handleLogout}
            />
          )}
        </div>

        {/* Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 py-4 border-t flex flex-col gap-2">
          <MobileLink href="/" onClick={() => setIsOpen(false)}>
            Home
          </MobileLink>
          <MobileLink href="/tutors" onClick={() => setIsOpen(false)}>
            Tutors
          </MobileLink>
          {!user ? (
            <>
              <MobileLink href="/login" onClick={() => setIsOpen(false)}>
                Login
              </MobileLink>
              <MobileLink href="/register" onClick={() => setIsOpen(false)}>
                Register
              </MobileLink>
            </>
          ) : (
            <UserMenu
              name={user.name}
              role={user.role}
              onLogout={handleLogout}
              mobile
              onClickClose={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </nav>
  );
}
