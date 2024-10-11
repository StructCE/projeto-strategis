type Role = {
  name: string;
};

type RoleWithModules = {
  id: string;
  name: string;
  modules: string[];
};

export type RoleRouteInterfaces = {
  Role: Role;
  RoleWithModules: RoleWithModules;
};
