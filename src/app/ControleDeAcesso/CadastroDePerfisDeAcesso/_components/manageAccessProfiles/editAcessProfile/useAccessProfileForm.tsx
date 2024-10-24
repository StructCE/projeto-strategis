import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.success("Cargo atualizado com sucesso. Atualizando a página...", {
          position: "bottom-right",
        });
      }
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      toast.error("Erro ao atualizar cargo.", {
        position: "bottom-right",
      });
    },
  });

  const deleteRoleMutation = api.role.deleteRole.useMutation({
    onSuccess: (deletedRole) => {
      console.log("Role removed successfully:", deletedRole);
      toast.success("Cargo removido com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error removing role:", error);
      toast.error("Erro ao remover cargo.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<EditAccessProfileFormValues>({
    resolver: zodResolver(editAccessProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: role.name,
      modules: role.modules.map((module) => module.code.toString()),
    },
  });

  function onSubmitEdit(data: EditAccessProfileFormValues) {
    if (isDeleted) return;
    else {
      try {
        roleMutation.mutate({
          id: role.id,
          data: {
            name: data.name,
            modules: data.modules,
          },
        });
      } catch (error) {
        console.error("Error submitting update form:", error);
      }
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
