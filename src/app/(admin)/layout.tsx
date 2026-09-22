"use client";

import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { RouteGuard } from "@/components/layout/RouteGuard";
import { useAppSelector } from "@/store/hooks";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminSidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <RouteGuard requireAuth requireAdmin>
      <div className="min-h-screen bg-[#f8fafc]">
        <AdminSidebar />
        <div
          className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${
            adminSidebarOpen ? "pl-64" : "pl-20"
          }`}
        >
          <AdminHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </RouteGuard>
  );
}
