import { db } from "../db";
import type { SupplierRepositoryInterfaces } from "../interfaces/supplier/supplier.repository.interfaces";

async function getAll(props: SupplierRepositoryInterfaces["GetAll"]) {
  const { filters } = props;

  // Construct the `where` clause conditionally, excluding empty filters
  // const whereClause: any = {
  //   AND: [],
  // };

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

  // if (filters.email != "") {
  //   whereClause.AND.push({
  //     email: filters.email,
  //   });
  // }

  // if (filters.address != "") {
  //   whereClause.AND.push({
  //     address: filters.address,
  //   });
  // }

  // console.log(whereClause);
  const suppliers = await db.supplier.findMany({
    include: { contacts: true },
  });

  // Mapeie para o formato correto esperado pela interface Supplier
  return suppliers.map((supplier) => ({
    ...supplier,
  }));
}

async function create(props: SupplierRepositoryInterfaces["CreateProps"]) {
  const {
    name,
    cnpj,
    email,
    phone,
    stateRegistration,
    address,
    neighborhood,
    city,
    federativeUnit,
    cep,
    contacts,
  } = props;
  const createdSupplier = await db.supplier.create({
    data: {
      name,
      cnpj,
      email,
      phone,
      stateRegistration,
      address,
      neighborhood,
      city,
      federativeUnit,
      cep,
      contacts: {
        create: contacts?.map((contact) => ({
          name: contact.name,
          phone: contact.phone ?? "",
          email: contact.email,
        })),
      },
    },
  });

  return createdSupplier;
}

async function edit(props: SupplierRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;

  const contacts = await db.contact.findMany({
    where: {
      supplierId: id,
    },
  });

  const editedSupplier = await db.supplier.update({
    where: { id: id },
    data: {
      ...data,
      contacts: {
        connect: contacts.map((contact) => ({ id: contact.id })),
      },
    },
  });

  return editedSupplier;
}

async function remove(props: SupplierRepositoryInterfaces["RemoveProps"]) {
  // Primeiro deletar registros relacionados, como `Contact`, se aplicável
  await db.contact.deleteMany({
    where: {
      supplierId: props.id,
    },
  });

  // Agora, deletar o fornecedor
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
