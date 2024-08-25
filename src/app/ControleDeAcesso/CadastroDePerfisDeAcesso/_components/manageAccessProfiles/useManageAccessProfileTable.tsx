export const useManageAccessProfileTable = () => {
  function handleDetailsPress(cargo: { nome: string }) {
    console.log(`Abre Pop Up do Cargo: ${cargo.nome}`);
  }

  return { handleDetailsPress };
};
