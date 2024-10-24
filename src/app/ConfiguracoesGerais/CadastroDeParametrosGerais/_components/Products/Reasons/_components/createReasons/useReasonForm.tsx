import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/trpc/react";
import {
  createReasonFormSchema,
  type CreateReasonFormValues,
} from "./reasonRegisterFormSchema";

export const useReasonForm = () => {
  const reasonMutation =
    api.generalParameters.adjustReason.registerAdjustReason.useMutation({
      onSuccess: (newReason) => {
        console.log("Reason created successfully:", newReason);
        toast.success("Motivo criado com sucesso. Atualizando a página...", {
          position: "bottom-right",
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error creating reason:", error);
        toast.error("Erro ao criar motivo.", {
          position: "bottom-right",
        });
      },
    });

  const form = useForm<CreateReasonFormValues>({
    resolver: zodResolver(createReasonFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: CreateReasonFormValues) {
    console.log(JSON.stringify(data, null, 2));

    const reasonData = {
      name: data.name,
    };

    try {
      reasonMutation.mutate({
        ...reasonData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return { form, onSubmit };
};
