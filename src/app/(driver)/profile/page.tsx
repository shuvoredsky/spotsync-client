"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { uploadService } from "@/services/upload.service";
import { API_BASE_URL } from "@/lib/constants";
import { Camera, Car, CheckCircle2, Loader2, Mail, Shield, User, Zap, AlertCircle } from "lucide-react";

export default function DriverProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset status
    setUploadStatus(null);

    // Client-side size check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus({
        type: "error",
        message: "Image exceeds 5MB size limit. Please choose a smaller file.",
      });
      return;
    }

    try {
      setIsUploading(true);
      const res = await uploadService.uploadImage(file);
      if (res.success && res.data?.url) {
        setAvatarUrl(res.data.url);
        setUploadStatus({
          type: "success",
          message: "Profile avatar uploaded successfully!",
        });
      } else {
        setUploadStatus({
          type: "error",
          message: res.message || "Failed to upload image",
        });
      }
    } catch (err: any) {
      setUploadStatus({
        type: "error",
        message: err.response?.data?.message || err.response?.data?.errors || "Failed to upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
      // Reset input value so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const fullAvatarUrl = avatarUrl
    ? avatarUrl.startsWith("http")
      ? avatarUrl
      : `${API_BASE_URL}${avatarUrl}`
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Driver Profile & Vehicles
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your account credentials, profile photo, registered vehicle license plates, and ANPR fast pass tags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Profile Avatar Card */}
        <div className="md:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-4 shadow-sm">
          <div className="relative mx-auto h-24 w-24 group">
            {fullAvatarUrl ? (
              <img
                src={fullAvatarUrl}
                alt={user?.name || "Driver Avatar"}
                className="h-24 w-24 rounded-full object-cover shadow-md border-2 border-emerald-500"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0d5440] text-3xl font-black text-white shadow-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Upload Hover Overlay Trigger */}
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={isUploading}
              aria-label="Upload profile photo"
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                <Camera className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          <div className="space-y-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="text-xs font-semibold h-8 px-3 border-slate-200 hover:bg-slate-50 text-slate-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                  Change Photo
                </>
              )}
            </Button>
            <p className="text-[11px] text-slate-400">JPEG, PNG, WebP up to 5MB</p>
          </div>

          {uploadStatus && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 text-left ${
                uploadStatus.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {uploadStatus.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              )}
              <span>{uploadStatus.message}</span>
            </div>
          )}

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
