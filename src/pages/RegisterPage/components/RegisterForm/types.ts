export interface RegisterFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
export interface RegisterFormViewProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
