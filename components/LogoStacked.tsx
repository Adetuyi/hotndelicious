import { useId } from 'react';

/**
 * Bowl icon + "HotNNice" / "DELICACIES" two-line lockup.
 *
 * variant="default"  — dark text, for light backgrounds (header, etc.)
 * variant="light"    — white/cream text, for dark backgrounds (footer, etc.)
 */
export default function LogoStacked({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'light';
  className?: string;
}) {
  const uid = useId();
  const bowlId = `ls-b-${uid}`;
  const rimId = `ls-r-${uid}`;
  const textGradId = `ls-t-${uid}`;

  const isLight = variant === 'light';

  const niceColor = isLight ? '#fed7aa' : '#92400e';
  const delicaciesColor = isLight ? '#fde68a' : '#92400e';
  const dividerColor = isLight ? 'rgba(255,255,255,0.25)' : '#ea580c';

  return (
    <svg
      viewBox="0 0 210 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="HotNNice Delicacies"
    >
      <defs>
        {/* Bowl body gradient — same for both variants */}
        <linearGradient id={bowlId} x1="24" y1="28" x2="24" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b91c1c" />
          <stop offset="1" stopColor="#7f1d1d" />
        </linearGradient>

        {/* Bowl rim highlight */}
        <linearGradient id={rimId} x1="6" y1="34" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ea580c" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>

        {/* "HotN" text gradient — warm reds on default, white→gold on light */}
        <linearGradient id={textGradId} x1="58" y1="0" x2="210" y2="0" gradientUnits="userSpaceOnUse">
          {isLight ? (
            <>
              <stop stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#fed7aa" />
              <stop offset="1" stopColor="#fbbf24" />
            </>
          ) : (
            <>
              <stop stopColor="#b91c1c" />
              <stop offset="0.55" stopColor="#ea580c" />
              <stop offset="1" stopColor="#c2410c" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* ── Bowl icon (same in both variants) ── */}
      <path d="M16 24 C16 20 18 18 16 14 C14 10 16 8 16 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M24 22 C24 17 26 15 24 10 C22 5 24 2 24 2" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <path d="M32 24 C32 20 34 18 32 14 C30 10 32 8 32 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M6 34 C6 46 12 52 24 52 C36 52 42 46 42 34 Z" fill={`url(#${bowlId})`} />
      <ellipse cx="24" cy="34" rx="18" ry="5" fill="#dc2626" />
      <ellipse cx="24" cy="34" rx="14" ry="3.5" fill={`url(#${rimId})`} opacity="0.7" />
      <ellipse cx="24" cy="34" rx="9" ry="2.2" fill="#fde68a" opacity="0.45" />
      <rect x="18" y="51" width="12" height="2" rx="1" fill="#7f1d1d" />

      {/* ── Wordmark ── */}
      <text x="58" y="30" fontFamily="Georgia, 'Times New Roman', serif" fontSize="24" fontWeight="700" fill={`url(#${textGradId})`}>
        HotN
      </text>
      <text x="111" y="30" fontFamily="Georgia, 'Times New Roman', serif" fontSize="24" fontWeight="400" fill={niceColor}>
        Nice
      </text>

      <line x1="58" y1="35" x2="207" y2="35" stroke={dividerColor} strokeWidth="0.75" />

      <text x="58" y="49" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="11" fontWeight="400" letterSpacing="4.5" fill={delicaciesColor} opacity="0.9">
        DELICACIES
      </text>
    </svg>
  );
}
