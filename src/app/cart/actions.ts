"use server";

import { executeQraphql } from "@/api";
import { getCartFromCookies } from "@/api/carts";
import {
  CartRemoveProductDocument,
  CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const removeItem = (itemId: string) => {
  return executeQraphql({
    query: CartRemoveProductDocument,
    variables: { itemId },
  });
};

export const changeItemQuantity = (
  itemId: string,
  quantity: number
) => {
  return executeQraphql({
    query: CartSetProductQuantityDocument,
    variables: {
      itemId,
      quantity,
    },
  });
};

export const handleStripePaymentAction = async () => {
  "use server";

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY env variable"
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const cart = await getCartFromCookies();
  if (!cart) {
    return;
  }

  const session = await stripe.checkout.sessions.create({
    metadata: {
      cartId: cart.id,
    },
    line_items: cart.orderItems
      .map((item) => ({
        price_data: {
          currency: "pln",
          product_data: {
            name: item.product?.name || "",
            description: item.product?.description || "",
            images: item.product?.images.map((i) => i.url),
          },
          unit_amount: item.product?.price || 0,
        },
        quantity: item.quantity,
      }))
      .filter(Boolean),
    mode: "payment",
    success_url: `${process.env.APP_ORIGIN}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_ORIGIN}/cart/canceled`,
  });

  if (session.url) {
    cookies().set("cartId", "");
    redirect(session.url);
  }
};
