type UserRole = {
  id: string;
  userId: string;
  roleId: string;
  companyId: string;
  supplierId: string | null;
};

export type UserRoleRouteInterfaces = {
  UserRole: UserRole;
};
