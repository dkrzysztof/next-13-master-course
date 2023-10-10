import { cookies } from "next/headers";
import { executeQraphql } from ".";
import {
  AddProductToCartDocument,
  CartGetByIdDocument,
  CreateCartDocument,
  ProductGetByIdDocument,
} from "@/gql/graphql";

export const getCartById = async (id: string) => {
  return executeQraphql({
    query: CartGetByIdDocument,
    variables: { id },
  });
};

export const getCartFromCookies = async () => {
  const cartId = cookies().get("cartId")?.value;
  const cart = cartId
    ? await executeQraphql({
        query: CartGetByIdDocument,
        variables: {
          id: cartId,
        },
        next: ["cart"] as NextFetchRequestConfig,
      })
    : null;

  return cart?.order;
};

export const createCart = async () => {
  return executeQraphql({ query: CreateCartDocument });
};

export const addToCart = async (
  orderId: string,
  productId: string
) => {
  const { product } = await executeQraphql({
    query: ProductGetByIdDocument,
    variables: { id: productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return executeQraphql({
    query: AddProductToCartDocument,
    variables: {
      orderId,
      productId,
      total: product.price,
    },
  });
};
