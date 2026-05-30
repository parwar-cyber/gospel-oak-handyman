export interface OpeningHour {
  id: number;
  day: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  sort_order: number;
}

export function formatTime(time: string | null): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatHoursRange(hour: OpeningHour): string {
  if (hour.is_closed) return "Closed";
  return `${formatTime(hour.open_time)} – ${formatTime(hour.close_time)}`;
}

export function getTodayName(): string {
  return new Date().toLocaleDateString("en-GB", { weekday: "long" });
}

export const DEFAULT_OPENING_HOURS: Omit<OpeningHour, "id">[] = [
  { day: "Monday", open_time: "08:00", close_time: "17:00", is_closed: false, sort_order: 1 },
  { day: "Tuesday", open_time: "08:00", close_time: "17:00", is_closed: false, sort_order: 2 },
  { day: "Wednesday", open_time: "08:00", close_time: "17:00", is_closed: false, sort_order: 3 },
  { day: "Thursday", open_time: "08:00", close_time: "17:00", is_closed: false, sort_order: 4 },
  { day: "Friday", open_time: "08:00", close_time: "17:00", is_closed: false, sort_order: 5 },
  { day: "Saturday", open_time: "09:00", close_time: "17:00", is_closed: false, sort_order: 6 },
  { day: "Sunday", open_time: null, close_time: null, is_closed: true, sort_order: 7 },
];
