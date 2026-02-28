import {
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { RegisterPayload } from "../../services/authService";
import { User } from "../../types/user";
import { AuthContextType } from "./types";

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

  const register = async (payload: RegisterPayload) => {
    await signUp({
      username: payload.email,
      password: payload.password,
      options: {
        userAttributes: {
          email: payload.email,
          given_name: payload.firstName,
          family_name: payload.lastName,
          "custom:studentId": payload.studentId, // if you create custom attribute
        },
      },
    });
  };

  const login = async (email: string, password: string) => {
    await signIn({
      username: email,
      password,
    });

    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();

    if (!token) throw new Error("No token returned");

    const cognitoUser = await getCurrentUser();

    setToken(token);
    setUser({
      email: cognitoUser.signInDetails?.loginId ?? email,
    } as any);

    localStorage.setItem("brasa-token", token);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
