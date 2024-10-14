import z from "zod";

const getAllProps = z.object({
  filters: z.object({
    startDate: z.string(),
    endDate: z.string(),
    supplier: z.string(),
  }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  documentNumber: z.string(),
  documentDate: z.date(),
  expenseType: z.string(),
  installment: z.string(),
  deadlineDate: z.date(),
  status: z.string(),
  orderId: z.string(),
  groupdId: z.string(),
  documentTypeId: z.string(),
  accountPlanId: z.string(),
  projetctId: z.string(),
  invoiceProducts: z.array(
    z.object({
      ncm: z.number(),
      cfop: z.number(),
      productSupplierId: z.string(),
      purchaseQuantity: z.number(),
      unitValue: z.number(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

export const invoiceRepositorySchema = {
  getAllProps,
  registerProps,
};

export type InvoiceRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
};
