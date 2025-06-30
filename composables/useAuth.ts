import { ref } from "vue";
import type { Ref } from "vue";
import type { User } from "../types";

// Global state for user authentication
const globalUser: Ref<User | null> = ref(null);

export const useAuth = () => {
  const user = globalUser;

  // Simple getters instead of computed
  const getIsLoggedIn = () => !!user.value;
  const getIsAdmin = () => user.value?.role === "admin";

  const login = async (email: string, password: string) => {
    try {
      // @ts-ignore: Nuxt $fetch is available at runtime
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (response && response.error) {
        throw new Error(response.error);
      }

      if (response && response.data && response.data.user) {
        user.value = response.data.user;
        globalUser.value = response.data.user; // Update global state

        // Also store in localStorage as fallback
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-user", JSON.stringify(response.data.user));
        }
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // @ts-ignore: Nuxt $fetch is available at runtime
      const response = await $fetch("/api/auth/register", {
        method: "POST",
        body: { name, email, password },
      });

      if (response && response.error) {
        throw new Error(response.error);
      }

      if (response && response.data && response.data.user) {
        user.value = response.data.user;
        globalUser.value = response.data.user; // Update global state

        // Also store in localStorage as fallback
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-user", JSON.stringify(response.data.user));
        }
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      // @ts-ignore: Nuxt $fetch is available at runtime
      await $fetch("/api/auth/logout", { method: "POST" });
      user.value = null;
      globalUser.value = null; // Update global state

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-user");
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Logout failed" };
    }
  };

  const checkAuth = async () => {
    try {
      // First try the API
      // @ts-ignore: Nuxt $fetch is available at runtime
      const response = await $fetch("/api/auth/me");
      if (response && response.data && response.data.user) {
        user.value = response.data.user;
        globalUser.value = response.data.user; // Update global state
        return { success: true };
      }
    } catch (error) {
      console.log("API auth check failed, trying localStorage fallback");

      // Fallback to localStorage if API fails
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("auth-user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            user.value = parsedUser;
            globalUser.value = parsedUser; // Update global state
            return { success: true };
          } catch (e) {
            console.error("Failed to parse stored user:", e);
          }
        }
      }

      user.value = null;
      globalUser.value = null; // Update global state
      return { success: false };
    }
  };

  return {
    user,
    isLoggedIn: getIsLoggedIn,
    isAdmin: getIsAdmin,
    login,
    register,
    logout,
    checkAuth,
  };
};
