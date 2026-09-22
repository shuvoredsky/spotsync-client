import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatZoneType(type: string): string {
  switch (type) {
    case "ev_charging":
      return "EV Charging Hub";
    case "covered":
      return "Covered Parking";
    case "general":
      return "General Parking";
    default:
      return type ? type.charAt(0).toUpperCase() + type.slice(1) : "General";
  }
}
