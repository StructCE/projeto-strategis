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
import { api } from "~/trpc/react";
import { useStockForm } from "./useStockForm";

export const StockRegister = () => {
  const stockForm = useStockForm();

  const { data: companies = [] } = api.company.getAllCompanies.useQuery({
    filters: {},
  });
  const { data: users = [] } = api.user.getAll.useQuery();
  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getCabinetsWithoutStock.useQuery();

  return (
    <Form {...stockForm.form}>
      <form onSubmit={stockForm.form.handleSubmit(stockForm.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Estoque</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Nome</FormComponent.Label>
              <FormField
                control={stockForm.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do estoque"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Empresa</FormComponent.Label>
              <FormField
                control={stockForm.form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Empresa do estoque" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.map((company, index) => (
                          <SelectItem value={company.id} key={index}>
                            {company.name}
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
              <FormComponent.Label>
                Responsável pelo Estoque
              </FormComponent.Label>
              <FormField
                control={stockForm.form.control}
                name="legalResponsibleId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user, index) => (
                          <SelectItem value={user.id} key={index}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.BoxSpecify boxName="Armários/Zonas">
            {stockForm.fieldsArray.map((StockCabinet, index) => (
              <FormComponent.Line key={index}>
                <FormComponent.Frame>
                  <FormComponent.Label className="text-[15px]">
                    {`Endereço ${index + 1}`}
                  </FormComponent.Label>
                  <FormField
                    control={stockForm.form.control}
                    name={`StockCabinet.${index}.cabinetId`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                              <SelectValue placeholder="Selecione um Armário/Zona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cabinets.map((cabinet, index) => (
                              <SelectItem key={index} value={cabinet.id}>
                                {cabinet.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormComponent.Frame>

                <FormComponent.ButtonRemove
                  handlePress={() => stockForm.arrayRemove(index)}
                ></FormComponent.ButtonRemove>
              </FormComponent.Line>
            ))}
          </FormComponent.BoxSpecify>

          <FormComponent.ButtonLayout className="flex justify-end">
            <button
              onClick={() => stockForm.arrayAppend({ cabinetId: "" })}
              className="min-w-28 rounded-lg bg-cinza_escuro_botao px-[20px] py-[8px] text-white hover:bg-hover_cinza_escuro_botao"
              type="button"
            >
              <p className="text-[14px] font-semibold tracking-wider sm:text-[16px] sm:tracking-normal">
                Adicionar Armário/Zona
              </p>
            </button>
          </FormComponent.ButtonLayout>

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Cadastrar Estoque
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
