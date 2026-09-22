"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { RouteGuard } from "@/components/layout/RouteGuard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Mail, ShieldCheck, UserCheck } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || undefined;
  const isExpired = searchParams.get("expired") === "true";

  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data, redirectUrl);
    } catch {
      // Error handled in useAuth toast
    }
  };

  const handleFillDemo = (email: string, pass: string) => {
    setValue("email", email);
    setValue("password", pass);
  };

  return (
    <Card className="border-slate-800 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-white tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-400 text-sm">
          Enter your credentials to access your parking passes & telemetry
        </CardDescription>

        {isExpired && (
          <div className="mt-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs text-amber-300">
            Your session has expired. Please sign in again.
          </div>
        )}
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
            </div>
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
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In to SpotSync <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-2 border-t border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2">
              Quick Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo("driver@spotsync.io", "password123")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Driver Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo("admin@spotsync.io", "password123")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pt-0">
          <p className="text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#00d084] hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <RouteGuard redirectIfAuth>
      <Suspense fallback={<div className="text-white text-center">Loading login portal...</div>}>
        <LoginForm />
      </Suspense>
    </RouteGuard>
  );
}
