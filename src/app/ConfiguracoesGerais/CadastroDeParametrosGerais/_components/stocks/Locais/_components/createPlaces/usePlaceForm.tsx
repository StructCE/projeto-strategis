import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createPlaceFormSchema,
  type CreatePlaceFormValues,
} from "./placeRegisterFormSchema";

export const usePlaceForm = () => {
  const form = useForm<CreatePlaceFormValues>({
    resolver: zodResolver(createPlaceFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreatePlaceFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar categoria
  }

  return { form, onSubmit };
};
