import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  craeteCompanyFormSchema,
  type CreateCompanyFormValues,
} from "./companyRegisterFormSchema";

export const useCompanies = () => {
  const form = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(craeteCompanyFormSchema),
    mode: "onChange",
    defaultValues: {
      legalRepresentative: [{ name: "", role: "", email: "", phone: "" }],
    },
  });

  const fieldsArray = useFieldArray({
    control: form.control,
    name: "legalRepresentative",
  });
  function onSubmit(data: CreateCompanyFormValues) {
    console.log(JSON.stringify(data, null, 2));
  }
  return { form, onSubmit, fieldsArray: fieldsArray.fields };
};
