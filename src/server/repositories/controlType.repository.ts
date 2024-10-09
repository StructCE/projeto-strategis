import { db } from "../db";
import type { ControlTypeRepositoryInterfaces } from "../interfaces/controlType/controlType.repository.interfaces";

async function getAll() {
  const controlTypes = await db.controlType.findMany();
  return controlTypes;
}

async function register(
  props: ControlTypeRepositoryInterfaces["RegisterProps"],
) {
  const registeredControlType = await db.controlType.create({
    data: {
      ...props,
    },
  });
  return registeredControlType;
}

async function edit(props: ControlTypeRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedControlType = await db.controlType.update({
    where: { id },
    data: { ...data },
  });
  return editedControlType;
}

async function remove(props: ControlTypeRepositoryInterfaces["RemoveProps"]) {
  const deletedControlType = await db.controlType.delete({
    where: {
      id: props.id,
    },
  });
  return deletedControlType;
}

export const controlTypeRepository = {
  getAll,
  register,
  edit,
  remove,
};
