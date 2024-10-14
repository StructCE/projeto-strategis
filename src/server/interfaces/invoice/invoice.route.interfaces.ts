type Invoice = {
  id: string;
  documentNumber: string;
  documentDate: Date;
  expenseType: string;
  installment: string;
  deadlineDate: Date;
  status: string;
  groupId: string | null;
  documentTypeId: string | null;
  accountPlanId: string | null;
  projectId: string | null;
};

type SerializedInvoice = {
  documentNumber: string;
  documentDate: Date;
  expenseType: string;
  installment: string;
  deadlineDate: Date;
  status: string;
  groupName?: string;
  documentTypeName?: string;
  accountPlanName?: string;
  projectName?: string;
  invoiceProducts: {
    name: string;
    code: string;
    ncm: number;
    cfop: number;
    unit: string;
    purchaseQuantity: number;
    unitValue: number;
    controlType: string;
    category: string;
    useSector: string;
    stockName: string;
    cabinetName: string;
    shelfName: string;
  }[];
};

export type InvoiceRouteInterfaces = {
  Invoice: Invoice;
  SerializedInvoice: SerializedInvoice;
};
