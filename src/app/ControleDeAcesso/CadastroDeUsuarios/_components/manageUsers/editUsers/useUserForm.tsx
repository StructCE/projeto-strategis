import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { type UserWithRoles } from "~/server/interfaces/user/user.route.interfaces";
import { api } from "~/trpc/react";
import {
  editUserFormSchema,
  type EditUserFormValues,
} from "./userEditFormSchema";

export const useUserForm = (user: UserWithRoles) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const userMutation = api.user.editUser.useMutation({
    onSuccess: (updatedUser) => {
      console.log("User updated successfully:", updatedUser);
      if (isDeleted === false) {
        alert("Usuário atualizado com sucesso.");
      }
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      alert("Erro ao atualizar usuário.");
    },
  });

  const deleteUserMutation = api.user.deleteUser.useMutation({
    onSuccess: (deletedUser) => {
      console.log("User removed successfully:", deletedUser);
      alert("Usuário removido com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error removing user:", error);
      alert("Erro ao remover usuário.");
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

    const userData = {
      email: data.email,
      name: data.name,
      phone: data.phone ?? "",
      UserRole: data.UserRole.map((userRole) => ({
        companyId: userRole.companyId,
        roleId: userRole.roleId,
      })),
    };

    try {
      userMutation.mutate({
        id: user.id,
        data: userData,
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
