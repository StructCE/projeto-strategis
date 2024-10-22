export type Invoice = {
  id: string;
  documentNumber: string;
  documentDate: Date;
  companyId: string;
  supplierId: string;
  expenseType: string | null;
  recurrence: string | null;
  installment: string;
  deadlineDate: Date;
  confirmedStatus: string;
  groupId: string | null;
  documentTypeId: string | null;
  accountId: string | null;
  projectId: string | null;
  bankId: string | null;
  payedValue: string | null;
  paymentDate: Date | null;
  payedStatus: string | null;
};

export type InvoiceProduct = {
  id: string;
  productId: string;
  name: string;
  code: string;
  ncm: number;
  cfop: number;
  unit: {
    id: string;
    name: string;
    abbreviation: string;
    unitsPerPack: number;
  };
  purchaseQuantity: number;
  unitValue: number;
  controlType: string | undefined;
  category: string | undefined;
  useSector: string | undefined;
  shelf:
    | {
        id: string;
        name: string;
        cabinet: {
          id: string;
          name: string;
          StockCabinet: {
            stock: {
              id: string;
              name: string;
              companyId: string;
              legalResponsibleId: string;
            };
          }[];
        };
      }
    | undefined
    | null;
};

export type SerializedInvoice = {
  id: string;
  documentNumber: string;
  documentDate: Date;
  company: { id: string; name: string };
  supplier: { id: string; name: string };
  invoiceValue: number;
  expenseType: string | null;
  recurrence: string | null;
  installment: string;
  deadlineDate: Date;
  confirmedStatus: string;
  accountPlan?: {
    id: string;
    name: string;
    abbreviation: string;
    accounts: { id: string; name: string; accountPlanId: string | null }[];
  };
  account?: { id: string | undefined; name: string | undefined };
  project?: { id: string | undefined; name: string | undefined };
  group?: { id: string | undefined; name: string | undefined };
  documentType?: { id: string | undefined; name: string | undefined };

  invoiceProducts: InvoiceProduct[];

  bankId?: string; // Banco do pagamento
  payedValue?: string; // Valor pago
  paymentDate?: Date; // Data do pagamento
  payedStatus?: string; // "Pago" | "Em Aberto" | "Cancelado"
};

export type InvoiceRouteInterfaces = {
  Invoice: Invoice;
  SerializedInvoice: SerializedInvoice;
};
