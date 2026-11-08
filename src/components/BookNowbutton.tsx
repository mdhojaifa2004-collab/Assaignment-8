
"use client";

import { useState } from "react";

type BookNowButtonProps = {
  studioId: string;
  studioName: string;
  category: string;
  location: string;
  date: string;
  time: string;
  hours: number;
  total: number;
  currency: string;
  onSuccess: () => void;
};

export default function BookNowButton({
  studioId,
  studioName,
  category,
  location,
  date,
  time,
  hours,
  total,
  currency,
  onSuccess,
}: BookNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!date) {
      alert("Please select a booking date.");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        studioId,
        studioName,
        category,
        location,
        date,
        time,
        hours,
        total,
        currency,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        "http://localhost:8000/my-bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      onSuccess();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking save করা যায়নি! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBooking}
      disabled={loading}
      className="w-full rounded-xl bg-[#ff263f] py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Booking..." : "Book Now"}
    </button>
  );
}
