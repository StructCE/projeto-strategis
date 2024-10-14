import { invoiceRepositorySchema } from "~/server/interfaces/invoice/invoice.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { InvoiceRouteInterfaces } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { invoiceRepository } from "~/server/repositories/invoice.repository";

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
          expenseType: invoice.expenseType,
          installment: invoice.installment,
          deadlineDate: invoice.deadlineDate,
          status: invoice.status,
          groupName: invoice.group?.name,
          documentTypeName: invoice.documentType?.name,
          accountPlanName: invoice.accountPlan?.name,
          projectName: invoice.project?.name,
          invoiceProducts: invoice.InvoiceProduct.map(
            (invoiceProductSupplier) => ({
              name: invoiceProductSupplier.productSupplier.product.name,
              code: invoiceProductSupplier.productSupplier.product.id,
              ncm: invoiceProductSupplier.ncm,
              cfop: invoiceProductSupplier.cfop,
              unit: invoiceProductSupplier.productSupplier.product.unit.name,
              purchaseQuantity: invoiceProductSupplier.purchaseQuantity,
              unitValue: invoiceProductSupplier.unitValue,
              controlType:
                invoiceProductSupplier.productSupplier.product.controlType.name,
              category:
                invoiceProductSupplier.productSupplier.product.category.name,
              useSector:
                invoiceProductSupplier.productSupplier.product.sectorOfUse.name,
              stockName:
                invoiceProductSupplier.productSupplier.product.stock.name,
              cabinetName:
                invoiceProductSupplier.productSupplier.product.cabinet.cabinet
                  .name,
              shelfName:
                invoiceProductSupplier.productSupplier.product.shelf.shelf.name,
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
