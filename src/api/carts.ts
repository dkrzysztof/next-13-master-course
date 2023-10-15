import { cookies } from "next/headers";
import { executeQraphql } from ".";
import {
  AddProductToCartDocument,
  CartGetByIdDocument,
  CreateCartDocument,
  GetOrderItemByIdDocument,
  ProductGetByIdDocument,
  PublishOrderDocument,
  PublishOrderItemDocument,
} from "@/gql/graphql";

export const getCartById = async (id: string) => {
  return executeQraphql({
    query: CartGetByIdDocument,
    variables: { id },
  });
};

export const getCartFromCookies = async () => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return;
  }

  const cart = await executeQraphql({
    query: CartGetByIdDocument,
    variables: {
      id: cartId,
    },
    cache: "no-store",
    next: {
      tags: ["cart"],
    },
  });

  if (!cart.order) {
    return;
  }
  return cart.order;
};

export const createCart = async () => {
  const cart = await executeQraphql({ query: CreateCartDocument });

  if(cart.createOrder?.id){
    await publishOrder(cart.createOrder?.id)
  }

  return cart;
};

type AddToCartParams = {
  orderId: string;
  productId: string;
  orderItemId?: string;
};
export const addToCart = async ({
  orderId,
  productId,
}: AddToCartParams) => {
  const { product } = await executeQraphql({
    query: ProductGetByIdDocument,
    variables: { id: productId, orderId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const [orderItem] = product.orderItems

  const quantity = orderItem?.quantity || 0;
  const total = orderItem?.total || 0;

  const { upsertOrderItem } = await executeQraphql({
    query: AddProductToCartDocument,
    variables: {
      orderId,
      productId,
      orderItemId: orderItem?.id,
      quantity: quantity + 1,
      total: total + product.price,
    },
  });

  if (upsertOrderItem) {
    await publishOrderItem(upsertOrderItem.id);
  }

  return upsertOrderItem;
};

export const getOrderItemById = async (id: string) => {
  const { orderItem } = await executeQraphql({
    query: GetOrderItemByIdDocument,
    variables: {
      id,
    },
  });

  return orderItem;
};

export const publishOrder = async (
  orderId: string,
) => {
  await executeQraphql({
    query: PublishOrderDocument,
    variables: {
      id: orderId,
    },
  });
}
export const publishOrderItem = async (
  orderItemId: string
) => {
  return executeQraphql({
    query: PublishOrderItemDocument,
    variables: {
      id: orderItemId,
    },
  });
};
