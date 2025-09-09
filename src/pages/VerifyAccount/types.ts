export interface VerifyAccountProps {}
export interface VerifyAccountViewProps {
  readonly status: string;
  readonly message: string;

  readonly handleVerify: () => Promise<void>;
}
