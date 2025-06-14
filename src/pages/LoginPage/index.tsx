import { useState } from "react";
import { LoginPageProps } from "./types";
import { LoginPageView } from "./view";

type ComponentType = React.FC<LoginPageProps>;
export const LoginPage: ComponentType = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget; // the <form> element
    const data = new FormData(form); // grab every field

    const email = data.get("email");
    const password = data.get("password");
    const remember = data.get("remember");

    // Now you can send `{ email, password, remember: !!remember }` to your API.
  };

  return (
    <LoginPageView
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleSubmit={handleSubmit}
    />
  );
};
