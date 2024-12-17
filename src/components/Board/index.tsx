import { BoardProps } from "./types";
import { BoardView } from "./view";

type ComponentType = React.FC<BoardProps>;
export const Board: ComponentType = () => {
  return <BoardView />;
};
