"use client";

import React, { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";


type BasicProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = BasicProps & {
  variant?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type IconProps = {
  name: string;
  className?: string;
};

type BrandWordmarkProps = {
  size?: "small" | "medium" | "large";
  centered?: boolean;
};

type LiveAudioPlayerProps = {
  streamUrl: string;
};

type SongArtPanelProps = {
  src: string;
};

type NowPlayingInfo = {
  title: string;
  artist: string;
  art: string;
};

type RecentTrack = {
  id: string;
  title: string;
  artist: string;
  art: string;
};

type StationCard = {
  icon: string;
  title: string;
  text: string;
};

type JinglePhrase = [string, string];

function Card({ children, className = "" }: BasicProps) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }: BasicProps) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", type = "button", disabled = false, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

const CONFIG = {
  emailTo: "kevin@vail.org",
  emailJsServiceId: "service_m63ik2t",
  emailJsTemplateId: "template_6n1oz6d",
  emailJsPublicKey: "GG8MOS_onX4yTNL8K",
  roundLogoSrc: "/logos/cobalt-round.png",
  bannerLogoSrc: "/logos/cobalt-banner.png",
  streamUrl: "https://a3.asurahosting.com/listen/songs_of_dreams/radio.mp3",
  nowPlayingApis: [
    "https://a3.asurahosting.com/api/nowplaying/songs_of_dreams",
    "https://a3.asurahosting.com/api/nowplaying_static/songs_of_dreams.json",
    "https://a3.asurahosting.com/radio/8000/radio.mp3/status-json.xsl",
  ],
};

const SONG_ART_PLACEHOLDERS = [
  "/song-art/song1.jpg",
  "/song-art/song2.jpg",
  "/song-art/song3.jpg",
];

const TEST_TAGLINES = [
  "Memories in Motion",
  "Songs for the Long Way Home",
  "The Smooth Lane Home",
  "Drive the Night",
  "Echoes of the Open Road",
];

function SvgIcon({ className = "", children }: BasicProps) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Icon({ name, className = "" }: IconProps) {
  const icons: Record<string, React.ReactNode> = {
    play: (
      <SvgIcon className={className}>
        <polygon points="6 3 20 12 6 21 6 3" />
      </SvgIcon>
    ),
    radio: (
      <SvgIcon className={className}>
        <path d="M4.9 19.1a10 10 0 0 1 14.2 0" />
        <path d="M7.8 16.2a6 6 0 0 1 8.4 0" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 6v1" />
      </SvgIcon>
    ),
    moon: (
      <SvgIcon className={className}>
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
      </SvgIcon>
    ),
    music: (
      <SvgIcon className={className}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </SvgIcon>
    ),
    pin: (
      <SvgIcon className={className}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </SvgIcon>
    ),
    headphones: (
      <SvgIcon className={className}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5Z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5Z" />
      </SvgIcon>
    ),
    mail: (
      <SvgIcon className={className}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </SvgIcon>
    ),
    volume: (
      <SvgIcon className={className}>
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M16 9a5 5 0 0 1 0 6" />
        <path d="M19 6a9 9 0 0 1 0 12" />
      </SvgIcon>
    ),
  };

  return icons[name] || icons.radio;
}

function BrandWordmark({ size = "large", centered = false }: BrandWordmarkProps) {
  const cobaltSize = size === "small" ? "text-4xl" : size === "medium" ? "text-5xl md:text-7xl" : "text-6xl md:text-8xl";
  const driveSize = size === "small" ? "text-2xl" : size === "medium" ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl";
  const radioSize = size === "small" ? "text-sm" : size === "medium" ? "text-xl md:text-2xl" : "text-2xl md:text-3xl";

  return (
    <div className={`space-y-1 ${centered ? "text-center" : ""}`}>
      <div
        className={`${cobaltSize} leading-none tracking-tight text-cyan-300 drop-shadow-[0_0_18px_rgba(59,130,246,0.55)]`}
        style={{
          fontFamily: '"Brush Script MT", "Segoe Script", cursive',
          fontWeight: 500,
          transform: "rotate(-4deg)",
        }}
      >
        Cobalt
      </div>
      <div
        className={`flex flex-wrap items-end gap-4 leading-none ${centered ? "justify-center" : ""}`}
        style={{
          fontFamily: '"Arial Black", "Helvetica Neue", sans-serif',
          fontWeight: 900,
          letterSpacing: "0.08em",
          fontStyle: "italic",
        }}
      >
        <span className={`bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text ${driveSize} text-transparent`}>
          DRIVE
        </span>
        <span className={`pb-1 ${radioSize} tracking-[0.35em] text-orange-400`}>RADIO</span>
      </div>
    </div>
  );
}

