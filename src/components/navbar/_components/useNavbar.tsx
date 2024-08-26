export const useNavbar = () => {
  function handleSignOut() {
    console.log("Saindo da conta");
  }

  return { handleSignOut };
};
