import { db } from "../db";
import { type OperationRepositoryInterfaces } from "../interfaces/operation/operation.repository.interfaces";

async function getAll(props: OperationRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const filteredOperations = await db.operation.findMany({
      where: {
        AND: [
          { description: { contains: filters.operationType } },
          { responsible: { user: { name: { contains: filters.operator } } } },
          { date: { gte: filters.startDate, lte: filters.endDate } },
          { responsible: { company: { name: { contains: filters.company } } } },
        ],
      },
      include: {
        responsible: { include: { user: true, company: true } },
      },
    });
    return filteredOperations;
  }

  const operations = await db.operation.findMany({
    include: {
      responsible: { include: { user: true, company: true } },
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
