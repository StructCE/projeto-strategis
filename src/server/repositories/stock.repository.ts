import { db } from "../db";
import type { StockRepositoryInterfaces } from "../interfaces/stock/stock.repository.interfaces";

async function getAll(props: StockRepositoryInterfaces["GetAllProps"]) {
  // const { filters } = props;
  const stocks = await db.stock.findMany({
    // where: {
    //   AND: [
    //     {
    //       name: filters.name,
    //     },
    //     {
    //       company: {
    //         name: filters.company,
    //       },
    //     },
    //   ],
    // },
    include: {
      legalResponsible: {
        include: {
          user: true,
          role: true,
        },
      },
      StockCabinet: {
        include: {
          cabinet: {
            include: {
              Shelf: true,
            },
          },
        },
      },
      company: true,
    },
  });
  return stocks;
}

async function register(props: StockRepositoryInterfaces["RegisterProps"]) {
  const { name, companyId, legalResponsibleId, StockCabinet } = props;

  // Verifique se a empresa existe
  const companyExists = await db.company.findUnique({
    where: { id: companyId },
  });

  if (!companyExists) {
    throw new Error("Empresa não encontrada");
  }

  // Buscar o `userRole` pelo `user.id` (no caso `legalResponsibleId` é o `user.id`)
  const responsibleUserRole = await db.userRole.findFirst({
    where: { userId: legalResponsibleId }, // legalResponsibleId é userId neste caso
  });

  if (!responsibleUserRole) {
    throw new Error("Responsável pelo estoque não encontrado");
  }

  // Verifique se todos os armários/zonas existem
  for (const stockCabinet of StockCabinet) {
    const cabinetExists = await db.cabinet.findUnique({
      where: { id: stockCabinet.cabinetId },
    });

    if (!cabinetExists) {
      throw new Error(
        `Armário/Zona com ID ${stockCabinet.cabinetId} não encontrado`,
      );
    }
  }

  // Criar o estoque com o `userRole.id` como responsável legal
  const createdStock = await db.stock.create({
    data: {
      name,
      companyId,
      legalResponsibleId: responsibleUserRole.id, // Usar o `userRole.id`
      StockCabinet: {
        create: StockCabinet.map((stockCabinet) => ({
          cabinetId: stockCabinet.cabinetId,
        })),
      },
    },
  });

  return createdStock;
}

export const StockRepository = {
  getAll,
  register,
};
