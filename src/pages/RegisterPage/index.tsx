import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";

type ComponentType = React.FC<RegisterPageProps>;
export const RegisterPage: ComponentType = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    alert("Register functionality not implemented yet");
    e.preventDefault();
  };

  return <RegisterPageView handleSubmit={handleSubmit} />;
};
