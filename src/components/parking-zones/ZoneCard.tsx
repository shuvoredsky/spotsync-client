import React from "react";
import Link from "next/link";
import { ParkingZone } from "@/types/zone.types";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { OccupancyBar } from "./OccupancyBar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatZoneType } from "@/lib/utils";
import { ZONE_FEATURE_DEFAULTS } from "@/lib/constants";
import {
  Car,
  CheckCircle2,
  Lock,
  QrCode,
  ShieldCheck,
  Video,
  Zap,
} from "lucide-react";

interface ZoneCardProps {
  zone: ParkingZone;
  featured?: boolean;
}

export function ZoneCard({ zone, featured = false }: ZoneCardProps) {
  const isFull = zone.available_spots <= 0;
  const isEV = zone.type === "ev_charging";
  const isCovered = zone.type === "covered";

  const features = ZONE_FEATURE_DEFAULTS[zone.type] || ZONE_FEATURE_DEFAULTS.general;

  const getLocationTag = () => {
    if (isEV) return "⚡ TERMINAL 1 LEVEL 2";
    if (isCovered) return "CENTRAL MALL WING";
    return "TERMINAL 1 • LEVEL G";
  };

  const getPillTag = () => {
    if (isEV) return "150kW DC";
    if (isCovered) return "Covered Deck";
    return "Standard Bay";
  };

  return (
    <Card className="flex flex-col justify-between overflow-hidden border-slate-200/90 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div>
        <CardHeader className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {getLocationTag()}
            </span>
            <AvailabilityBadge
              availableSpots={zone.available_spots}
              totalCapacity={zone.total_capacity}
            />
          </div>

          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {zone.name}
          </h3>
        </CardHeader>

        <CardContent className="px-5 py-2 space-y-4">
          {/* Occupancy Indicator */}
          <OccupancyBar
            availableSpots={zone.available_spots}
            totalCapacity={zone.total_capacity}
            label={isEV ? "Fast Charger Slots" : "Occupancy"}
          />

          {/* Price & Tag */}
          <div className="flex items-baseline justify-between border-y border-slate-100 py-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(zone.price_per_hour)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ hour</span>
            </div>

            <Badge
              variant={isEV ? "ev" : isCovered ? "secondary" : "outline"}
              className="font-bold text-xs"
            >
              {getPillTag()}
            </Badge>
          </div>

          {/* Full notice or Feature list */}
          {isFull ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3 text-xs text-rose-700 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> No spots currently available
              </p>
              <p className="text-[11px] text-rose-600">
                All calibrated stalls are occupied. Real-time release monitored via ANPR.
              </p>
            </div>
          ) : (
            <ul className="space-y-2 text-xs text-slate-600">
              {features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {idx === 0 ? (
                    isEV ? (
                      <Zap className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
                    ) : (
                      <Video className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    )
                  ) : idx === 1 ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <QrCode className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </div>

      <CardFooter className="p-5 pt-3 grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50/40">
        <Link href={`/parking-zones/${zone.id}`} className="w-full">
          <Button variant="subtle" size="sm" className="w-full font-semibold">
            Details
          </Button>
        </Link>

        {isFull ? (
          <Button
            disabled
            variant="subtle"
            size="sm"
            className="w-full text-slate-400 bg-slate-100 cursor-not-allowed gap-1"
          >
            <Lock className="h-3.5 w-3.5" /> Zone Full
          </Button>
        ) : (
          <Link href={`/parking-zones/${zone.id}`} className="w-full">
            <Button
              variant={isEV ? "default" : "default"}
              size="sm"
              className="w-full gap-1.5 shadow-sm font-semibold"
            >
              {isEV ? (
                <>
                  <Zap className="h-3.5 w-3.5 text-[#00d084]" />
                  <span>Reserve EV</span>
                </>
              ) : (
                <>
                  <Car className="h-3.5 w-3.5" />
                  <span>Reserve</span>
                </>
              )}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
