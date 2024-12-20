import { db } from "../db";
import type { InvoiceRepositoryInterfaces } from "../interfaces/invoice/invoice.repository.interfaces";

async function getAll(props: InvoiceRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.company) {
      conditions.push({
        company: {
          name: { contains: filters.company },
        },
      });
    }
    if (filters?.supplier) {
      conditions.push({
        InvoiceProduct: {
          every: {
            productSupplier: {
              supplier: { name: { contains: filters.supplier } },
            },
          },
        },
      });
    }
    if (filters?.nfNumber) {
      conditions.push({
        documentNumber: { contains: filters.nfNumber },
      });
    }
    if (filters?.status) {
      conditions.push({
        confirmedStatus: { contains: filters.status },
      });
    }
    if (filters?.bank) {
      conditions.push({
        bank: { name: { contains: filters.bank } },
      });
    }
    if (filters?.startDocumentDate) {
      const startDate =
        new Date(
          filters.startDocumentDate.getFullYear(),
          filters.startDocumentDate.getMonth() + 1, // Já está correto pois getMonth() retorna de 0 a 11
          filters.startDocumentDate.getDate(),
        )
          .toISOString()
          .split("T")[0] + "T00:00:00.000Z";

      conditions.push({
        documentDate: {
          gte: startDate,
        },
      });
    }

    if (filters?.endDocumentDate) {
      const endDate =
        new Date(
          filters.endDocumentDate.getFullYear(),
          filters.endDocumentDate.getMonth() + 1,
          filters.endDocumentDate.getDate(),
        )
          .toISOString()
          .split("T")[0] + "T23:59:59.999Z";

      conditions.push({
        documentDate: {
          lte: endDate,
        },
      });
    }
    if (filters?.expenseType) {
      conditions.push({
        expenseType: { contains: filters.expenseType },
      });
    }

    if (filters?.documentDate) {
      conditions.push(
        {
          documentDate: {
            gte: filters?.documentDate
              ? new Date(
                  `${filters?.documentDate.getFullYear()}-${filters?.documentDate.getMonth() + 1}-${filters?.documentDate?.getDate()}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
        {
          documentDate: {
            lt: filters?.documentDate
              ? new Date(
                  `${filters?.documentDate.getFullYear()}-${filters?.documentDate.getMonth() + 1}-${filters?.documentDate.getDate() + 1}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
      );
    }
    if (filters?.paymentDate) {
      conditions.push(
        {
          paymentDate: {
            gte: filters?.paymentDate
              ? new Date(
                  `${filters?.paymentDate.getFullYear()}-${filters?.paymentDate.getMonth() + 1}-${filters?.paymentDate?.getDate()}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
        {
          paymentDate: {
            lt: filters?.paymentDate
              ? new Date(
                  `${filters?.paymentDate.getFullYear()}-${filters?.paymentDate.getMonth() + 1}-${filters?.paymentDate.getDate() + 1}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
      );
    }
    if (filters?.deadlineDate) {
      conditions.push(
        {
          deadlineDate: {
            gte: filters?.deadlineDate
              ? new Date(
                  `${filters?.deadlineDate.getFullYear()}-${filters?.deadlineDate.getMonth() + 1}-${filters?.deadlineDate?.getDate()}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
        {
          deadlineDate: {
            lt: filters?.deadlineDate
              ? new Date(
                  `${filters?.deadlineDate.getFullYear()}-${filters?.deadlineDate.getMonth() + 1}-${filters?.deadlineDate.getDate() + 1}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
      );
    }

    if (filters?.supplier) {
      conditions.push({
        supplier: { name: { contains: filters.supplier } },
      });
    }
    if (filters?.accountPlan) {
      conditions.push({
        account: {
          accountPlan: { name: { contains: filters.accountPlan } },
        },
      });
    }
    if (filters?.group) {
      conditions.push({
        group: { name: { contains: filters.group } },
      });
    }
    if (filters?.project) {
      conditions.push({
        project: { name: { contains: filters.project } },
      });
    }
    if (filters?.documentType) {
      conditions.push({
        documentType: { name: { contains: filters.documentType } },
      });
    }

    const invoices = await db.invoice.findMany({
      where: {
        AND: conditions,
      },
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
  return await db.invoice.findMany({
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

  // console.log("registeredCompany.id:", registeredCompany.name);

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
  // console.log("registeredSupplier.id:", registeredSupplier.name);

  // Cria a relação entre fornecedor e empresa se não existir
  const companySupplierRelation = await db.companySupplier.findFirst({
    where: {
      companyId: registeredCompany.id,
      supplierId: registeredSupplier.id,
    },
  });

  if (!companySupplierRelation) {
    await db.companySupplier.create({
      data: {
        companyId: registeredCompany.id,
        supplierId: registeredSupplier.id,
      },
    });
  }

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

  // console.log("invoiceProducts:", invoiceProducts);

  const registeredProducts = [];
  const registeredInvoiceProducts = [];
  for (const product of invoiceProducts) {
    if (!product.code) {
      console.warn(
        `Produto com nome "${product.name}" está sem código e foi ignorado.`,
      );
      continue;
    }

    let registeredProduct = product.code
      ? await db.product.findUnique({ where: { code: product.code } })
      : null;

    // Se o produto não existir, cadastra
    if (!registeredProduct) {
      let registeredUnit = await db.unit.findUnique({
        where: {
          abbreviation: product.unit.unitAbbreviation,
        },
      });

      if (!registeredUnit) {
        registeredUnit = await db.unit.create({
          data: {
            name: "",
            abbreviation: product.unit.unitAbbreviation,
            unitsPerPack: product.unit.unitsPerPack ?? 1,
          },
        });
      }

      // console.log("Unit:", registeredUnit.name);

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

      const productSupplier = await db.productSupplier.findFirst({
        where: {
          productId: registeredProduct.id,
          supplierId: registeredSupplier.id,
        },
      });

      if (!productSupplier) {
        await db.productSupplier.create({
          data: {
            productId: registeredProduct.id,
            supplierId: registeredSupplier.id,
          },
        });
      }
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
      expenseType: invoiceData.expenseType ?? existingInvoice.expenseType,
      recurrence: invoiceData.recurrence ?? existingInvoice.recurrence,
      installment: invoiceData.installment ?? existingInvoice.installment,
      confirmedStatus:
        invoiceData.confirmedStatus ?? existingInvoice.confirmedStatus,
      accountId: invoiceData.accountId ?? existingInvoice.accountId,
      groupId: invoiceData.groupId ?? existingInvoice.groupId,
      documentTypeId:
        invoiceData.documentTypeId ?? existingInvoice.documentTypeId,
      projectId: invoiceData.projectId ?? existingInvoice.projectId,
      bankId: invoiceData.bankId ?? existingInvoice.bankId,
      payedValue: invoiceData.payedValue ?? existingInvoice.payedValue,
      paymentDate: invoiceData.paymentDate ?? existingInvoice.paymentDate,
      payedStatus: invoiceData.payedStatus ?? existingInvoice.payedStatus,
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
