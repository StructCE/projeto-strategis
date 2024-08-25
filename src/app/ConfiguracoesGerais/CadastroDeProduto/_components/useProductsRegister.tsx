export const useProductsRegister = () => {
  function handleDetailsPress(produto: { code: number }) {
    console.log(`Abre Pop Up do Produto: ${produto.code}`);
  }

  return { handleDetailsPress };
};
