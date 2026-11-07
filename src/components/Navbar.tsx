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

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-[#ff263f] bg-[#0b0506] text-white">
      <div className="mx-auto flex h-[62px] max-w-[1200px] items-center justify-between px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
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
          <span className="text-[22px] font-bold tracking-tight">StudioSpace</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                isActive(l.href)
                  ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold"
                  : "rounded-lg px-4 py-3 text-sm transition hover:text-[#ff263f]"
              }
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
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

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#2d1a1d] bg-[#0b0506] px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  isActive(l.href)
                    ? "rounded-xl bg-[#ff263f] px-4 py-3 text-sm font-semibold"
                    : "rounded-lg px-4 py-3 text-sm hover:text-[#ff263f]"
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}