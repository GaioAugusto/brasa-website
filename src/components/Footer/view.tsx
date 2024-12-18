import { FooterViewProps } from "./types";

type ComponentType = React.FC<FooterViewProps>;
export const FooterView: ComponentType = () => {
  return (
    <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()} BRASA at UofT. All rights reserved.
      </p>
    </div>
  );
};
