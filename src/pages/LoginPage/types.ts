import { FormEventHandler } from "react";

export interface LoginPageProps {}
export interface LoginPageViewProps {
  loading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}
