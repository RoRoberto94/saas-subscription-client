import { create } from "zustand";
import { persist } from "zustand/middleware";
import { socket } from "../lib/socket";

interface User {
  id: string;
  email: string;
  createdAt: string;
  role: "USER" | "ADMIN";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        localStorage.setItem("authToken", token);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("authToken");
        if (socket.connected) {
          socket.disconnect();
          console.log("[DEBUG] Socket disconnected on logout.");
        }
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    }
  )
);
