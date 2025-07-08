import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";
import { useState } from "react";

type ComponentType = React.FC<RegisterPageProps>;
export const RegisterPage: ComponentType = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      await register({
        email: data.get("email") as string,
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        studentId: data.get("studentId") as string,
        password: data.get("password") as string,
      });

      navigate("/account");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <RegisterPageView loading={loading} handleSubmit={handleSubmit} />;
};
