import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6f7f2] text-[#0d5440]">
        <Car className="h-8 w-8" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">404 - Page Not Found</h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md">
        The requested SpotSync terminal screen or resource could not be found.
      </p>
      <Link href="/">
        <Button variant="primary" className="gap-2">
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Button>
      </Link>
    </div>
  );
}
