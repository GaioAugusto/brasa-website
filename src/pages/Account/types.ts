export interface AccountProps {
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
}
export interface AccountViewProps {
  readonly email?: string;
  readonly firstName: string | undefined;
  readonly lastName: string | undefined;
}
