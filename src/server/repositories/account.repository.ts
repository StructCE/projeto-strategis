import { db } from "../db";

async function getAll() {
  const accounts = await db.invoiceAccount.findMany();
  return accounts;
}

export const accountRepository = {
  getAll,
};
