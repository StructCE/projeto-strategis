export type Role = {
  name: string;
};

export type RoleWithModules = {
  id: string;
  name: string;
  modules: { name: string; code: number }[];
};

export type RoleRouteInterfaces = {
  Role: Role;
  RoleWithModules: RoleWithModules;
};
