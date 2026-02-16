import Link from 'next/link';
import type { MealItem } from '@/constants/siteConfig';
import Image from 'next/image';

interface MealCardProps {
  meal: MealItem;
  showOrder?: boolean;
}

const MealCard = ({ meal, showOrder = true }: MealCardProps) => {
  return (
    <div className="group bg-card border-border overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <Image
          src={meal.image}
          alt={meal.name}
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 md:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-foreground text-lg leading-tight font-semibold">
            {meal.name}
          </h3>
          <span className="font-body text-primary text-lg font-bold whitespace-nowrap">
            £{meal.price}
          </span>
        </div>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{meal.description}</p>
        {showOrder && (
          <Link
            href={`/order?meal=${meal.id}`}
            className="bg-gradient-warm text-primary-foreground inline-block w-full rounded-lg px-4 py-2 text-center text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Order This
          </Link>
        )}
      </div>
    </div>
  );
};

export default MealCard;
