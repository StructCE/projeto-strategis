import { db } from "../db";
import type { InvoiceRepositoryInterfaces } from "../interfaces/invoice/invoice.repository.interfaces";

async function getAll(props: InvoiceRepositoryInterfaces["GetAllProps"]) {
  // const { filters } = props;
  const invoices = await db.invoice.findMany({
    // where: {
    //   AND: [
    //     {
    //       documentDate: {
    //         gte: filters.startDate,
    //         lte: filters.endDate,
    //       },
    //     },
    //     {
    //       InvoiceProduct: {
    //         every: {
    //           productSupplier: { supplier: { name: filters.supplier } },
    //         },
    //       },
    //     },
    //   ],
    // },
    include: {
      account: { include: { accountPlan: true } },
      documentType: true,
      group: true,
      project: true,
      company: true,
      InvoiceProduct: {
        include: {
          productSupplier: {
            include: {
              product: {
                include: {
                  unit: true,
                  category: true,
                  controlType: true,
                  sectorOfUse: true,
                  shelf: {
                    include: {
                      cabinet: {
                        include: {
                          StockCabinet: {
                            include: {
                              stock: true,
                            },
                          },
                        },
                      },
                    },
                  },
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

  // Cria a fatura (Invoice)
  const registeredInvoice = await db.invoice.create({
    data: {
      ...invoiceData,
    },
  });

  // Mapeia e registra os produtos da fatura
  const registeredInvoiceProducts = invoiceProducts.map(
    async (invoiceProduct) => {
      // Cria o produto vinculado à fatura
      const registeredInvoiceProduct = await db.invoiceProduct.create({
        data: {
          ...invoiceProduct,
          invoiceId: registeredInvoice.id, // Vincula o ID da fatura
        },
      });

      // Busca o produto relacionado ao fornecedor
      const productToBeUpdated = await db.productSupplier.findFirst({
        where: {
          id: invoiceProduct.productSupplierId,
        },
        include: {
          product: true,
        },
      });

      // Se o produto for encontrado, atualiza o estoque
      if (productToBeUpdated) {
        await db.product.update({
          where: {
            id: productToBeUpdated.product.id, // Corrige a referência para o produto
          },
          data: {
            currentStock:
              productToBeUpdated.product.currentStock +
              invoiceProduct.purchaseQuantity, // Atualiza o estoque
          },
        });
      }
      return registeredInvoiceProduct;
    },
  );

  // Aguarda o registro de todos os produtos
  await Promise.all(registeredInvoiceProducts);

  return registeredInvoice; // Retorna a fatura registrada
}

export const invoiceRepository = {
  getAll,
  register,
};
