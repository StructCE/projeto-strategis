import { db } from "../db";

async function getAll() {
  const documentTypes = await db.documentType.findMany();
  return documentTypes;
}

export const documentTypeRepository = {
  getAll,
};
