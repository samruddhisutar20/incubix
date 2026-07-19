import type { ReactNode } from "react";

export type AuthRole = "administrator" | "founder" | "mentor";

export interface RoleConfig {
  id: AuthRole;
  label: string;
  description: string;
  icon: ReactNode;
}
