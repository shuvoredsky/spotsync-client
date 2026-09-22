import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("spotsync_token", action.payload.token);
        localStorage.setItem("spotsync_user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        localStorage.removeItem("spotsync_token");
        localStorage.removeItem("spotsync_user");
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("spotsync_token");
        const userStr = localStorage.getItem("spotsync_user");
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr) as User;
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
          } catch {
            localStorage.removeItem("spotsync_token");
            localStorage.removeItem("spotsync_user");
          }
        }
      }
      state.isInitialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, initializeAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
