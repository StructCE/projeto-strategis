"use client";

import { FormComponent } from "~/components/forms/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import type { Contact } from "../../supplierData";
import { roles, states } from "../../supplierData";
import { useSupplierForm } from "./useSupplierForm";

import type { Supplier } from "~/server/interfaces/supplier/supplier.route.interfaces";

type SupplierEditProps = {
  supplier: Supplier;
  contacts: Contact[];
};

export const SupplierEdit = (props: SupplierEditProps) => {
  const form = useSupplierForm(props.supplier, props.contacts);

  return (
    <Form {...form.form}>
      <form onSubmit={form.form.handleSubmit(form.onSubmitEdit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Fornecedor</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do fornecedor/empresa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>CNPJ</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XX.XXX.XXX/XXXX-XX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Email</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Endereço de email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Telefone</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="(XX) XXXX-XXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
            <FormComponent.Frame>
              <FormComponent.Label>Inscrição Estadual</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.stateRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XXXXXXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Endereço</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Endereço do fornecedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Bairro</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Bairro do fornecedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Município/Cidade</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Cidade do fornecedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Unidade Federativa</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.federativeUnit"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma UF" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state, index) => (
                          <SelectItem value={state.value} key={index}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>CEP</FormComponent.Label>
              <FormField
                control={form.form.control}
                name="data.cep"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="XXXXX-XXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.BoxSpecify boxName="Contatos">
            {form.fieldsArray.map((contact, index) => (
              <FormComponent.Line key={contact.id}>
                <FormComponent.Frame>
                  <FormComponent.Label>Nome</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`contacts.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="Nome do contato"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>

                <FormComponent.Frame>
                  <FormComponent.Label>Cargo</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`contacts.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                              <SelectValue placeholder="Selecione um cargo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role, i) => (
                              <SelectItem value={role.value} key={i}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>

                <FormComponent.Frame>
                  <FormComponent.Label>Email</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`contacts.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="Endereço de email do contato"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>

                <FormComponent.Frame>
                  <FormComponent.Label>Telefone</FormComponent.Label>
                  <FormField
                    control={form.form.control}
                    name={`contacts.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                            placeholder="(XX) XXXXX-XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>

                <FormComponent.ButtonRemove
                  handlePress={() => form.fieldRemove(index)}
                ></FormComponent.ButtonRemove>
              </FormComponent.Line>
            ))}
          </FormComponent.BoxSpecify>

          <FormComponent.ButtonLayout>
            <button
              onClick={() =>
                form.fieldAppend({ name: "", email: "", phone: "", role: "" })
              }
              className="min-w-28 rounded-lg bg-cinza_escuro_botao px-[20px] py-[8px] text-white hover:bg-hover_cinza_escuro_botao"
              type="button"
            >
              <p className="text-[14px] font-semibold tracking-wider sm:text-[16px] sm:tracking-normal">
                Adicionar Contato
              </p>
            </button>
          </FormComponent.ButtonLayout>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Fornecedor
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
              handlePress={form.form.handleSubmit(form.onSubmitRemove)}
            >
              Remover Fornecedor
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
