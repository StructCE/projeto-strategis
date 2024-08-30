import { type Role } from "../accessProfilesData";

export const useManageAccessProfileTable = () => {
  function handleDetailsPress(role: Role) {
    console.log(`Abre Pop Up do Cargo: ${role.name}`);
  }

  return { handleDetailsPress };
};
