import { useState } from "react";
import { ContactProps } from "./types";
import { ContactView } from "./view";

type ComponentType = React.FC<ContactProps>;
export const Contact: ComponentType = () => {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSuccessMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactView
      handleSubmit={handleSubmit}
      formData={formData}
      handleInputChange={handleInputChange}
      isSubmitting={isSubmitting}
      successMessage={successMessage}
    />
  );
};
