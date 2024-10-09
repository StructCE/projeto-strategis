import { db } from "../db";
import type { ProductCategoryRepositoryInterfaces } from "../interfaces/productCategory/productCategory.repository.interfaces";

async function getAll() {
  const productCategories = await db.productCategory.findMany();
  return productCategories;
}

async function register(
  props: ProductCategoryRepositoryInterfaces["RegisterProps"],
) {
  const registeredProductCategory = await db.productCategory.create({
    data: {
      ...props,
    },
  });
  return registeredProductCategory;
}

async function edit(props: ProductCategoryRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedProductCategory = await db.productCategory.update({
    where: { id },
    data: { ...data },
  });
  return editedProductCategory;
}

async function remove(
  props: ProductCategoryRepositoryInterfaces["RemoveProps"],
) {
  const deletedProductCategory = await db.productCategory.delete({
    where: {
      id: props.id,
    },
  });
  return deletedProductCategory;
}

export const productCategoryRepository = {
  getAll,
  register,
  edit,
  remove,
};
