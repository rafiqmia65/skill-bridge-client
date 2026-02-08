import Link from "next/link";

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-slate-700 dark:text-slate-200 font-medium hover:text-yellow-400"
  >
    {children}
  </Link>
);

export const MobileLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-slate-700 dark:text-slate-200 font-medium block"
  >
    {children}
  </Link>
);

export const UserMenu = ({
  name,
  role,
  onLogout,
  mobile = false,
  onClickClose,
}: {
  name: string | null;
  role: string | null;
  onLogout: () => void;
  mobile?: boolean;
  onClickClose?: () => void;
}) => (
  <div className={`flex ${mobile ? "flex-col gap-2" : "gap-4 items-center"}`}>
    <span className="font-medium text-slate-700 dark:text-slate-200">
      {name}
    </span>
    {role === "ADMIN" && (
      <Link
        href="/admin"
        onClick={onClickClose}
        className="text-yellow-400 font-semibold"
      >
        Admin
      </Link>
    )}
    <button
      onClick={() => {
        onLogout();
        onClickClose?.();
      }}
      className="text-red-500 font-semibold"
    >
      Logout
    </button>
  </div>
);
