export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type UserWithRoles = {
  id: string;
  name: string;
  email: string;
  phone: string;
  UserRole: { companyId: string; roleId: string }[];
};

export type UserRouteInterfaces = {
  User: User;
  UserWithRoles: UserWithRoles;
};
