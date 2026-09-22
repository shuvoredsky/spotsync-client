import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface AvailabilityBadgeProps {
  availableSpots: number;
  totalCapacity: number;
  className?: string;
}

export function AvailabilityBadge({
  availableSpots,
  totalCapacity,
  className,
}: AvailabilityBadgeProps) {
  if (availableSpots <= 0) {
    return (
      <Badge variant="full" className={`gap-1.5 ${className}`}>
        <XCircle className="h-3.5 w-3.5 text-rose-600" />
        <span>Zone Full</span>
      </Badge>
    );
  }

  const ratio = availableSpots / totalCapacity;
  if (ratio <= 0.25 || availableSpots <= 5) {
    return (
      <Badge variant="limited" className={`gap-1.5 ${className}`}>
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span>Limited</span>
      </Badge>
    );
  }

  return (
    <Badge variant="available" className={`gap-1.5 ${className}`}>
      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
      <span>Available</span>
    </Badge>
  );
}
