export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

const baseUrl = process.env.REACT_APP_USERS_API_BASE_URL ?? "";
export const contactFormRequest = async (formData: ContactFormData) => {
    try {
        const response = await fetch(`${baseUrl}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return response.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSuccessMessage("Your message has been sent successfully!");
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           subject: "",
//           message: "",
//         });
//       } else {
//         setSuccessMessage("An error occurred. Please try again.");
//       }
//     } catch (error) {
//       setSuccessMessage("An error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
