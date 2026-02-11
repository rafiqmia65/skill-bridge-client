import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-800 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Logo */}
        <div className="font-bold text-2xl">
          Skill
          <span className="text-yellow-400 dark:text-yellow-300">Bridge</span>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-6 text-lg">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link href="/tutors" className="hover:text-yellow-400 transition">
            Tutors
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm md:text-base text-gray-400 mt-4 md:mt-0">
          &copy; 2026 SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
