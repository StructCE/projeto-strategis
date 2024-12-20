import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createUserFormSchema,
  type CreateUserFormValues,
} from "./userRegisterFormSchema";

export const useUserForm = () => {
  const router = useRouter();
  const userMutation = api.user.registerUser.useMutation({
    onSuccess: (newUser) => {
      // console.log("User created successfully:", newUser);
      toast.success("Usuário criado com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      if (
        error.message.includes(
          "Unique constraint failed on the fields: (`email`)",
        )
      ) {
        toast.error("O e-mail já está em uso. Tente outro e-mail.", {
          position: "bottom-right",
        });
      } else {
        toast.error("Erro ao criar usuário.", {
          position: "bottom-right",
        });
      }
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
          companyId: "",
          roleId: "",
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "UserRole",
  });

  function onSubmit(data: CreateUserFormValues) {
    // console.log(JSON.stringify(data, null, 2));

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
