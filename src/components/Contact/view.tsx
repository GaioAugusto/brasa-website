import React from "react";
import { ContactViewProps } from "./types";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<ContactViewProps>;

export const ContactView: ComponentType = ({
  handleSubmit,
  formData,
  handleInputChange,
  isSubmitting,
  successMessage,
}) => {
  const { commonLocale, templatesLocale } = useLocale();

  return (
    <section className="bg-gray-100 py-12 px-4 h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-4">
          {commonLocale.get("generalInquiries")}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {templatesLocale.get("generalInquiresDescription")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                {commonLocale.get("firstName")}{" "}
                <span className="text-red-500">(required)</span>
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
                {commonLocale.get("lastName")}
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
              {commonLocale.get("emailAddress")}{" "}
              <span className="text-red-500">(required)</span>
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
              {commonLocale.get("subject")}
              <span className="text-red-500">(required)</span>
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
              {commonLocale.get("message")}{" "}
              <span className="text-red-500">(required)</span>
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
