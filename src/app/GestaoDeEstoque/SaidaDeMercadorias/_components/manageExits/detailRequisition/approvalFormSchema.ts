import { z } from "zod";

export const approveRequisitionFormSchema = z.object({
  quantity: z.number({
    required_error: "Por favor indique uma quantidade",
  }),
});

export type ApproveRequisitionFormValues = z.infer<
  typeof approveRequisitionFormSchema
>;
