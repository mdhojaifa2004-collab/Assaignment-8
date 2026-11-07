"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { studios as exploreStudios } from "../../../data/srudios";
import CategoryArt, { getKind } from "../../../components/CategoryArt";
import { getRating } from "@/components/rating";
import { addBooking } from "../../../components/bookingStore";
type Detail = {
    id: string;
    name: string;
    category: string;
    location: string;
    rate: number;
    currency: string;
    rating?: number;
    imageUrl?: string;
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

// হোম পেজের ডিফল্ট স্টুডিও (হোম পেজের fallbackStudios এর মতোই)
const homeStudios = [
    { title: "Redline Cyc Wall", category: "Photo Studios", hourlyRate: 45, rating: 4.9, location: "Lahore Warehouse District" },
    { title: "Blackbox Sound Stage", category: "Sound Stages", hourlyRate: 120, rating: 4.8, location: "Dhaka, Tejgaon" },
    { title: "The Quiet Booth", category: "Podcast Rooms", hourlyRate: 28, rating: 4.7, location: "Narsingdi Town Center" },
    { title: "Crimson Tape Suite", category: "Music Suites", hourlyRate: 60, rating: 4.9, location: "Chattogram, GEC Circle" },
    { title: "Ink and Iron Workshop", category: "Art Workshops", hourlyRate: 22, rating: 4.6, location: "Dhaka, Dhanmondi" },
    { title: "Night Reel Loft", category: "Photo Studios", hourlyRate: 38, rating: 4.5, location: "Sylhet, Zindabazar" },
];

function findLocal(id: string): Detail | null {
    const fromExplore = exploreStudios.find((s) => slugify(s.name) === id);
    if (fromExplore) {
        const priceText = String(fromExplore.price);
        return {
            id,
            name: fromExplore.name,
            category: fromExplore.category,
            location: fromExplore.location,
            rate: parseInt(priceText.replace(/[^0-9]/g, ""), 10) || 0,
            currency: priceText.includes("৳") ? "৳" : "$",
            rating: getRating(fromExplore.name),
        };
    }

    const fromHome = homeStudios.find((s) => slugify(s.title) === id);
    if (fromHome) {
        return {
            id,
            name: fromHome.title,
            category: fromHome.category,
            location: fromHome.location,
            rate: fromHome.hourlyRate,
            currency: "$",
            rating: fromHome.rating,
        };
    }

    return null;
}

const amenitiesByKind: Record<string, string[]> = {
    photo: ["Cyc wall & backdrops", "Studio strobes & softboxes", "Changing room", "High-speed Wi-Fi", "Air conditioning", "Props included"],
    stage: ["Lighting rigging", "Green screen", "Sound-treated walls", "Green room", "Power backup", "Loading access"],
    podcast: ["Pro microphones", "Acoustic treatment", "Mixer & headphones", "Video-ready setup", "Air conditioning", "Free refreshments"],
    music: ["Sound-proof rooms", "Instruments on request", "Mixing console", "Sound engineer", "Vocal booth", "Power backup"],
    art: ["Easels & tables", "Natural light", "Messy-friendly floor", "Storage racks", "Sink & water access", "Free parking"],
};

const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

export default function StudioDetailsPage() {
    const params = useParams<{ id: string }>();
    const id = decodeURIComponent(String(params.id));

    const local = useMemo(() => findLocal(id), [id]);
    const [studio, setStudio] = useState<Detail | null>(local);
    const [loading, setLoading] = useState(!local);

    const [date, setDate] = useState("");
    const [time, setTime] = useState("10:00");
    const [hours, setHours] = useState(2);
    const [booked, setBooked] = useState(false);


    const [showToast, setShowToast] = useState(false);

    // টোস্ট ৪ সেকেন্ড পর নিজে থেকে বন্ধ হবে
    useEffect(() => {
        if (!showToast) return;
        const timer = setTimeout(() => setShowToast(false), 4000);
        return () => clearTimeout(timer);
    }, [showToast]);

    // লোকাল ডাটায় না পেলে সার্ভার থেকে খোঁজা (_id দিয়ে)
    useEffect(() => {
        if (local) {
            setStudio(local);
            setLoading(false);
            return;
        }
        const api = process.env.NEXT_PUBLIC_API_URL;
        if (!api) {
            setLoading(false);
            return;
        }
        fetch(`${api}/api/studios/${id}`)
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((data) => {
                const s = data.studio ?? data;
                setStudio({
                    id,
                    name: s.title ?? s.name,
                    category: s.category,
                    location: s.location,
                    rate: s.hourlyRate ?? 0,
                    currency: "$",
                    rating: s.rating,
                    imageUrl: s.imageUrl,
                });
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id, local]);

    if (loading) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#0b0506] text-gray-400">
                Loading studio...
            </main>
        );
    }

    if (!studio) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#0b0506] px-6 text-white">
                <div className="text-center">
                    <p className="text-5xl">🔍</p>
                    <h1 className="mt-4 text-2xl font-bold">Studio not found</h1>
                    <p className="mt-2 text-gray-400">This studio may have been removed or the link is wrong.</p>
                    <Link
                        href="/studios"
                        className="mt-6 inline-block rounded-xl bg-[#ff263f] px-6 py-3 font-semibold transition hover:bg-red-700"
                    >
                        Back to Studios
                    </Link>
                </div>
            </main>
        );
    }

    const total = studio.rate * hours;
    const amenities = amenitiesByKind[getKind(studio.category)];

    return (
        <main className="min-h-screen bg-[#0b0506] px-6 py-10 text-white">
            {/* Toast */}
            {showToast && (
                <div
                    role="status"
                    className="toast-in fixed right-6 top-6 z-50 flex w-[calc(100%-3rem)] max-w-sm items-start gap-3 rounded-xl border border-[#ff263f] bg-[#151011] p-4 shadow-2xl shadow-black/60"
                >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ff263f] font-bold">
                        ✓
                    </span>
                    <div className="flex-1">
                        <p className="font-bold">Booking confirmed!</p>
                        <p className="mt-0.5 text-sm text-gray-400">
                            {studio.name} · {date} at {time} · {hours} hour{hours > 1 ? "s" : ""}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowToast(false)}
                        aria-label="Close"
                        className="text-gray-500 transition hover:text-white"
                    >
                        ✕
                    </button>
                </div>
            )}

            <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .toast-in { animation: toastIn 0.3s ease-out; }
      `}</style>

            <div className="mx-auto max-w-7xl">


                {/* Back link */}
                <Link href="/studios" className="text-sm text-gray-400 transition hover:text-[#ff263f]">
                    ← Back to studios
                </Link>

                <div className="mt-6 grid gap-8 lg:grid-cols-3">
                    {/* Left: details */}
                    <div className="lg:col-span-2">
                        {/* Picture */}
                        <div className="h-72 overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-[#4a0f1a] to-[#120708] md:h-96">
                            {studio.imageUrl ? (
                                <div
                                    className="h-full w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${studio.imageUrl})` }}
                                />
                            ) : (
                                <div className="h-full w-full p-6">
                                    <CategoryArt category={studio.category} />
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <span className="rounded-md bg-black px-3 py-1 text-xs font-bold">{studio.category}</span>
                            {studio.rating && (
                                <span className="rounded-md bg-[#ff263f] px-2.5 py-1 text-xs font-bold">★ {studio.rating}</span>
                            )}
                        </div>

                        <h1 className="mt-4 text-3xl font-bold md:text-5xl">{studio.name}</h1>
                        <p className="mt-3 text-gray-400">📍 {studio.location}</p>

                        {/* About */}
                        <section className="mt-10">
                            <h2 className="text-2xl font-bold">About this space</h2>
                            <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                                {studio.name} is a professional {studio.category.toLowerCase()} in {studio.location}. The space is
                                clean, well equipped and ready to book by the hour, so you can walk in and start creating right away.
                                Perfect for solo creators, small teams and client projects.
                            </p>
                        </section>

                        {/* Amenities */}
                        <section className="mt-10">
                            <h2 className="text-2xl font-bold">What is included</h2>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {amenities.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-gray-800 bg-[#151011] px-4 py-3 text-sm"
                                    >
                                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ff263f] text-xs font-bold">✓</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Rules */}
                        <section className="mt-10">
                            <h2 className="text-2xl font-bold">Studio rules</h2>
                            <ul className="mt-3 space-y-2 text-sm text-gray-400">
                                <li>• Minimum booking is 1 hour.</li>
                                <li>• Free cancellation up to 24 hours before your session.</li>
                                <li>• Please leave the space clean and report any damage.</li>
                                <li>• Outside guests must be listed when booking.</li>
                            </ul>
                        </section>
                    </div>

                    {/* Right: booking card */}
                    <aside className="h-fit rounded-2xl border border-gray-800 bg-[#151011] p-6 lg:sticky lg:top-6">
                        <p className="text-3xl font-extrabold text-[#ff263f]">
                            {studio.currency}
                            {studio.rate.toLocaleString()}
                            <span className="text-sm font-normal text-gray-500"> / hour</span>
                        </p>

                        {booked ? (
                            <div className="mt-6 rounded-xl border border-[#ff263f] bg-[#ff263f]/10 p-5 text-center">
                                <p className="text-3xl">🎉</p>
                                <p className="mt-2 font-bold">Booking request sent!</p>
                                <p className="mt-1 text-sm text-gray-400">
                                    {date} at {time} for {hours} hour{hours > 1 ? "s" : ""}.
                                </p>
                                <button
                                    onClick={() => setBooked(false)}
                                    className="mt-4 text-sm text-[#ff263f] underline"
                                >
                                    Book another time
                                </button>
                            </div>
                        ) : (
                            <form
                                className="mt-6 space-y-4"
                                onSubmit={async (e) => {
                                    e.preventDefault();

                                    try {
                                        const bookingData = {
                                            studioId: studio.id,
                                            studioName: studio.name,
                                            category: studio.category,
                                            location: studio.location,
                                            date,
                                            time,
                                            hours,
                                            total,
                                            currency: studio.currency,
                                            createdAt: new Date().toISOString(),
                                        };

                                        const response = await fetch("http://localhost:8000/my-bookings", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(bookingData),
                                        });

                                        if (!response.ok) {
                                            throw new Error("Booking failed");
                                        }

                                        setBooked(true);
                                        setShowToast(true);
                                    } catch (error) {
                                        console.error("Booking error:", error);
                                        alert("Booking save করা যায়নি!");
                                    }
                                }}
                            >
                                <div>
                                    <label className="mb-1 block text-sm text-gray-400">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full rounded-xl border border-gray-800 bg-[#0b0506] px-4 py-3 outline-none focus:border-[#ff263f]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-400">Start time</label>
                                    <select
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full rounded-xl border border-gray-800 bg-[#0b0506] px-4 py-3 outline-none focus:border-[#ff263f]"
                                    >
                                        {timeSlots.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-400">Hours</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setHours((h) => Math.max(1, h - 1))}
                                            className="h-11 w-11 rounded-xl border border-gray-800 text-xl transition hover:border-[#ff263f]"
                                        >
                                            −
                                        </button>
                                        <span className="w-10 text-center text-lg font-bold">{hours}</span>
                                        <button
                                            type="button"
                                            onClick={() => setHours((h) => Math.min(12, h + 1))}
                                            className="h-11 w-11 rounded-xl border border-gray-800 text-xl transition hover:border-[#ff263f]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-xl font-bold">
                                        {studio.currency}
                                        {total.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-[#ff263f] py-3 font-semibold transition hover:bg-red-700"
                                >
                                    Book Now
                                </button>
                            </form>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}