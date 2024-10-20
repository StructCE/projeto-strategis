import { type GroupRouteInterfaces } from "~/server/interfaces/group/group.route.interfaces";
import { groupRepository } from "~/server/repositories/group.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<GroupRouteInterfaces["Group"][]> => {
      const groups = await groupRepository.getAll();
      return groups;
    },
  ),
});
