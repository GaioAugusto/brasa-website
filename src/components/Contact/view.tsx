import React, { useState } from "react";
import { ContactViewProps } from "./types";

type ComponentType = React.FC<ContactViewProps>;

export const ContactView: ComponentType = () => {
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
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-4">
          General Inquiries
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Want to get in touch? Fill out the form below and we’ll get back to
          you within 48 hours.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">(required)</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 p-3 w-full border rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">(required)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject <span className="text-red-500">(required)</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message <span className="text-red-500">(required)</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="mt-1 p-3 w-full border rounded-md focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "bg-green-300"
                  : "bg-green-600 hover:bg-green-700"
              } text-white px-6 py-3 rounded-md font-semibold shadow-md`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <p className="text-center mt-4 text-green-700 font-semibold">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
// import React, { useState } from "react";

// export const ContactView: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSuccessMessage("");

//     try {
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
//   };

//   return (
//     <section className="p-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           value={formData.subject}
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <textarea
//           name="message"
//           placeholder="Message"
//           value={formData.message}
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full h-32"
//         ></textarea>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//         {successMessage && (
//           <p className="text-green-500 mt-4">{successMessage}</p>
//         )}
//       </form>
//     </section>
//   );
// };
