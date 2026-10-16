"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { INITIAL_USER } from "@/lib/mockData";
import { STORAGE_KEY } from "@/lib/constants";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (password === "wrongpassword") {
      throw new Error("Invalid email or password.");
    }

    const cleanEmail = email.trim().toLowerCase();

    const name =
      cleanEmail === INITIAL_USER.email.toLowerCase()
        ? INITIAL_USER.name
        : cleanEmail
            .split("@")[0]
            .replace(".", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) || INITIAL_USER.name;

    const loggedInUser: User = {
      id: INITIAL_USER.id,
      name: name,
      email: cleanEmail,
    };

    setUser(loggedInUser);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    } catch {
      // Storage may be unavailable.
    }
  };

  const logout = () => {
    setUser(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be unavailable.
    }

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
