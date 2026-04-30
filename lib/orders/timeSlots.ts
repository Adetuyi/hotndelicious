export const ORDER_TIME_SLOTS = [
  { value: 'lunch', label: 'Lunch (12pm – 2pm)' },
  { value: 'afternoon', label: 'Afternoon (2pm – 5pm)' },
  { value: 'evening', label: 'Evening (5pm – 8pm)' },
] as const;

export type OrderTimeSlotValue = (typeof ORDER_TIME_SLOTS)[number]['value'];

export const timeSlotLabel = (value: OrderTimeSlotValue): string =>
  ORDER_TIME_SLOTS.find(s => s.value === value)?.label ?? value;
