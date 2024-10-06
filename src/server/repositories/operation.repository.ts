import { db } from "../db";
import { type OperationRepositoryInterfaces } from "../interfaces/operation/operation.repository.interfaces";

async function countOperations(
  props: OperationRepositoryInterfaces["CountOperationProps"],
) {
  const today = new Date();
  const oldestDesiredPoint = new Date(today.getTime() - props.periodTime);
  const operations = await db.operation.count({
    where: {
      date: {
        gte: oldestDesiredPoint,
      },
    },
  });
  return operations;
}

export const operationRepository = {
  countOperations,
};
