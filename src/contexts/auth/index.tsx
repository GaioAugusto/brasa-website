import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../../types/user";
import { loginUser, registerUser } from "../../services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  register: (payload: {
    email: string;
    firstName: string;
    lastName: string;
    studentId: string;
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Restore user and token from localStorage on mount
    const savedUser = localStorage.getItem("brasa-user");
    const savedToken = localStorage.getItem("brasa-token");
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const register = async (payload: {
    email: string;
    firstName: string;
    lastName: string;
    studentId: string;
    password: string;
  }) => {
    await registerUser(payload);
  };

  const login = async (email: string, password: string) => {
    // Login and receive JWT token
    const response = await loginUser({ email, password });

    // Store token and user data
    setToken(response.token);
    setUser(response.user);
    
    localStorage.setItem("brasa-token", response.token);
    localStorage.setItem("brasa-user", JSON.stringify(response.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("brasa-user");
    localStorage.removeItem("brasa-token");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
