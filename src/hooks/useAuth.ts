import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, logout as logoutAction } from "@/store/slices/authSlice";
import { authService } from "@/services/auth.service";
import { LoginRequest, RegisterRequest } from "@/types/auth.types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, token, isAuthenticated, isInitialized, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const [submitting, setSubmitting] = useState(false);

  const login = async (credentials: LoginRequest, redirectUrl?: string) => {
    try {
      setSubmitting(true);
      const res = await authService.login(credentials);
      if (res.success && res.data) {
        dispatch(
          setCredentials({
            token: res.data.token,
            user: {
              id: res.data.user.id,
              name: res.data.user.name,
              email: res.data.user.email,
              role: res.data.user.role,
            },
          })
        );
        toast.success(res.message || "Logged in successfully!");
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (res.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        return res.data;
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.errors || "Failed to log in";
      toast.error(msg);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setSubmitting(true);
      const res = await authService.register(data);
      if (res.success && res.data) {
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
        return res.data;
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.errors || "Registration failed";
      toast.error(msg);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.info("You have been logged out");
    router.push("/login");
  };

  return {
    user,
    token,
    isAuthenticated,
    isInitialized,
    isLoading: isLoading || submitting,
    isAdmin: user?.role === "admin",
    isDriver: user?.role === "driver",
    login,
    register,
    logout,
  };
}
