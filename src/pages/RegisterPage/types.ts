export interface RegisterPageProps {}
export interface RegisterPageViewProps {
  readonly loading: boolean;
  readonly handleSubmit: React.FormEventHandler<HTMLFormElement>;
  readonly error: string | null;
}
