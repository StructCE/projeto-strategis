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
      account: { include: { accountPlan: { include: { accounts: true } } } },
      documentType: true,
      group: true,
      project: true,
      company: true,
      supplier: true,
      bank: true,
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
            currentStock: productToBeUpdated.product.currentStock
              ? productToBeUpdated.product.currentStock +
                invoiceProduct.purchaseQuantity
              : invoiceProduct.purchaseQuantity,
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

async function autoRegister(
  props: InvoiceRepositoryInterfaces["AutoRegisterProps"],
) {
  const { company, supplier, invoiceProducts, ...invoiceData } = props;

  let registeredCompany = await db.company.findUnique({
    where: {
      cnpj: company.cnpj,
    },
  });

  // Se não estiver registrada, cadastra a empresa
  if (!registeredCompany) {
    registeredCompany = await db.company.create({
      data: {
        name: company.name,
        cnpj: company.cnpj,
        stateRegistration: company.stateRegistration,
        address: company.address,
        city: company.city,
        neighborhood: company.neighborhood,
        federativeUnit: company.federativeUnit,
        cep: company.cep,
        phone: company.phone,
      },
    });
  }

  console.log("registeredCompany.id:", registeredCompany.name);

  let registeredSupplier = await db.supplier.findUnique({
    where: {
      cnpj: supplier.cnpj,
    },
  });

  // Se não estiver registrado, cadastra o fornecedor
  if (!registeredSupplier) {
    registeredSupplier = await db.supplier.create({
      data: {
        name: supplier.name,
        cnpj: supplier.cnpj,
        stateRegistration: supplier.stateRegistration,
        address: supplier.address,
        city: supplier.city,
        neighborhood: supplier.neighborhood,
        federativeUnit: supplier.federativeUnit,
        cep: supplier.cep,
        phone: supplier.phone,
      },
    });
  }
  console.log("registeredSupplier.id:", registeredSupplier.name);

  // Cria a nota fiscal antes de processar os produtos
  const registeredInvoice = await db.invoice.create({
    data: {
      documentNumber: invoiceData.documentNumber,
      documentDate: invoiceData.documentDate,
      companyId: registeredCompany.id,
      supplierId: registeredSupplier.id,
      installment: invoiceData.installment,
      deadlineDate: invoiceData.deadlineDate,
      confirmedStatus: invoiceData.confirmedStatus,
      invoiceValue: invoiceData.invoiceValue,
      payedStatus: invoiceData.payedStatus,
    },
  });

  console.log("invoiceProducts:", invoiceProducts);

  const registeredProducts = [];
  const registeredInvoiceProducts = [];
  for (const product of invoiceProducts) {
    let registeredProduct = await db.product.findFirst({
      where: {
        ncm: product.ncm,
        name: product.name,
      },
    });

    // Se o produto não existir, cadastra
    if (!registeredProduct) {
      let registeredUnit = await db.unit.findFirst({
        where: {
          abbreviation: product.unit.unitAbbreviation,
        },
      });

      if (!registeredUnit) {
        registeredUnit = await db.unit.create({
          data: {
            name: "",
            abbreviation: product.unit.unitAbbreviation,
            unitsPerPack: product.unit.unitsPerPack ?? 0,
          },
        });
      }

      console.log("Unit:", registeredUnit.name);

      registeredProduct = await db.product.create({
        data: {
          name: product.name,
          code: product.code,
          ncm: product.ncm,
          cfop: product.cfop,
          unitId: registeredUnit.id,
          currentStock: product.purchaseQuantity, // Inicializa o estoque com a quantidade comprada
          ProductSupplier: {
            create: { supplierId: registeredSupplier.id },
          },
        },
      });
    } else {
      // Se o produto já existir, atualiza o estoque somando a quantidade comprada
      registeredProduct = await db.product.update({
        where: {
          id: registeredProduct.id,
        },
        data: {
          currentStock: {
            increment: product.purchaseQuantity, // Adiciona a quantidade comprada ao estoque atual
          },
        },
      });
    }

    registeredProducts.push(registeredProduct);

    // Cria a relação InvoiceProduct com o productSupplier e a invoice
    const productSupplier = await db.productSupplier.findFirst({
      where: {
        productId: registeredProduct.id,
        supplierId: registeredSupplier.id,
      },
    });

    const invoiceProduct = await db.invoiceProduct.create({
      data: {
        purchaseQuantity: product.purchaseQuantity,
        unitValue: product.unitValue,
        invoiceId: registeredInvoice.id,
        productSupplierId: productSupplier!.id,
      },
    });

    registeredInvoiceProducts.push(invoiceProduct);
  }

  // Aguarda o registro de todos os InvoiceProduct
  await Promise.all(registeredInvoiceProducts);

  return registeredInvoice;
}

async function edit(props: InvoiceRepositoryInterfaces["EditProps"]) {
  const { id, invoiceData } = props;

  // Verifica se o ID da fatura existe
  const existingInvoice = await db.invoice.findUnique({
    where: { id },
  });

  if (!existingInvoice) {
    throw new Error("Invoice not found");
  }

  // Atualiza a fatura com os dados fornecidos
  const updatedInvoice = await db.invoice.update({
    where: {
      id,
    },
    data: {
      expenseType: invoiceData.expenseType,
      recurrence: invoiceData.recurrence,
      installment: invoiceData.installment,
      confirmedStatus: invoiceData.confirmedStatus,
      accountId: invoiceData.accountId ?? null,
      groupId: invoiceData.groupId ?? null,
      documentTypeId: invoiceData.documentTypeId ?? null,
      projectId: invoiceData.projectId ?? null,
      bankId: invoiceData.bankId ?? null,
      payedValue: invoiceData.payedValue ?? null,
      paymentDate: invoiceData.paymentDate ?? null,
      payedStatus: invoiceData.payedStatus,
    },
  });

  return updatedInvoice; // Retorna a fatura atualizada
}

async function reject(props: InvoiceRepositoryInterfaces["RejectProps"]) {
  const { id, invoiceData } = props;

  // Verifica se o ID da fatura existe
  const existingInvoice = await db.invoice.findUnique({
    where: { id },
  });

  if (!existingInvoice) {
    throw new Error("Invoice not found");
  }

  // Atualiza a fatura com os dados fornecidos
  const updatedInvoice = await db.invoice.update({
    where: {
      id,
    },
    data: {
      confirmedStatus: invoiceData.confirmedStatus,
    },
  });

  return updatedInvoice; // Retorna a fatura atualizada
}

export const invoiceRepository = {
  getAll,
  register,
  autoRegister,
  edit,
  reject,
};
