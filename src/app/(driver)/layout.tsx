import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteGuard } from "@/components/layout/RouteGuard";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard requireAuth>
      <div className="flex min-h-screen flex-col bg-[#f8fafc]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </RouteGuard>
  );
}
