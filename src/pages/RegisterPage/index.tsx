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

    setIsModalOpen(true);
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
