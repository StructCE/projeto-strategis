import { db } from "../db";
import type { InvoiceRepositoryInterfaces } from "../interfaces/invoice/invoice.repository.interfaces";

async function getAll(props: InvoiceRepositoryInterfaces["GetAllProps"]) {
  const { filters } = props;
  const invoices = await db.invoice.findMany({
    where: {
      AND: [
        {
          documentDate: {
            gte: filters.startDate,
            lte: filters.endDate,
          },
        },
        {
          InvoiceProduct: {
            every: {
              productSupplier: { supplier: { name: filters.supplier } },
            },
          },
        },
      ],
    },
    include: {
      accountPlan: true,
      documentType: true,
      group: true,
      project: true,
      InvoiceProduct: {
        include: {
          productSupplier: {
            include: {
              product: {
                include: {
                  unit: true,
                  cabinet: {
                    include: { cabinet: true },
                  },
                  stock: true,
                  category: true,
                  controlType: true,
                  sectorOfUse: true,
                  shelf: { include: { shelf: true } },
                },
              },
              supplier: true,
            },
          },
        },
      },
    },
  });
  return invoices;
}

async function register(props: InvoiceRepositoryInterfaces["RegisterProps"]) {
  const { invoiceProducts, ...invoiceData } = props;
  const registeredInvoice = await db.invoice.create({
    data: {
      ...invoiceData,
    },
  });

  const registeredInvoiceProducts = invoiceProducts.map(
    async (invoiceProduct) => {
      const registeredInvoiceProduct = await db.invoiceProduct.create({
        data: {
          ...invoiceProduct,
          invoiceId: registeredInvoice.id,
        },
      });

      const productToBeUpdated = await db.productSupplier.findFirst({
        where: {
          id: invoiceProduct.productSupplierId,
        },
        include: {
          product: true,
        },
      });

      if (productToBeUpdated) {
        await db.product.update({
          where: {
            id: productToBeUpdated.id,
          },
          data: {
            currentStock:
              productToBeUpdated.product.currentStock +
              invoiceProduct.purchaseQuantity,
          },
        });
      }
      return registeredInvoiceProduct;
    },
  );
  await Promise.all(registeredInvoiceProducts);

  return registeredInvoice;
}

export const invoiceRepository = {
  getAll,
  register,
};
