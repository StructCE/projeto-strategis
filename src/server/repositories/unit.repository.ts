import { db } from "../db";
import { type UnitRepositoryInterfaces } from "../interfaces/unit/unit.repository.interfaces";

async function getAll() {
  const units = await db.unit.findMany();
  return units;
}

async function register(props: UnitRepositoryInterfaces["RegisterProps"]) {
  const registeredUnit = await db.unit.create({
    data: {
      ...props,
    },
  });
  return registeredUnit;
}

async function edit(props: UnitRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedUnit = await db.unit.update({
    where: { id },
    data: { ...data },
  });
  return editedUnit;
}

async function remove(props: UnitRepositoryInterfaces["RemoveProps"]) {
  const deletedUnit = await db.unit.delete({
    where: {
      id: props.id,
    },
  });
  return deletedUnit;
}

export const unitRepository = {
  getAll,
  register,
  edit,
  remove,
};