function LiveAudioPlayer({ streamUrl }: LiveAudioPlayerProps) {
  return (
    <audio controls preload="none" className="w-full">
      <source src={streamUrl} type="audio/mpeg" />
      Your browser does not support the audio player.
    </audio>
  );
}

function SongArtPanel({ src }: SongArtPanelProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] border border-cyan-200/20 bg-slate-950 shadow-inner shadow-cyan-950/60">
      {src && !imageFailed ? (
        <img
          src={src}
          alt="Current song artwork"
          className="h-full w-full object-cover transition-all duration-700"
          onError={() => setImageFailed(true)}
        />
      ) : null}
      <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-cyan-200/20" />
      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/35 px-8 text-center text-sm uppercase tracking-[0.3em] text-cyan-100/60">
        {src && !imageFailed ? "" : "Song Artwork"}
      </div>
    </div>
  );
}

export function getTaglineByIndex(index: number, taglines: string[] = TEST_TAGLINES) {
  if (!Array.isArray(taglines) || taglines.length === 0) return "";
  const safeIndex = ((index % taglines.length) + taglines.length) % taglines.length;
  return taglines[safeIndex];
}

export function getSongArtByIndex(index: number, songArt: string[] = SONG_ART_PLACEHOLDERS) {
  if (!Array.isArray(songArt) || songArt.length === 0) return "";
  const safeIndex = ((index % songArt.length) + songArt.length) % songArt.length;
  return songArt[safeIndex];
}

export function normalizeNowPlayingData(data: any, fallbackArt: string = getSongArtByIndex(0)): NowPlayingInfo | null {
  const azuraSong = data?.now_playing?.song;
  const icecastSource = Array.isArray(data?.icestats?.source)
    ? data.icestats.source[0]
    : data?.icestats?.source;

  if (azuraSong) {
    return {
      title: azuraSong.title || "Cobalt Drive Radio",
      artist: azuraSong.artist || "Live Stream",
      art: azuraSong.art || fallbackArt,
    };
  }

  if (icecastSource?.title) {
    const [artist, title] = icecastSource.title.includes(" - ")
      ? icecastSource.title.split(" - ")
      : ["Live Stream", icecastSource.title];

    return {
      title: title || "Cobalt Drive Radio",
      artist: artist || "Live Stream",
      art: fallbackArt,
    };
  }

  return null;
}

type SongHistoryItem = {
  song?: {
    title?: string;
    artist?: string;
    art?: string;
  };
};

export function normalizeRecentTracks(data: any): RecentTrack[] {
  const history: SongHistoryItem[] = Array.isArray(data?.song_history) ? data.song_history : [];

  return history.slice(0, 6).map((item: SongHistoryItem, index: number) => {
    const song = item?.song || {};

    return {
      id: `${song.artist || "artist"}-${song.title || "title"}-${index}`,
      title: song.title || "Unknown Title",
      artist: song.artist || "Unknown Artist",
      art: song.art || getSongArtByIndex(index),
    };
  });
}

