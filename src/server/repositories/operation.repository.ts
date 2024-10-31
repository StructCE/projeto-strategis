import { db } from "../db";
import { type OperationRepositoryInterfaces } from "../interfaces/operation/operation.repository.interfaces";

async function getAll(props: OperationRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters.operationType) {
      conditions.push({ description: { contains: filters.operationType } });
    }
    if (filters.operator) {
      conditions.push({
        responsible: {
          name: { contains: filters.operator },
        },
      });
    }
    if (filters.company) {
      conditions.push({
        responsible: {
          Company: {
            some: {
              name: { contains: filters.company },
            },
          },
        },
      });
    }
    if (filters?.date) {
      conditions.push(
        {
          date: {
            gte: filters?.date
              ? new Date(
                  `${filters?.date.getFullYear()}-${filters?.date.getMonth() + 1}-${filters?.date?.getDate()}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
        {
          date: {
            lt: filters?.date
              ? new Date(
                  `${filters?.date.getFullYear()}-${filters?.date.getMonth() + 1}-${filters?.date.getDate() + 1}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
      );
    }

    const filteredOperations = await db.operation.findMany({
      where: {
        AND: conditions,
      },
      include: {
        responsible: { include: { Company: true } },
      },
    });
    return filteredOperations;
  }

  const operations = await db.operation.findMany({
    include: {
      responsible: {
        include: {
          Company: true, // Inclui os dados da empresa do responsável
        },
      },
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
