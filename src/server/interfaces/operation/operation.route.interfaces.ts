type OperationsCount = {
  operationsCount: number;
};

type OperationsHistory = {
  id: string;
  date: Date;
  company: string;
  responsible: string;
  description: string;
};

export type OperationsRouteInterfaces = {
  OperationsCount: OperationsCount;
  OperationHistory: OperationsHistory;
};
