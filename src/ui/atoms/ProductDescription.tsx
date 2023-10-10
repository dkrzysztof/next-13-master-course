import React from "react";
import { cookies } from "next/headers";
import type { ProductItemType } from "../types";
import { formatMoney } from "@/utils";
import {
  addToCart,
  createCart,
  getCartById,
} from "@/api/carts";
import { AddToCartButton } from "./AddToCartButton";
import { revalidateTag } from "next/cache";

type ProductDescriptionProps = {
  product: ProductItemType;
};

export const ProductDescription = ({
  product: {
    id: productId,
    name,
    category,
    description,
    price,
  },
}: ProductDescriptionProps) => {
  const addToCartAction = async (_formData: FormData) => {
    "use server";
    const cart = await getOrCreateCart();
    cookies().set("cartId", cart.id, {
      maxAge: 60 * 60 * 24 * 365,
      expires: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 365
      ),
      httpOnly: false,
      sameSite: "lax",
    });
    await addToCart(cart.id, productId);
    revalidateTag("cart");
  };

  return (
    <>
      <p className="text-sm tracking-widest text-gray-500">
        <span className="sr-only">Kategoria:</span>{" "}
        {category.toUpperCase()}
      </p>
      <h1 className="text-3xl text-slate-900 font-bold">
        {name}
      </h1>
      <p className="text-slate-900">{description}</p>
      <p className="text-xl mt-3 font-medium text-gray-900">
        <span className="sr-only">Kategoria:</span>
        {formatMoney(price)}
      </p>
      <form action={addToCartAction}>
        <AddToCartButton />
      </form>
    </>
  );
};

const delay = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

async function getOrCreateCart() {
  const cartId = cookies().get("cartId")?.value;
  if (cartId) {
    await delay()
    const cart = await getCartById(cartId);
    if (cart.order) {
      return cart.order;
    }
  }
  await delay()
  const cart = await createCart();
  if (!cart.createOrder) {
    throw new Error("Failed to create cart");
  }
  return cart.createOrder as any;
}
