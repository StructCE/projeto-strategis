import { db } from "../db";
import type { CompanyRepositoryInterfaces } from "../interfaces/company/company.repository.interfaces";

async function getAll() {
  const companies = await db.company.findMany();
  return companies;
}

async function getOne(props: CompanyRepositoryInterfaces["GetOneProps"]) {
  const company = await db.company.findFirst({
    where: {
      id: props.id,
    },
  });
  return company;
}

async function register(props: CompanyRepositoryInterfaces["RegisterProps"]) {
  const registeredCompany = await db.company.create({
    data: {
      ...props,
    },
  });
  return registeredCompany;
}

export const CompanyRepository = {
  getAll,
  getOne,
  register,
};
