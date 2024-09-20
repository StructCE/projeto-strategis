import { z } from "zod";

const StockRepresentativeSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do responsável.",
    })
    .min(2, {
      message: "O nome do responsável deve ter pelo menos 3 caracteres.",
    }),

  role: z
    .string({
      required_error: "Por favor selecione o cargo.",
    })
    .min(1, {
      message: "Por favor selecione o cargo.",
    }),

  email: z
    .string({
      required_error: "Por favor digite o email do responsável.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string()
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX) XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX) XXXXX-XXXX.",
    })
    .optional(),
});

const ZoneSchema = z.object({
  nameZone: z.string().min(1, { message: "Por favor digite o nome da zona." }),
});

const ShelfSchema = z.object({
  nameShelf: z
    .string()
    .min(1, { message: "Por favor digite o nome da prateleira." }),
});

const StockAddressSchema = z.object({
  nameStockAddress: z
    .string()
    .min(1, { message: "Por favor selecione o endereço" }),
});

const StockCompanySchema = z.object({
  nameStockCompany: z
    .string()
    .min(1, { message: "Por favor selecione a empresa do estoque" }),
});

export const editStockFormSchema = z.object({
  code: z
    .string({
      required_error: "Por favor digite o código",
    })
    .min(3, { message: "O código deve possuir pelo menos 3 caracteres" })
    .max(10, { message: "O código deve possuir menos de 30 caracteres" }),
  name: z
    .string({
      required_error: "Por favor digite o nome do estoque",
    })
    .min(2, { message: "O nome do estoque deve ter pelomenos 2 caracteres" })
    .max(32, { message: "O estoque deve possuir menos de 30 caracteres" }),
  company: z.array(StockCompanySchema).optional(),
  stockRepresentative: z.array(StockRepresentativeSchema).optional(),
  stockAddress: z.array(StockAddressSchema).optional(),
  zone: z.array(ZoneSchema).optional(),
  shelf: z.array(ShelfSchema).optional(),
});

export type EditStockFormValues = z.infer<typeof editStockFormSchema>;
