export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactProps {}
export interface ContactViewProps {
  formData: FormData;
  isSubmitting: boolean;
  successMessage: string;

  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
