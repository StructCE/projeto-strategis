import { db } from "~/server/db";
// import { cargos, modulos, users } from "./seed-data";

async function createCargo(nome: string, moduloIds: number[]) {
  try {
    const cargo = await db.cargo.create({
      data: {
        nome,
        modulos: {
          create: moduloIds.map((moduloId) => ({
            modulo: { connect: { id: moduloId } },
          })),
        },
      },
    });
    console.log("Cargo criado:", cargo);
    return cargo;
  } catch (error) {
    console.error("Erro ao criar cargo:", error);
    throw error;
  }
}

async function createModulo(operacao: string) {
  try {
    const modulo = await db.modulo.create({
      data: {
        operacao,
      },
    });
    console.log("Módulo criado:", modulo);
    return modulo;
  } catch (error) {
    console.error("Erro ao criar módulo:", error);
    throw error;
  }
}

async function createUser(
  nome: string,
  email: string,
  senha: string,
  senhaConfirmacao: string,
  telefone: string,
  cargoId: number,
) {
  try {
    const user = await db.user.create({
      data: {
        nome,
        email,
        senha,
        senhaConfirmacao,
        telefone,
        cargo: {
          connect: { id: cargoId },
        },
      },
    });
    console.log("Usuário criado:", user);
    return user;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

async function main() {
  const modulo1 = await createModulo("Cadastrar Empresas"); // Adm
  const modulo2 = await createModulo("Cadastrar Perfis"); // Adm
  const modulo3 = await createModulo("Cadastrar Usuários"); // Adm e Op
  const modulo4 = await createModulo("Dar Permissões de Acesso"); // Adm
  const modulo5 = await createModulo("Importar NFs"); // Adm e Op
  const modulo6 = await createModulo("Validar Dados Cadastrados"); // Adm e Op
  const modulo7 = await createModulo("Dar Entrada de Mercadorias"); // Adm e Est
  const modulo8 = await createModulo("Cadastrar Fornecedores"); // Adm e Est
  const modulo9 = await createModulo("Gerar Relatorios de Estoque"); // Adm e Est
  const modulo10 = await createModulo("Dar Saída de Mercadorias"); // Adm e Est
  const modulo11 = await createModulo("Fazer Inventário"); // Adm e Est
  const modulo12 = await createModulo("Fazer Ajuste de Estoque"); // Adm e Est
  const modulo13 = await createModulo("Requisitar Mercadorias do Estoque"); // Adm e Req
  const modulo14 = await createModulo("Dar Aceite de Mercadorias Recebidas"); // Adm e Req

  const cargoAdministrador = await createCargo("Administrador", [
    modulo1.id,
    modulo2.id,
    modulo3.id,
    modulo4.id,
    modulo5.id,
    modulo6.id,
    modulo7.id,
    modulo8.id,
    modulo9.id,
    modulo10.id,
    modulo11.id,
    modulo12.id,
    modulo13.id,
    modulo14.id,
  ]);
  await createCargo("Operador", [modulo3.id, modulo5.id, modulo6.id]);
  await createCargo("Estoquista", [
    modulo7.id,
    modulo8.id,
    modulo9.id,
    modulo10.id,
    modulo11.id,
    modulo12.id,
  ]);
  await createCargo("Requisitante", [modulo13.id, modulo14.id]);

  await createUser(
    "Struct EJ",
    "projetostrategis@gmail.com",
    "strategis2024*",
    "strategis2024*",
    "(61)99999-9999",
    cargoAdministrador.id,
  );
}

main()
  .catch((error) => {
    console.error("Erro no processo:", error);
  })
  // eslint-disable-next-line
  .finally(async () => {
    await db.$disconnect();
  });
