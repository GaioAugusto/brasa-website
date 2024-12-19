import { DividerViewProps } from "./types";

type ComponentType = React.FC<DividerViewProps>;
export const DividerView: ComponentType = () => {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className={`h-0.5 w-3/4 bg-black opacity-50 rounded`}></div>
    </div>
  );
};
