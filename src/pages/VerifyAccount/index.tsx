// VerifyPage.tsx (or VerifyAccount)
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { VerifyAccountProps } from "./types";

type ComponentType = React.FC<VerifyAccountProps>;
export const VerifyAccount: ComponentType = () => {
  const navigate = useNavigate();
  const token = useMemo(
    () => new URLSearchParams(window.location.search).get("token"),
    []
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [msg, setMsg] = useState("");

  const handleVerify = async () => {
    if (!token) {
      setStatus("error");
      setMsg("Missing token.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest", // helps server distinguish
        },
        body: JSON.stringify({ token }),
        credentials: "include",
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Verification failed.");
      setStatus("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (e: any) {
      setStatus("error");
      setMsg(e.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Email verification</h2>
      {status === "idle" && (
        <>
          <p>Click the button below to confirm your email.</p>
          <button onClick={handleVerify}>Verify my email</button>
        </>
      )}
      {status === "loading" && <p>Verifying…</p>}
      {status === "success" && <p>✅ Verified! Redirecting to login…</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ {msg}</p>}
    </div>
  );
};
