import Link from "next/link";
import Image from "next/image";
import { RoleType } from "@/constants/roles";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

/**
 * Desktop NavLink component
 * @param href - link path
 * @param children - link text or elements
 * @param active - whether link is active
 */
export const NavLink = ({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={`font-medium transition ${
      active
        ? "text-yellow-400 dark:text-yellow-400 font-semibold"
        : "text-slate-700 dark:text-slate-200 hover:text-yellow-400"
    }`}
  >
    {children}
  </Link>
);

/**
 * MobileLink component (used in mobile menu)
 * @param href - link path
 * @param children - link text or elements
 * @param onClick - click handler to close mobile menu
 * @param active - whether link is active
 */
export const MobileLink = ({
  href,
  children,
  onClick,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block py-2 font-medium transition ${
      active
        ? "text-yellow-400 dark:text-yellow-400 font-semibold"
        : "text-slate-700 dark:text-slate-200 hover:text-yellow-400"
    }`}
  >
    {children}
  </Link>
);

/**
 * UserMenu component
 * Shows profile (image or icon), name, admin shortcut, and logout button
 * @param name - user's name
 * @param image - optional profile image
 * @param role - user role
 * @param onLogout - logout handler
 * @param mobile - is mobile menu
 * @param dashboardLink - dashboard path based on role
 * @param onClickClose - optional close handler for mobile
 */
export const UserMenu = ({
  name,
  image,
  role,
  onLogout,
  mobile = false,
  dashboardLink = "/dashboard",
  onClickClose,
}: {
  name: string;
  image?: string | null;
  role?: RoleType;
  onLogout: () => void;
  mobile?: boolean;
  dashboardLink?: string;
  onClickClose?: () => void;
}) => (
  <div className={`flex ${mobile ? "flex-col gap-2" : "gap-4 items-center"}`}>
    {/* Dashboard/Profile */}
    <Link
      href={dashboardLink}
      onClick={onClickClose}
      className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200 hover:text-yellow-400 transition"
    >
      {/* Show profile image or default icon */}
      {image ? (
        <Image
          src={image}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover"
          width={32}
          height={32}
        />
      ) : (
        <FaUserCircle className="w-8 h-8 text-slate-400 dark:text-slate-200" />
      )}
      <span>{name}</span>
    </Link>

    {/* Admin shortcut (desktop only) */}
    {role === "ADMIN" && !mobile && (
      <Link
        href="/admin"
        onClick={onClickClose}
        className="flex items-center gap-1 text-yellow-400 font-semibold hover:text-yellow-500 transition"
      >
        <FaTachometerAlt /> Admin
      </Link>
    )}

    {/* Logout button */}
    <button
      onClick={() => {
        onLogout();
        onClickClose?.();
      }}
      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold transition"
    >
      <FaSignOutAlt /> Logout
    </button>
  </div>
);
