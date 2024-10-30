import { companyRepositorySchema } from "~/server/interfaces/company/company.repository.interfaces";
import type { CompanyRouteInterfaces } from "~/server/interfaces/company/company.route.interfaces";
import { CompanyRepository } from "~/server/repositories/company.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

export const companyRouter = createTRPCRouter({
  getOneCompany: protectedProcedure
    .input(companyRepositorySchema.getOneProps)
    .query(
      async ({
        input,
      }): Promise<CompanyRouteInterfaces["EditCompany"] | null> => {
        const company = await CompanyRepository.getOne(input);
        if (!company) return null;
        const editCompany = {
          id: company.id,
          name: company.name,
          email: company.email,
          cnpj: company.cnpj,
          stateRegistration: company.stateRegistration,
          type: company.type,
          phone: company.phone,
          headquarters: company.headquarters,
          address: company.address,
          neighborhood: company.neighborhood,
          city: company.city,
          federativeUnit: company.federativeUnit,
          cep: company.cep,
          taxRegime: company.taxRegime,
          suppliers: company?.CompanySupplier.map((companySupplier) => ({
            id: companySupplier.supplier.id,
            name: companySupplier.supplier.name,
          })),
          legalResponsibleId: company.legalResponsibleId,
        };
        return editCompany;
      },
    ),

  getAllCompanies: protectedProcedure
    .input(companyRepositorySchema.getAllProps)
    .query(async ({ input }): Promise<CompanyRouteInterfaces["Company"][]> => {
      const companies = await CompanyRepository.getAll(input);
      return companies;
    }),

  getManageCompanies: protectedProcedure
    .input(companyRepositorySchema.getAllProps)
    .query(
      async ({ input }): Promise<CompanyRouteInterfaces["ManageCompany"][]> => {
        const companies = await CompanyRepository.getAll(input);
        const serializedManageCompanies = companies.map(async (company) => ({
          id: company.id,
          name: company.name,
          cnpj: company.cnpj,
          taxRegime: company.taxRegime,
          registeredProductsCount:
            await CompanyRepository.countRegisteredProducts({ id: company.id }),
          registeredSuppliersCount:
            await CompanyRepository.countRegisteredSuppliers({
              id: company.id,
            }),
          registeredUsersCount: await CompanyRepository.countRegisteredUsers({
            id: company.id,
          }),
        }));
        return await Promise.all(serializedManageCompanies);
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
        const serializedSuppliers = companySuppliers.map((companySupplier) => ({
          id: companySupplier.id,
          supplierId: companySupplier.supplier.id,
          cnpj: companySupplier.supplier.cnpj,
          name: companySupplier.supplier.name,
          email: companySupplier.supplier.email,
          address: companySupplier.supplier.address,
          phone: companySupplier.supplier.phone,
          stateRegistration: companySupplier.supplier.stateRegistration,
          neighborhood: companySupplier.supplier.neighborhood,
          city: companySupplier.supplier.city,
          federativeUnit: companySupplier.supplier.federativeUnit,
          cep: companySupplier.supplier.cep,
          contacts: companySupplier.supplier.contacts.map((contact) => ({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
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
            id: companyUser.user.id,
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
          companyName: stock.company.name,
          responsible: {
            name: stock.legalResponsible.user.name,
            email: stock.legalResponsible.user.email,
          },
        }));
        return serializedCompanyStocks;
      },
    ),

  registerCompany: operationProcedure
    .input(companyRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const registeredCompany = await CompanyRepository.register(input);
      return registeredCompany;
    }),

  editCompany: operationProcedure
    .input(companyRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const editedCompany = await CompanyRepository.edit(input);
      return editedCompany;
    }),

  deleteCompany: operationProcedure
    .input(companyRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const deletedCompany = await CompanyRepository.remove(input);
      return deletedCompany;
    }),
});
