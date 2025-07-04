import { useState } from "react";
import { LoginPageProps } from "./types";
import { LoginPageView } from "./view";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

type ComponentType = React.FC<LoginPageProps>;
export const LoginPage: ComponentType = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      await login(email, password);
      navigate("/account");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageView
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};
