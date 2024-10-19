import { db } from "../db";
import type { CompanyRepositoryInterfaces } from "../interfaces/company/company.repository.interfaces";

async function getAll(props: CompanyRepositoryInterfaces["GetAllProps"]) {
  const { filters } = props;
  const companies = await db.company.findMany({
    where: {
      AND: [
        { cnpj: { contains: filters.cnpj } },
        { name: { contains: filters.name } },
        { federativeUnit: { contains: filters.state } },
        { taxRegime: { contains: filters.taxRegime } },
      ],
    },
  });
  return companies;
}

async function countRegisteredProducts(
  props: CompanyRepositoryInterfaces["CountRegisteredProducts"],
) {
  const registeredProducts = await db.product.count({
    where: {
      shelf: {
        cabinet: {
          StockCabinet: {
            every: {
              stock: {
                companyId: props.id,
              },
            },
          },
        },
      },
    },
  });
  return registeredProducts;
}

async function countRegisteredSuppliers(
  props: CompanyRepositoryInterfaces["CountRegisteredProducts"],
) {
  // const registeredSuppliers = await db.contact.count({
  //   where: {
  //     companyId: props.id, // companyId esta comentado no bd
  //   },
  //   select: {
  //     supplierId: true,
  //   },
  // });
  return 10;
}

async function countLowStockProducts(
  props: CompanyRepositoryInterfaces["CountRegisteredProducts"],
) {
  const products = await db.product.findMany({
    where: {
      shelf: {
        cabinet: {
          StockCabinet: {
            every: {
              stock: {
                companyId: props.id,
              },
            },
          },
        },
      },
    },
  });

  return products.filter(
    (product) => product.currentStock / product.minimunStock <= 1.2,
  ).length; // Considerando 'baixo estoque' como até 120% do estoque minimo TODO verificar parametro correto
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

  return companyUsers;
}

async function getCompanySuppliers(
  props: CompanyRepositoryInterfaces["GetCompanySuppliersProps"],
) {
  const companySuppliers = await db.supplier.findMany({
    where: {
      Contact: {
        every: {
          companyId: props.id,
        },
      },
    },
    include: {
      Contact: true,
    },
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
  });
  return companyStocks;
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
  getCompanyStocks,
  countRegisteredProducts,
  countRegisteredSuppliers,
  countLowStockProducts,
};
