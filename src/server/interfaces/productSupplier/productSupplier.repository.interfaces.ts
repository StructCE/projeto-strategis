import { z } from "zod";

const getAllProps = z.object({
  filters: z.object({
    productId: z.string(),
    name: z.string(),
    stock: z.string(),
    controlType: z.string(),
    productCategory: z.string(),
    sectorOfUse: z.string(),
  }),
});

type GetAllProps = z.infer<typeof getAllProps>;

export const productSupplierRepositorySchema = {
  getAllProps,
};

export type ProductSupplierRepositoryInterfaces = {
  GetAllProps: GetAllProps;
};
