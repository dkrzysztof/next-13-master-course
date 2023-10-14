import { notFound } from "next/navigation";
import { executeQraphql, paginationToFirstSkip } from ".";
import {
  ProductGetByIdDocument,
  ProductSearchListDocument,
  ProductVariantsListDocument,
  ProductsGetByCategorySlugDocument,
  ProductsGetListDocument,
} from "@/gql/graphql";
import type {
  ProductBaseVariant,
  ProductItemType,
  ListPagination,
} from "@/ui/types";
import { productFragmentToProductItem } from "@/utils";

export const getProductsList = async (
  pageSize: number,
  pageNumber: number
): Promise<ListPagination<ProductItemType>> => {
  const { products: productsRaw, productsConnection } =
    await executeQraphql({
      query: ProductsGetListDocument,
      variables: paginationToFirstSkip(
        pageNumber,
        pageSize
      ),
    });

  const products: ProductItemType[] = productsRaw.map(
    productFragmentToProductItem
  );

  return {
    data: products,
    count: productsConnection.aggregate.count,
  };
};

export const getProductById = async (
  id: ProductItemType["id"],
  orderId?: string
): Promise<ProductItemType> => {
  const { product } = await executeQraphql({
    query: ProductGetByIdDocument,
    variables: {
      id,
      orderId
    },
  });

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
    orderItem: product.orderItems[0]
  };
};

export const getProductsByCategory = async (
  pageNumber: number,
  pageSize: number,
  slug: string
): Promise<ListPagination<ProductItemType>> => {
  const {
    categories: [categoryProductsRaw],
    productsConnection,
  } = await executeQraphql({
    query: ProductsGetByCategorySlugDocument,
    variables: {
      slug,
      ...paginationToFirstSkip(pageNumber, pageSize),
    },
  });

  if (!categoryProductsRaw) {
    notFound();
  }

  const categoryProducts = categoryProductsRaw.products.map(
    productFragmentToProductItem
  );

  return {
    data: categoryProducts,
    count: productsConnection.aggregate.count,
  };
};

export const getProductVariants = async (
  id: string
): Promise<ProductBaseVariant[]> => {
  const { product } = await executeQraphql({
    query: ProductVariantsListDocument,
    variables: { id },
  });

  if (!(product && product.variants)) {
    return [];
  }

  return product.variants;
};

export const getProductsBySearch = async (
  search: string
): Promise<ListPagination<ProductItemType>> => {
  const { products: productsRaw, productsConnection } =
    await executeQraphql({
      query: ProductSearchListDocument,
      variables: {
        search,
      },
    });

  if (!productsRaw) {
    return { data: [], count: 0 };
  }

  const products = productsRaw.map(
    productFragmentToProductItem
  );

  return {
    data: products,
    count: productsConnection.aggregate.count,
  };
};
