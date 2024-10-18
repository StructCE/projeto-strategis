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
  // const { filters } = props;
  const requests = await db.request.findMany({
    // where: {
    //   AND: [
    //     { requestDate: filters.date },
    //     { status: filters.status },
    //     { responsible: { user: { name: filters.requestResponsible } } },
    //   ],
    // },
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

export const requestRepository = {
  getAll,
  register,
  countPendentRequests,
};
