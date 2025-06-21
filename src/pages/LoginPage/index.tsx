import { useState } from "react";
import { LoginPageProps } from "./types";
import { LoginPageView } from "./view";
import { Account } from "../Account";
import { useNavigate } from "react-router-dom";

type ComponentType = React.FC<LoginPageProps>;
export const LoginPage: ComponentType = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const body = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let msg = "Unexpected error";
        try {
          const err = await res.json();
          msg = err.error ?? msg;
        } catch {}
        throw new Error(msg);
      }

      navigate("/account", { state: { email: body.email } });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <LoginPageView
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleSubmit={handleSubmit}
    />
  );
};
