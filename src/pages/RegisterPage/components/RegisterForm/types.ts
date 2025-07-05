export interface RegisterFormProps {
  loading: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
export interface RegisterFormViewProps {
  loading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}
