import { ProductItemType, ProductResponseItem } from "@/ui/types";

export const getProductsList = async (): Promise<ProductItemType[]> => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=20`);

  const productsReponse = (await res.json()) as ProductResponseItem[];

  return productsReponse.map(productResponseToProductItemType);
};

export const getProductById = async (
  id: ProductItemType["id"]
): Promise<ProductItemType> => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  );
  const productResponse = (await res.json()) as ProductResponseItem;
  return productResponseToProductItemType(productResponse);
};

const productResponseToProductItemType = (
  product: ProductResponseItem
): ProductItemType => ({
  id: product.id,
  name: product.title,
  category: product.category,
  coverImage: {
    src: product.image,
    alt: product.title,
  },
  price: product.price,
});
