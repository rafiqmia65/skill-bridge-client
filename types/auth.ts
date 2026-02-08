import { RoleType } from "@/constants/roles";

export enum Role {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  emailVerified?: boolean;
  image?: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role?: RoleType;
  image?: string | null;
};
