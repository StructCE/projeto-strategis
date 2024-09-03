import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createProductFormSchema,
  type CreateProductFormValues,
} from "./productRegisterFormSchema";

export const useProductForm = () => {
  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      status: "",
      suppliers: [],
      buy_unit: "",
      buy_quantity: "",
      buy_day: "",
      stock_current: "",
      stock_min: "",
      stock_max: "",
      type_of_control: "",
      product_category: "",
      sector_of_use: "",
      place: "",
      storage: "",
      shelf: "",
    },
  });

  function onSubmit(data: CreateProductFormValues) {
    // Criar produto
    console.log(JSON.stringify(data, null, 2)); // buy_quantity, stock_current, stock_min e stock_max estão como string, passar para float/int (verifica BD)
  }

  return { form, onSubmit };
};
