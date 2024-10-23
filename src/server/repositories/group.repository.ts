import { db } from "../db";

async function getAll() {
  const groups = await db.group.findMany();
  return groups;
}

export const groupRepository = {
  getAll,
};
