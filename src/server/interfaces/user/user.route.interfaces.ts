type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type UserWithRoles = {
  id: string;
  name: string;
  email: string;
  phone: string;
  companies: string[];
  roles: string[];
};

export type UserRouteInterfaces = {
  User: User;
  UserWithRoles: UserWithRoles;
};
