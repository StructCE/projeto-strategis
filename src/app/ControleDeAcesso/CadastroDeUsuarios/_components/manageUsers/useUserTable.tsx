export const useUserTable = () => {
  function handleDetailsPress(usuario: { email: string }) {
    console.log(`Abre Pop Up do Usuário: ${usuario.email}`);
  }

  return { handleDetailsPress };
};
