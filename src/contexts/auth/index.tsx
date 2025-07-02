// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../../types/user";
import { loginUser, registerUser } from "../../services/authService";
import { fetchUserInfo } from "../../services/userService";

interface AuthContextType {
  user: User | null;
  register: (payload: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Rehydrate on load
  useEffect(() => {
    const saved = localStorage.getItem("brasa-user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const register = async (payload: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    await registerUser(payload);
    await login(payload.email, payload.password);
  };

  const login = async (email: string, password: string) => {
    await loginUser({ email, password });

    const info = await fetchUserInfo(email);

    setUser(info);
    localStorage.setItem("brasa-user", JSON.stringify(info));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("brasa-user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
