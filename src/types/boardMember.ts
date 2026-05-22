import { ModulesIdentifier } from "./strings/ModulesIdentifier";

export interface BoardMember {
  name: string;
  picture: string;
  major: string;
  year: keyof ModulesIdentifier["common"];
  position: keyof ModulesIdentifier["common"]; // Enforces valid keys
  city: string;
  linkedin?: string;
}
