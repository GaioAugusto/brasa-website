import { useLocation, useNavigate } from "react-router-dom";
import { VerifyAccountProps } from "./types";
import { VerifyAccountView } from "./view";
import { useEffect, useState } from "react";

type ComponentType = React.FC<VerifyAccountProps>;
export const VerifyAccount: ComponentType = (props) => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMsg("Missing token.");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/auth/verifyEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(j.error || "Verification failed.");
        setStatus("success");
        // optional: auto-redirect after 1.5s
        setTimeout(() => navigate("/login"), 1500);
      } catch (e: any) {
        setStatus("error");
        setMsg(e.message);
      }
    })();
  }, [token, navigate]);

  if (status === "loading")
    return <div style={{ padding: 24 }}>Verifying your email…</div>;
  if (status === "error")
    return (
      <div style={{ padding: 24 }}>
        <h2>Verification failed</h2>
        <p>{msg}</p>
        <button onClick={() => navigate("/resend")}>Resend verification</button>
      </div>
    );

  return <VerifyAccountView />;
};
