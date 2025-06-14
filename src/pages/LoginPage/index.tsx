import { LoginPageProps } from "./types";
import { LoginPageView } from "./view";

type ComponentType = React.FC<LoginPageProps>;
export const LoginPage: ComponentType = () => {
  return <LoginPageView />;
};
