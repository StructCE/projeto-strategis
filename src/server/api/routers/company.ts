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

  registerCompany: protectedProcedure
    .input(companyRepositorySchema.registerProps)
    .query(async ({ input }): Promise<CompanyRouteInterfaces["Company"]> => {
      const registeredCompany = await CompanyRepository.register(input);
      return registeredCompany;
    }),
});
