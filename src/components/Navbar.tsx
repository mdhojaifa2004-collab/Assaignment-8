
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b-2 border-[#ff263f] bg-[#0b0506] text-white">
      <div className="mx-auto flex h-[62px] max-w-[1200px] items-center justify-between px-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff263f"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M4.5 7.5 9 9l1.5-4.5" />
            <path d="m14 4 1 4 4.5 1" />
            <path d="m19 15-4-1-2 5" />
            <path d="m5 16 3-2 1 5" />
          </svg>

          <span className="text-[22px] font-bold tracking-tight">
            StudioSpace
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold"
          >
            Home
          </Link>

          <Link
            href="/studios"
            className="rounded-lg px-4 py-3 text-sm transition hover:text-[#ff263f]"
          >
            Explore Studios
          </Link>

          <Link
            href="/how-it-works"
            className="rounded-lg px-4 py-3 text-sm transition hover:text-[#ff263f]"
          >
            How It Works
          </Link>

          <Link
            href="/about"
            className="rounded-lg px-4 py-3 text-sm transition hover:text-[#ff263f]"
          >
            About Us
          </Link>

          {/* Theme Button */}
          <button
            type="button"
            aria-label="Toggle theme"
            className="ml-4 flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-gray-600 text-lg hover:border-[#ff263f]"
          >
            ◐
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="ml-2 rounded-xl border border-gray-500 px-4 py-2.5 text-sm font-semibold transition hover:border-[#ff263f]"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            href="/register"
            className="ml-2 rounded-xl bg-[#ff263f] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#e51e35]"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          className="text-2xl text-white md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
