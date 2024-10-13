import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type RoleWithModules } from "~/server/interfaces/role/role.route.interfaces";
import { api } from "~/trpc/react";
import {
  editAccessProfileFormSchema,
  type EditAccessProfileFormValues,
} from "./accessProfileEditFormSchema";

export const useAccessProfileForm = (role: RoleWithModules) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const roleMutation = api.role.editRole.useMutation({
    onSuccess: (updatedRole) => {
      console.log("Role updated successfully:", updatedRole);
      if (isDeleted === false) {
        alert("Cargo atualizado com sucesso.");
      }
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      alert("Erro ao atualizar cargo.");
    },
  });

  const deleteRoleMutation = api.role.deleteRole.useMutation({
    onSuccess: (deletedRole) => {
      console.log("Role removed successfully:", deletedRole);
      alert("Cargo removido com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error removing role:", error);
      alert("Erro ao remover cargo.");
    },
  });

  const form = useForm<EditAccessProfileFormValues>({
    resolver: zodResolver(editAccessProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: role.name,
      modules: role.modules,
    },
  });

  function onSubmitEdit(data: EditAccessProfileFormValues) {
    if (isDeleted) return;

    try {
      roleMutation.mutate({
        id: role.id,
        data: {
          name: data.name,
          modules: role.modules,
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteRoleMutation.mutate({
        id: role.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
  };
};
