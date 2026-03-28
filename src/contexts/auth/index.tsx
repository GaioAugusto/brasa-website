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
import {
  ExternalRegisterPayload,
  RegisterPayload,
  registerUserInExternalApi,
} from "../../services/authService";
import { User } from "../../types/user";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType>(null!);
const RESEND_CODE_COOLDOWN_SECONDS = 30;

interface PendingSignUpData {
  sub?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  studentId: string;
}

function mapResendError(error: any): Error {
  if (error?.name === "LimitExceededException") {
    const rateLimitError: any = new Error(
      `A confirmation code was recently sent. Please wait ${RESEND_CODE_COOLDOWN_SECONDS} seconds and try again.`,
    );
    rateLimitError.code = "UNCONFIRMED_USER_RATE_LIMIT";
    return rateLimitError;
  }

  if (
    error?.name === "InvalidParameterException" ||
    error?.name === "NotAuthorizedException"
  ) {
    return new Error("This account is already confirmed. Please log in.");
  }

  if (typeof error?.message === "string" && error.message.trim().length > 0) {
    return new Error(error.message);
  }

  return new Error("Could not resend confirmation code.");
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingSignUpData, setPendingSignUpData] =
    useState<PendingSignUpData | null>(null);

  const hydrateSession = async (emailFallback: string) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (!token) {
      throw new Error(
        "Signed in, but no ID token was returned. Please log in again.",
      );
    }

    const cognitoUser = await getCurrentUser();

    setIdToken(token);
    setUser({
      email: cognitoUser.signInDetails?.loginId ?? emailFallback,
    } as any);

    return { idToken: token, cognitoUser };
  };

  const ensureAuthenticated = async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();

    try {
      const existingSession = await fetchAuthSession();
      const existingToken = existingSession.tokens?.idToken?.toString();

      if (existingToken) {
        const existingUser = await getCurrentUser();
        const existingEmail =
          existingUser.signInDetails?.loginId?.toLowerCase().trim() ?? "";

        if (existingEmail === normalizedEmail) {
          setIdToken(existingToken);
          setUser({ email: existingEmail } as any);
          return {
            idToken: existingToken,
            cognitoUser: existingUser,
          };
        }

        await signOut();
      }
    } catch {}

    const signInResult = await signIn({
      username: normalizedEmail,
      password,
    });

    if (!signInResult.isSignedIn) {
      throw new Error(
        "Additional sign-in step required. Please complete the challenge and try again.",
      );
    }

    return hydrateSession(normalizedEmail);
  };

  useEffect(() => {
    (async () => {
      try {
        const u = await getCurrentUser();
        setUser({ email: u.signInDetails?.loginId ?? "" } as any);

        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString() ?? null;
        setIdToken(token);
      } catch {
        setUser(null);
        setIdToken(null);
      }
    })();
  }, []);

  const register = async (payload: RegisterPayload) => {
    setPendingSignUpData(null);
    setPendingEmail(null);

    try {
      const signUpResult = await signUp({
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

      const cognitoSub = signUpResult.userId;
      if (!cognitoSub) {
        throw new Error("Could not get Cognito user id from signup response.");
      }

      setPendingSignUpData({
        sub: cognitoSub,
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        studentId: payload.studentId,
      });

      setPendingEmail(payload.email);
    } catch (e: any) {
      if (e?.name === "UsernameExistsException") {
        setPendingEmail(payload.email);
        setPendingSignUpData({
          email: payload.email,
          password: payload.password,
          firstName: payload.firstName,
          lastName: payload.lastName,
          studentId: payload.studentId,
        });

        try {
          await resendSignUpCode({ username: payload.email });
        } catch (resendError: any) {
          throw mapResendError(resendError);
        }

        const unconfirmedUserError: any = new Error(
          "This account already exists but is not confirmed. A new verification code has been sent.",
        );
        unconfirmedUserError.code = "UNCONFIRMED_USER";
        throw unconfirmedUserError;
      }
      throw e;
    }
  };

  const login = async (email: string, password: string) => {
    await ensureAuthenticated(email, password);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIdToken(null);
    setPendingEmail(null);
    setPendingSignUpData(null);
  };

  const confirmPendingEmail = async (code: string) => {
    if (!pendingEmail) throw new Error("No pending email to confirm.");
    if (!pendingSignUpData) {
      throw new Error("Missing sign-up session data. Please sign up again.");
    }

    await confirmSignUp({
      username: pendingEmail,
      confirmationCode: code.trim(),
    });

    let idToken;
    let cognitoUserId: string | undefined;
    try {
      const sessionData = await ensureAuthenticated(
        pendingSignUpData.email,
        pendingSignUpData.password,
      );
      idToken = sessionData.idToken;
      cognitoUserId = sessionData.cognitoUser.userId;
    } catch (error: any) {
      const message = error?.message || "Could not sign in after confirmation.";
      throw new Error(
        `Account confirmed, but automatic sign-in failed: ${message}`,
      );
    }

    const externalPayload: ExternalRegisterPayload = {
      // sub: pendingSignUpData.sub || cognitoUserId || "",
      // email: pendingSignUpData.email,
      firstName: pendingSignUpData.firstName,
      lastName: pendingSignUpData.lastName,
      studentId: pendingSignUpData.studentId,
    };

    if (!(pendingSignUpData || cognitoUserId)) {
      throw new Error(
        "Authenticated successfully, but could not determine Cognito user id.",
      );
    }

    await registerUserInExternalApi(externalPayload, idToken);

    setPendingEmail(null);
    setPendingSignUpData(null);
  };

  const resendCode = async (email: string) => {
    try {
      await resendSignUpCode({ username: email });
    } catch (error: any) {
      throw mapResendError(error);
    }
  };

  const getIdToken = async (): Promise<string> => {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    if (!token) throw new Error("Not authenticated");
    return token;
  };

  const authedFetch = async (url: string, init: RequestInit = {}) => {
    const token = await getIdToken();

    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${token}`);

    return fetch(url, { ...init, headers });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        pendingEmail,
        idToken,
        register,
        login,
        logout,
        confirmPendingEmail,
        resendCode,
        getIdToken,
        authedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
