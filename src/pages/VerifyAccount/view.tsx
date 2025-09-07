import { useNavigate } from "react-router-dom";
import { VerifyAccountViewProps } from "./types";

type ComponentType = React.FC<VerifyAccountViewProps>;
export const VerifyAccountView: ComponentType = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>Email verified ✅</h2>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
};
