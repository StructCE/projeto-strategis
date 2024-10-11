// CRIAR MODULES, ROLEMODULES AND ROLES
import { db } from "~/server/db";
import { modules } from "./seed-data/modules";
import { roles } from "./seed-data/roles";

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

async function createUser(props: {
  name: string;
  email: string;
  phone: string;
}) {
  const newUser = await db.user.create({
    data: {
      name: props.name,
      email: props.email,
      phone: props.phone,
    },
  });
  return newUser;
}

async function assignAdminRole(userId: string, companyId: string) {
  const adminRole = await db.role.findFirst({
    where: { name: "administrador" },
  });

  if (!adminRole) {
    throw new Error("O cargo de administrador não foi encontrado");
  }

  const userRole = await db.userRole.create({
    data: {
      userId: userId,
      roleId: adminRole.id,
      companyId: companyId,
    },
  });

  return userRole;
}

async function createUserWithRole({
  name,
  email,
  phone,
  roleName,
  companyId,
}: {
  name: string;
  email: string;
  phone: string;
  roleName: string;
  companyId: string;
}) {
  const user = await db.user.create({
    data: {
      name,
      email,
      phone,
    },
  });

  const role = await db.role.findFirst({
    where: { name: roleName },
  });

  if (!role) throw new Error(`Role ${roleName} not found`);

  const company = await db.company.findUnique({
    where: { id: companyId },
  });
  if (!company) throw new Error(`Company with ID ${companyId} not found`);

  await db.userRole.create({
    data: {
      userId: user.id,
      roleId: role.id,
      companyId: company.id,
    },
  });

  return user;
}

async function main() {
  // const createdModules = modules.map(async (module) => {
  //   const createdModule = await createModule(module);
  //   return createdModule;
  // });
  // await Promise.all(createdModules);

  // const createdRoles = roles.map(async (role) => {
  //   const createdRole = await createRole({ name: role.name });
  //   const createdRoleModules = await createRoleModules({
  //     roleId: createdRole.id,
  //     modules: role.modules,
  //   });
  //   return createdRoleModules;
  // });
  // await Promise.all(createdRoles);

  const companyStruct = await db.company.create({
    data: {
      name: "Struct EJ",
      email: "projetostrategis@gmail.com",
      cnpj: "21.803.569/0001-65",
      type: "Matriz",
      phone: "(32) 3025-0102",
      stateRegistration: "0771508800122",
      taxRegime: "Simples Nacional",
      address:
        "Campus Universitario Darcy Ribeiro S/n Univ de Brasilia Edif Predio SG",
      city: "Brasília",
      neighborhood: "Asa Norte",
      federativeUnit: "DF",
      cep: "70910-900",
      // legalResponsibleId: "",
    },
  });

  await createUserWithRole({
    name: "Leonardo Côrtes",
    email: "leonardo.cortes@struct.unb.br",
    phone: "(61) 99116-4633",
    roleName: "Administrador",
    companyId: companyStruct.id,
  });
  await createUserWithRole({
    name: "Matheus das Neves Fernandes",
    email: "matheusnf@struct.unb.br",
    phone: "(61) 99999-9999",
    roleName: "Administrador",
    companyId: companyStruct.id,
  });
  await createUserWithRole({
    name: "Guilherme Sampaio",
    email: "guilherme.sampaio@struct.unb.br",
    phone: "(61) 99999-9999",
    roleName: "Administrador",
    companyId: companyStruct.id,
  });
  await createUserWithRole({
    name: "Willyan Marques",
    email: "willyan.marques@struct.unb.br",
    phone: "(61) 99999-9999",
    roleName: "Administrador",
    companyId: companyStruct.id,
  });
}

main().catch((e) => console.log(e));
