import { useState } from "react";
import { RegisterFormProps } from "./types";
import { RegisterFormView } from "./view";

type ComponentType = React.FC<RegisterFormProps>;
export const RegisterForm: ComponentType = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <RegisterFormView
      loading={props.loading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleSubmit={props.handleSubmit}
      error={props.error}
    />
  );
};
