import { User } from "../../../../types/user";

export interface BrasaCardProps {
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
}
export interface BrasaCardViewProps {
  readonly user?: User;
}
