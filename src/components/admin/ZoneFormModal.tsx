"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zoneSchema, ZoneFormData } from "@/lib/validators";
import { ParkingZone, ZoneType } from "@/types/zone.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Plus, Save } from "lucide-react";

interface ZoneFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zone?: ParkingZone | null;
  onSubmit: (data: ZoneFormData) => Promise<void>;
  isLoading: boolean;
}

export function ZoneFormModal({
  open,
  onOpenChange,
  zone,
  onSubmit,
  isLoading,
}: ZoneFormModalProps) {
  const isEditing = !!zone;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ZoneFormData>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      name: "",
      type: "general",
      total_capacity: 50,
      price_per_hour: 4.5,
    },
  });

  useEffect(() => {
    if (zone) {
      reset({
        name: zone.name,
        type: zone.type,
        total_capacity: zone.total_capacity,
        price_per_hour: zone.price_per_hour,
      });
    } else {
      reset({
        name: "",
        type: "general",
        total_capacity: 50,
        price_per_hour: 4.5,
      });
    }
  }, [zone, reset]);

  const handleFormSubmit = async (data: ZoneFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-[#0d5440]" />
            <DialogTitle className="text-xl font-bold text-slate-900">
              {isEditing ? "Edit Parking Zone" : "Add New Parking Zone"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Configure telemetry thresholds, bay capacity, and hourly tariff dynamic controls.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
          {/* Zone Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Zone Name</Label>
            <Input
              id="name"
              placeholder="e.g. Terminal 1 EV Fastcharge"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Zone Type */}
          <div className="space-y-1.5">
            <Label>Zone Type</Label>
            <Select
              defaultValue={zone?.type || "general"}
              onValueChange={(val: ZoneType) => setValue("type", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Zone Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Parking</SelectItem>
                <SelectItem value="ev_charging">EV Charging Hub (150kW+)</SelectItem>
                <SelectItem value="covered">Covered Deck</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-xs text-rose-500 font-medium">{errors.type.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Total Capacity */}
            <div className="space-y-1.5">
              <Label htmlFor="total_capacity">Total Capacity</Label>
              <Input
                id="total_capacity"
                type="number"
                min={1}
                placeholder="50"
                {...register("total_capacity")}
              />
              {errors.total_capacity && (
                <p className="text-xs text-rose-500 font-medium">
                  {errors.total_capacity.message}
                </p>
              )}
            </div>

            {/* Price Per Hour */}
            <div className="space-y-1.5">
              <Label htmlFor="price_per_hour">Price Per Hour ($)</Label>
              <Input
                id="price_per_hour"
                type="number"
                step="0.25"
                min={0.5}
                placeholder="4.50"
                {...register("price_per_hour")}
              />
              {errors.price_per_hour && (
                <p className="text-xs text-rose-500 font-medium">
                  {errors.price_per_hour.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-1/2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full sm:w-1/2 font-bold gap-1.5"
            >
              {isLoading ? (
                <span>Saving...</span>
              ) : isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  <span>Update Zone</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Create Zone</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
