export type User = {
  name: string;
  email: string;
  phone: string;
  companyId: string;
  roleId: string;
};

export type UserWithRoles = {
  id: string;
  name: string;
  email: string;
  phone: string;
  UserRole: { company: string; role: string }[];
};
