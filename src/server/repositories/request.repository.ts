import { db } from "../db";

async function countPendentRequests() {
  const pendentRequestsCount = await db.request.count({
    where: {
      status: "Esperando Confirmação",
    },
  });
  return pendentRequestsCount;
}

export const RequestRepository = {
  countPendentRequests,
};
