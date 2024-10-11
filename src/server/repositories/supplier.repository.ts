import { db } from "../db";
import type { SupplierRepositoryInterfaces } from "../interfaces/supplier/supplier.repository.interfaces";

async function getAll(props: SupplierRepositoryInterfaces["GetAll"]) {
  const { filters } = props;

  // Construct the `where` clause conditionally, excluding empty filters
  const whereClause: any = {
    AND: [],
  };

  // if (filters.company != "") {
  //   whereClause.AND.push({
  //     UserRole: {
  //       every: {
  //         company: {
  //           name: filters.company,
  //         },
  //       },
  //     },
  //   });
  // }

  // if (filters.cnpj != "") {
  //   whereClause.AND.push({
  //     cnpj: filters.cnpj,
  //   });
  // }

  if (filters.email != "") {
    whereClause.AND.push({
      email: filters.email,
    });
  }

  if (filters.address != "") {
    whereClause.AND.push({
      address: filters.address,
    });
  }

  console.log(whereClause);
  const suppliers = await db.supplier.findMany({
    where: whereClause.AND.length ? whereClause : undefined, // Apply only if there are conditions
  });

  return suppliers;
}


async function create(props: SupplierRepositoryInterfaces["CreateProps"]) {
  const createdSupplier = await db.supplier.create({
    data: {
      ...props,
    },
  });
  return createdSupplier;
}

async function edit(props: SupplierRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedSuppliers = await db.supplier.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
  return editedSuppliers;
}

async function remove(props: SupplierRepositoryInterfaces["RemoveProps"]) {
  const deletedSupplier = await db.supplier.delete({
    where: {
      id: props.id,
    },
  });
  return deletedSupplier;
}

export const SupplierRepository = {
  getAll,
  create,
  edit,
  remove,
};
