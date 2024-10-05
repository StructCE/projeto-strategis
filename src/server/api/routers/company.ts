import { companyRepositorySchema } from "~/server/interfaces/company/company.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CompanyRepository } from "~/server/repositories/company.repository";
import type { CompanyRouteInterfaces } from "~/server/interfaces/company/company.route.interfaces";

export const companyRouter = createTRPCRouter({
  getOneCompany: protectedProcedure
    .input(companyRepositorySchema.getOneProps)
    .query(
      async ({ input }): Promise<CompanyRouteInterfaces["Company"] | null> => {
        const company = await CompanyRepository.getOne(input);
        return company;
      },
    ),

  getAllCompanies: protectedProcedure.query(
    async (): Promise<CompanyRouteInterfaces["Company"][] | null> => {
      const companies = await CompanyRepository.getAll();
      return companies;
    },
  ),

  getCompanySuppliers: protectedProcedure
    .input(companyRepositorySchema.getCompanySuppliersProps)
    .query(
      async ({
        input,
      }): Promise<CompanyRouteInterfaces["CompanySuppliers"]> => {
        const companySuppliers =
          await CompanyRepository.getCompanySuppliers(input);
        const serializedSuppliers = companySuppliers.map((supplier) => ({
          cnpj: supplier.cnpj,
          name: supplier.name,
          address: supplier.address,
          phone: supplier.phone,
          stateRegistration: supplier.stateRegistration,
          neighborhood: supplier.neighborhood,
          city: supplier.city,
          federativeUnit: supplier.federativeUnit,
          cep: supplier.cep,
          contacts: supplier.UserRole.map((userRole) => ({
            id: userRole.user.id,
            name: userRole.user.name,
            email: userRole.user.email,
            phone: userRole.user.phone,
            cargo: userRole.role.name,
          })),
        }));
        return serializedSuppliers;
      },
    ),

  getCompanyUsers: protectedProcedure
    .input(companyRepositorySchema.getCompanyUsersProps)
    .query(
      async ({ input }): Promise<CompanyRouteInterfaces["CompanyUsers"]> => {
        const companyUsers = await CompanyRepository.getCompanyUsers(input);
        const serializedCompanyUsers = companyUsers?.UserRole.map(
          (companyUser) => ({
            name: companyUser.user.name,
            email: companyUser.user.email,
            role: companyUser.role.name,
            company: companyUsers.name,
          }),
        );
        return serializedCompanyUsers;
      },
    ),

  getCompanyStocks: protectedProcedure
    .input(companyRepositorySchema.getCompanyStocksProps)
    .query(
      async ({ input }): Promise<CompanyRouteInterfaces["CompanyStocks"][]> => {
        const companyStocks = await CompanyRepository.getCompanyStocks(input);
        const serializedCompanyStocks = companyStocks.map((stock) => ({
          id: stock.id,
          name: stock.name,
        }));
        return serializedCompanyStocks;
      },
    ),

  registerCompany: protectedProcedure
    .input(companyRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const registeredCompany = await CompanyRepository.register(input);
      return registeredCompany;
    }),

  editCompany: protectedProcedure
    .input(companyRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const editedCompany = await CompanyRepository.edit(input);
      return editedCompany;
    }),

  deleteCompany: protectedProcedure
    .input(companyRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const deletedCompany = await CompanyRepository.remove(input);
      return deletedCompany;
    }),
});
