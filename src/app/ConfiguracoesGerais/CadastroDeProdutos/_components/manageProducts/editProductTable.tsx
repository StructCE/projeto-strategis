/*
{filteredProducts?.map((product, index) => (
  <TableComponent.Line
    key={product.id}
    className={`grid-cols-[70px_1fr_100px_100px_100px_100px_130px] gap-8`}
  >
    <TableComponent.Value className="text-center">
      {product.code}
    </TableComponent.Value>
    
    <TableComponent.Value>
      <Input
        value={product.name}
        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
      />
    </TableComponent.Value>

    <TableComponent.Value className="text-center">
      {product.unit}
    </TableComponent.Value>

    <TableComponent.Value className="text-center">
      <Input
        value={product.currentStock}
        type="number"
        onChange={(e) => handleProductChange(product.id, 'currentStock', e.target.value)}
      />
    </TableComponent.Value>

    <TableComponent.Value className="text-center">
      <Input
        value={product.minStock}
        type="number"
        onChange={(e) => handleProductChange(product.id, 'minStock', e.target.value)}
      />
    </TableComponent.Value>

    <TableComponent.Value className="text-center">
      <Input
        value={product.maxStock}
        type="number"
        onChange={(e) => handleProductChange(product.id, 'maxStock', e.target.value)}
      />
    </TableComponent.Value>

    <TableComponent.ButtonSpace>
      <Button onClick={() => handleSaveProduct(product.id)}>
        Salvar
      </Button>
    </TableComponent.ButtonSpace>
  </TableComponent.Line>
))}

const [editedProducts, setEditedProducts] = useState({});

const handleProductChange = (productId, field, value) => {
  setEditedProducts((prev) => ({
    ...prev,
    [productId]: {
      ...prev[productId],
      [field]: value,
    },
  }));
};

const editProduct = api.product.edit.useMutation();

const handleSaveProduct = (productId) => {
  const updatedProduct = editedProducts[productId];

  if (updatedProduct) {
    editProduct.mutate({
      id: productId,
      ...updatedProduct,  // Enviando os campos que foram editados
    });
  }
};

edit: protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      currentStock: z.number(),
      minStock: z.number(),
      maxStock: z.number(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const updatedProduct = await ctx.prisma.product.update({
      where: { id: input.id },
      data: {
        name: input.name,
        currentStock: input.currentStock,
        minStock: input.minStock,
        maxStock: input.maxStock,
      },
    });
    return updatedProduct;
  }),
*/
