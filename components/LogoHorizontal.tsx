import { useId } from 'react';

/** Bowl icon + "HotnNiceDelicacies" on a single line */
export default function LogoHorizontal({ className }: { className?: string }) {
  const uid = useId();
  const bowl = `lh-b-${uid}`;
  const rim = `lh-r-${uid}`;
  const text = `lh-t-${uid}`;

  return (
    <svg
      viewBox="0 0 296 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="HotnNiceDelicacies"
    >
      <defs>
        <linearGradient id={bowl} x1="24" y1="28" x2="24" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id={rim} x1="6" y1="34" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ea580c" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id={text} x1="62" y1="0" x2="296" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="0.5" stopColor="#ea580c" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>

      {/* ── Bowl icon ── */}
      <path d="M16 24 C16 20 18 18 16 14 C14 10 16 8 16 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M24 22 C24 17 26 15 24 10 C22 5 24 2 24 2" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <path d="M32 24 C32 20 34 18 32 14 C30 10 32 8 32 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M6 34 C6 46 12 52 24 52 C36 52 42 46 42 34 Z" fill={`url(#${bowl})`} />
      <ellipse cx="24" cy="34" rx="18" ry="5" fill="#dc2626" />
      <ellipse cx="24" cy="34" rx="14" ry="3.5" fill={`url(#${rim})`} opacity="0.7" />
      <ellipse cx="24" cy="34" rx="9" ry="2.2" fill="#fde68a" opacity="0.45" />
      <rect x="18" y="51" width="12" height="2" rx="1" fill="#7f1d1d" />

      {/* ── Wordmark: single line ── */}
      <text
        x="58"
        y="38"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        fill={`url(#${text})`}
      >
        HotN
      </text>
      <text
        x="116"
        y="38"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="400"
        fill="#92400e"
      >
        Nice
      </text>
      <text
        x="172"
        y="38"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        fill={`url(#${text})`}
      >
        Delicacies
      </text>
    </svg>
  );
}
