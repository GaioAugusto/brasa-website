export interface RegisterFormProps {
  readonly loading: boolean;
  readonly handleSubmit: React.FormEventHandler<HTMLFormElement>;
  readonly error: string | null;
}
export interface RegisterFormViewProps {
  readonly loading: boolean;
  readonly showPassword: boolean;
  readonly setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  readonly handleSubmit: React.FormEventHandler<HTMLFormElement>;
  readonly error: string | null;
}
