import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpotSync | Smart Parking & EV Charging Reservation Platform",
  description:
    "High-precision smart parking allocation, high-voltage EV station telemetry, and seamless enterprise mobility management across airports and urban transit hubs.",
  keywords: [
    "EV charging reservation",
    "smart parking",
    "airport valet",
    "fast charger",
    "ANPR parking",
    "spotsync",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-[#0d5440] selection:text-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
