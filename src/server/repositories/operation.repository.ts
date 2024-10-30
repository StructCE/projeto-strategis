import { db } from "../db";
import { type OperationRepositoryInterfaces } from "../interfaces/operation/operation.repository.interfaces";

async function getAll(props: OperationRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const filteredOperations = await db.operation.findMany({
      where: {
        AND: [
          { description: { contains: filters.operationType } },
          { responsible: { name: { contains: filters.operator } } },
          {
            date: {
              gte: filters.date
                ? new Date(
                    `${filters.date.getFullYear()}-${filters.date.getMonth() + 1}-${filters.date?.getDate()}T00:00:00.000Z`,
                  )
                : undefined,
            },
          },
          {
            date: {
              lt: filters.date
                ? new Date(
                    `${filters.date.getFullYear()}-${filters.date.getMonth() + 1}-${filters.date.getDate() + 1}T00:00:00.000Z`,
                  )
                : undefined,
            },
          },
          {
            responsible: {
              Company: { every: { name: { contains: filters.company } } },
            },
          },
        ],
      },
      include: {
        responsible: { include: { Company: true } },
      },
    });
    return filteredOperations;
  }

  const operations = await db.operation.findMany({
    include: {
      responsible: { include: { Company: true } },
    },
  });
  return operations;
}

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
  getAll,
};
