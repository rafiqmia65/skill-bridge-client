export const role = {
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN",
} as const;

export type RoleType = (typeof role)[keyof typeof role];
