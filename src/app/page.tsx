"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormComponent } from "~/components/forms/formsContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const createUserFormSchema = z
  .object({
    email: z.string().email({
      message: "Email inválido.",
    }),
    password: z
      .string()
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
      })
      .max(128, {
        message: "A senha deve ter no máximo 128 caracteres.",
      }),
    password_confirmation: z.string(),
    username: z
      .string()
      .min(3, {
        message: "Nome deve ter pelo menos 3 caracteres.",
      })
      .max(60, {
        message: "Nome deve ter no máximo 60 caracteres.",
      }),
    empresa: z
      .string({
        required_error: "Por favor selecione uma empresa.",
      })
      .optional(),
    cargo: z
      .string({
        required_error: "Por favor selecione um cargo.",
      })
      .optional(),
    phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

export default function Home() {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: CreateUserFormValues) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <div className="flex flex-col gap-[8px] p-[32px]">
      {/* <h1 className="">STRATEGIS</h1> */}
      {/* 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormComponent>
            <FormComponent.Title>Cadastrar Usuário</FormComponent.Title>
            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Email</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Input
                          placeholder="Endereço de email"
                          {...field}
                        ></FormComponent.Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
              <FormComponent.Frame>
                <FormComponent.Label>Senha</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Input
                          placeholder="Crie uma senha para acesso ao sistema"
                          {...field}
                        ></FormComponent.Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormComponent.Frame>
              <FormComponent.Frame>
                <FormComponent.Label>Confirmar Senha</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Input
                          placeholder="Confirme a senha"
                          {...field}
                        ></FormComponent.Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Nome</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Input
                          placeholder="Endereço de email"
                          {...field}
                        ></FormComponent.Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormComponent.Frame>
              <FormComponent.Frame>
                <FormComponent.Label>Telefone</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Input
                          placeholder="(XX) XXXXX-XXXX"
                          {...field}
                        ></FormComponent.Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormComponent.Frame>
               
              <FormComponent.Frame>
                <FormComponent.Label>Empresa</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Select
                          placeholder="Selecione uma empresa"
                          values={[
                            "Empresa 1",
                            "Empresa 2",
                            "Empresa 3",
                            "Empresa 4",
                            "Empresa 5",
                          ]}
                          onValueChange={field.onChange}
                        ></FormComponent.Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
              <FormComponent.Frame>
                <FormComponent.Label>Cargo</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormComponent.Select
                          placeholder="Selecione um cargo"
                          values={[
                            "Administrador",
                            "Operador",
                            "Estoquista",
                            "Requisitante",
                            "Personalizado",
                          ]}
                          onValueChange={field.onChange}
                        ></FormComponent.Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
               *
            </FormComponent.Line>

            <FormComponent.ButtonLayout>
              <FormComponent.Button
                className="bg-[#28A745] hover:bg-[#309147]"
                // handlePress={}
              >
                Criar Usuário
              </FormComponent.Button>
            </FormComponent.ButtonLayout>
          </FormComponent>
        </form>
      </Form>
       */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormComponent>
            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Email</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Endereço de email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Senha</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Crie uma senha para acesso ao sistema"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Confirme a senha</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Confirme a senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Nome</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>

              <FormComponent.Frame>
                <FormComponent.Label>Telefone</FormComponent.Label>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="(XX)XXXXX-XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormComponent.Frame>
            </FormComponent.Line>

            <FormComponent.ButtonLayout>
              <FormComponent.Button className="bg-[#28A745] hover:bg-[#309147]">
                Criar Usuário
              </FormComponent.Button>
            </FormComponent.ButtonLayout>
          </FormComponent>
        </form>
      </Form>
    </div>
  );
}
