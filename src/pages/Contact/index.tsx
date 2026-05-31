import { useState } from "react";
import { useLocale } from "../../contexts/Locale";
import { contactFormRequest } from "../../services/contactService";
import { ContactProps } from "./types";
import { ContactView } from "./view";

type ComponentType = React.FC<ContactProps>;
export const Contact: ComponentType = () => {
    const { templatesLocale } = useLocale();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage("");

        const requestResult = await contactFormRequest(formData);

        if (requestResult) {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                subject: "",
                message: "",
            });
            setSuccessMessage(templatesLocale.get("contactSuccessMessage"));
        } else {
            setSuccessMessage(templatesLocale.get("contactErrorMessage"));
        }
        setIsSubmitting(false);
    };

    return (
        <ContactView
            handleSubmit={handleSubmit}
            contactFormData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
            successMessage={successMessage}
        />
    );
};
