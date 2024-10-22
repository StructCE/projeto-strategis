import { type ProjectRouteInterfaces } from "~/server/interfaces/project/project.route.interfaces";
import { projectRepository } from "~/server/repositories/project.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<ProjectRouteInterfaces["Project"][]> => {
      const projects = await projectRepository.getAll();
      return projects;
    },
  ),
});
