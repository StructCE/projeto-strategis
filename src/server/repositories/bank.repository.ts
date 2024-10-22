import { db } from "../db";

async function getAll() {
  const banks = await db.bank.findMany();
  return banks;
}

export const bankRepository = {
  getAll,
};
