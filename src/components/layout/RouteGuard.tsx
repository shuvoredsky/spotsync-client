"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectIfAuth?: boolean;
}

export function RouteGuard({
  children,
  requireAuth = false,
  requireAdmin = false,
  redirectIfAuth = false,
}: RouteGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, isInitialized, isAdmin } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;

    if (redirectIfAuth && isAuthenticated) {
      if (isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
      return;
    }

    if (requireAuth && !isAuthenticated) {
      toast.error("Please sign in to access this page");
      router.replace("/login");
      return;
    }

    if (requireAdmin && (!isAuthenticated || !isAdmin)) {
      toast.error("Access denied: Administrator privileges required");
      router.replace("/dashboard");
      return;
    }
  }, [isInitialized, isAuthenticated, isAdmin, requireAuth, requireAdmin, redirectIfAuth, router]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0d5440] border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-500">Initializing SpotSync session...</p>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
