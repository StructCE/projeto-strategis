import { type DocumentTypeRouteInterfaces } from "~/server/interfaces/documentType/documentType.route.interfaces";
import { documentTypeRepository } from "~/server/repositories/documentType.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const documentTypeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<DocumentTypeRouteInterfaces["DocumentType"][]> => {
      const documentTypes = await documentTypeRepository.getAll();
      return documentTypes;
    },
  ),
});
