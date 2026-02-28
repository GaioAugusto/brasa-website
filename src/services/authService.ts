export interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  studentId: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    studentId: string;
    verified: boolean;
  };
}
