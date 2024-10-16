// CRIAR MODULES, ROLEMODULES AND ROLES
import { db } from "~/server/db";
import { adjustementReasons } from "./seed-data/adjustmentReasons";
import { categories } from "./seed-data/categories";
import { controlTypes } from "./seed-data/controlType";
import { modules } from "./seed-data/modules";
import { roles } from "./seed-data/roles";
import { sectorsOfUse } from "./seed-data/sectorOfUse";
import { units } from "./seed-data/units";

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

async function createCategory(props: { name: string }) {
  const createdCategory = await db.productCategory.create({
    data: { ...props },
  });
  return createdCategory;
}

async function createAdjustmentReason(props: { name: string }) {
  const createdReason = await db.adjustReason.create({
    data: { ...props },
  });
  return createdReason;
}

async function createSectorOfUse(props: { name: string }) {
  const createdSector = await db.useSector.create({
    data: { ...props },
  });
  return createdSector;
}

async function createControlType(props: { name: string }) {
  const createdControlType = await db.controlType.create({
    data: { ...props },
  });
  return createdControlType;
}

async function createUnit(props: {
  name: string;
  abbreviation: string;
  unitsPerPack: number;
}) {
  const createdUnit = await db.unit.create({
    data: { ...props },
  });
  return createdUnit;
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

  // const createdCategories = categories.map(async (category) => {
  //   const createdCategory = await createCategory({ name: category.name });
  //   return createdCategory;
  // });
  // await Promise.all(createdCategories);
  // const createdReasons = adjustementReasons.map(async (reason) => {
  //   const createdReason = await createAdjustmentReason({ name: reason.name });
  //   return createdReason;
  // });
  // await Promise.all(createdReasons);
  // const createdSectorOfUse = sectorsOfUse.map(async (sector) => {
  //   const createdSector = await createSectorOfUse({ name: sector.name });
  //   return createdSector;
  // });
  // await Promise.all(createdSectorOfUse);
  // const createdControlType = controlTypes.map(async (controlType) => {
  //   const createdControlType = await createControlType({
  //     name: controlType.name,
  //   });
  //   return createdControlType;
  // });
  // await Promise.all(createdControlType);
  // const createdUnits = units.map(async (unit) => {
  //   const createdUnit = await createUnit({
  //     name: unit.name,
  //     abbreviation: unit.abbreviation,
  //     unitsPerPack: unit.unitsPerPack,
  //   });
  //   return createdUnit;
  // });
  // await Promise.all(createdUnits);

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
