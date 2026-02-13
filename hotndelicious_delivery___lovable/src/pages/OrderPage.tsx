import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { meals } from "@/constants/meals";
import { siteConfig } from "@/constants/siteConfig";
import { toast } from "sonner";

const timeSlots = [
  { label: "Lunch (12pm – 2pm)", value: "lunch" },
  { label: "Afternoon (2pm – 5pm)", value: "afternoon" },
  { label: "Evening (5pm – 8pm)", value: "evening" },
];

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("meal");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    allergies: "",
    instructions: "",
  });

  const [selectedMeals, setSelectedMeals] = useState<Record<string, number>>(() => {
    if (preselected) return { [preselected]: 1 };
    return {};
  });

  const toggleMeal = (id: string) => {
    setSelectedMeals((prev) => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id];
      else copy[id] = 1;
      return copy;
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setSelectedMeals((prev) => ({ ...prev, [id]: qty }));
  };

  const total = useMemo(() => {
    return Object.entries(selectedMeals).reduce((sum, [id, qty]) => {
      const meal = meals.find((m) => m.id === id);
      return sum + (meal ? meal.price * qty : 0);
    }, 0);
  }, [selectedMeals]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedMeals).length === 0) {
      toast.error("Please select at least one meal");
      return;
    }

    const mealSummary = Object.entries(selectedMeals)
      .map(([id, qty]) => {
        const meal = meals.find((m) => m.id === id);
        return meal ? `${qty}x ${meal.name} (£${meal.price * qty})` : "";
      })
      .filter(Boolean)
      .join("\n");

    const message = encodeURIComponent(
      `Hi! I'd like to place an order:\n\n${mealSummary}\n\nSubtotal: £${total}\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}\nDelivery Date: ${form.deliveryDate}\nDelivery Time: ${timeSlots.find((t) => t.value === form.deliveryTime)?.label || ""}\n${form.allergies ? `Allergies: ${form.allergies}\n` : ""}${form.instructions ? `Instructions: ${form.instructions}` : ""}`
    );

    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`, "_blank");
    toast.success("Opening WhatsApp to confirm your order!");
  };

  const inputClass =
    "w-full border border-input rounded-lg px-4 py-3 bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Place Your Order
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick your meals, fill in your details, and we'll confirm via WhatsApp within 2 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Meal Selection */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">
              Select Your Meals
            </h2>
            <div className="space-y-3">
              {meals.map((meal) => {
                const isSelected = !!selectedMeals[meal.id];
                return (
                  <div
                    key={meal.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                    onClick={() => toggleMeal(meal.id)}
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{meal.name}</h3>
                      <p className="text-muted-foreground text-xs truncate">{meal.description}</p>
                    </div>
                    <span className="font-bold text-primary text-sm whitespace-nowrap">
                      £{meal.price}
                    </span>
                    {isSelected && (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => updateQty(meal.id, selectedMeals[meal.id] - 1)}
                          className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-foreground font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="font-semibold text-foreground w-6 text-center text-sm">
                          {selectedMeals[meal.id]}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(meal.id, selectedMeals[meal.id] + 1)}
                          className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-foreground font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {total > 0 && (
              <div className="mt-4 text-right font-display text-xl font-bold text-primary">
                Subtotal: £{total}
              </div>
            )}
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Your Details</h2>
            <input
              required
              placeholder="Full Name *"
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Phone Number *"
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email Address *"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              required
              placeholder="Delivery Address *"
              className={inputClass}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                type="date"
                className={inputClass}
                value={form.deliveryDate}
                onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
              />
              <select
                required
                className={inputClass}
                value={form.deliveryTime}
                onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
              >
                <option value="">Delivery Time *</option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Allergies or dietary requirements (optional)"
              rows={3}
              className={inputClass}
              value={form.allergies}
              onChange={(e) => setForm({ ...form, allergies: e.target.value })}
            />
            <textarea
              placeholder="Special instructions (optional)"
              rows={3}
              className={inputClass}
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-warm text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Submit Order via WhatsApp
          </button>
        </form>

        <div className="mt-8 bg-muted rounded-xl p-6 text-center">
          <p className="text-foreground font-semibold mb-1">What happens next?</p>
          <p className="text-muted-foreground text-sm">
            We'll confirm your order and total price via WhatsApp or phone call within 2 hours.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Delivery: £{siteConfig.delivery.pricing.middlesbrough} within Middlesbrough. Surrounding areas — contact us for pricing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