export function runSelfTests() {
  const results = [
    getTaglineByIndex(0) === "Memories in Motion",
    getTaglineByIndex(2) === "The Smooth Lane Home",
    getTaglineByIndex(5) === "Memories in Motion",
    getTaglineByIndex(-1) === "Echoes of the Open Road",
    getTaglineByIndex(0, []) === "",
    getSongArtByIndex(0) === "/song-art/song1.jpg",
    getSongArtByIndex(3) === "/song-art/song1.jpg",
    getSongArtByIndex(-1) === "/song-art/song3.jpg",
    getSongArtByIndex(0, []) === "",
    normalizeNowPlayingData({ now_playing: { song: { title: "Test Song", artist: "Test Artist", art: "cover.jpg" } } })?.title === "Test Song",
    normalizeNowPlayingData({ icestats: { source: { title: "Artist - Title" } } })?.artist === "Artist",
    normalizeRecentTracks({ song_history: [{ song: { title: "Old Song", artist: "Old Artist", art: "old.jpg" } }] })[0]?.title === "Old Song",
    normalizeRecentTracks({ song_history: [] }).length === 0,
    TEST_TAGLINES.length === 5,
    SONG_ART_PLACEHOLDERS.length === 3,
    TEST_TAGLINES.includes("Songs for the Long Way Home"),
    CONFIG.roundLogoSrc.endsWith(".png"),
    CONFIG.bannerLogoSrc.endsWith(".png"),

    typeof CONFIG.streamUrl === "string",
    Array.isArray(CONFIG.nowPlayingApis),
    CONFIG.nowPlayingApis.length >= 2,
    CONFIG.streamUrl.startsWith("https://"),
    CONFIG.nowPlayingApis.every((url) => url.startsWith("https://")),
    CONFIG.streamUrl.includes("asurahosting.com"),
    CONFIG.nowPlayingApis.some((url) => url.includes("nowplaying")),
    CONFIG.streamUrl.endsWith("radio.mp3"),
  ];

  return results.every(Boolean);
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setStatus("sending");

      await emailjs.send(
        CONFIG.emailJsServiceId,
        CONFIG.emailJsTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: CONFIG.emailTo,
        },
        CONFIG.emailJsPublicKey
      );

      setStatus("sent");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send failed", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[2rem] border border-cyan-300/20 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30">
      <div>
        <div className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-300">
          Contact Station
        </div>
        <p className="text-sm text-slate-400">
          Send requests, memories, road stories, or late-night signals directly to the station.
        </p>
      </div>

      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300"
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300"
        required
      />

      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
        className="min-h-[140px] w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300"
        required
      />

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-2xl bg-cyan-300 px-6 py-6 text-slate-950 hover:bg-cyan-200"
      >
        <Icon name="mail" className="mr-2 h-5 w-5" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>

      {status === "sent" ? (
        <p className="text-sm text-cyan-300">
          Message sent into the night.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm text-red-400">
          Transmission failed. Try again later.
        </p>
      ) : null}
    </form>
  );
}

