import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch, ApiUser, clearStoredToken, getStoredToken, postJson, setStoredToken } from "@/lib/api";

const isDevMode = import.meta.env.VITE_DEV_MODE === "true";

interface AuthContextType {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [loading, setLoading] = useState(true);

  const signInDevUser = async () => {
    const data = await postJson<{ token: string; user: ApiUser }>(
      "/auth/login",
      {
        email: "demo@agrivision.local",
        password: "devmode123",
      },
      false,
    );
    setStoredToken(data.token);
    setToken(data.token);
    setUser(data.user);
  };

  useEffect(() => {
    const bootstrap = async () => {
      const existingToken = getStoredToken();

      if (!existingToken) {
        if (isDevMode) {
          try {
            await signInDevUser();
          } catch {
            clearStoredToken();
            setToken(null);
            setUser(null);
          } finally {
            setLoading(false);
          }
          return;
        }

        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch<{ user: ApiUser }>("/auth/me");
        setToken(existingToken);
        setUser(data.user);
      } catch {
        clearStoredToken();
        setToken(null);
        setUser(null);
        if (isDevMode) {
          try {
            await signInDevUser();
          } catch {
            clearStoredToken();
            setToken(null);
            setUser(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    void bootstrap();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await postJson<{ token: string; user: ApiUser }>("/auth/login", { email, password }, false);
    setStoredToken(data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const data = await postJson<{ token: string; user: ApiUser }>("/auth/signup", { name, email, password }, false);
    setStoredToken(data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const signOut = () => {
    clearStoredToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token && user),
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
