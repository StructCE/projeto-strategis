import { z } from "zod";

const getAllProps = z.object({
  // filters: z.object({
  //   name: z.string(),
  //   company: z.string(),
  // }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  name: z.string(),
  companyId: z.string(),
  legalResponsibleId: z.string(),
  StockCabinet: z.array(
    z.object({
      cabinetId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string(),
    companyId: z.string(),
    legalResponsibleId: z.string(),
    StockCabinet: z.array(
      z.object({
        cabinetId: z.string(),
      }),
    ),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const stockRepositorySchema = {
  getAllProps,
  registerProps,
  editProps,
  deleteProps,
};

export type StockRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
