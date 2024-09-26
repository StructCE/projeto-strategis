"use client";
import { storages } from "~/app/ConfiguracoesGerais/CadastroDeParametrosGerais/_components/GeneralParametersData";
import {
  companies,
  users,
} from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
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
import { stocks, type Stock } from "../../stockData";
import { useStockForm } from "./useStockForm";

type StockEditProps = {
  stock: Stock;
};

export const StockEdit = (props: StockEditProps) => {
  const stockForm = useStockForm(props.stock);

  return (
    <Form {...stockForm.form}>
      <form onSubmit={stockForm.form.handleSubmit(stockForm.onSubmitEdit)}>
        <FormComponent>
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

            <FormComponent.Frame>
              <FormComponent.Label>
                Responsável pelo Estoque
              </FormComponent.Label>
              <FormField
                control={stockForm.form.control}
                name="stock_manager"
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
                          <SelectItem value={user.name} key={index}>
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
                          options={stocks.flatMap((stock) =>
                            stock.address.flatMap((address) =>
                              address.shelves.map((shelf) => ({
                                label: shelf.description,
                                value: shelf.description,
                              })),
                            ),
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
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Estoque
            </FormComponent.Button>

            <FormComponent.Button
              className="hover:bg-hover_vermelho_botao_2 bg-vermelho_botao_2"
              handlePress={stockForm.form.handleSubmit(
                stockForm.onSubmitRemove,
              )}
            >
              Remover Estoque
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
