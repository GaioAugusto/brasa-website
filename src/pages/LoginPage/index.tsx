import { useState } from "react";
import { LoginPageProps } from "./types";
import { LoginPageView } from "./view";

type ComponentType = React.FC<LoginPageProps>;
export const LoginPage: ComponentType = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        headers: { "Content-Type": "application/json" }, // ✅ exact value
        body: JSON.stringify(body), // ✅ real JSON
      });

      if (!res.ok) {
        // API returns JSON only on handled errors (404/401), but a 500 will be text
        let msg = "Unexpected error";
        try {
          const err = await res.json();
          msg = err.error ?? msg;
        } catch {
          /* text/plain case */
        }
        throw new Error(msg);
      }

      alert("Login successful");
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
