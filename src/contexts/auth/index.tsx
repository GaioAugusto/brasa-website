// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../../types/user";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("brasa-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    const info = await fetch(
      `/api/utilities/getUserInfo?email=${encodeURIComponent(email)}`
    ).then((r) => r.json());
    setUser(info);
    localStorage.setItem("brasa-user", JSON.stringify(info));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("brasa-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
