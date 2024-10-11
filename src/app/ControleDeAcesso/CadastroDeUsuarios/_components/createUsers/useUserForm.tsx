import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  createUserFormSchema,
  type CreateUserFormValues,
} from "./userRegisterFormSchema";

export const useUserForm = () => {
  // Define a mutação fora da função onSubmit
  const userMutation = api.user.registerUser.useMutation({
    onSuccess: (newUser) => {
      console.log("User created successfully:", newUser);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateUserFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const userData = {
      email: data.email,
      name: data.name,
      phone: data.phone ?? "",
      companyId: data.company,
      roleId: data.role,
    };

    try {
      userMutation.mutate({
        ...userData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
