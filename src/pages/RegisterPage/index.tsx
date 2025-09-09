import { useAuth } from "../../contexts/auth";
import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";
import { useState } from "react";
import React from "react";
import { Modal, Typography } from "antd";
import { useLocale } from "../../contexts/Locale";

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
    const confirmPassword = data.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await register({
        email: data.get("email") as string,
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        studentId: data.get("studentId") as string,
        password,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  return (
    <React.Fragment>
      <RegisterPageView
        loading={loading}
        handleSubmit={handleSubmit}
        error={error}
      />
      <Modal
        title={commonLocale.get("emailVerification")}
        closable
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Typography>
          {templatesLocale.get("emailVerificationDescription")}
        </Typography>
      </Modal>
    </React.Fragment>
  );
};
