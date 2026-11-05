
import Link from "next/link";

const studios = [
  {
    name: "Creative Music Studio",
    category: "Music Studio",
    location: "Dhaka, Bangladesh",
    price: "৳1,500 / hour",
    icon: "🎵",
  },
  {
    name: "Black Room Studio",
    category: "Recording Studio",
    location: "Narsingdi, Bangladesh",
    price: "৳1,200 / hour",
    icon: "🎙️",
  },
  {
    name: "Pixel Creative Space",
    category: "Photography Studio",
    location: "Dhaka, Bangladesh",
    price: "৳2,000 / hour",
    icon: "📸",
  },
];

export default function StudiosPage() {
  return (
    <main className="min-h-screen bg-[#0b0506] px-6 py-16 text-white">

      {/* Header */}
      <section className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#ff263f]">
          Discover Your Space
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          Explore <span className="text-[#ff263f]">Studios</span>
        </h1>

        <p className="mt-5 max-w-xl text-gray-400">
          Find the perfect studio for your creativity, music,
          photography, and professional projects.
        </p>

        {/* Search */}
        <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search studios..."
            className="flex-1 rounded-xl border border-gray-800 bg-[#151011] px-5 py-4 outline-none focus:border-[#ff263f]"
          />

          <button className="rounded-xl bg-[#ff263f] px-8 py-4 font-semibold transition hover:bg-red-700">
            Search
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-14 max-w-7xl">
        <div className="flex flex-wrap gap-3">
          {["All Studios", "Music", "Photography", "Recording", "Podcast"].map(
            (category) => (
              <button
                key={category}
                className="rounded-full border border-gray-800 px-5 py-2.5 text-sm transition hover:border-[#ff263f] hover:bg-[#ff263f]"
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      {/* Studios */}
      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Studios</h2>
          <span className="text-sm text-gray-400">
            {studios.length} Studios
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-800 bg-[#151011] p-6 transition hover:-translate-y-1 hover:border-[#ff263f]"
            >
              <div className="flex h-48 items-center justify-center rounded-xl bg-[#211013] text-7xl">
                {studio.icon}
              </div>

              <p className="mt-5 text-sm text-[#ff263f]">
                {studio.category}
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {studio.name}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                📍 {studio.location}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold text-[#ff263f]">
                  {studio.price}
                </span>

                <Link
                  href={`/studios/${index + 1}`}
                  className="rounded-lg bg-[#ff263f] px-4 py-2 text-sm font-semibold transition hover:bg-red-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
