import { z } from "zod";

export const approveRequisitionFormSchema = z.object({
  quantity: z.number({
    required_error: "*",
  }),
});

export type ApproveRequisitionFormValues = z.infer<
  typeof approveRequisitionFormSchema
>;
