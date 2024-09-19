import { z } from "zod";

const supplierLegalRepresentativeSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do resposável.",
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

export const craeteCompanyFormSchema = z.object({
  empresa: z
    .string({ required_error: "Por favor digite o nome." })
    .min(3, { message: "Nome da empresa deve ter pelo menos 3 caracteres." })
    .max(60, { message: "Nome deve ter no máximo 60 caracteres." }),

  cnpj: z
    .string({ required_error: "CNPJ não pode ser vazio." })
    .length(14, { message: "São necessarios 14 dígitos." }),
  tipo_empresa: z.string({
    required_error: "Por favor selecione o tipo da empresa.",
  }),
  matriz_empresa: z.string({
    required_error: "Por favor seleciona a matriz da empresa",
  }),
  email: z
    .string({
      required_error: "Por favor digite um email.",
    })
    .email({
      message: "Email inválido.",
    }),
  phone: z
    .string({ required_error: "Por favor digite o telefone" })
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    }),
  inscricao_estadual: z
    .string({ required_error: "Campo obrigatório" })
    .min(9, { message: "Inscrição Estadual deve ter no minimo 9 caracteres" })
    .max(14, {
      message: "Inscrição Estadual deve ter no minimo 14 caracteres",
    }),
  regime_tributario: z.string({
    required_error: "Por favor selecione um regime tributário",
  }),
  address: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Endereço deve ter pelo menos 3 caracteres." })
    .max(60, { message: "Endereço deve ter no máximo 60 caracteres." }),
  bairro: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Endereço deve ter pelo menos 3 caracteres." })
    .max(25, { message: "Endereço deve ter no máximo 25 caracteres." }),
  municipio: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Município deve ter pelo menos 3 caracteres." })
    .max(20, { message: "Município deve ter no máximo 20 caracteres." }),
  uf: z.string({
    required_error: "Por favor selecione uma UF",
  }),
  cep: z
    .string({ required_error: "CEP deve ser obrigatório." })
    .length(8, { message: "São necessarios 8 dígitos" }),
  responsavel_legal: z
    .string()
    .min(3, {
      message: "Nome do responsável deve ter pelo menos 3 caracteres.",
    })
    .max(40, {
      message: "Nome do responsável deve ter no máximo 40 caracteres.",
    }),
  cargo: z.string({
    required_error: "Por favor selecione um cargo.",
  }),
  email_responsavel_legal: z
    .string({
      required_error: "Por favor digite um email.",
    })
    .email({
      message: "Email inválido.",
    }),
  phone_responsavel_legal: z
    .string()
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    }),
  address_file_XML: z.string({
    required_error: "Coloque o endereço local dos arquivos XML",
  }),
  legalRepresentative: z.array(supplierLegalRepresentativeSchema).optional(),
});

export type CreateCompanyFormValues = z.infer<typeof craeteCompanyFormSchema>;
