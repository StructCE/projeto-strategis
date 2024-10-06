import { db } from "../db";
import type { CabinetRepositoryInterfaces } from "../interfaces/cabinet/cabinet.repository.interfaces";

async function getAll() {
  const cabinets = await db.cabinet.findMany();
  return cabinets;
}

async function register(props: CabinetRepositoryInterfaces["RegisterProps"]) {
  const registeredCabinet = await db.cabinet.create({
    data: {
      ...props,
    },
  });
  return registeredCabinet;
}

async function edit(props: CabinetRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedCabinet = await db.cabinet.update({
    where: { id },
    data: { ...data },
  });
  return editedCabinet;
}

async function remove(props: CabinetRepositoryInterfaces["RemoveProps"]) {
  const deletedCabinet = await db.cabinet.delete({
    where: {
      id: props.id,
    },
  });
  return deletedCabinet;
}

export const cabinetRepository = {
  getAll,
  register,
  edit,
  remove,
};
