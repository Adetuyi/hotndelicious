import { Link } from "react-router-dom";
import type { MealItem } from "@/constants/siteConfig";

interface MealCardProps {
  meal: MealItem;
  showOrder?: boolean;
}

const MealCard = ({ meal, showOrder = true }: MealCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border">
      <div className="aspect-square overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg leading-tight text-foreground">
            {meal.name}
          </h3>
          <span className="font-body font-bold text-primary text-lg whitespace-nowrap">
            £{meal.price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {meal.description}
        </p>
        {showOrder && (
          <Link
            to={`/order?meal=${meal.id}`}
            className="inline-block bg-gradient-warm text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity w-full text-center"
          >
            Order This
          </Link>
        )}
      </div>
    </div>
  );
};

export default MealCard;
