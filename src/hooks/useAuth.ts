import { useAuthStore } from "../store/auth";

// Custom hook to abstract auth state logic from components.

export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  return { isAuthenticated, user, login, logout };
};
