import React, { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useLocale } from "../../contexts/Locale";
import { VerificationCodeModal } from "./components/VerificationCodeModal";
import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";

type ComponentType = React.FC<RegisterPageProps>;
export const RegisterPage: ComponentType = () => {
  const { register } = useAuth();
  const { commonLocale, templatesLocale } = useLocale();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const password = data.get("password") as string;
    const email = (data.get("email") as string).toLowerCase().trim();
    const confirmPassword = data.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!email.endsWith("@mail.utoronto.ca")) {
      setError("Please enter a UofT email.");
      setLoading(false);
      return;
    }

    try {
      await register({
        email,
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        studentId: data.get("studentId") as string,
        password,
      });

      setIsModalOpen(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <RegisterPageView
        loading={loading}
        handleSubmit={handleSubmit}
        error={error}
      />
      <VerificationCodeModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </React.Fragment>
  );
};
