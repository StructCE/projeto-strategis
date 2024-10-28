import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type UserWithRoles } from "~/server/interfaces/user/user.route.interfaces";
import { api } from "~/trpc/react";
import {
  editUserFormSchema,
  type EditUserFormValues,
} from "./userEditFormSchema";

export const useUserForm = (user: UserWithRoles) => {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

  const userMutation = api.user.editUser.useMutation({
    onSuccess: (updatedUser) => {
      console.log("User updated successfully:", updatedUser);
      if (isDeleted === false) {
        toast.success(
          "Usuário atualizado com sucesso. Atualizando a página...",
          {
            position: "bottom-right",
          },
        );
      }
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error("Erro ao atualizar usuário.", {
        position: "bottom-right",
      });
    },
  });

  const deleteUserMutation = api.user.deleteUser.useMutation({
    onSuccess: (deletedUser) => {
      console.log("User removed successfully:", deletedUser);
      toast.success("Usuário removido com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error removing user:", error);
      toast.error("Erro ao remover usuário.", {
        position: "bottom-right",
      });
    },
  });

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      UserRole: user.UserRole.map((userRole) => ({
        companyId: userRole.companyId,
        roleId: userRole.roleId,
      })),
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "UserRole",
  });

  function onSubmitEdit(data: EditUserFormValues) {
    if (isDeleted) return;
    console.log(JSON.stringify(data, null, 2));

    try {
      userMutation.mutate({
        id: user.id,
        data: {
          email: data.email,
          name: data.name,
          phone: data.phone ?? "",
          UserRole: data.UserRole.map((userRole, index) => ({
            id: user.UserRole?.[index]?.id ?? "",
            companyId: userRole.companyId,
            roleId: userRole.roleId,
          })),
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  function onSubmitRemove() {
    setIsDeleted(true);
    try {
      deleteUserMutation.mutate({
        id: user.id,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return {
    form,
    onSubmitEdit,
    onSubmitRemove,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
