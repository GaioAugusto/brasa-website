import { ContactFormData } from "../../services/contactService";

export interface ContactProps {}
export interface ContactViewProps {
    contactFormData: ContactFormData;
    isSubmitting: boolean;
    successMessage: string;

    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
}
