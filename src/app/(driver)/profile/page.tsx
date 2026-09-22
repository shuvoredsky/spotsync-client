"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Car, Mail, Shield, User, Zap } from "lucide-react";

export default function DriverProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Driver Profile & Vehicles
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your account credentials, registered vehicle license plates, and ANPR fast pass tags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Profile Card */}
        <div className="md:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-4 shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0d5440] text-3xl font-black text-white shadow-lg">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <div className="pt-2">
              <Badge variant="active" className="text-xs font-bold">
                {user?.role === "admin" ? "System Administrator" : "Gold Member EV Driver"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Form Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="p-5 pb-3 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-900">
                Personal Credentials
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Your authenticated profile in the SpotSync mobility network.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input defaultValue={user?.name} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-1.5">
                <Label>Email Address</Label>
                <Input defaultValue={user?.email} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-1.5">
                <Label>Assigned Role</Label>
                <Input defaultValue={user?.role} readOnly className="bg-slate-50 uppercase font-mono" />
              </div>
            </CardContent>
          </Card>

          {/* Registered Vehicle Tag */}
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="p-5 pb-3 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center justify-between">
                <span>Default ANPR Vehicle</span>
                <Badge variant="available" className="text-xs font-bold">
                  Active Sync
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f7f2] text-[#0d5440]">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">Tesla Model 3 Dual Motor</p>
                    <p className="font-mono text-xs font-extrabold text-slate-700">7XYZ892 (California)</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-white text-xs font-semibold">
                  Primary
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
