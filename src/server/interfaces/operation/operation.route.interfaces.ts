type OperationsCount = {
  operationsCount: number;
};

type OperationsHistory = {
  id: string;
  date: Date;
  company: string | undefined;
  responsible: string;
  description: string;
};

export type OperationsRouteInterfaces = {
  OperationsCount: OperationsCount;
  OperationHistory: OperationsHistory;
};
