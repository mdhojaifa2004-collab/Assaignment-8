"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-[#ff263f] bg-[#0b0506] text-white">
      <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-5">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3"
        >
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

        {/* Desktop Navigation - Center */}
        <div className="hidden items-center justify-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                isActive(l.href)
                  ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold text-white"
                  : "rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-[#ff263f]/10 hover:text-[#ff263f]"
              }
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons - Right */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link
            href="/auth/sign-in"
            className="rounded-lg border border-[#ff263f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff263f]/10"
          >
            Sign In
          </Link>

          <Link
            href="/auth/sign-up"
            className="rounded-lg bg-[#ff263f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-2xl text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#2d1a1d] bg-[#0b0506] px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">

            {/* Mobile Navigation Links */}
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={
                  isActive(l.href)
                    ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold text-white"
                    : "rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-[#ff263f]/10 hover:text-[#ff263f]"
                }
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-3 flex gap-3 border-t border-[#2d1a1d] pt-4">
              <Link
                href="../sign-in"
                onClick={closeMenu}
                className="flex-1 rounded-lg border border-[#ff263f] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#ff263f]/10"
              >
                Sign In
              </Link>

              <Link
                href="../sign-up"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-[#ff263f] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}