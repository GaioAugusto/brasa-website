// VerifyPage.tsx (or VerifyAccount)
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { VerifyAccountProps } from "./types";
import { VerifyAccountView } from "./view";

type ComponentType = React.FC<VerifyAccountProps>;
export const VerifyAccount: ComponentType = () => {
  const navigate = useNavigate();
  const token = useMemo(
    () => new URLSearchParams(window.location.search).get("token"),
    []
  );
  const [status, setStatus] = useState<string>("idle");
  const [msg, setMsg] = useState<string>("");

  const handleVerify = async () => {
    if (!token) {
      setStatus("error");
      setMsg("Missing token.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/verifyEmail", {
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
    <VerifyAccountView
      status={status}
      message={msg}
      handleVerify={handleVerify}
    />
  );
};
