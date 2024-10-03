import { db } from "../db";
import type { SupplierRepositoryInterfaces } from "../interfaces/supplier/supplier.repository.interfaces";

async function getAll(props: SupplierRepositoryInterfaces["GetAll"]) {
  const { filters } = props;
  const suppliers = await db.supplier.findMany({
    where: {
      AND: [
        {
          UserRole: {
            every: {
              company: {
                name: filters.company,
              },
            },
          },
        },
        { cnpj: filters.cnpj },
        { email: filters.email },
        { address: filters.address },
      ],
    },
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