export default function CobaltDriveRadio() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState({
    title: "Cobalt Drive Radio",
    artist: "Live Stream",
    art: getSongArtByIndex(0),
  });
  const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([]);

  const config = CONFIG;
  const taglines = useMemo(() => TEST_TAGLINES, []);
  const currentTagline = getTaglineByIndex(taglineIndex, taglines);

  useEffect(() => {
    let isMounted = true;

    async function fetchNowPlaying() {
      for (const apiUrl of config.nowPlayingApis) {
        try {
          const response = await fetch(apiUrl, { cache: "no-store" });
          if (!response.ok) continue;

          const data = await response.json();
          const normalized = normalizeNowPlayingData(data, getSongArtByIndex(taglineIndex));

          if (normalized && isMounted) {
            setNowPlaying(normalized);
            const recent = normalizeRecentTracks(data);
            if (recent.length > 0) {
              setRecentTracks(recent);
            }
            return;
          }
        } catch (error) {
          console.warn("Now playing endpoint failed:", apiUrl, error);
        }
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [config.nowPlayingApis, taglineIndex]);

  const stationCards: StationCard[] = [
    {
      icon: "headphones",
      title: "The Sound",
      text: "Smooth country, yacht rock, soft pop, disco glow, and road-worn Americana with a cinematic edge.",
    },
    {
      icon: "pin",
      title: "The Place",
      text: "A signal from Kokomo by way of every highway town, motel light, and blue horizon you almost remember.",
    },
    {
      icon: "radio",
      title: "The Identity",
      text: "Nostalgic without dust. Modern without glare. A station built around motion, memory, and midnight calm.",
    },
  ];

  const jinglePhrases: JinglePhrase[] = [
    ["Memories in Motion", "Core identity — movement, nostalgia, and emotional continuity."],
    ["Songs for the Long Way Home", "The heart phrase — reflective, warm, and companionable."],
    ["The Smooth Lane Home", "The texture phrase — occasional, relaxed, and polished."],
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <img
          src={config.bannerLogoSrc}
          alt="Cobalt Drive Radio night highway banner"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(15,23,42,0.65),transparent_38%),linear-gradient(180deg,rgba(2,6,23,.92)_0%,rgba(15,23,42,.72)_55%,#020617_100%)]" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-lg shadow-cyan-950/40">
              <Icon name="radio" className="h-4 w-4" />
              Streaming 24/7 from the blue edge of the highway
            </div>

            <div>
              <img src={config.roundLogoSrc} alt="Cobalt Drive Radio round logo" className="mb-6 h-28 w-28 rounded-full border border-cyan-300/30 object-cover shadow-2xl shadow-cyan-950/60 md:h-36 md:w-36" />
              <BrandWordmark />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                A late-night blend of smooth country, yacht-rock haze, road songs, neon memories, and soft signals for anyone taking the long way home.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => document.getElementById("recent-tracks")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-2xl border-slate-500/60 bg-slate-900/40 px-6 py-6 text-base hover:bg-slate-800"
              >
                <Icon name="music" className="mr-2 h-5 w-5" /> Recent Tracks
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 text-sm text-slate-400">
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">AI-generated music</span>
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">No static, no rush</span>
              <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">Built for night drives</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <Card className="rounded-[2rem] border-cyan-300/20 bg-slate-900/75 shadow-2xl shadow-cyan-950/50 backdrop-blur">
              <CardContent className="space-y-7 p-8">
                <SongArtPanel src={nowPlaying.art} />

                <div className="space-y-2">
                  <div className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Now Playing</div>
                  <div className="text-xs text-slate-500">Live metadata from AzuraCast/Icecast when available</div>
                  <BrandWordmark size="small" />
                  <div className="space-y-1 pt-2">
                    <p className="text-lg font-semibold text-cyan-100">{nowPlaying.title}</p>
                    <p className="text-sm text-slate-400">{nowPlaying.artist}</p>
                    <p className="pt-2 text-xs uppercase tracking-[0.25em] text-slate-500">{currentTagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                  <Icon name="volume" className="h-5 w-5 text-cyan-300" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-2/3 rounded-full bg-cyan-300" />
                  </div>
                  <span className="text-sm text-slate-400">LIVE</span>
                </div>

                <LiveAudioPlayer streamUrl={config.streamUrl} />

                <Button variant="ghost" onClick={() => setTaglineIndex((value) => value + 1)} className="w-full rounded-2xl bg-slate-800/70 text-slate-100 hover:bg-slate-700">
                  Rotate Station Tagline
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="recent-tracks" className="bg-slate-950 px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Icon name="music" className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.25em]">Recently Played</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Tracks still warm from the signal.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {(recentTracks.length > 0 ? recentTracks : ([
              { id: "fallback-1", title: "Recent tracks will appear here", artist: "When AzuraCast song history is available", art: getSongArtByIndex(0) },
              { id: "fallback-2", title: "Live stream connected", artist: "Metadata updates every 15 seconds", art: getSongArtByIndex(1) },
              { id: "fallback-3", title: "Cobalt Drive Radio", artist: "Memories in Motion", art: getSongArtByIndex(2) },
            ] as RecentTrack[])).map((track: RecentTrack) => (
              <Card key={track.id} className="overflow-hidden rounded-3xl border-slate-800 bg-slate-900/70 shadow-xl">
                <CardContent className="p-0">
                  <div className="aspect-square bg-slate-950">
                    <img src={track.art} alt={`${track.title} artwork`} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-1 p-5 text-left">
                    <h3 className="text-lg font-semibold text-cyan-100">{track.title}</h3>
                    <p className="text-sm text-slate-400">{track.artist}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900 shadow-2xl shadow-cyan-950/40">
            <img src={config.bannerLogoSrc} alt="Cobalt Drive Radio wide banner" className="w-full object-cover" />
          </div>

          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Icon name="moon" className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.25em]">Station Mood</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Music for the hour when the road gets quiet.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {stationCards.map((item: StationCard) => (
              <Card key={item.title} className="rounded-3xl border-slate-800 bg-slate-900/70 shadow-xl">
                <CardContent className="space-y-4 p-7">
                  <Icon name={item.icon} className="h-8 w-8 text-cyan-300" />
                  <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
                  <p className="leading-relaxed text-slate-400">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Jingle Package</div>
            <h2 className="text-3xl font-semibold md:text-5xl">Three phrases. One road.</h2>
            <p className="text-lg leading-relaxed text-slate-400">
              Cobalt Drive Radio uses short station IDs built around recurring taglines, giving the stream a familiar pulse without making every break feel identical.
            </p>
          </div>

          <div className="space-y-4">
            {jinglePhrases.map(([title, text]: JinglePhrase) => (
              <div key={title} className="rounded-3xl border border-slate-700 bg-slate-950/55 p-6">
                <h3 className="text-xl font-semibold text-cyan-100">{title}</h3>
                <p className="mt-2 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-7 text-center">
          <BrandWordmark size="medium" centered />
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Drift in. Keep driving.</h2>
          <p className="text-lg uppercase tracking-[0.35em] text-cyan-300/80">
            Live from Kokomo, Indiana
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={config.streamUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-2xl bg-cyan-300 px-6 py-6 text-slate-950 hover:bg-cyan-200">
                <Icon name="play" className="mr-2 h-5 w-5" /> Start Listening
              </Button>
            </a>
          </div>

          <div className="pt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
