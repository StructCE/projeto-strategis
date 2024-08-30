"use client";
import { type Role } from "../accessProfilesData";
import { AccessProfileEdit } from "./accessProfileEdit";
import { useAccessProfileForm } from "./useAccessProfileForm";

export const AccessProfileEditContainer = (role: Role) => {
  const {
    form,
    selectedModule,
    setSelectedModule,
    onSubmitEdit,
    onSubmitRemove,
  } = useAccessProfileForm(role);

  return (
    <AccessProfileEdit
      role={role}
      form={form}
      selectedModule={selectedModule}
      setSelectedModule={setSelectedModule}
      onSubmitEdit={onSubmitEdit}
      onSubmitRemove={onSubmitRemove}
    />
  );
};
