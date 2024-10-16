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

async function getStockFromShelf(
  props: StockRepositoryInterfaces["StockFromShelfProps"],
) {
  const stocks = await db.stock.findMany({
    where: {
      StockCabinet: {
        some: {
          cabinet: {
            Shelf: {
              some: {
                id: props.shelfId,
              },
            },
          },
        },
      },
    },
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

async function edit(props: StockRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const { name, companyId, legalResponsibleId, StockCabinet } = data;

  // Verifique se o estoque existe
  const stockExists = await db.stock.findUnique({ where: { id } });
  if (!stockExists) throw new Error("Estoque não encontrado");

  // Verifique se a empresa existe
  const companyExists = await db.company.findUnique({
    where: { id: companyId },
  });
  if (!companyExists) throw new Error("Empresa não encontrada");

  // Verifique se o responsável pelo estoque existe
  const responsibleUserRole = await db.userRole.findFirst({
    where: { userId: legalResponsibleId },
  });
  if (!responsibleUserRole)
    throw new Error("Responsável pelo estoque não encontrado");

  // Atualizar o estoque e as relações de StockCabinet, se necessário
  const updatedStock = await db.stock.update({
    where: { id },
    data: {
      name,
      companyId,
      legalResponsibleId: responsibleUserRole.id,
      StockCabinet: {
        deleteMany: {}, // Deletar todos os armários/zonas associados previamente
        create: StockCabinet.map((stockCabinet) => ({
          cabinetId: stockCabinet.cabinetId,
        })), // Adicionar os novos armários/zonas
      },
    },
  });

  return updatedStock;
}

// Função para deletar um estoque
async function remove(props: StockRepositoryInterfaces["DeleteProps"]) {
  const { id } = props;

  // Verifique se o estoque existe
  const stockExists = await db.stock.findUnique({ where: { id } });
  if (!stockExists) throw new Error("Estoque não encontrado");

  // Remover o estoque e suas relações com StockCabinet
  const deletedStock = await db.stock.delete({
    where: { id },
  });

  return deletedStock;
}

export const StockRepository = {
  getAll,
  getStockFromShelf,
  register,
  edit,
  remove,
};
