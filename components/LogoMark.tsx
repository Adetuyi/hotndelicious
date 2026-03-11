import { useId } from 'react';

export default function LogoMark({ className }: { className?: string }) {
  const uid = useId();
  const bowl = `lb-${uid}`;
  const rim = `lr-${uid}`;

  return (
    <svg
      viewBox="0 0 48 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Bowl body: deep crimson → rich red */}
        <linearGradient id={bowl} x1="24" y1="28" x2="24" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>
        {/* Rim highlight: orange glow */}
        <linearGradient id={rim} x1="6" y1="34" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ea580c" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Steam wisps — three curling lines */}
      <path
        d="M16 24 C16 20 18 18 16 14 C14 10 16 8 16 8"
        stroke="#f97316"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M24 22 C24 17 26 15 24 10 C22 5 24 2 24 2"
        stroke="#ea580c"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M32 24 C32 20 34 18 32 14 C30 10 32 8 32 8"
        stroke="#f97316"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Bowl body */}
      <path d="M6 34 C6 46 12 52 24 52 C36 52 42 46 42 34 Z" fill={`url(#${bowl})`} />

      {/* Rim — top ellipse */}
      <ellipse cx="24" cy="34" rx="18" ry="5" fill="#dc2626" />
      {/* Rim inner highlight */}
      <ellipse cx="24" cy="34" rx="14" ry="3.5" fill={`url(#${rim})`} opacity="0.7" />

      {/* Food surface glow */}
      <ellipse cx="24" cy="34" rx="9" ry="2.2" fill="#fde68a" opacity="0.45" />

      {/* Base foot */}
      <rect x="18" y="51" width="12" height="2" rx="1" fill="#7f1d1d" />
      <ellipse cx="24" cy="53.5" rx="9" ry="1.5" fill="#7f1d1d" opacity="0.35" />
    </svg>
  );
}
