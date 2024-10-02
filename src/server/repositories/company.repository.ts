import { db } from "../db";
import type { CompanyRepositoryInterfaces } from "../interfaces/company/company.repository.interfaces";

async function getAll() {
  const companies = await db.company.findMany();
  return companies;
}

async function getOne(props: CompanyRepositoryInterfaces["GetOneProps"]) {
  const company = await db.company.findFirst({
    where: {
      id: props.id,
    },
  });
  return company;
}

async function getCompanyUsers(
  props: CompanyRepositoryInterfaces["GetCompanyUsersProps"],
) {
  const companyUsers = await db.company.findFirst({
    where: {
      id: props.id,
    },
    include: {
      UserRole: {
        include: {
          user: true,
          role: true,
        },
      },
    },
  });
  const serializedCompany = companyUsers?.UserRole.map((companyUser) => ({
    name: companyUser.user.name,
    email: companyUser.user.email,
    role: companyUser.role.name,
    company: companyUsers.name,
  }));
  return serializedCompany;
}

async function getCompanySuppliers(
  props: CompanyRepositoryInterfaces["GetCompanySuppliersProps"],
) {
  const companySuppliers = await db.supplier.findMany({
    where: {
      UserRole: {
        every: {
          companyId: props.id,
        },
      },
    },
    include: {
      UserRole: {
        include: {
          user: true,
          role: true,
        },
      },
    },
  });
  const serializedSuppliers = companySuppliers.map((supplier) => ({
    cnpj: supplier.cnpj,
    name: supplier.name,
    address: supplier.address,
    phone: supplier.phone,
    stateRegistration: supplier.stateRegistration,
    neighborhood: supplier.neighborhood,
    city: supplier.city,
    federativeUnit: supplier.federativeUnit,
    cep: supplier.cep,
    contacts: supplier.UserRole.map((userRole) => ({
      id: userRole.user.id,
      name: userRole.user.name,
      email: userRole.user.email,
      phone: userRole.user.phone,
      cargo: userRole.role.name,
    })),
  }));
  return serializedSuppliers;
}

async function register(props: CompanyRepositoryInterfaces["RegisterProps"]) {
  const registeredCompany = await db.company.create({
    data: {
      ...props,
    },
  });
  return registeredCompany;
}

async function remove(props: CompanyRepositoryInterfaces["DeleteProps"]) {
  const deletedCompany = await db.company.delete({
    where: {
      id: props.id,
    },
  });
  return deletedCompany;
}

async function edit(props: CompanyRepositoryInterfaces["EditProps"]) {
  const editedCompany = await db.company.update({
    where: {
      id: props.id,
    },
    data: {
      ...props.data,
    },
  });

  return editedCompany;
}

export const CompanyRepository = {
  getAll,
  getOne,
  register,
  remove,
  edit,
  getCompanyUsers,
  getCompanySuppliers,
};
