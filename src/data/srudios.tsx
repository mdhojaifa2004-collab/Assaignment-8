export type Studio = {
  name: string;
  category:
    | "Music Studio"
    | "Recording Studio"
    | "Photography Studio"
    | "Podcast Studio";
  location: string;
  price: string;
  icon: string;
};

export const studios: Studio[] = [
  // ---------- Music Studio (14) ----------
  { name: "Creative Music Studio", category: "Music Studio", location: "Dhaka, Bangladesh", price: "৳1,500 / hour", icon: "🎵" },
  { name: "Rhythm House", category: "Music Studio", location: "Gulshan, Dhaka", price: "৳1,800 / hour", icon: "🎵" },
  { name: "Sur Sagor Studio", category: "Music Studio", location: "Dhanmondi, Dhaka", price: "৳1,300 / hour", icon: "🎵" },
  { name: "Beat Factory", category: "Music Studio", location: "Uttara, Dhaka", price: "৳1,600 / hour", icon: "🎵" },
  { name: "Melody Lab", category: "Music Studio", location: "Mirpur, Dhaka", price: "৳1,000 / hour", icon: "🎵" },
  { name: "Tune Tank", category: "Music Studio", location: "Chattogram, Bangladesh", price: "৳1,400 / hour", icon: "🎵" },
  { name: "Sylhet Sound Hub", category: "Music Studio", location: "Sylhet, Bangladesh", price: "৳1,100 / hour", icon: "🎵" },
  { name: "Raag Room", category: "Music Studio", location: "Rajshahi, Bangladesh", price: "৳900 / hour", icon: "🎵" },
  { name: "Bass Box Studio", category: "Music Studio", location: "Banani, Dhaka", price: "৳2,200 / hour", icon: "🎵" },
  { name: "Jam Pad Studio", category: "Music Studio", location: "Khulna, Bangladesh", price: "৳800 / hour", icon: "🎵" },
  { name: "Chorus Corner", category: "Music Studio", location: "Cumilla, Bangladesh", price: "৳700 / hour", icon: "🎵" },
  { name: "Harmony Hall", category: "Music Studio", location: "Narsingdi, Bangladesh", price: "৳900 / hour", icon: "🎵" },
  { name: "Echo Nation Music Space", category: "Music Studio", location: "Mohammadpur, Dhaka", price: "৳1,700 / hour", icon: "🎵" },
  { name: "Strings & Keys", category: "Music Studio", location: "Barishal, Bangladesh", price: "৳750 / hour", icon: "🎵" },

  // ---------- Recording Studio (14) ----------
  { name: "Black Room Studio", category: "Recording Studio", location: "Narsingdi, Bangladesh", price: "৳1,200 / hour", icon: "🎙️" },
  { name: "Red Wave Records", category: "Recording Studio", location: "Gulshan, Dhaka", price: "৳2,500 / hour", icon: "🎙️" },
  { name: "Studio 47", category: "Recording Studio", location: "Banani, Dhaka", price: "৳3,000 / hour", icon: "🎙️" },
  { name: "Vocal Vault", category: "Recording Studio", location: "Dhanmondi, Dhaka", price: "৳1,900 / hour", icon: "🎙️" },
  { name: "Mix Master Studio", category: "Recording Studio", location: "Uttara, Dhaka", price: "৳2,000 / hour", icon: "🎙️" },
  { name: "Sound Cave", category: "Recording Studio", location: "Chattogram, Bangladesh", price: "৳1,500 / hour", icon: "🎙️" },
  { name: "Waveform Studio", category: "Recording Studio", location: "Sylhet, Bangladesh", price: "৳1,300 / hour", icon: "🎙️" },
  { name: "Crimson Tape Studio", category: "Recording Studio", location: "Bashundhara, Dhaka", price: "৳2,300 / hour", icon: "🎙️" },
  { name: "Silent Room Records", category: "Recording Studio", location: "Rangpur, Bangladesh", price: "৳800 / hour", icon: "🎙️" },
  { name: "Pro Mix Dhaka", category: "Recording Studio", location: "Motijheel, Dhaka", price: "৳2,100 / hour", icon: "🎙️" },
  { name: "Echo Chamber", category: "Recording Studio", location: "Gazipur, Bangladesh", price: "৳1,000 / hour", icon: "🎙️" },
  { name: "Master Cut Studio", category: "Recording Studio", location: "Mymensingh, Bangladesh", price: "৳900 / hour", icon: "🎙️" },
  { name: "Sonic Lab", category: "Recording Studio", location: "Bogura, Bangladesh", price: "৳850 / hour", icon: "🎙️" },
  { name: "Amplify Studio", category: "Recording Studio", location: "Cox's Bazar, Bangladesh", price: "৳1,100 / hour", icon: "🎙️" },

  // ---------- Photography Studio (14) ----------
  { name: "Pixel Creative Space", category: "Photography Studio", location: "Dhaka, Bangladesh", price: "৳2,000 / hour", icon: "📸" },
  { name: "Frame Factory", category: "Photography Studio", location: "Gulshan, Dhaka", price: "৳3,000 / hour", icon: "📸" },
  { name: "Lens & Light Studio", category: "Photography Studio", location: "Dhanmondi, Dhaka", price: "৳2,200 / hour", icon: "📸" },
  { name: "Snap House", category: "Photography Studio", location: "Uttara, Dhaka", price: "৳1,800 / hour", icon: "📸" },
  { name: "Cyc Wall Studio", category: "Photography Studio", location: "Banani, Dhaka", price: "৳2,800 / hour", icon: "📸" },
  { name: "Golden Hour Studio", category: "Photography Studio", location: "Chattogram, Bangladesh", price: "৳2,000 / hour", icon: "📸" },
  { name: "Shutter Space", category: "Photography Studio", location: "Sylhet, Bangladesh", price: "৳1,600 / hour", icon: "📸" },
  { name: "White Box Studio", category: "Photography Studio", location: "Mirpur, Dhaka", price: "৳1,500 / hour", icon: "📸" },
  { name: "Flash Point Studio", category: "Photography Studio", location: "Rajshahi, Bangladesh", price: "৳1,200 / hour", icon: "📸" },
  { name: "Portrait Palace", category: "Photography Studio", location: "Khulna, Bangladesh", price: "৳1,300 / hour", icon: "📸" },
  { name: "Studio Aperture", category: "Photography Studio", location: "Narsingdi, Bangladesh", price: "৳1,400 / hour", icon: "📸" },
  { name: "Dark Room Photo Lab", category: "Photography Studio", location: "Bashundhara, Dhaka", price: "৳2,400 / hour", icon: "📸" },
  { name: "Fashion Frame Studio", category: "Photography Studio", location: "Gulshan, Dhaka", price: "৳3,500 / hour", icon: "📸" },
  { name: "Click Corner", category: "Photography Studio", location: "Cumilla, Bangladesh", price: "৳1,000 / hour", icon: "📸" },

  // ---------- Podcast Studio (13) ----------
  { name: "The Quiet Booth", category: "Podcast Studio", location: "Narsingdi, Bangladesh", price: "৳900 / hour", icon: "🎧" },
  { name: "Talk Box Studio", category: "Podcast Studio", location: "Dhanmondi, Dhaka", price: "৳1,200 / hour", icon: "🎧" },
  { name: "Pod Nest", category: "Podcast Studio", location: "Gulshan, Dhaka", price: "৳1,500 / hour", icon: "🎧" },
  { name: "Mic Check Room", category: "Podcast Studio", location: "Uttara, Dhaka", price: "৳1,100 / hour", icon: "🎧" },
  { name: "Voice Hub", category: "Podcast Studio", location: "Chattogram, Bangladesh", price: "৳1,000 / hour", icon: "🎧" },
  { name: "Podcast Point", category: "Podcast Studio", location: "Sylhet, Bangladesh", price: "৳900 / hour", icon: "🎧" },
  { name: "Speak Easy Studio", category: "Podcast Studio", location: "Banani, Dhaka", price: "৳1,800 / hour", icon: "🎧" },
  { name: "Chat Cabin", category: "Podcast Studio", location: "Mirpur, Dhaka", price: "৳800 / hour", icon: "🎧" },
  { name: "On Air Room", category: "Podcast Studio", location: "Rajshahi, Bangladesh", price: "৳750 / hour", icon: "🎧" },
  { name: "Story Booth", category: "Podcast Studio", location: "Khulna, Bangladesh", price: "৳700 / hour", icon: "🎧" },
  { name: "Audio Gram Studio", category: "Podcast Studio", location: "Barishal, Bangladesh", price: "৳650 / hour", icon: "🎧" },
  { name: "Conversation Corner", category: "Podcast Studio", location: "Mymensingh, Bangladesh", price: "৳700 / hour", icon: "🎧" },
  { name: "Live Cast Studio", category: "Podcast Studio", location: "Mohammadpur, Dhaka", price: "৳1,300 / hour", icon: "🎧" },
];