import { User } from "../../types/user";

export interface AuthContextType {
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
