"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
        Something went wrong
      </h2>
      <p className="text-xs text-slate-500 max-w-md">
        An unexpected error occurred during telemetry rendering.
      </p>
      <Button variant="primary" onClick={() => reset()} className="gap-2 font-bold">
        <RefreshCw className="h-4 w-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
