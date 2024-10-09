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
  // Cria o usuário
  const user = await db.user.create({
    data: {
      name,
      email,
      phone,
    },
  });

  // Recupera o cargo de administrador
  const role = await db.role.findFirst({
    where: { name: roleName },
  });

  if (!role) throw new Error(`Role ${roleName} not found`);

  // Verifica se a empresa existe
  const company = await db.company.findUnique({
    where: { id: companyId },
  });

  if (!company) throw new Error(`Company with ID ${companyId} not found`);

  // Cria o vínculo entre o usuário e o cargo de administrador
  const userRole = await db.userRole.create({
    data: {
      userId: user.id,
      roleId: role.id,
      companyId: company.id, // Usa o ID da empresa existente
    },
  });

  // Atualiza o legalResponsibleId da empresa se necessário
  await db.company.update({
    where: { id: company.id },
    data: {
      legalResponsibleId: userRole.id, // Define o usuário criado como responsável legal
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

  const exampleCompany = await db.company.create({
    data: {
      name: "Tech Solutions Ltda",
      email: "contact@techsolutions.com",
      cnpj: "12.345.678/0001-90",
      type: "Tecnologia",
      headquarters: "São Paulo",
      phone: "11 98765-4321",
      stateRegistration: "123456789",
      taxRegime: "Simples Nacional",
      address: "Avenida das Nações, 1000",
      neighborhood: "Centro",
      federativeUnit: "SP",
      cep: "01000-000",
      // legalResponsibleId: "", // Este campo deve ser preenchido após a criação do responsável legal
    },
  });

  // Criar o usuário com o cargo de administrador
  const adminUser = await createUserWithRole({
    name: "Leonardo Côrtes",
    email: "leonardo.cortes@struct.unb.br",
    phone: "11988888888",
    roleName: "administrador",
    companyId: exampleCompany.id,
  });

  console.log("Usuário administrador criado:", adminUser);
}

main().catch((e) => console.log(e));
