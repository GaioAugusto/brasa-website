import { HomeProps } from "./types";
import { HomeView } from "./view";

type ComponentType = React.FC<HomeProps>;
export const Home: ComponentType = () => {
  return <HomeView />;
};
