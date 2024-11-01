import { db } from "../db";
import { type AdjustReasonRepositoryInterfaces } from "../interfaces/adjustReason/adjustReason.repository.interfaces";

async function getReasonByName(
  props: AdjustReasonRepositoryInterfaces["GetReasonByNameProps"],
) {
  const adjustReason = await db.adjustReason.findFirst({
    where: { name: props.name },
  });

  return adjustReason;
}

async function getAll() {
  const adjustReasons = await db.adjustReason.findMany();
  return adjustReasons;
}

async function register(
  props: AdjustReasonRepositoryInterfaces["RegisterProps"],
) {
  const registeredAdjustReason = await db.adjustReason.create({
    data: {
      ...props,
    },
  });
  return registeredAdjustReason;
}

async function edit(props: AdjustReasonRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedAdjustReason = await db.adjustReason.update({
    where: { id },
    data: { ...data },
  });
  return editedAdjustReason;
}

async function remove(props: AdjustReasonRepositoryInterfaces["RemoveProps"]) {
  const deletedAdjustReason = await db.adjustReason.delete({
    where: {
      id: props.id,
    },
  });
  return deletedAdjustReason;
}

export const adjustReasonRepository = {
  getReasonByName,
  getAll,
  register,
  edit,
  remove,
};
