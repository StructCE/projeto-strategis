import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { FormComponent } from "~/components/forms/formsContainer";
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
import {
  Places,
  ProductCategories,
  SectorsOfUse,
  status,
  suppliers,
  TypesOfControl,
  units,
  weekDays,
} from "../productsData";
import { type CreateProductFormValues } from "./productRegisterFormSchema";

type ProductRegisterProps = {
  form: UseFormReturn<CreateProductFormValues>;
  onSubmit: (data: CreateProductFormValues) => void;
};

export const ProductRegister = (props: ProductRegisterProps) => {
  // Filtra os armários/zona com base no local selecionado
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const filteredStorages = selectedPlace
    ? (Places.find((place) => place.description === selectedPlace)?.storages ??
      [])
    : [];

  // Filtra as prateleiras com base no armário/zona selecionado
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const filteredShelves = selectedStorage
    ? (filteredStorages.find(
        (storage) => storage.description === selectedStorage,
      )?.shelves ?? [])
    : [];

  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Produto</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Produto</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Nome do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Status</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o status do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {status.map((status, index) => (
                          <SelectItem value={status.description} key={index}>
                            {status.description}
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
              <FormComponent.Label>Fornecedor(es)</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="suppliers"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={suppliers.map((supplier) => ({
                        label: supplier.name,
                        value: supplier.name,
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? []}
                      placeholder="Selecione o(s) fornecedor(es) do produto"
                      variant="inverted"
                      maxCount={1}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>
          </FormComponent.Line>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Unidade de Compra</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="buy_unit"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione a unidade de compra" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit, index) => (
                          <SelectItem value={unit.unit} key={index}>
                            {unit.unit}
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
                Quantidade de Compra (und)
              </FormComponent.Label>
              <FormField
                control={props.form.control}
                name="buy_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Digite a quantidade de compra"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Dia de Compra</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="buy_day"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o dia da semana" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {weekDays.map((day_of_week, index) => (
                          <SelectItem value={day_of_week.day} key={index}>
                            {day_of_week.day}
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

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Estoque Atual (und)</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="stock_current"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Digite o estoque atual"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Estoque Mínimo (und)</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="stock_min"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Digite o estoque mínimo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Estoque Máximo (und)</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="stock_max"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Digite o estoque máximo"
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
              <FormComponent.Label>Tipo de Controle</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="type_of_control"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o tipo de controle do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TypesOfControl.map((type, index) => (
                          <SelectItem value={type.description} key={index}>
                            {type.description}
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
              <FormComponent.Label>Categoria do Produto</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="product_category"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione a categoria do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ProductCategories.map((category, index) => (
                          <SelectItem value={category.description} key={index}>
                            {category.description}
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
              <FormComponent.Label>Setor de Utilização</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="sector_of_use"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o setor de utilização do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SectorsOfUse.map((sector, index) => (
                          <SelectItem value={sector.description} key={index}>
                            {sector.description}
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

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Local</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="address.place"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedPlace(value);
                        setSelectedStorage("");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o local do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Places.map((place, index) => (
                          <SelectItem value={place.description} key={index}>
                            {place.description}
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
              <FormComponent.Label>Armário/Zona</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="address.storage"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedStorage(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um armário/zona associado ao local selecionado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredStorages.map((storage, index) => (
                          <SelectItem value={storage.description} key={index}>
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
              <FormComponent.Label>Prateleira</FormComponent.Label>
              <FormField
                control={props.form.control}
                name="address.shelf"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione uma prateleira associada ao armário/zona selecionado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredShelves.map((shelf, index) => (
                          <SelectItem value={shelf.description} key={index}>
                            {shelf.description}
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

          <FormComponent.ButtonLayout>
            <FormComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao">
              Cadastrar Produto
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
