import { useId } from "react";
import Link from "next/link";

/**
 * MyCode-AI mark — a dark terminal tile with a coral→teal gradient frame,
 * white code brackets, and a gradient command slash. Unique gradient IDs
 * per instance so navbar / footer / docs copies never collide.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `mcai-g-${uid}`;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-full w-full drop-shadow-[0_8px_24px_rgba(255,111,94,0.35)]"
        role="img"
        aria-label="MyCode-AI logo"
      >
        <defs>
          <linearGradient id={gradId} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ff6f5e" />
            <stop offset="0.55" stopColor="#ff8b76" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
          <radialGradient id={`${gradId}-glow`} cx="0.5" cy="0.42" r="0.75">
            <stop offset="0" stopColor="#2dd4bf" stopOpacity="0.22" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tile */}
        <rect x="2" y="2" width="36" height="36" rx="11" fill="#0c111c" />
        <rect x="2" y="2" width="36" height="36" rx="11" fill={`url(#${gradId}-glow)`} />
        <rect
          x="2.75"
          y="2.75"
          width="34.5"
          height="34.5"
          rx="10"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2.4"
        />

        {/* Code brackets */}
        <path
          d="M13.5 14.5 9.75 20l3.75 5.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.5 14.5 30.25 20l-3.75 5.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Command slash — the AI beam */}
        <path
          d="M22.9 11.5 17.1 28.5"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="3.4"
          strokeLinecap="round"
        />

        {/* AI spark */}
        <circle cx="29.6" cy="10.2" r="2.3" fill="#2dd4bf" />
        <circle cx="29.6" cy="10.2" r="4" fill="#2dd4bf" opacity="0.25" />
      </svg>
    </span>
  );
}

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label="MyCode-AI home">
      <LogoMark />
      <span className="text-lg font-bold tracking-tight text-white">
        MyCode-<span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}
