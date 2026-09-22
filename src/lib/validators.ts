import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["driver", "admin"]).default("driver"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const reservationSchema = z.object({
  zone_id: z.number().positive("Please select a parking zone"),
  license_plate: z
    .string()
    .min(2, "License plate is required (min 2 chars)")
    .max(15, "License plate must be 15 characters or less")
    .transform((val) => val.trim().toUpperCase()),
  vehicle_model: z.string().optional(),
  selected_bay: z.string().optional(),
  duration_hours: z.number().min(1).max(24).default(3),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

export const zoneSchema = z.object({
  name: z.string().min(3, "Zone name must be at least 3 characters"),
  type: z.enum(["general", "ev_charging", "covered"], {
    errorMap: () => ({ message: "Select a valid zone type" }),
  }),
  total_capacity: z.coerce
    .number()
    .int("Capacity must be an integer")
    .positive("Total capacity must be greater than 0"),
  price_per_hour: z.coerce
    .number()
    .positive("Price per hour must be greater than 0"),
});

export type ZoneFormData = z.infer<typeof zoneSchema>;
