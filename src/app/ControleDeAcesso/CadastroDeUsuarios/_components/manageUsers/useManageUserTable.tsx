export const useManageUserTable = () => {
  function handleDetailsPress(user: { email: string }) {
    console.log(`Abre Pop Up do Usuário: ${user.email}`);
  }

  return { handleDetailsPress };
};
