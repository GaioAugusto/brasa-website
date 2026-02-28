import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
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
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const u = await getCurrentUser();
        setUser({ email: u.signInDetails?.loginId ?? "" } as any);

        const session = await fetchAuthSession();
        const t = session.tokens?.accessToken?.toString() ?? null;
        setToken(t);
      } catch {
        setUser(null);
        setToken(null);
      }
    })();
  }, []);

  const register = async (payload: RegisterPayload) => {
    try {
      await signUp({
        username: payload.email,
        password: payload.password,
        options: {
          userAttributes: {
            email: payload.email,
            given_name: payload.firstName,
            family_name: payload.lastName,
            "custom:studentId": payload.studentId,
          },
        },
      });
      setPendingEmail(payload.email);
    } catch (e: any) {
      setPendingEmail(payload.email);
      if (e?.name === "UsernameExistsException") {
        return;
      }
      throw e;
    }
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
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };

  const confirmPendingEmail = async (code: string) => {
    if (!pendingEmail) throw new Error("No pending email to confirm.");
    await confirmSignUp({
      username: pendingEmail,
      confirmationCode: code.trim(),
    });
    setPendingEmail(null);
  };

  const resendCode = async (email: string) => {
    await resendSignUpCode({ username: email });
  };

  const getAccessToken = async (): Promise<string> => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();
    if (!token) throw new Error("Not authenticated");
    return token;
  };

  const authedFetch = async (url: string, init: RequestInit = {}) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken?.toString();
    if (!token) throw new Error("Not authenticated");

    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${token}`);

    return fetch(url, { ...init, headers });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        pendingEmail,
        token,
        register,
        login,
        logout,
        confirmPendingEmail,
        resendCode,
        getAccessToken,
        authedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
