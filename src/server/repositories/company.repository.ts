import { db } from "../db";
import type { CompanyRepositoryInterfaces } from "../interfaces/company/company.repository.interfaces";

async function getAll(props: CompanyRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters.cnpj) {
      conditions.push({ cnpj: { contains: filters.cnpj } });
    }
    if (filters.name) {
      conditions.push({ name: { contains: filters.name } });
    }
    if (filters.state) {
      conditions.push({ federativeUnit: { contains: filters.state } });
    }
    if (filters.taxRegime) {
      conditions.push({ taxRegime: { contains: filters.taxRegime } });
    }

    const filteredCompanies = await db.company.findMany({
      where: {
        AND: conditions,
      },
    });

    return filteredCompanies;
  }

  const companies = await db.company.findMany();
  return companies;
}

async function countRegisteredStocks(
  props: CompanyRepositoryInterfaces["CountRegisteredStocks"],
) {
  const stocks = await db.stock.count({
    where: {
      companyId: props.id,
    },
  });
  return stocks;
}

async function countRegisteredSuppliers(
  props: CompanyRepositoryInterfaces["CountRegisteredSuppliers"],
) {
  const { id, cnpj } = props;

  // Busca a empresa com base no ID ou CNPJ e conta os fornecedores associados
  const company = await db.company.findUnique({
    where: id ? { id } : { cnpj },
    include: {
      CompanySupplier: true, // Inclui os fornecedores associados
    },
  });

  // Se a empresa for encontrada, retorna o número de fornecedores associados; caso contrário, retorna 0
  return company ? company.CompanySupplier.length : 0;
}

async function countRegisteredUsers(
  props: CompanyRepositoryInterfaces["CountRegisteredUsers"],
) {
  const users = await db.userRole.count({
    where: {
      companyId: props.id,
    },
  });

  return users;
}

async function getOne(props: CompanyRepositoryInterfaces["GetOneProps"]) {
  const company = await db.company.findFirst({
    where: {
      OR: [
        {
          id: props.id,
        },
        { cnpj: props.cnpj },
      ],
    },
    include: {
      CompanySupplier: {
        include: {
          supplier: true,
        },
      },
      legalResponsible: true,
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

  return companyUsers;
}

async function getCompanySuppliers(
  props: CompanyRepositoryInterfaces["GetCompanySuppliersProps"],
) {
  const companySuppliers = await db.companySupplier.findMany({
    where: {
      companyId: props.id,
    },
    include: { supplier: { include: { contacts: true } } },
  });

  return companySuppliers;
}

async function getCompanyStocks(
  props: CompanyRepositoryInterfaces["GetCompanyStocksProps"],
) {
  const companyStocks = await db.stock.findMany({
    where: {
      companyId: props.id,
    },
    include: {
      company: true,
      legalResponsible: {
        include: {
          user: true,
        },
      },
    },
  });
  return companyStocks;
}

async function register(props: CompanyRepositoryInterfaces["RegisterProps"]) {
  const { suppliers, ...data } = props;
  const registeredCompany = await db.company.create({
    data: {
      ...data,
    },
  });

  const createdCompanySuppliers = suppliers.map(async (supplier) => {
    const createdCompanySupplier = await db.companySupplier.create({
      data: {
        companyId: registeredCompany.id,
        supplierId: supplier,
      },
    });
    return createdCompanySupplier;
  });

  await Promise.all(createdCompanySuppliers);
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
  const { suppliers, ...companyData } = props.data;
  const editedCompany = await db.company.update({
    where: {
      id: props.id,
    },
    data: {
      ...companyData,
    },
  });

  await db.companySupplier.deleteMany({
    where: {
      companyId: props.id,
    },
  });

  const newCompanySuppliers = suppliers.map(async (supplier) => {
    const newCompanySupplier = await db.companySupplier.create({
      data: {
        companyId: props.id,
        supplierId: supplier,
      },
    });
    return newCompanySupplier;
  });

  await Promise.all(newCompanySuppliers);

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
  getCompanyStocks,
  countRegisteredUsers,
  countRegisteredSuppliers,
  countRegisteredStocks,
};
