import { notFound } from "next/navigation";
import { executeQraphql, paginationToFirstSkip } from ".";
import {
  Exact,
  ProductGetByIdDocument,
  ProductSearchListDocument,
  ProductUpdateAverageRatingDocument,
  ProductVariantsListDocument,
  ProductsGetByCategorySlugDocument,
  ProductsGetListDocument,
  ProductsGetListPriceAscDocument,
  ProductsGetListPriceDescDocument,
  ProductsGetListQuery,
  ProductsGetListRatingAscDocument,
  ProductsGetListRatingDescDocument,
  TypedDocumentString,
} from "@/gql/graphql";
import type {
  ProductBaseVariant,
  ProductItemType,
  ListPagination,
} from "@/ui/types";
import { productFragmentToProductItem } from "@/utils";

export type SortingProductsList =
  | "price-desc"
  | "price-asc"
  | "rating-desc"
  | "rating-asc"
  | "default";

type ProductsListQuery = TypedDocumentString<
  ProductsGetListQuery,
  Exact<{
    first: number;
    skip: number;
  }>
>;

const orderKeyToSortingQuery: Record<
  SortingProductsList,
  ProductsListQuery
> = {
  default: ProductsGetListDocument,
  "price-asc": ProductsGetListPriceAscDocument,
  "price-desc": ProductsGetListPriceDescDocument,
  "rating-asc": ProductsGetListRatingAscDocument,
  "rating-desc": ProductsGetListRatingDescDocument,
};

const chooseQueryBySorting = (
  orderBy?: SortingProductsList
): ProductsListQuery => {
  return orderKeyToSortingQuery[
    orderBy || "default"
  ] as ProductsListQuery;
};

export const getProductsList = async (
  pageSize: number,
  pageNumber: number,
  orderBy?: SortingProductsList
): Promise<ListPagination<ProductItemType>> => {
  const { products: productsRaw, productsConnection } =
    await executeQraphql({
      query: chooseQueryBySorting(orderBy),
      variables: paginationToFirstSkip(
        pageNumber,
        pageSize
      ),
      cache:"no-cache"
    });
  console.log(
    productsRaw.map((x) => ({
      rating: x.rating,
    }))
  );
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
      orderId,
    },
    cache: "no-cache",
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
    rating: product.rating || 0,
    description: product.description,
    orderItem: product.orderItems[0],
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

export const recalculateProductAverageReview = (
  productId: string
) => {
  return fetch(
    `${process.env.APP_ORIGIN}/api/products/${productId}`,
    {
      method: "POST",
    }
  );
};

export const updateProductAverageRating = async (
  productId: string,
  avgRating: number
) => {
  return executeQraphql({
    query: ProductUpdateAverageRatingDocument,
    variables: {
      productId,
      avgRating,
    },
  });
};
