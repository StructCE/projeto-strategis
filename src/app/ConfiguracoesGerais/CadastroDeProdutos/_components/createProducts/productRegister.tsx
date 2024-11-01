import { useSession } from "next-auth/react";
import { useState } from "react";
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
import { useCompany } from "~/lib/companyProvider";
import { api } from "~/trpc/react";
import { useProductForm } from "./useProductForm";

export const ProductRegister = () => {
  const productForm = useProductForm();

  const [selectedStockId, setSelectedStockId] = useState<string>();

  const session = useSession();

  const { data: user } = api.user.getUserById.useQuery({
    id: session?.data?.user.id,
  });

  const { selectedCompany } = useCompany();

  const companyFilter = user?.UserRole.some(
    (userRole) => userRole.role.name === "Administrador",
  )
    ? selectedCompany === "all_companies" || !selectedCompany
      ? undefined
      : selectedCompany
    : user?.UserRole[0]?.company.name;

  const { data: users = [] } = api.user.getAll.useQuery({
    filters: { company: companyFilter },
  });

  const { data: products = [] } = api.product.getAllWhere.useQuery({
    filters: { company: companyFilter },
  });
  const { data: suppliers = [] } = api.supplier.getAll.useQuery({
    filters: { company: companyFilter },
  });
  const { data: productCategories = [] } =
    api.generalParameters.productCategory.getAll.useQuery();
  const { data: useSectors = [] } =
    api.generalParameters.useSector.getAll.useQuery();
  const { data: controlTypes = [] } =
    api.generalParameters.controlType.getAll.useQuery();
  const { data: units = [] } = api.generalParameters.unit.getAll.useQuery();

  const { data: stocks = [] } = api.stock.getAllStocks.useQuery({
    filters: { company: companyFilter },
  });
  const { data: cabinets = [] } =
    api.generalParameters.cabinet.getCabinetFromStock.useQuery({
      stockId: selectedStockId ? selectedStockId : "",
    });

  return (
    <Form {...productForm.form}>
      <form onSubmit={productForm.form.handleSubmit(productForm.onSubmit)}>
        <FormComponent>
          <FormComponent.Title>Cadastro de Produto</FormComponent.Title>

          <FormComponent.Line>
            <FormComponent.Frame>
              <FormComponent.Label>Código</FormComponent.Label>
              <FormField
                control={productForm.form.control}
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
              <FormComponent.Label>NCM</FormComponent.Label>
              <FormField
                control={productForm.form.control}
                name="ncm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Código NCM do produto (XXXXXXXX)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormComponent.Frame>

            <FormComponent.Frame>
              <FormComponent.Label>CFOP</FormComponent.Label>
              <FormField
                control={productForm.form.control}
                name="cfop"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                        placeholder="Código CFOP do produto (XXXX)"
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
              <FormComponent.Label>Produto</FormComponent.Label>
              <FormField
                control={productForm.form.control}
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
                control={productForm.form.control}
                name="suppliersId"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={suppliers.map((supplier) => ({
                        label: supplier.name,
                        value: supplier.id,
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? []}
                      placeholder="Selecione o(s) fornecedor(es) do produto"
                      variant="inverted"
                      maxCount={2}
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
                control={productForm.form.control}
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
                control={productForm.form.control}
                name="parentProductId"
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
                          <SelectItem value={product.id} key={index}>
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
                control={productForm.form.control}
                name="usersWithPermission"
                render={({ field }) => (
                  <FormItem>
                    <MultiSelect
                      options={users.map((user) => ({
                        label: user.name,
                        value: user.id,
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
                control={productForm.form.control}
                name="unitId"
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
                          <SelectItem value={unit.id} key={index}>
                            {unit.name} ({unit.abbreviation}) -{" "}
                            {unit.unitsPerPack}
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
                control={productForm.form.control}
                name="buyQuantity"
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
                control={productForm.form.control}
                name="buyDay"
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
                control={productForm.form.control}
                name="currentStock"
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
                control={productForm.form.control}
                name="minimunStock"
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
                control={productForm.form.control}
                name="maximumStock"
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
                control={productForm.form.control}
                name="controlTypeId"
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
                        {controlTypes.map((type, index) => (
                          <SelectItem value={type.id} key={index}>
                            {type.name}
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
                control={productForm.form.control}
                name="categoryId"
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
                        {productCategories.map((category, index) => (
                          <SelectItem value={category.id} key={index}>
                            {category.name}
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
                control={productForm.form.control}
                name="sectorOfUseId"
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
                        {useSectors.map((sector, index) => (
                          <SelectItem value={sector.id} key={index}>
                            {sector.name}
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
                control={productForm.form.control}
                name="stockId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        setSelectedStockId(value);
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
                          <SelectItem value={stock.id} key={index}>
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
              <FormComponent.Label>Endereço no Estoque</FormComponent.Label>
              <FormField
                control={productForm.form.control}
                name="shelfId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedStockId}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-0.5 border-[1px] border-borda_input bg-white placeholder-placeholder_input">
                          <SelectValue placeholder="Selecione um endereço do estoque selecionado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cabinets.map((cabinet) =>
                          cabinet.shelf.map((shelf, index) => (
                            <SelectItem value={shelf.id} key={index}>
                              {cabinet.name} - {shelf.name}
                            </SelectItem>
                          )),
                        )}
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
