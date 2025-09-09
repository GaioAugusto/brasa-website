import { useNavigate } from "react-router-dom";
import { VerifyAccountViewProps } from "./types";

type ComponentType = React.FC<VerifyAccountViewProps>;
export const VerifyAccountView: ComponentType = ({ status, ...props }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>Email verification</h2>
      {status === "idle" && (
        <>
          <p>Click the button below to confirm your email.</p>
          <button onClick={props.handleVerify}>Verify my email</button>
        </>
      )}
      {status === "loading" && <p>Verifying…</p>}
      {status === "success" && <p>✅ Verified! Redirecting to login…</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ {props.message}</p>}
    </div>
  );
};
