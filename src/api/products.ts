import { notFound } from "next/navigation";
import { executeQraphql } from ".";
import {
  ProductGetByIdDocument,
  ProductsGetByCategorySlugDocument,
  ProductsGetListDocument,
} from "@/gql/graphql";
import type { ProductItemType } from "@/ui/types";

export const getProductsList = async (): Promise<
  ProductItemType[]
> => {
  const graphqlResponse = await executeQraphql(
    ProductsGetListDocument,
    {}
  );

  return graphqlResponse.products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.categories[0]?.name || "",
    coverImage: p.images[0] && {
      src: p.images[0].url,
      alt: p.name,
    },
    price: p.price,
    description: p.description,
  }));
};

export const getProductById = async (
  id: ProductItemType["id"]
): Promise<ProductItemType> => {
  const { product } = await executeQraphql(
    ProductGetByIdDocument,
    {
      id,
    }
  );

  if (!product) {
    notFound();
  }

  return {
    id: product.id,
    name: product.name,
    category: product.categories[0]?.name || "",
    categorySlug: product.categories[0]?.slug || "",
    coverImage: product.images[0] && {
      src: product.images[0].url,
      alt: product.name,
    },
    price: product.price,
    description: product.description,
  };
};

export const getProductsByCategory = async (
  slug: string
): Promise<ProductItemType[]> => {
  const {
    categories: [categoryProducts],
  } = await executeQraphql(
    ProductsGetByCategorySlugDocument,
    { slug }
  );

  if (!categoryProducts) {
    notFound();
  }

  return categoryProducts.products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.categories[0]?.name || "",
    coverImage: p.images[0] && {
      src: p.images[0].url,
      alt: p.name,
    },
    price: p.price,
    description: p.description,
  }));
};
