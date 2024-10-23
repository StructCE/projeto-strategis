import { db } from "../db";

async function getAll() {
  const projects = await db.project.findMany();
  return projects;
}

export const projectRepository = {
  getAll,
};
