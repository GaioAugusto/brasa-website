import { User } from "../../types/user";

export interface AuthContextType {
  user: User | null;
  pendingEmail: string | null;
  token: string | null;
  register: (payload: {
    email: string;
    firstName: string;
    lastName: string;
    studentId: string;
    password: string;
  }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  confirmPendingEmail: (code: string) => Promise<void>;
  resendCode(email: string): Promise<void>;
  getAccessToken: () => Promise<string>;
  authedFetch: (url: string, init?: RequestInit) => Promise<Response>;
}
