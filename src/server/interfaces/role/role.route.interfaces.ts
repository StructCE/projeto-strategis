type Role = {
  name: string;
};

type RoleWithModules = {
  name: string;
  modules: string[];
};

export type RoleRouteInterfaces = {
  Role: Role;
  RoleWithModules: RoleWithModules;
};
