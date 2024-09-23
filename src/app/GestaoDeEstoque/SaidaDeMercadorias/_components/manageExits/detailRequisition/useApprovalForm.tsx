import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  approveRequisitionFormSchema,
  type ApproveRequisitionFormValues,
} from "./approvalFormSchema";

export const useApprovalForm = () => {
  const form = useForm<ApproveRequisitionFormValues>({
    resolver: zodResolver(approveRequisitionFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: ApproveRequisitionFormValues) {
    console.log(JSON.stringify(data, null, 2)); // Criar usuário
  }

  return { form, onSubmit };
};
