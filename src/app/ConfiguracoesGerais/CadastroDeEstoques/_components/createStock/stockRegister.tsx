"use client";
import { storages } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import { companies } from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
import { FormComponent } from "~/components/forms/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { roles } from "../../../CadastroDeFornecedores/_components/supplierData";
import { useStockForm } from "./useStockForm";

export const StockRegister = () => {
  const stockForm = useStockForm();

  // Filtra as prateleiras baseadas no storage selecionado
  const getShelfOptions = (storageDescription: string) => {
    const storage = storages.find((s) => s.description === storageDescription);
    return storage
      ? storage.shelves.map((shelf) => ({
          label: shelf.description,
          value: shelf.description,
        }))
      : [];
  };

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
                name="company"
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
                          <SelectItem value={company.value} key={index}>
                            {company.value}
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

          <FormComponent.BoxSpecify boxName="Responsável pelo Estoque">
            <FormComponent.Line>
              <FormComponent.Frame>
                <FormComponent.Label>Nome</FormComponent.Label>
                <FormField
                  control={stockForm.form.control}
                  name={`stock_representative.name`}
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
                  control={stockForm.form.control}
                  name={`stock_representative.role`}
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
                  control={stockForm.form.control}
                  name={`stock_representative.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-fit border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                          placeholder="Endereço de email do responsável"
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
                  control={stockForm.form.control}
                  name={`stock_representative.phone`}
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
            </FormComponent.Line>
          </FormComponent.BoxSpecify>

          <FormComponent.BoxSpecify boxName="Endereços">
            {stockForm.fieldsArray.map((address, index) => (
              <FormComponent.Line key={index}>
                <FormComponent.Frame>
                  <FormComponent.Label>Armários/Zonas</FormComponent.Label>
                  <FormField
                    control={stockForm.form.control}
                    name={`address.${index}.storage`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            stockForm.setSelectedStorages((prev) => {
                              const updatedStorages = [...prev];
                              updatedStorages[index] = value;
                              return updatedStorages;
                            });
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                              <SelectValue placeholder="Selecione um Armário/Zona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {storages.map((storage, index) => (
                              <SelectItem
                                key={index}
                                value={storage.description}
                              >
                                {storage.description}
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
                  <FormComponent.Label>Prateleiras</FormComponent.Label>
                  <FormField
                    control={stockForm.form.control}
                    name={`address.${index}.shelves`}
                    render={({ field }) => (
                      <FormItem>
                        <MultiSelect
                          options={getShelfOptions(
                            stockForm.selectedStorages[index] ?? "",
                          )}
                          onValueChange={(selected) => {
                            field.onChange(selected);
                          }}
                          defaultValue={field.value}
                          placeholder="Selecione uma ou mais prateleiras do armário/zona selecionado"
                          variant="inverted"
                          maxCount={3}
                        />
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

          <FormComponent.ButtonLayout>
            <button
              onClick={() =>
                stockForm.arrayAppend({ storage: "", shelves: [] })
              }
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
