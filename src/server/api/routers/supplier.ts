import { supplierRepositorySchema } from "~/server/interfaces/supplier/supplier.repository.interfaces";
import type { SupplierRouteInterfaces } from "~/server/interfaces/supplier/supplier.route.interfaces";
import { SupplierRepository } from "~/server/repositories/supplier.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

export const supplierRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(supplierRepositorySchema.getAll)
    .query(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"][]> => {
        const suppliers = await SupplierRepository.getAll(input);
        return suppliers;
      },
    ),

  createSupplier: operationProcedure
    .input(supplierRepositorySchema.createProps)
    .mutation(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"]> => {
        const createdSupplier = await SupplierRepository.create(input);
        return createdSupplier;
      },
    ),

  editSupplier: operationProcedure
    .input(supplierRepositorySchema.editProps)
    .mutation(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"]> => {
        const editedSupplier = await SupplierRepository.edit(input);
        return editedSupplier;
      },
    ),

  removeSupplier: operationProcedure
    .input(supplierRepositorySchema.removeProps)
    .mutation(
      async ({ input }): Promise<SupplierRouteInterfaces["Supplier"]> => {
        const removedSupplier = await SupplierRepository.remove(input);
        return removedSupplier;
      },
    ),
});
