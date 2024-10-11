import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { type UserWithRoles } from "../../usersData";
import {
  editUserFormSchema,
  type EditUserFormValues,
} from "./userEditFormSchema";

export const useUserForm = (user: UserWithRoles) => {
  const userMutation = api.user.editUser.useMutation({
    onSuccess: (updatedUser) => {
      console.log("User updated successfully:", updatedUser);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const deleteUserMutation = api.user.deleteUser.useMutation({
    onSuccess: (deletedUser) => {
      console.log("User removed successfully:", deletedUser);
    },
    onError: (error) => {
      console.error("Error removing user:", error);
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
        company: userRole.company,
        role: userRole.role,
      })),
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "UserRole",
  });

  function onSubmitEdit(data: EditUserFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const userData = {
      email: data.email,
      name: data.name,
      phone: data.phone ?? "",
      UserRole: data.UserRole.map((userRole) => ({
        companyId: userRole.company,
        roleId: userRole.role,
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
