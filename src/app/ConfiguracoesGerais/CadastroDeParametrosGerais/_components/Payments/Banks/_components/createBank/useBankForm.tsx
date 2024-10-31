// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   createBankFormSchema,
//   type CreateBankFormValues,
// } from "./bankRegisterFormSchema";

// export const useBankForm = () => {
//   const form = useForm<CreateBankFormValues>({
//     resolver: zodResolver(createBankFormSchema),
//     mode: "onChange",
//   });

//   function onSubmit(data: CreateBankFormValues) {
//     console.log(JSON.stringify(data, null, 2)); // Criar banco
//   }

//   return { form, onSubmit };
// };
