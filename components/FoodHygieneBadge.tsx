import { siteConfig } from '@/constants/siteConfig';

type Size = 'sm' | 'md' | 'lg';

const SIZE_PX: Record<Size, number> = {
  sm: 56,
  md: 96,
  lg: 140,
};

type Props = {
  size?: Size;
  className?: string;
  title?: string;
};

const FoodHygieneBadge = ({ size = 'md', className, title }: Props) => {
  const width = SIZE_PX[size];
  const accessibleTitle =
    title ??
    `Food Hygiene Rating: ${siteConfig.foodHygiene.rating} — ${siteConfig.foodHygiene.ratingLabel} — ${siteConfig.foodHygiene.authority}`;

  return (
    <svg
      role="img"
      aria-label={accessibleTitle}
      viewBox="0 0 220 110"
      width={width}
      height={(width * 110) / 220}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{accessibleTitle}</title>

      {/* Outer rounded card */}
      <rect x="0" y="0" width="220" height="110" rx="8" fill="#0A2540" />

      {/* Top green band */}
      <rect x="6" y="6" width="208" height="22" rx="3" fill="#1F7A3A" />
      <text
        x="110"
        y="22"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#FFFFFF"
        letterSpacing="1.5"
      >
        FOOD HYGIENE RATING
      </text>

      {/* White rating block */}
      <rect x="6" y="32" width="208" height="50" fill="#FFFFFF" />

      {/* Rating numbers 0-5 with the matching one highlighted */}
      {[0, 1, 2, 3, 4, 5].map(n => {
        const x = 18 + n * 32;
        const isMatch = n === siteConfig.foodHygiene.rating;
        return (
          <g key={n}>
            <circle
              cx={x}
              cy={57}
              r={11}
              fill={isMatch ? '#0A2540' : '#FFFFFF'}
              stroke="#0A2540"
              strokeWidth="1.5"
            />
            <text
              x={x}
              y={61}
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
              fontSize="13"
              fill={isMatch ? '#FFFFFF' : '#0A2540'}
            >
              {n}
            </text>
          </g>
        );
      })}

      {/* "very good" callout */}
      <text
        x="110"
        y="80"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#0A2540"
      >
        very good
      </text>

      {/* Bottom band: authority */}
      <rect x="6" y="86" width="208" height="18" rx="3" fill="#0A2540" />
      <text
        x="110"
        y="99"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="600"
        fontSize="9"
        fill="#FFFFFF"
        letterSpacing="0.6"
      >
        FOOD STANDARDS AGENCY · food.gov.uk
      </text>
    </svg>
  );
};

export default FoodHygieneBadge;
