"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Studio = {
  _id?: string;
  title: string;
  category: string;
  hourlyRate: number;
  rating: number;
  location: string;
  imageUrl?: string;
};

const slides = [
  {
    image: "/images/hero-1.svg",
    title: "Find the room where your next frame comes alive",
    text: "Photo cyc walls, sound stages and podcast rooms you can book by the hour.",
  },
  {
    image: "/images/hero-2.svg",
    title: "Record loud. Rent quiet.",
    text: "Music suites and podcast booths with the gear already set up.",
  },
  {
    image: "/images/hero-3.svg",
    title: "Got a spare studio? Put it to work.",
    text: "List your space, set your rate and approve bookings from one dashboard.",
  },
];

const fallbackStudios: Studio[] = [
  { title: "Redline Cyc Wall", category: "Photo Studios", hourlyRate: 45, rating: 4.9, location: "Lahore Warehouse District" },
  { title: "Blackbox Sound Stage", category: "Sound Stages", hourlyRate: 120, rating: 4.8, location: "Dhaka, Tejgaon" },
  { title: "The Quiet Booth", category: "Podcast Rooms", hourlyRate: 28, rating: 4.7, location: "Narsingdi Town Center" },
  { title: "Crimson Tape Suite", category: "Music Suites", hourlyRate: 60, rating: 4.9, location: "Chattogram, GEC Circle" },
  { title: "Ink and Iron Workshop", category: "Art Workshops", hourlyRate: 22, rating: 4.6, location: "Dhaka, Dhanmondi" },
  { title: "Night Reel Loft", category: "Photo Studios", hourlyRate: 38, rating: 4.5, location: "Sylhet, Zindabazar" },
];

const categories = [
  { name: "Photo Studios", text: "Cyc walls and daylight rooms" },
  { name: "Sound Stages", text: "Film stages with rigging" },
  { name: "Podcast Rooms", text: "Treated rooms, mics ready" },
  { name: "Music Suites", text: "Recording and rehearsal" },
  { name: "Art Workshops", text: "Messy-friendly work space" },
];

const steps = [
  { title: "Discover spaces", text: "Filter by category, city and price." },
  { title: "Select shoot hours", text: "Pick a date and your start time." },
  { title: "Book instantly", text: "Clashes with confirmed slots are blocked." },
  { title: "Create and produce", text: "Show up, shoot, and leave a review." },
];

const guarantees = [
  { title: "Liability protection", text: "Damage cover on every confirmed booking." },
  { title: "Verified profiles", text: "Hosts and creators confirm identity first." },
  { title: "Equipment safety", text: "Gear checklists before and after each session." },
  { title: "24/7 host support", text: "A real person answers, day or night." },
];

const gradients = [
  "from-[#d90f23] to-[#1a0507]",
  "from-[#0b0405] to-[#d90f23]",
  "from-[#f23b4c] to-[#2a0a0e]",
  "from-[#7a0612] to-[#000000]",
  "from-[#ff5565] to-[#3a0b11]",
  "from-[#1a0507] to-[#ff2a3d]",
];

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [studios, setStudios] = useState<Studio[]>(fallbackStudios);

  // Hero slider autoplay
  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Featured studios from the server (falls back to the list above)
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    if (!api) return;
    fetch(`${api}/api/studios?limit=6&sort=rating`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.studios;
        if (list?.length) setStudios(list.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0506] text-white">
      {/* Hero Slider */}
      <section className="relative overflow-hidden border-b border-[#2d1a1d]">
        {slides.map((s, i) => (
          <div
            key={s.title}
            className={`${i === active ? "flex" : "hidden"} relative min-h-[520px] items-center bg-cover bg-center px-6 py-20`}
            style={{ backgroundImage: `url(${s.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0405] via-[#0b0405]/70 to-transparent" />
            <div className="relative mx-auto w-full max-w-7xl">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-7xl">
                {s.title}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-gray-300">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/studios"
                  className="rounded-xl bg-[#ff263f] px-7 py-3 font-semibold transition hover:bg-red-700"
                >
                  Explore Studios
                </Link>
                <Link
                  href="/studios"
                  className="rounded-xl border border-white px-7 py-3 font-semibold transition hover:bg-white/10"
                >
                  Host Your Space
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 w-9 rounded-full transition ${i === active ? "bg-[#ff263f]" : "bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Studios */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Featured studios</h2>
          <p className="mt-2 text-gray-400">Top-rated rooms booked most this month.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((s, i) => (
              <article
                key={s._id ?? s.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-[#151011]"
              >
                <div
                  className={`relative h-48 bg-gradient-to-br ${gradients[i % gradients.length]}`}
                  style={s.imageUrl ? { backgroundImage: `url(${s.imageUrl})`, backgroundSize: "cover" } : undefined}
                >
                  <span className="absolute left-3 top-3 rounded-md bg-black px-3 py-1 text-xs font-bold">
                    {s.category}
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-[#ff263f] px-2.5 py-1 text-xs font-bold">
                    ★ {s.rating}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-5">
                  <h3 className="min-h-[56px] text-xl font-bold">{s.title}</h3>
                  <p className="text-sm text-gray-400">{s.location}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="text-2xl font-extrabold">
                      ${s.hourlyRate}
                      <span className="text-sm font-normal text-gray-500"> / hr</span>
                    </p>
                    <Link
                      href={s._id ? `/studios/${s._id}` : "/studios"}
                      className="rounded-lg bg-[#ff263f] px-4 py-2 text-sm font-semibold transition hover:bg-red-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by category */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Browse by category</h2>
          <p className="mt-2 text-gray-400">Pick a type of space and we will filter the list for you.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/studios?category=${encodeURIComponent(c.name)}`}
                className="group rounded-xl border-l-4 border-[#ff263f] bg-[#151011] p-5 transition hover:bg-[#ff263f]"
              >
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-gray-400 group-hover:text-white">{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">How booking works</h2>
          <p className="mt-2 text-gray-400">From search to set in four moves.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-gray-800 bg-[#151011] p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff263f] text-lg font-extrabold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host guarantee */}
      <section className="bg-[#11090b] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Host guarantee and creator support</h2>
          <p className="mt-2 text-gray-400">Every booking is covered, so both sides can focus on the work.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="rounded-2xl border border-[#3a1c20] bg-[#0b0506] p-6">
                <h3 className="text-lg font-bold text-[#ff5565]">{g.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-[#ff263f] bg-black px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold">
              Studio<span className="text-[#ff263f]">Space</span>
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              We help creators find the right room, book it in minutes and get back to making things.
            </p>
          </div>

          <div>
            <h4 className="font-bold">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/studios" className="hover:text-white">Explore Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold">Popular categories</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              {["Photo Studios", "Podcast Rooms", "Music Suites", "Sound Stages"].map((c) => (
                <li key={c}>
                  <Link href={`/studios?category=${encodeURIComponent(c)}`} className="hover:text-white">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">Newsletter</h4>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email"
                className="w-full rounded-lg border border-gray-800 bg-[#151011] px-3 py-2 text-sm outline-none focus:border-[#ff263f]"
              />
              <button className="rounded-lg bg-[#ff263f] px-4 py-2 text-sm font-semibold hover:bg-red-700">
                Join
              </button>
            </form>
            <a href="https://x.com" aria-label="X" className="mt-4 inline-block text-gray-400 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7 3.9H5L17 20z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-5 text-sm text-gray-500">
          © 2026 StudioSpace. Use of the platform means you accept our terms and privacy notice.
        </p>
      </footer>
    </main>
  );
}