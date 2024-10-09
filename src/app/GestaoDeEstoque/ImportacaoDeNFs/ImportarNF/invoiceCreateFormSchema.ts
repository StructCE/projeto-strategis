import { z } from "zod";

export const createInvoiceFormSchema = z.object({
  document_number: z.string({
    required_error: "O número do documento é obrigatório.",
  }),

  company: z.object({
    name: z.string({
      required_error: "O nome da empresa é obrigatório.",
    }),
  }),

  date_document: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date({ required_error: "A data de emissão é obrigatória." }),
  ),

  document: z.object({
    name: z.string({
      required_error: "O tipo de documento é obrigatório.",
    }),
  }),

  account_plan: z.object({
    name: z.string({
      required_error: "O nome do plano de contas é obrigatório.",
    }),

    abbreviation: z.string().optional(),

    account: z.string({
      required_error: "O nome da conta é obrigatório.",
    }),
  }),

  project: z.object({
    name: z.string({
      required_error: "O nome do projeto é obrigatório.",
    }),
  }),

  expense_type: z.string({
    required_error: "O tipo de despesa é obrigatório.",
  }),

  recurrence: z.string({
    required_error: "O tipo de recorrência é obrigatório.",
  }),

  supplier: z.object({
    name: z.string({
      required_error: "O fornecedor é obrigatório.",
    }),
  }),

  bank: z
    .object({
      name: z.string(),
    })
    .optional(), // O banco pode ser undefined

  installment: z.string({
    required_error: "Digite o número da parcela.",
  }),

  value_payed: z.number().optional(), // O valor pago pode ser undefined

  date_deadline: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date({ required_error: "A data de vencimento é obrigatória." }),
  ),

  date_payment: z
    .preprocess(
      (value) => (typeof value === "string" ? new Date(value) : value),
      z.date(),
    )
    .optional(),

  confirmed_status: z.string({
    required_error: "O status de confirmação é obrigatório.",
  }),

  payed_status: z.string().optional(), // O status de pagamento pode ser undefined

  group: z.object({
    name: z.string({
      required_error: "O nome do grupo é obrigatório.",
    }),
  }),

  products: z.array(
    z.object({
      name: z.string({
        required_error: "O nome do produto é obrigatório.",
      }),

      code: z.string({
        required_error: "O código do produto é obrigatório.",
      }),

      ncm: z
        .preprocess(
          (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
          z.number({ required_error: "O NCM é obrigatório." }),
        )
        .optional(),

      cfop: z
        .preprocess(
          (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
          z.number({ required_error: "O CFOP é obrigatório." }),
        )
        .optional(),

      buy_unit: z.string({
        required_error: "A unidade de compra é obrigatória.",
      }),

      purchase_quantity: z
        .preprocess(
          (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
          z.number({ required_error: "A quantidade de compra é obrigatória." }),
        )
        .optional(),

      value_unit: z
        .preprocess(
          (value) => (typeof value === "string" ? parseFloat(value) : value), // Converte string para número
          z.number({
            required_error: "O valor por unidade do produto é obrigatório.",
          }),
        )
        .optional(),

      type_of_control: z.string({
        required_error: "O tipo de controle é obrigatório.",
      }),

      product_category: z.string({
        required_error: "A categoria do produto é obrigatória.",
      }),

      sector_of_use: z.string({
        required_error: "O setor de uso é obrigatório.",
      }),

      address: z.object({
        stock: z.string({
          required_error: "Selecione um local.",
        }),

        storage: z.string({
          required_error: "Selecione um armário/zona.",
        }),

        shelf: z.string({
          required_error: "Selecione uma prateleira.",
        }),
      }),
    }),
  ),
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceFormSchema>;
