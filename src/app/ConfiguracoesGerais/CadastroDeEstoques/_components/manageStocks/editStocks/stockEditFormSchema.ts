import { z } from "zod";

const AddressSchema = z.object({
  cabinetId: z.string(),
});

export const editStockFormSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do estoque",
    })
    .min(2, { message: "O nome do estoque deve ter pelo menos 2 caracteres" })
    .max(32, {
      message: "O nome do estoque deve possuir menos de 32 caracteres",
    }),

  companyId: z
    .string({
      required_error: "Por favor selecione a empresa do estoque",
    })
    .min(1, { message: "Por favor selecione uma empresa do estoque" }),

  legalResponsibleId: z.string().optional(),

  StockCabinet: z
    .array(AddressSchema)
    .min(1, "Adicione pelo menos um armário/zona ao estoque"),
});

export type EditStockFormValues = z.infer<typeof editStockFormSchema>;
