import { invoiceRepositorySchema } from "~/server/interfaces/invoice/invoice.repository.interfaces";
import type { InvoiceRouteInterfaces } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { invoiceRepository } from "~/server/repositories/invoice.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const invoiceRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(invoiceRepositorySchema.getAllProps)
    .query(
      async ({
        input,
      }): Promise<InvoiceRouteInterfaces["SerializedInvoice"][]> => {
        const invoices = await invoiceRepository.getAll(input);
        const SerializedInvoices = invoices.map((invoice) => ({
          documentNumber: invoice.documentNumber,
          documentDate: invoice.documentDate,
          company: { id: invoice.company.id, name: invoice.company.name },
          supplier: { id: invoice.supplier.id, name: invoice.supplier.name },
          expenseType: invoice.expenseType,
          recurrance: invoice.recurrance,
          installment: invoice.installment,
          deadlineDate: invoice.deadlineDate,
          confirmedStatus: invoice.confirmedStatus,
          group: { id: invoice.group?.id, name: invoice.group?.name },
          documentType: {
            id: invoice.documentType?.id,
            name: invoice.documentType?.name,
          },
          account: {
            id: invoice.account?.id ?? "",
            name: invoice.account?.name ?? "",
          },
          accountPlan: invoice.account?.accountPlan
            ? {
                id: invoice.account?.accountPlan?.id ?? "",
                name: invoice.account?.accountPlan?.name ?? "",
                abbreviation: invoice.account?.accountPlan?.abbreviation ?? "",
              }
            : undefined,
          project: { id: invoice.project?.id, name: invoice.project?.name },
          invoiceProducts: invoice.InvoiceProduct.map(
            (invoiceProductSupplier) => ({
              id: invoiceProductSupplier.productSupplier.id,
              productId: invoiceProductSupplier.productSupplier.product.id,
              name: invoiceProductSupplier.productSupplier.product.name,
              code: invoiceProductSupplier.productSupplier.product.code,
              ncm: invoiceProductSupplier.ncm,
              cfop: invoiceProductSupplier.cfop,
              unit: invoiceProductSupplier.productSupplier.product.unit,
              purchaseQuantity: invoiceProductSupplier.purchaseQuantity,
              unitValue: invoiceProductSupplier.unitValue,
              controlType:
                invoiceProductSupplier.productSupplier.product.controlType.name,
              category:
                invoiceProductSupplier.productSupplier.product.category.name,
              useSector:
                invoiceProductSupplier.productSupplier.product.sectorOfUse.name,
              shelf: invoiceProductSupplier.productSupplier.product.shelf,
            }),
          ),
        }));
        return SerializedInvoices;
      },
    ),

  registerInvoice: protectedProcedure
    .input(invoiceRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<InvoiceRouteInterfaces["Invoice"]> => {
      const registeredInvoice = await invoiceRepository.register(input);
      return registeredInvoice;
    }),
});
