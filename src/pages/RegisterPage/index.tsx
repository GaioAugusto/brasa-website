import React, { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { VerificationCodeModal } from "./components/VerificationCodeModal";
import { RegisterPageProps } from "./types";
import { RegisterPageView } from "./view";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<RegisterPageProps>;
export const RegisterPage: ComponentType = () => {
    const { register } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { templatesLocale } = useLocale();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        let shouldOpenModal = false;

        const data = new FormData(e.currentTarget);
        const password = data.get("password") as string;
        const email = (data.get("email") as string).toLowerCase().trim();
        const confirmPassword = data.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError(templatesLocale.get("passwordsDoNotMatch"));
            setLoading(false);
            return;
        }

        if (!email.endsWith("@mail.utoronto.ca")) {
            setError(templatesLocale.get("pleaseEnterUoftEmail"));
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
            shouldOpenModal = true;
        } catch (err: any) {
            if (
                err?.code === "UNCONFIRMED_USER" ||
                err?.code === "UNCONFIRMED_USER_RATE_LIMIT"
            ) {
                shouldOpenModal = true;
            }
            setError(err?.message || templatesLocale.get("couldNotCreateAccount"));
        } finally {
            setLoading(false);
        }

        if (shouldOpenModal) {
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
            <VerificationCodeModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </React.Fragment>
    );
};
