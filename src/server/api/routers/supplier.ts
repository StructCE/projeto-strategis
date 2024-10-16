import { supplierRepositorySchema } from "~/server/interfaces/supplier/supplier.repository.interfaces";
import type { SupplierRouteInterfaces } from "~/server/interfaces/supplier/supplier.route.interfaces";
import { SupplierRepository } from "~/server/repositories/supplier.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const supplierRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(supplierRepositorySchema.getAll)
    .query(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"][]> => {
        const suppliers = await SupplierRepository.getAll(input);
        return suppliers;
      },
    ),

  createSupplier: protectedProcedure
    .input(supplierRepositorySchema.createProps)
    .mutation(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"]> => {
        const createdSupplier = await SupplierRepository.create(input);
        return createdSupplier;
      },
    ),

  editSupplier: protectedProcedure
    .input(supplierRepositorySchema.editProps)
    .mutation(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"]> => {
        const editedSupplier = await SupplierRepository.edit(input);
        return editedSupplier;
      },
    ),

  removeSupplier: protectedProcedure
    .input(supplierRepositorySchema.removeProps)
    .mutation(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"]> => {
        const removedSupplier = await SupplierRepository.remove(input);
        return removedSupplier;
      },
    ),
});
