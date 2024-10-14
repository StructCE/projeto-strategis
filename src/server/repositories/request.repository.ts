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
  const { filters } = props;
  const requests = await db.request.findMany({
    where: {
      AND: [
        { requestDate: filters.date },
        { status: filters.status },
        { responsible: { user: { name: filters.requestResponsible } } },
      ],
    },
    include: {
      responsible: { include: { user: true } },
      statusResponsible: { include: { user: true } },
      RequestProduct: { include: { product: { include: { unit: true } } } },
    },
  });

  return requests;
}

async function register(props: RequestRepositoryInterfaces["RegisterProps"]) {
  const { requestProducts, ...requestData } = props;
  const registeredRequest = await db.request.create({
    data: {
      ...requestData,
    },
  });

  const registeredRequestProducts = requestProducts.map(
    async (requestProduct) => {
      const registeredRequestProduct = await db.requestProduct.create({
        data: {
          ...requestProduct,
          requestId: registeredRequest.id,
        },
      });
      return registeredRequestProduct;
    },
  );
  await Promise.all(registeredRequestProducts);

  return registeredRequest;
}

export const requestRepository = {
  getAll,
  register,
  countPendentRequests,
};
