import { useState } from "react";
import { stocks } from "~/app/ConfiguracoesGerais/CadastroDeEstoques/_components/stockData";
import { users } from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
import { FormComponent } from "~/components/forms";
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
  ProductCategories,
  products,
  SectorsOfUse,
  suppliers,
  TypesOfControl,
  units,
  type Product,
} from "../../productsData";
import { useProductForm } from "./useProductForm";

type ProductEditForm = {
  product: Product;
};

export const ProductEdit = (props: ProductEditForm) => {
  const productEditForm = useProductForm(props.product);

  const [selectedStock, setSelectedStock] = useState(
    props.product.address.stock,
  );
  const [selectedStorage, setSelectedStorage] = useState(
    props.product.address.storage,
  );

  // Filtra os armários/zona com base no estoque selecionado
  const filteredStorages = selectedStock
    ? (stocks.find((stock) => stock.name === selectedStock)?.address ?? [])
    : [];

  // Filtra as prateleiras com base no armário/zona selecionado
  const filteredShelves = selectedStorage
    ? (filteredStorages.find(
        (storage) => storage.description === selectedStorage,
      )?.shelves ?? [])
    : [];

  return (
    <Form {...productEditForm.form}>
      <form
        onSubmit={productEditForm.form.handleSubmit(
          productEditForm.onSubmitEdit,
        )}
      >
        <FormComponent>
          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Código</FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Código do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Produto</FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
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
              <FormComponent.Label>Fornecedor(es)</FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
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
              <FormComponent.Label>Status</FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
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
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>Produto Pai</FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
                name="parent_product"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o produto pai do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((product, index) => (
                          <SelectItem value={product.name} key={index}>
                            {product.name}
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
                Requisitantes com permissão
              </FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
                name="users_with_permission"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={users.map((user) => ({
                        label: user.name,
                        value: user.name,
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? []}
                      placeholder="Selecione o(s) requisitante(s)"
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
                control={productEditForm.form.control}
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
                          <SelectItem value={unit.description} key={index}>
                            {unit.description} ({unit.abbreviation})
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
                control={productEditForm.form.control}
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
                control={productEditForm.form.control}
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
                        <SelectItem value="Segunda">Segunda</SelectItem>
                        <SelectItem value="Terça">Terça</SelectItem>
                        <SelectItem value="Quarta">Quarta</SelectItem>
                        <SelectItem value="Quinta">Quinta</SelectItem>
                        <SelectItem value="Sexta">Sexta</SelectItem>
                        <SelectItem value="Sábado">Sábado</SelectItem>
                        <SelectItem value="Domingo">Domingo</SelectItem>
                        <SelectItem value="Qualquer dia">
                          Qualquer dia
                        </SelectItem>
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
                control={productEditForm.form.control}
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
                control={productEditForm.form.control}
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
                control={productEditForm.form.control}
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
                control={productEditForm.form.control}
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
                control={productEditForm.form.control}
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
                control={productEditForm.form.control}
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
              <FormComponent.Label>Estoque</FormComponent.Label>
              <FormField
                control={productEditForm.form.control}
                name="address.stock"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        setSelectedStock(value);
                        setSelectedStorage("");
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione o estoque do produto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stocks.map((stock, index) => (
                          <SelectItem value={stock.name} key={index}>
                            {stock.name}
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
                control={productEditForm.form.control}
                name="address.storage"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        setSelectedStorage(value);
                        field.onChange(value);
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
                control={productEditForm.form.control}
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
            <FormComponent.Button className="bg-amarelo_botao hover:bg-hover_amarelo_botao">
              Editar Produto
            </FormComponent.Button>
            <FormComponent.Button
              className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2"
              handlePress={productEditForm.form.handleSubmit(
                productEditForm.onSubmitRemove,
              )}
            >
              Remover Produto
            </FormComponent.Button>
          </FormComponent.ButtonLayout>
        </FormComponent>
      </form>
    </Form>
  );
};
