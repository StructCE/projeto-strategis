import { db } from "../db";
import type { SupplierRepositoryInterfaces } from "../interfaces/supplier/supplier.repository.interfaces";

async function getAll(props: SupplierRepositoryInterfaces["GetAll"]) {
  // const { filters } = props;
  const suppliers = await db.supplier.findMany({
    // where: {
    //   AND: [
    //     { name: filters.name },
    //     { email: filters.email },
    //     { federativeUnit: filters.federativeUnit },
    //   ],
    // },
    include: { contacts: true },
  });

  return suppliers;
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

  // Buscar contatos existentes
  const existingContacts = await db.contact.findMany({
    where: { supplierId: id },
  });

  // Mapeia os IDs dos contatos atuais
  const existingContactIds = existingContacts.map((contact) => contact.id);

  // Mapeia os IDs dos contatos vindos do form
  const newContactIds = data.contacts?.map((contact) => contact.id) ?? [];

  // Identificar contatos a remover
  const contactsToRemove = existingContacts.filter(
    (contact) => !newContactIds.includes(contact.id),
  );

  // Identificar contatos a adicionar
  const contactsToAdd =
    data.contacts?.filter(
      (contact) => !existingContactIds.includes(contact.id),
    ) ?? [];

  // Atualizar fornecedor e tratar contatos
  const editedSupplier = await db.supplier.update({
    where: { id: id },
    data: {
      ...data,
      // Atualiza os contatos existentes
      contacts: {
        update: data.contacts
          ?.filter((contact) => contact.id)
          .map((contact) => ({
            where: { id: contact.id },
            data: {
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
            },
          })),
        // Adiciona novos contatos
        create: contactsToAdd.map((contact) => ({
          name: contact.name,
          email: contact.email,
          phone: contact.phone ?? "",
        })),
        // Remove contatos excluídos
        delete: contactsToRemove.map((contact) => ({ id: contact.id })),
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
