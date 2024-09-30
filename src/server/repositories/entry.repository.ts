import { db } from "../db";

async function countPendentNFs() {
  const pendentNFsCount = await db.entry.count({
    where: {
      status: "Atrasado",
    },
  });
  return pendentNFsCount;
}

export const EntryRepository = {
  countPendentNFs,
};
