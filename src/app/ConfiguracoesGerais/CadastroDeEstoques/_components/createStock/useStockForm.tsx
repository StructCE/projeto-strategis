import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createStockFormSchema,
  type CreateStockFormValues,
} from "./stockRegisterFormSchema";
import { useFieldArray } from "react-hook-form";

export const useStockForm = () => {
  const form = useForm<CreateStockFormValues>({
    resolver: zodResolver(createStockFormSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
      name: "",
      company: "",
      stockAddress: "",
      zone: "",
      shelf: "",
      stockRepresentative: [{ name: "", role: "", email: "", phone: "" }],
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "stockRepresentative",
  });

  function onSubmit(data: CreateStockFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar stock
  }

  return {
    form,
    onSubmit,
    fieldsArray: fieldArray.fields,
    arrayAppend: fieldArray.append,
    arrayRemove: fieldArray.remove,
  };
};
