import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { BrasaCard } from "../Account/components/BrasaCard";
import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";

type ComponentType = React.FC<RegisterPageProps>;
export const RegisterPage: ComponentType = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await register({
        email: data.get("email") as string,
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        password: data.get("password") as string,
      });

      navigate("/account");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return <RegisterPageView handleSubmit={handleSubmit} />;
};
