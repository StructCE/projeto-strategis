export const useManageAccessProfileTable = () => {
  function handleDetailsPress(role: { name: string }) {
    console.log(`Abre Pop Up do Cargo: ${role.name}`);
  }

  return { handleDetailsPress };
};
