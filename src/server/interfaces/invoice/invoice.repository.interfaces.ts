import z from "zod";

const getAllProps = z.object({
  // filters: z.object({
  //   startDate: z.string(),
  //   endDate: z.string(),
  //   supplier: z.string(),
  // }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  documentNumber: z.string(),
  documentDate: z.date(),
  companyId: z.string(),
  supplierId: z.string(),
  expenseType: z.string(),
  recurrence: z.string(),
  installment: z.string(),
  deadlineDate: z.date(),
  confirmedStatus: z.string(),
  invoiceValue: z.number(),
  accountId: z.string().optional(),
  groupId: z.string().optional(),
  documentTypeId: z.string().optional(),
  projectId: z.string().optional(),
  // bankId: z.string().optional(),
  // payedValue: z.number().optional(),
  // paymentDate: z.date().optional(),
  // payedStatus: z.string().optional(),
  invoiceProducts: z.array(
    z.object({
      // name: z.string(),
      // code: z.string(),
      // ncm: z.number(),
      // cfop: z.number(),
      // unitId: z.string(),
      productSupplierId: z.string(),
      purchaseQuantity: z.number(),
      unitValue: z.number(),
      // productSupplierId: z.string(),
      // controlTypeId: z.string(),
      // categoryId: z.string(),
      // sectorOfUseId: z.string(),
      // shelfId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const autoRegisterProps = z.object({
  company: z.object({
    name: z.string(),
    cnpj: z.string(),
    stateRegistration: z.string(),
    address: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    federativeUnit: z.string(),
    cep: z.string(),
    phone: z.string(),
  }),
  supplier: z.object({
    name: z.string(),
    cnpj: z.string(),
    stateRegistration: z.string(),
    address: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    federativeUnit: z.string(),
    cep: z.string(),
    phone: z.string(),
  }),
  documentNumber: z.string(),
  documentDate: z.date(),
  installment: z.string(),
  deadlineDate: z.date(),
  confirmedStatus: z.string(),
  invoiceValue: z.number(),
  // expenseType: z.string().optional(),
  // recurrence: z.string().optional(),
  // accountId: z.string().optional(),
  // groupId: z.string().optional(),
  // documentTypeId: z.string().optional(),
  // projectId: z.string().optional(),
  // bankId: z.string().optional(),
  // payedValue: z.number().optional(),
  // paymentDate: z.date().optional(),
  payedStatus: z.string().optional(),
  invoiceProducts: z.array(
    z.object({
      name: z.string(),
      code: z.string(),
      ncm: z.number(),
      cfop: z.number(),
      unit: z.object({
        unitAbbreviation: z.string(),
        unitsPerPack: z.number().optional(),
      }),
      purchaseQuantity: z.number(),
      unitValue: z.number(),
      productId: z.string(),
      // controlTypeId: z.string(),
      // categoryId: z.string(),
      // sectorOfUseId: z.string(),
      // shelfId: z.string(),
    }),
  ),
});

type AutoRegisterProps = z.infer<typeof autoRegisterProps>;

const editProps = z.object({
  id: z.string(),
  invoiceData: z.object({
    expenseType: z.string(),
    recurrence: z.string(),
    installment: z.string(),
    confirmedStatus: z.string(),
    accountId: z.string().optional(),
    groupId: z.string().optional(),
    documentTypeId: z.string().optional(),
    projectId: z.string().optional(),
    bankId: z.string().optional(),
    payedValue: z.number().optional(),
    paymentDate: z.date().optional(),
    payedStatus: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const rejectProps = z.object({
  id: z.string(),
  invoiceData: z.object({
    confirmedStatus: z.string(),
  }),
});

type RejectProps = z.infer<typeof rejectProps>;

export const invoiceRepositorySchema = {
  getAllProps,
  registerProps,
  autoRegisterProps,
  editProps,
  rejectProps,
};

export type InvoiceRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  AutoRegisterProps: AutoRegisterProps;
  EditProps: EditProps;
  RejectProps: RejectProps;
};
