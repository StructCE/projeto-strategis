
// CRIAR MODULES, ROLEMODULES AND ROLES
import { modules } from "./seed-data/modules";
import { roles } from "./seed-data/roles";
import { db } from "~/server/db";

async function createModule(props: {
  name: string;
  code: number;
  pagePath: string;
  allowedRouter: string;
}) {
  const createdModule = await db.module.create({
    data: { ...props },
  });
  return createdModule;
}

async function createRole(props: { name: string }) {
  const createdRole = await db.role.create({
    data: { ...props },
  });
  return createdRole;
}

async function createRoleModules(props: { roleId: string; modules: number[] }) {
  const createdRoleModules = props.modules.map(async (module) => {
    const createdRoleModule = await db.roleModule.create({
      data: {
        moduleCode: module,
        roleId: props.roleId,
      },
    });
    return createdRoleModule;
  });
  await Promise.all(createdRoleModules);
}

async function main() {
  const createdModules = modules.map(async (module) => {
    const createdModule = await createModule(module);
    return createdModule;
  });
  await Promise.all(createdModules);

  const createdRoles = roles.map(async (role) => {
    const createdRole = await createRole({ name: role.name });
    const createdRoleModules = await createRoleModules({
      roleId: createdRole.id,
      modules: role.modules,
    });
    return createdRoleModules;
  });
  await Promise.all(createdRoles);
}

main().catch((e) => console.log(e));
