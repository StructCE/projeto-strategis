import { db } from "../db";
import type { RequestRepositoryInterfaces } from "../interfaces/request/request.repository.interfaces";

async function countPendentRequests() {
  const pendentRequestsCount = await db.request.count({
    where: {
      status: "Esperando Confirmação",
    },
  });
  return pendentRequestsCount;
}

async function getAll(props: RequestRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.company) {
      conditions.push({
        responsible: {
          company: { name: { contains: filters.company } },
        },
      });
    }
    if (filters?.requestResponsible) {
      conditions.push({
        responsible: {
          user: { name: { contains: filters?.requestResponsible } },
        },
      });
    }
    if (filters?.status) {
      conditions.push({ status: { contains: filters?.status } });
    }
    if (filters?.date) {
      conditions.push(
        {
          requestDate: {
            gte: filters?.date
              ? new Date(
                  `${filters?.date.getFullYear()}-${filters?.date.getMonth() + 1}-${filters?.date?.getDate()}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
        {
          requestDate: {
            lt: filters?.date
              ? new Date(
                  `${filters?.date.getFullYear()}-${filters?.date.getMonth() + 1}-${filters?.date.getDate() + 1}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
      );
    }

    const requests = await db.request.findMany({
      where: {
        AND: conditions,
      },
      include: {
        responsible: { include: { user: true } },
        statusResponsible: { include: { user: true } },
        RequestProduct: {
          include: {
            product: {
              include: {
                unit: true,
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
          },
        },
      },
    });

    return requests;
  }
  return await db.request.findMany({
    include: {
      responsible: { include: { user: true } },
      statusResponsible: { include: { user: true } },
      RequestProduct: {
        include: {
          product: {
            include: {
              unit: true,
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
        },
      },
    },
  });
}

async function register(props: RequestRepositoryInterfaces["RegisterProps"]) {
  const { requestProducts, responsibleId: userId, ...requestData } = props;

  // Primeiro, você busca o userRole correspondente ao responsável
  const userRole = await db.userRole.findFirst({
    where: {
      userId: userId, // Relacionando o userId recebido do front-end
    },
  });

  // Verifica se o papel de usuário foi encontrado
  if (!userRole) {
    throw new Error("O usuário não tem um papel associado (UserRole).");
  }

  console.log("UserRole encontrado:", userRole);

  // Criação da solicitação com o 'responsibleId' do userRole
  const createdRequest = await db.request.create({
    data: {
      responsibleId: userRole.id, // Usando o id do UserRole encontrado
      description: requestData.description,
      requestDate: requestData.requestDate,
      status: requestData.status,
      statusResponsibleId: requestData.statusResponsibleId ?? null, // Verifica se o valor é nulo
    },
  });

  console.log("Requisição criada:", createdRequest);

  if (requestProducts.length === 0) {
    throw new Error("Nenhum produto foi adicionado à requisição.");
  }

  const registeredRequestProducts = await Promise.all(
    requestProducts.map(async (requestProduct) => {
      // Verifica se o produto existe no banco
      const productExists = await db.product.findUnique({
        where: { id: requestProduct.productId },
      });

      if (!productExists) {
        throw new Error(
          `Produto com ID ${requestProduct.productId} não foi encontrado.`,
        );
      }

      console.log(`Produto encontrado:`, productExists);

      // Criar o RequestProduct
      const registeredRequestProduct = await db.requestProduct.create({
        data: {
          requestedQuantity: requestProduct.requestedQuantity,
          requestId: createdRequest.id,
          productId: requestProduct.productId,
        },
      });

      console.log(
        "Produto da requisição registrado:",
        registeredRequestProduct,
      );
      return registeredRequestProduct;
    }),
  );

  await Promise.all(registeredRequestProducts);

  return createdRequest;
}

async function edit(props: RequestRepositoryInterfaces["EditProps"]) {
  const {
    id,
    requestData: { statusResponsibleId: userId, ...requestData },
  } = props;

  // Verificar se o request existe
  const requestExists = await db.request.findUnique({ where: { id } });
  if (!requestExists) {
    throw new Error("Requisição não encontrada");
  }

  const userRole = await db.userRole.findFirst({
    where: {
      userId: userId, // Relacionando o userId recebido do front-end
    },
  });

  // Verifica se o papel de usuário foi encontrado
  if (!userRole) {
    throw new Error("O usuário não tem um papel associado (UserRole).");
  }

  // Atualizar os dados da request
  const editedRequest = await db.request.update({
    where: { id }, // Procurar pela requisição usando o ID
    data: {
      status: requestData.status, // Atualizar o status
      statusDescription: requestData.statusDescription ?? null,
      statusDate: requestData.statusDate ?? null,
      statusResponsibleId: userRole.id ?? null,
    },
  });

  // Atualizar os produtos da requisição
  if (requestData.requestProducts && requestData.requestProducts.length > 0) {
    await Promise.all(
      requestData.requestProducts.map(async (requestProduct) => {
        // Verificar se o requestProduct existe antes de atualizar
        const existingRequestProduct = await db.requestProduct.findUnique({
          where: { id: requestProduct.id }, // Usar o id correto do produto
        });

        if (!existingRequestProduct) {
          throw new Error(
            `Produto de requisição não encontrado: ${requestProduct.id}`,
          );
        }

        await db.requestProduct.update({
          where: { id: requestProduct.id }, // Usar o id do produto da requisição
          data: {
            releasedQuantity: requestProduct.releasedQuantity ?? null, // Atualizar a quantidade liberada
          },
        });

        if (requestProduct.releasedQuantity) {
          await db.product.update({
            where: { id: existingRequestProduct.productId },
            data: {
              currentStock: {
                decrement: requestProduct.releasedQuantity, // Reduz o estoque conforme a quantidade liberada
              },
            },
          });
        }
      }),
    );
  }

  return editedRequest; // Retornar a requisição atualizada
}

async function remove(props: RequestRepositoryInterfaces["DeleteProps"]) {
  await db.requestProduct.deleteMany({
    where: {
      requestId: props.id,
    },
  });

  const deletedRequest = await db.request.delete({
    where: {
      id: props.id,
    },
  });
  return deletedRequest;
}

export const requestRepository = {
  getAll,
  register,
  edit,
  remove,
  countPendentRequests,
};
