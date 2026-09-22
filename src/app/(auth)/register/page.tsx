"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { RouteGuard } from "@/components/layout/RouteGuard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Mail, Shield, User as UserIcon, Zap } from "lucide-react";

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "driver",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch {
      // Error handled in useAuth toast
    }
  };

  return (
    <RouteGuard redirectIfAuth>
      <Card className="border-slate-800 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-white tracking-tight">
            Create SpotSync Account
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Join the automated parking network with instant EV charging access
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Role Selector Tabs */}
            <div className="space-y-2">
              <Label className="text-slate-300">Account Type</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setValue("role", "driver")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                    selectedRole === "driver"
                      ? "border-[#00d084] bg-[#00d084]/15 text-[#00d084] shadow-sm shadow-[#00d084]/20"
                      : "border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>EV / Vehicle Driver</span>
                </button>
                <button
                  type="button"
                  onClick={() => setValue("role", "admin")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition-all ${
                    selectedRole === "admin"
                      ? "border-[#00d084] bg-[#00d084]/15 text-[#00d084] shadow-sm shadow-[#00d084]/20"
                      : "border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Hub Administrator</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Full Name
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#00d084]"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-400 font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#00d084]"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-400 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password (min 6 characters)
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#00d084]"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-rose-400 font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00d084] hover:bg-[#00b573] text-[#091e17] font-bold h-11 text-base shadow-lg shadow-[#00d084]/20 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#091e17] border-t-transparent"></span>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Complete Registration <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 pt-0">
            <p className="text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#00d084] hover:underline">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </RouteGuard>
  );
}
