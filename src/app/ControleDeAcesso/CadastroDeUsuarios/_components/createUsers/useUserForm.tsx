import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createUserFormSchema,
  type CreateUserFormValues,
} from "./userRegisterFormSchema";

export const useUserForm = () => {
  const userMutation = api.user.registerUser.useMutation({
    onSuccess: (newUser) => {
      console.log("User created successfully:", newUser);
      alert("Usuário criado com sucesso.");
      setTimeout(function () {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("Erro ao criar usuário.");
    },
  });

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      UserRole: [
        {
          company: "",
          role: "",
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "UserRole",
  });

  function onSubmit(data: CreateUserFormValues) {
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
        ...userData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return {
    form,
    onSubmit,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
