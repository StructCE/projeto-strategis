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
  UserRole: {
    id: string;
    companyId: string;
    roleId: string;
    company: {
      id: string;
      name: string;
    };
    role: {
      id: string;
      name: string;
      modules: {
        id: string;
        name: string;
        pagePath: string;
        allowedRouter: string;
      }[];
    };
  }[];
};

export type UserRouteInterfaces = {
  User: User;
  UserWithRoles: UserWithRoles;
};
